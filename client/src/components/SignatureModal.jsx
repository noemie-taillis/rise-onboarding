import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check } from 'lucide-react';
import { useProfile } from '../context/UserProfileContext';

function buildSignatureHtml(profile) {
  const name     = `${profile.firstName} ${profile.lastName}`;
  const title    = profile.jobTitle || 'Rise Family Office';
  const photoRow = profile.photoBase64
    ? `<td style="padding-right:18px;vertical-align:top;">
        <img src="${profile.photoBase64}" width="64" height="64"
          style="border-radius:50%;width:64px;height:64px;object-fit:cover;display:block;" />
      </td>`
    : '';

  return `<table cellpadding="0" cellspacing="0" border="0"
  style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#333;border-collapse:collapse;">
  <tr>
    ${photoRow}
    <td style="vertical-align:top;${profile.photoBase64 ? 'padding-left:0;' : ''}">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding-bottom:2px;">
            <strong style="font-size:15px;color:#1A0F2E;letter-spacing:-0.3px;">${name}</strong>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom:1px;">
            <span style="color:#7C3AED;font-size:13px;font-weight:600;">${title}</span>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom:8px;">
            <span style="color:#666;font-size:12px;">Rise Family Office</span>
          </td>
        </tr>
        <tr>
          <td>
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="border-left:3px solid #7C3AED;padding-left:10px;">
                  <span style="color:#999;font-size:11px;">Lisbonne, Portugal</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

export default function SignatureModal({ open, onClose }) {
  const { profile } = useProfile();
  const [copied, setCopied] = useState(false);

  const html = buildSignatureHtml(profile);

  async function copyHtml() {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = html;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  const content = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="sig-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', zIndex: 200 }}
          />

          <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 201, pointerEvents: 'none' }}>
            <motion.div
              key="sig-panel"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%', maxWidth: 520,
                background: '#1A1530',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 20, padding: '32px',
                boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
                pointerEvents: 'all',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
                <h2 className="font-fraunces" style={{ margin: 0, fontSize: '1.8rem', fontWeight: 500, color: '#F5F3FF', letterSpacing: '-0.02em' }}>
                  Ma signature
                </h2>
                <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 6, cursor: 'pointer', color: '#9CA3C4', display: 'flex', alignItems: 'center' }}>
                  <X size={16} />
                </button>
              </div>
              <p className="font-inter" style={{ margin: '0 0 24px', fontSize: '0.83rem', color: '#9CA3C4', lineHeight: 1.6 }}>
                Copie le HTML ci-dessous, puis dans Outlook : <strong style={{ color: '#F5F3FF' }}>Fichier → Options → Courrier → Signatures → Nouvelle → onglet HTML</strong>, colle.
              </p>

              {/* Preview */}
              <div style={{ marginBottom: 20 }}>
                <p className="font-inter" style={{ margin: '0 0 8px', fontSize: '0.72rem', fontWeight: 700, color: '#9CA3C4', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Aperçu
                </p>
                <div
                  style={{ background: '#fff', borderRadius: 10, padding: '20px 24px', border: '1px solid rgba(255,255,255,0.08)' }}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </div>

              {/* HTML brut */}
              <div style={{ marginBottom: 24 }}>
                <p className="font-inter" style={{ margin: '0 0 8px', fontSize: '0.72rem', fontWeight: 700, color: '#9CA3C4', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Code HTML
                </p>
                <div style={{
                  background: 'rgba(0,0,0,0.3)', borderRadius: 10,
                  padding: '12px 14px', maxHeight: 120, overflowY: 'auto',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <pre className="font-inter" style={{ margin: 0, fontSize: '0.7rem', color: '#9CA3C4', whiteSpace: 'pre-wrap', wordBreak: 'break-all', lineHeight: 1.5 }}>
                    {html}
                  </pre>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button onClick={onClose} className="font-inter" style={{ padding: '10px 20px', borderRadius: 10, background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: '#9CA3C4', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}>
                  Fermer
                </button>
                <motion.button
                  onClick={copyHtml}
                  whileTap={{ scale: 0.97 }}
                  className="font-inter"
                  style={{
                    padding: '10px 20px', borderRadius: 10,
                    background: copied ? '#10B981' : '#7C3AED',
                    border: 'none', color: '#fff', cursor: 'pointer',
                    fontSize: '0.875rem', fontWeight: 600,
                    display: 'flex', alignItems: 'center', gap: 7,
                    transition: 'background 0.3s',
                  }}
                >
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  {copied ? 'Copié !' : 'Copier le HTML'}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}
