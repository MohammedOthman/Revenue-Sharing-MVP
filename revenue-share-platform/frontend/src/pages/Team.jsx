import React, { useState, useEffect } from 'react';
import authService from '../services/auth.service';
import { useAuth } from '../context/AuthContext';
import { getApiError } from '../services/api';
import '../styles/Partners.css';

const emptyInvite = { email: '', fullName: '', role: 'user' };

const Team = () => {
  const { user: me } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [invite, setInvite] = useState(emptyInvite);
  const [inviteResult, setInviteResult] = useState(null);
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await authService.getUsers();
      setUsers(data || []);
      setError('');
    } catch (err) {
      setError(getApiError(err, 'Failed to load team'));
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    setInviting(true);
    setError('');
    try {
      const result = await authService.inviteUser(invite);
      setInviteResult(result);
      setInvite(emptyInvite);
      await loadUsers();
    } catch (err) {
      setError(getApiError(err, 'Failed to send invitation'));
    } finally {
      setInviting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setInviteResult(null);
    setInvite(emptyInvite);
  };

  const handleRoleChange = async (id, role) => {
    try {
      await authService.updateUser(id, { role });
      await loadUsers();
    } catch (err) {
      setError(getApiError(err, 'Failed to change role'));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Remove this user? They will lose access immediately.')) {
      try {
        await authService.deleteUser(id);
        await loadUsers();
      } catch (err) {
        setError(getApiError(err, 'Failed to remove user'));
      }
    }
  };

  if (loading) return <div className="loading">Loading team...</div>;

  return (
    <div className="partners-page">
      <div className="page-header">
        <h1>Team</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          + Invite Teammate
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.full_name}{u.id === me?.id ? ' (you)' : ''}</td>
                <td>{u.email}</td>
                <td>
                  {u.id === me?.id ? (
                    <span className={`badge badge-${u.role}`}>{u.role}</span>
                  ) : (
                    <select value={u.role} onChange={(e) => handleRoleChange(u.id, e.target.value)}>
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  )}
                </td>
                <td>{u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}</td>
                <td className="actions">
                  {u.id !== me?.id && (
                    <button className="btn-sm btn-danger" onClick={() => handleDelete(u.id)}>
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Invite Teammate</h2>
            {inviteResult ? (
              <div>
                <p style={{ margin: '10px 0' }}>{inviteResult.message}</p>
                {inviteResult.setupLink && (
                  <div className="form-group">
                    <label>Setup link (valid 72h) — copy and share it securely:</label>
                    <textarea readOnly rows="3" value={inviteResult.setupLink} onFocus={(e) => e.target.select()} />
                  </div>
                )}
                <div className="modal-actions">
                  <button type="button" className="btn-secondary" onClick={closeModal}>Close</button>
                  <button type="button" className="btn-primary" onClick={() => setInviteResult(null)}>
                    Invite another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleInvite}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={invite.fullName}
                    onChange={(e) => setInvite({ ...invite, fullName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={invite.email}
                    onChange={(e) => setInvite({ ...invite, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select value={invite.role} onChange={(e) => setInvite({ ...invite, role: e.target.value })}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-secondary" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="btn-primary" disabled={inviting}>
                    {inviting ? 'Inviting...' : 'Send Invitation'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
