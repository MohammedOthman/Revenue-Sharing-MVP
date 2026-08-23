import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { Wordmark } from '../components/brand/Brandmark';
import { Button, Money, StatusTag, Metric, Kicker } from '../components/ui/kit';
import '../styles/Login.css';

/* A representative slice of the product, shown on the door — the attribution
   ledger Reven exists to keep. Illustrative, not a logged-in user's data. */
const LEDGER = [
  { partner: 'Najd Cloud', customer: 'Riyad Bank', pct: 100, amount: 84200, status: 'eligible', verified: true },
  { partner: 'Gulf Systems', customer: 'Almarai', pct: 60, amount: 41800, status: 'under_review' },
  { partner: 'Dar Analytics', customer: 'stc pay', pct: 35, amount: 22750, status: 'protected' },
];

const EASE = [0.22, 1, 0.36, 1];

function ClaimTape() {
  return (
    <motion.div
      className="tape rv-panel"
      initial={{ y: 14 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="tape__head">
        <Kicker>Attribution of record</Kicker>
        <span className="tape__period mono">2026 · Q3</span>
      </div>

      <div className="tape__rows">
        {LEDGER.map((r, i) => (
          <motion.div
            className="tape__row"
            key={r.partner}
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 + i * 0.09, ease: EASE }}
          >
            <div className="tape__who">
              <span className="tape__partner">{r.partner}</span>
              <span className="tape__cust">→ {r.customer}</span>
            </div>
            <div className="tape__pct mono tnum">{r.pct}%</div>
            <div className="tape__amt">
              <Money amount={r.amount} currency="SAR" brass={r.verified} />
            </div>
            <StatusTag status={r.status} />
          </motion.div>
        ))}
      </div>

      <div className="tape__foot">
        <span className="label">Eligible · this period</span>
        <span className="tape__total">
          <span className="rv-money__ccy">SAR</span>
          <Metric
            value={148750}
            format={(n) => Math.round(n).toLocaleString()}
            className="tape__totalnum"
          />
        </span>
      </div>
    </motion.div>
  );
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(
        err?.message ||
          'Could not sign you in. Check your details and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="entry">
      <header className="entry__top">
        <Wordmark />
        <span className="entry__meta label">Capture · Settle · Orchestrate</span>
      </header>

      <main className="entry__stage">
        <motion.section
          className="entry__lead"
          initial={{ y: 12 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <h1 className="entry__headline serif">
            Partner revenue,
            <br />
            <em>on the record.</em>
          </h1>
          <p className="entry__sub">
            The system of record and control layer for partner-sourced revenue.
            Register a claim, attribute it defensibly, see eligibility explained —
            and make partner economics finance can audit.
          </p>

          <form className="entry__form" onSubmit={submit} noValidate>
            {error && (
              <div className="entry__error" role="alert">
                {error}
              </div>
            )}
            <div className="entry__field">
              <label htmlFor="email" className="rv-field-label">
                Work email
              </label>
              <input
                id="email"
                className="rv-field"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
              />
            </div>
            <div className="entry__field">
              <label htmlFor="password" className="rv-field-label">
                Password
              </label>
              <input
                id="password"
                className="rv-field"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <div className="entry__actions">
              <Button type="submit" variant="primary" arrow disabled={loading}>
                {loading ? 'Signing in…' : 'Enter Reven'}
              </Button>
              <span className="entry__sso">Access is managed by your Reven administrator.</span>
            </div>
          </form>
        </motion.section>

        <aside className="entry__artifact">
          <ClaimTape />
        </aside>
      </main>

      <footer className="entry__foot">
        <span className="label">Reven — Partner Revenue OS</span>
        <span className="label entry__foot-right">Built for the GCC · Arabic-ready</span>
      </footer>
    </div>
  );
}
