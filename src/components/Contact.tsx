import { useState, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { profile } from '../data';
import { useLang } from '../i18n';
import Icon from './Icon';
import { Reveal, Section } from './Reveal';

// EmailJS IDs carried over from the previous site (public by design).
const EMAILJS = { service: 'sid_0407', template: 'template_4276ye9', publicKey: 'u4yBOVMQWrRcYqBTd' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Only the state is stored; the message text comes from the current language.
type Status = 'idle' | 'sending' | 'success' | 'invalid' | 'error';
type Field = 'name' | 'email' | 'message';

export default function Contact() {
  const { t } = useLang();
  const c = t.contact;
  const [status, setStatus] = useState<Status>('idle');
  const [invalid, setInvalid] = useState<Partial<Record<Field, boolean>>>({});
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`; // clipboard blocked: open the mail app instead
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    const bad = { name: !name, email: !EMAIL_RE.test(email), message: !message };
    setInvalid(bad);
    if (bad.name || bad.email || bad.message) {
      setStatus('invalid');
      return;
    }

    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS.service,
        EMAILJS.template,
        { from_name: name, from_email: email, reply_to: email, to_email: profile.email, message },
        { publicKey: EMAILJS.publicKey },
      );
      form.reset();
      setStatus('success');
    } catch (err) {
      console.error('EmailJS send failed', err);
      setStatus('error');
    }
  }

  const clear = (f: Field) => invalid[f] && setInvalid((v) => ({ ...v, [f]: false }));
  const statusText =
    status === 'invalid' ? c.invalid : status === 'success' ? c.success : status === 'error' ? `${c.error} ${profile.email}` : '';

  const field = (name: Field, label: string, input: React.ReactNode) => (
    <label className={`field${invalid[name] ? ' is-invalid' : ''}`}>
      <span className="field-label meta">{label}</span>
      {input}
    </label>
  );

  return (
    <Section id="contact" label={c.label}>
      <Reveal className="col-full contact-head">
        <h3 className="contact-title">{c.title}</h3>
        <p className="contact-intro">{c.intro}</p>
      </Reveal>

      <Reveal className="channel channel-email">
        <span className="channel-icon">
          <Icon name="mail" size={20} />
        </span>
        <div className="channel-body">
          <p className="meta">{c.email}</p>
          <a href={`mailto:${profile.email}`} className="channel-value">
            {profile.email}
          </a>
        </div>
        <div className="channel-actions">
          <button type="button" className="chip-btn" onClick={copyEmail} aria-live="polite">
            <Icon name={copied ? 'check' : 'copy'} size={16} />
            {copied ? c.copied : c.copy}
          </button>
        </div>
      </Reveal>

      <Reveal className="channel channel-phone" delay={0.05}>
        <span className="channel-icon">
          <Icon name="phone" size={20} />
        </span>
        <div className="channel-body">
          <p className="meta">{c.phone}</p>
          <a href={profile.phoneHref} className="channel-value">
            {profile.phone}
          </a>
        </div>
        <div className="channel-actions">
          <a href={profile.phoneHref} className="chip-btn">
            {c.call}
          </a>
          <a href={profile.whatsapp} target="_blank" rel="noopener" className="chip-btn">
            <Icon name="whatsapp" size={16} />
            {c.whatsapp}
          </a>
        </div>
      </Reveal>

      {profile.socials.map((s, i) => (
        <Reveal key={s.label} className="col-third" delay={0.05 * i}>
          <a href={s.href} target="_blank" rel="noopener" className="channel channel-link">
            <span className="channel-icon">
              <Icon name={s.icon} size={20} mono />
            </span>
            <span className="channel-body">
              <span className="meta">{s.label}</span>
              <span className="channel-value">{s.handle}</span>
            </span>
            <Icon name="arrow" size={18} />
          </a>
        </Reveal>
      ))}

      <Reveal className="col-left form-intro">
        <h3 className="row-title">{c.formTitle}</h3>
        <p className="form-note">{c.formNote}</p>
      </Reveal>

      <Reveal className="col-right" delay={0.08}>
        <form className="form" onSubmit={onSubmit} noValidate>
          <div className="form-pair">
            {field(
              'name',
              c.name,
              <input name="name" autoComplete="name" maxLength={100} aria-invalid={!!invalid.name} onInput={() => clear('name')} />,
            )}
            {field(
              'email',
              c.email,
              <input
                name="email"
                type="email"
                autoComplete="email"
                maxLength={150}
                aria-invalid={!!invalid.email}
                onInput={() => clear('email')}
              />,
            )}
          </div>
          {field(
            'message',
            c.message,
            <textarea name="message" rows={6} maxLength={3000} aria-invalid={!!invalid.message} onInput={() => clear('message')} />,
          )}
          <div className="form-foot">
            <button type="submit" className="btn" disabled={status === 'sending'}>
              {status === 'sending' ? c.sending : c.send}
            </button>
            <p
              className={`form-status${status === 'success' ? ' is-success' : status === 'invalid' || status === 'error' ? ' is-error' : ''}`}
              role="status"
              aria-live="polite"
            >
              {statusText}
            </p>
          </div>
        </form>
      </Reveal>
    </Section>
  );
}
