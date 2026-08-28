import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useId, useRef } from 'react';
import { Kicker, humanize } from './kit';

const EASE = [0.22, 1, 0.36, 1];

export function Modal({ open, onClose, title, kicker, children, footer, wide = false }) {
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onCloseRef.current();
    };
    document.addEventListener('keydown', handleKeyDown);
    requestAnimationFrame(() => {
      const firstControl = dialogRef.current?.querySelector('input, select, textarea, button');
      (firstControl || dialogRef.current)?.focus();
    });
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal__scrim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className={`modal ${wide ? 'modal--wide' : ''}`}
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ type: 'spring', stiffness: 340, damping: 34 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            ref={dialogRef}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal__head">
              <div className="cellstack">
                {kicker && <Kicker>{kicker}</Kicker>}
                <h2 className="modal__title serif" id={titleId}>{title}</h2>
              </div>
              <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
                ✕
              </button>
            </div>
            <div className="modal__body">{children}</div>
            {footer && <div className="modal__foot">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function FormGrid({ children }) {
  return <div className="formgrid">{children}</div>;
}

export function FormField({ label, required, children, full }) {
  return (
    <label className={`ffield ${full ? 'ffield--full' : ''}`}>
      <span className="ffield__label">
        {label}
        {required && <span className="ffield__req"> *</span>}
      </span>
      {children}
    </label>
  );
}

export function TextInput(props) {
  return <input className="rv-field" {...props} />;
}
export function NumberInput(props) {
  return <input type="number" className="rv-field" {...props} />;
}
export function DateInput(props) {
  return <input type="date" className="rv-field" {...props} />;
}
export function Textarea(props) {
  return <textarea className="rv-field" rows={3} {...props} />;
}
export function Select({ options = [], placeholder, ...props }) {
  return (
    <select className="rv-field rv-select" {...props}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) =>
        typeof o === 'string' ? (
          <option key={o} value={o}>
            {humanize(o)}
          </option>
        ) : (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        )
      )}
    </select>
  );
}

export function FormError({ children }) {
  return children ? (
    <div className="formerror" role="alert">
      {children}
    </div>
  ) : null;
}
