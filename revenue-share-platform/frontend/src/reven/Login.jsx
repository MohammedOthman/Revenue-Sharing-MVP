import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth';
import { Field, Icon } from './ui';

export default function Login() {
  const { onboard, login } = useAuth();
  const nav = useNavigate();
  const [tab, setTab] = useState('onboard');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [f, setF] = useState({ tenantName: '', email: '', password: '', fullName: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setBusy(true);
    try {
      if (tab === 'onboard') {
        const slug = f.tenantName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'workspace';
        await onboard({ tenantName: f.tenantName, slug: `${slug}-${Math.floor(Date.now() / 1000)}`, email: f.email, password: f.password, fullName: f.fullName, country: 'SA' });
      } else {
        await login({ email: f.email, password: f.password });
      }
      nav('/');
    } catch (e2) {
      setErr(e2.response?.data?.error || 'Something went wrong');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth-card">
        <div className="brand" style={{ padding: '0 0 8px', color: 'var(--ink)' }}>
          <span className="logo"><Icon name="hub" /></span> Reven
        </div>
        <p className="muted" style={{ marginTop: 0, marginBottom: 20 }}>Partner Revenue OS — the claim-centric PRM.</p>
        <div className="tabs">
          <button type="button" className={tab === 'onboard' ? 'active' : ''} onClick={() => setTab('onboard')}>Create workspace</button>
          <button type="button" className={tab === 'login' ? 'active' : ''} onClick={() => setTab('login')}>Sign in</button>
        </div>
        {err && <div className="err">{err}</div>}
        <form onSubmit={submit}>
          {tab === 'onboard' && (
            <>
              <Field label="Company / workspace name"><input value={f.tenantName} onChange={set('tenantName')} required placeholder="Acme Partnerships" /></Field>
              <Field label="Your name"><input value={f.fullName} onChange={set('fullName')} required placeholder="Jane Doe" /></Field>
            </>
          )}
          <Field label="Work email"><input type="email" value={f.email} onChange={set('email')} required placeholder="you@company.com" /></Field>
          <Field label="Password"><input type="password" value={f.password} onChange={set('password')} required placeholder="••••••••" /></Field>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 6 }} disabled={busy}>
            {busy ? 'Please wait…' : tab === 'onboard' ? 'Create workspace' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
