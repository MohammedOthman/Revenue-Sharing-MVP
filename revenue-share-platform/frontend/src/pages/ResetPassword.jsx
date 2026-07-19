import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';
import { getApiError } from '../services/api';
import '../styles/Login.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') || '';
  const isWelcome = searchParams.get('welcome') === '1';

  const [tokenState, setTokenState] = useState('checking'); // checking | valid | invalid
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setTokenState('invalid');
      return;
    }
    authService
      .checkResetToken(token)
      .then((data) => setTokenState(data.valid ? 'valid' : 'invalid'))
      .catch(() => setTokenState('invalid'));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await authService.resetPassword(token, password);
      navigate('/login', { state: { message: 'Password set. Log in with your new password.' } });
    } catch (err) {
      setError(getApiError(err, 'Failed to set password'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>{isWelcome ? 'Welcome to Reven' : 'Set a new password'}</h1>
        <p className="subtitle">{isWelcome ? 'Choose a password to activate your account' : 'Choose a new password for your account'}</p>

        {tokenState === 'checking' && <p>Checking your link...</p>}

        {tokenState === 'invalid' && (
          <div>
            <div className="error-message">This link is invalid or has expired.</div>
            <p style={{ margin: '14px 0' }}>
              <Link to="/forgot-password">Request a new reset link</Link>
            </p>
          </div>
        )}

        {tokenState === 'valid' && (
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label htmlFor="password">New password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm">Confirm password</label>
              <input
                type="password"
                id="confirm"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat the password"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Saving...' : isWelcome ? 'Activate account' : 'Set password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
