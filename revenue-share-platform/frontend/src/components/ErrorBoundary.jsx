import React from 'react';
import { Wordmark } from './brand/Brandmark';
import { Button } from './ui/kit';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    console.error('Reven interface failure', error, info);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="entry">
        <header className="entry__top"><Wordmark /></header>
        <main className="entry__stage">
          <section className="entry__lead">
            <h1 className="entry__headline serif">This view could not be opened.</h1>
            <p className="entry__sub">
              Your data has not been changed. Reload the application to retry the request.
            </p>
            <Button variant="primary" onClick={() => window.location.reload()}>Reload Reven</Button>
          </section>
        </main>
      </div>
    );
  }
}
