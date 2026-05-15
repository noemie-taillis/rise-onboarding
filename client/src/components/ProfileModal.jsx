import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Pencil } from 'lucide-react';
import { useProfile } from '../context/UserProfileContext';

function compressImage(file) {
  return new Promise((resolve, reject) => {
    if (file.size > 5 * 1024 * 1024) {
      reject(new Error('Fichier trop lourd (max 5 Mo)'));
      return;
    }
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const maxW = 400;
      const scale = Math.min(1, maxW / img.width);
      const canvas = document.createElement('canvas');
      canvas.width  = Math.round(img.width  * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Image invalide')); };
    img.src = url;
  });
}

function getInitials(firstName, lastName) {
  return `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase();
}

export default function ProfileModal({ open, onClose }) {
  const { profile, updateProfile } = useProfile();

  const [firstName,   setFirstName]   = useState(profile.firstName);
  const [lastName,    setLastName]    = useState(profile.lastName);
  const [jobTitle,    setJobTitle]    = useState(profile.jobTitle ?? 'COO');
  const [description, setDescription] = useState(profile.description);
  const [photo,       setPhoto]       = useState(profile.photoBase64);
  const [imgError,    setImgError]    = useState('');
  const [isDragging,  setIsDragging]  = useState(false);

  const fileRef = useRef(null);

  // Sync form when profile changes externally or modal reopens
  useEffect(() => {
    if (open) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setJobTitle(profile.jobTitle ?? 'COO');
      setDescription(profile.description);
      setPhoto(profile.photoBase64);
      setImgError('');
    }
  }, [open]);

  const isDirty =
    firstName   !== profile.firstName      ||
    lastName    !== profile.lastName       ||
    jobTitle    !== (profile.jobTitle ?? 'COO') ||
    description !== profile.description   ||
    photo       !== profile.photoBase64;

  function handleClose() {
    if (isDirty && !window.confirm('Tu as des modifications non sauvegardées. Fermer quand même ?')) return;
    onClose();
  }

  async function handleFile(file) {
    if (!file) return;
    setImgError('');
    try {
      const b64 = await compressImage(file);
      setPhoto(b64);
    } catch (e) {
      setImgError(e.message);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith('image/')) handleFile(file);
  }

  function handleSave() {
    updateProfile({ firstName: firstName.trim(), lastName: lastName.trim(), jobTitle: jobTitle.trim(), description, photoBase64: photo });
    onClose();
  }

  const canSave = firstName.trim().length > 0 && lastName.trim().length > 0;

  const content = (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            key="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(6px)',
              zIndex: 200,
            }}
          />

          {/* Centrage via flex — séparé du motion pour éviter le conflit transform */}
          <div
            key="modal-wrapper"
            onClick={handleClose}
            style={{
              position: 'fixed', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '16px',
              zIndex: 201,
              pointerEvents: 'none',
            }}
          >
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 520,
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#1A1530',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 20,
              padding: '32px',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
              pointerEvents: 'all',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
              <h2 className="font-fraunces" style={{ margin: 0, fontSize: '1.8rem', fontWeight: 500, color: '#F5F3FF', letterSpacing: '-0.02em' }}>
                Ton profil
              </h2>
              <button
                onClick={handleClose}
                style={{
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8, padding: 6, cursor: 'pointer', color: '#9CA3C4',
                  display: 'flex', alignItems: 'center', flexShrink: 0,
                }}
              >
                <X size={16} />
              </button>
            </div>
            <p className="font-inter" style={{ margin: '0 0 28px', fontSize: '0.83rem', color: '#9CA3C4', lineHeight: 1.6 }}>
              Ces infos restent locales sur ton navigateur, juste pour personnaliser ton expérience.
            </p>

            {/* Photo upload */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                style={{
                  width: 120, height: 120, borderRadius: '50%',
                  border: `3px solid ${isDragging ? '#7C3AED' : 'rgba(124,58,237,0.5)'}`,
                  background: photo ? 'transparent' : '#7C3AED',
                  overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                  position: 'relative',
                }}
              >
                {photo ? (
                  <img src={photo} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span className="font-fraunces" style={{ fontSize: '2rem', fontWeight: 600, color: '#fff' }}>
                    {getInitials(firstName, lastName)}
                  </span>
                )}
                {/* hover overlay */}
                <div style={{
                  position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: 0, transition: 'opacity 0.2s',
                }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                >
                  <Pencil size={22} color="#fff" />
                </div>
              </div>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => handleFile(e.target.files?.[0])}
              />

              {photo && (
                <button
                  onClick={() => setPhoto(null)}
                  className="font-inter"
                  style={{
                    marginTop: 8, background: 'none', border: 'none',
                    color: '#9CA3C4', cursor: 'pointer', fontSize: '0.78rem',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B6B'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3C4'}
                >
                  ✕ Supprimer la photo
                </button>
              )}
              {!photo && (
                <p className="font-inter" style={{ marginTop: 8, fontSize: '0.75rem', color: '#9CA3C4', textAlign: 'center' }}>
                  Clique ou glisse une photo (max 5 Mo)
                </p>
              )}
              {imgError && (
                <p className="font-inter" style={{ marginTop: 6, fontSize: '0.75rem', color: '#FF6B6B' }}>{imgError}</p>
              )}
            </div>

            {/* Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
              {/* Prénom */}
              <div>
                <label className="font-inter" style={{ display: 'block', fontSize: '0.8rem', color: '#9CA3C4', marginBottom: 6 }}>
                  Prénom
                </label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="font-inter"
                  style={{
                    width: '100%', padding: '10px 14px', boxSizing: 'border-box',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10, color: '#F5F3FF', fontSize: '0.9rem',
                    outline: 'none', transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#7C3AED'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              {/* Nom */}
              <div>
                <label className="font-inter" style={{ display: 'block', fontSize: '0.8rem', color: '#9CA3C4', marginBottom: 6 }}>
                  Nom
                </label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="font-inter"
                  style={{
                    width: '100%', padding: '10px 14px', boxSizing: 'border-box',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10, color: '#F5F3FF', fontSize: '0.9rem',
                    outline: 'none', transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#7C3AED'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              {/* Fonction */}
              <div>
                <label className="font-inter" style={{ display: 'block', fontSize: '0.8rem', color: '#9CA3C4', marginBottom: 6 }}>
                  Fonction
                </label>
                <input
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="font-inter"
                  style={{
                    width: '100%', padding: '10px 14px', boxSizing: 'border-box',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10, color: '#F5F3FF', fontSize: '0.9rem',
                    outline: 'none', transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#7C3AED'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              {/* Description */}
              <div>
                <label className="font-inter" style={{ display: 'block', fontSize: '0.8rem', color: '#9CA3C4', marginBottom: 6 }}>
                  Quelques mots sur toi <span style={{ opacity: 0.6 }}>(optionnel)</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value.slice(0, 200))}
                  rows={3}
                  placeholder="Ex. COO chez Rise, fan de Saint-Malo et de produits bien faits."
                  className="font-inter"
                  style={{
                    width: '100%', padding: '10px 14px', boxSizing: 'border-box',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10, color: '#F5F3FF', fontSize: '0.9rem',
                    outline: 'none', resize: 'none', lineHeight: 1.6,
                    transition: 'border-color 0.2s',
                    fontFamily: 'Inter, sans-serif',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#7C3AED'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <p className="font-inter" style={{ margin: '4px 0 0', textAlign: 'right', fontSize: '0.72rem', color: description.length >= 180 ? '#FFB088' : '#9CA3C4' }}>
                  {description.length} / 200
                </p>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button
                onClick={handleClose}
                className="font-inter"
                style={{
                  padding: '10px 20px', borderRadius: 10,
                  background: 'none', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#9CA3C4', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500,
                }}
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                disabled={!canSave}
                className="font-inter"
                style={{
                  padding: '10px 24px', borderRadius: 10,
                  background: canSave ? '#7C3AED' : 'rgba(124,58,237,0.3)',
                  border: 'none', color: canSave ? '#fff' : 'rgba(255,255,255,0.4)',
                  cursor: canSave ? 'pointer' : 'not-allowed',
                  fontSize: '0.875rem', fontWeight: 600,
                  transition: 'background 0.2s',
                }}
              >
                Enregistrer
              </button>
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}
