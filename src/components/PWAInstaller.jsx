import { useState, useEffect } from 'react';

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="pwa-install-banner">
      <p>¿Instalar SIRELAB en tu dispositivo?</p>
      <button onClick={handleInstall}>Instalar</button>
      <button onClick={() => setIsVisible(false)}>Cerrar</button>
    </div>
  );
}