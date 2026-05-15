import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';

const PLACEHOLDER_REPLIES = [
  "Bonne question ! Je suis encore en cours de configuration… mais bientôt je pourrai vraiment t'aider 🦗",
  "Je retiens ça ! Pour l'instant je suis en mode veille, mais mon vrai moi arrive bientôt.",
  "Hmm, laisse-moi réfléchir… (je fais semblant, je ne suis pas encore connecté 😅)",
  "Noté. Quand j'aurai accès à mes données, je te donnerai une vraie réponse !",
];

let replyIdx = 0;
function nextReply() {
  const r = PLACEHOLDER_REPLIES[replyIdx % PLACEHOLDER_REPLIES.length];
  replyIdx++;
  return r;
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '10px 14px' }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{ width: 6, height: 6, borderRadius: '50%', background: '#7C3AED' }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

export default function Jiminy() {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState([
    { id: 0, from: 'jiminy', text: "Salut ! Je suis Jiminy, ton assistant Rise 🦗 Je ne suis pas encore connecté à mon cerveau, mais pose-moi quand même une question !" },
  ]);
  const [input, setInput]     = useState('');
  const [typing, setTyping]   = useState(false);
  const bottomRef             = useRef(null);
  const inputRef              = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  function send() {
    const text = input.trim();
    if (!text) return;
    setInput('');

    const userMsg = { id: Date.now(), from: 'user', text };
    setMessages((m) => [...m, userMsg]);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: Date.now() + 1, from: 'jiminy', text: nextReply() }]);
    }, 1400 + Math.random() * 600);
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  const widget = (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 300, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              width: 340,
              height: 480,
              background: '#120D24',
              border: '1px solid rgba(124,58,237,0.3)',
              borderRadius: 20,
              boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.1)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              flexShrink: 0,
              padding: '14px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'rgba(26,21,48,0.8)',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', flexShrink: 0,
              }}>
                🦗
              </div>
              <div style={{ flex: 1 }}>
                <p className="font-fraunces" style={{ margin: 0, fontSize: '0.95rem', fontWeight: 500, color: '#F5F3FF' }}>
                  Jiminy
                </p>
                <p className="font-inter" style={{ margin: 0, fontSize: '0.7rem', color: '#7C3AED', fontWeight: 500 }}>
                  Ton assistant Rise
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: 'rgba(255,255,255,0.06)', border: 'none',
                  borderRadius: 8, padding: 6, cursor: 'pointer',
                  color: '#9CA3C4', display: 'flex', alignItems: 'center',
                }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  {msg.from === 'jiminy' && (
                    <div style={{
                      width: 26, height: 26, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.7rem', flexShrink: 0, marginRight: 7, marginTop: 2,
                    }}>
                      🦗
                    </div>
                  )}
                  <div
                    className="font-inter"
                    style={{
                      maxWidth: '75%',
                      padding: '9px 13px',
                      borderRadius: msg.from === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                      background: msg.from === 'user' ? '#7C3AED' : 'rgba(255,255,255,0.07)',
                      color: '#F5F3FF',
                      fontSize: '0.82rem',
                      lineHeight: 1.55,
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', flexShrink: 0, marginRight: 7,
                  }}>
                    🦗
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.07)',
                    borderRadius: '14px 14px 14px 4px',
                  }}>
                    <TypingIndicator />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{
              flexShrink: 0,
              padding: '10px 12px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', gap: 8, alignItems: 'flex-end',
            }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Pose une question à Jiminy…"
                rows={1}
                className="font-inter"
                style={{
                  flex: 1, resize: 'none', background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10,
                  padding: '9px 12px', color: '#F5F3FF', fontSize: '0.82rem',
                  outline: 'none', lineHeight: 1.5, fontFamily: 'Inter, sans-serif',
                  maxHeight: 80, overflowY: 'auto',
                }}
                onFocus={(e) => e.target.style.borderColor = '#7C3AED'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
              <button
                onClick={send}
                disabled={!input.trim()}
                style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: input.trim() ? '#7C3AED' : 'rgba(124,58,237,0.25)',
                  border: 'none', cursor: input.trim() ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s',
                }}
              >
                <Send size={15} color={input.trim() ? '#fff' : 'rgba(255,255,255,0.3)'} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '0 20px 0 6px',
          height: 52, borderRadius: 999,
          background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
          border: 'none', cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(124,58,237,0.5), 0 0 0 4px rgba(124,58,237,0.15)',
          position: 'relative',
        }}
      >
        {/* Pulse ring */}
        {!open && (
          <motion.div
            style={{
              position: 'absolute', inset: -4, borderRadius: 999,
              border: '2px solid rgba(167,139,250,0.5)',
              pointerEvents: 'none',
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'rgba(255,255,255,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.3rem', flexShrink: 0,
        }}>
          {open ? '×' : '🦗'}
        </div>
        <span className="font-inter" style={{ fontSize: '0.88rem', fontWeight: 600, color: '#fff', letterSpacing: '0.01em' }}>
          {open ? 'Fermer' : 'Jiminy'}
        </span>
      </motion.button>
    </div>
  );

  return createPortal(widget, document.body);
}
