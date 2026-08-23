import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import authService from '../services/auth.service';
import { FormError, FormField, Select, TextInput } from '../components/ui/form';
import { Button, Kicker, Panel, StatusTag } from '../components/ui/kit';
import '../styles/Settings.css';

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState({ current: '', next: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);
  const [users, setUsers] = useState([]);
  const [teamError, setTeamError] = useState('');
  const [newUser, setNewUser] = useState({ email: '', fullName: '', password: '', role: 'operator' });
  const [adding, setAdding] = useState(false);

  const loadUsers = async () => {
    if (user?.role !== 'admin') return;
    try {
      const { data } = await api.get('/users');
      setUsers(data.users);
      setTeamError('');
    } catch (error) {
      setTeamError(error.message);
    }
  };

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.role]);

  const changePassword = async (event) => {
    event.preventDefault();
    setPasswordError('');
    if (password.next.length < 14) return setPasswordError('Use at least 14 characters.');
    if (password.next !== password.confirm) return setPasswordError('The new passwords do not match.');
    setSavingPassword(true);
    try {
      await authService.changePassword(password.current, password.next);
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      setPasswordError(error.message);
    } finally {
      setSavingPassword(false);
    }
  };

  const addUser = async (event) => {
    event.preventDefault();
    setTeamError('');
    if (newUser.password.length < 14) return setTeamError('Temporary passwords need at least 14 characters.');
    setAdding(true);
    try {
      await api.post('/users', newUser);
      setNewUser({ email: '', fullName: '', password: '', role: 'operator' });
      await loadUsers();
    } catch (error) {
      setTeamError(error.message);
    } finally {
      setAdding(false);
    }
  };

  const updateUser = async (id, changes) => {
    setTeamError('');
    try {
      await api.patch(`/users/${id}`, changes);
      await loadUsers();
    } catch (error) {
      setTeamError(error.message);
    }
  };

  return (
    <div className="screen">
      <header className="screen__head">
        <div>
          <Kicker>Administration</Kicker>
          <h1 className="screen__title serif">Workspace settings</h1>
          <p className="screen__sub">Secure your account and control who can access this workspace.</p>
        </div>
        <StatusTag status={user?.role} label={user?.role} />
      </header>

      <div className="settings-grid">
        <Panel className="rv-pad settings-card">
          <Kicker>Your account</Kicker>
          <div className="settings-identity">
            <strong>{user?.name}</strong>
            <span>{user?.email}</span>
            {user?.mustChangePassword && (
              <span className="formerror" role="status">
                Change your temporary password before continuing.
              </span>
            )}
          </div>
          <form className="settings-form" onSubmit={changePassword}>
            <FormError>{passwordError}</FormError>
            <FormField label="Current password" required>
              <TextInput type="password" autoComplete="current-password" value={password.current} onChange={(e) => setPassword((v) => ({ ...v, current: e.target.value }))} required />
            </FormField>
            <FormField label="New password" required>
              <TextInput type="password" autoComplete="new-password" value={password.next} onChange={(e) => setPassword((v) => ({ ...v, next: e.target.value }))} required />
            </FormField>
            <FormField label="Confirm new password" required>
              <TextInput type="password" autoComplete="new-password" value={password.confirm} onChange={(e) => setPassword((v) => ({ ...v, confirm: e.target.value }))} required />
            </FormField>
            <Button type="submit" variant="primary" disabled={savingPassword}>
              {savingPassword ? 'Changing…' : 'Change password'}
            </Button>
          </form>
        </Panel>

        {user?.role === 'admin' && (
          <Panel className="rv-pad settings-card settings-card--wide">
            <Kicker>Team access</Kicker>
            <FormError>{teamError}</FormError>
            <form className="settings-add" onSubmit={addUser}>
              <FormField label="Full name" required>
                <TextInput value={newUser.fullName} onChange={(e) => setNewUser((v) => ({ ...v, fullName: e.target.value }))} required />
              </FormField>
              <FormField label="Work email" required>
                <TextInput type="email" value={newUser.email} onChange={(e) => setNewUser((v) => ({ ...v, email: e.target.value }))} required />
              </FormField>
              <FormField label="Temporary password" required>
                <TextInput type="password" value={newUser.password} onChange={(e) => setNewUser((v) => ({ ...v, password: e.target.value }))} required />
              </FormField>
              <FormField label="Role">
                <Select options={['operator', 'viewer', 'admin']} value={newUser.role} onChange={(e) => setNewUser((v) => ({ ...v, role: e.target.value }))} />
              </FormField>
              <Button type="submit" variant="primary" disabled={adding}>{adding ? 'Adding…' : 'Add user'}</Button>
            </form>

            <div className="settings-users">
              {users.map((member) => (
                <div className="settings-user" key={member.id}>
                  <div className="cellstack">
                    <span className="cellname">{member.fullName}</span>
                    <span className="cellsub">{member.email}</span>
                  </div>
                  <Select
                    aria-label={`Role for ${member.fullName}`}
                    options={['admin', 'operator', 'viewer']}
                    value={member.role}
                    disabled={member.id === user.id}
                    onChange={(e) => updateUser(member.id, { role: e.target.value })}
                  />
                  <StatusTag status={member.status} />
                  {member.id !== user.id && (
                    <Button variant="quiet" size="sm" onClick={() => updateUser(member.id, { status: member.status === 'active' ? 'disabled' : 'active' })}>
                      {member.status === 'active' ? 'Disable' : 'Enable'}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Panel>
        )}
      </div>
    </div>
  );
}
