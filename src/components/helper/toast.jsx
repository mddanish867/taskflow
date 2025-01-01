import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';


const VARIANTS = {
  success: {
    bg: 'bg-green-100',
    border: 'border-green-400',
    text: 'text-green-800',
    icon: 'text-green-500',
    progress: 'bg-green-500',
    Icon: CheckCircle
  },
  error: {
    bg: 'bg-red-100',
    border: 'border-red-400',
    text: 'text-red-800',
    icon: 'text-red-500',
    progress: 'bg-red-500',
    Icon: XCircle
  },
  warning: {
    bg: 'bg-yellow-100',
    border: 'border-yellow-400',
    text: 'text-yellow-800',
    icon: 'text-yellow-500',
    progress: 'bg-yellow-500',
    Icon: AlertTriangle
  },
  info: {
    bg: 'bg-blue-100',
    border: 'border-blue-400',
    text: 'text-blue-800',
    icon: 'text-blue-500',
    progress: 'bg-blue-500',
    Icon: Info
  }
};

const Toast = ({ message, variant = 'success', onClose, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  const style = VARIANTS[variant];

  useEffect(() => {
    let startTime = Date.now();
    let animationFrameId;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const remaining = duration - elapsed;
      const progressPercent = (remaining / duration) * 100;

      if (progressPercent <= 0) {
        handleClose();
      } else {
        setProgress(progressPercent);
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Match this with animation duration
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`relative flex items-center w-full max-w-sm p-4 rounded-lg shadow-lg border 
        ${style.bg} ${style.border} animate-slide-in`}
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0">
        <style.Icon className={`w-5 h-5 ${style.icon}`} />
      </div>
      <div className={`ml-3 text-sm font-medium ${style.text}`}>
        {message}
      </div>
      <button
        type="button"
        className={`ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 
          inline-flex h-8 w-8 ${style.text} hover:bg-gray-200`}
        onClick={handleClose}
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>
      
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200 rounded-b-lg overflow-hidden">
        <div 
          className={`h-full ${style.progress} transition-all ease-linear duration-100`}
          style={{ 
            width: `${progress}%`,
            transition: `width ${duration}ms linear`
          }}
        />
      </div>
    </div>
  );
};

// Toast container setup
let toastContainer;
let root;

if (typeof window !== 'undefined') {
  toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed bottom-4 right-4 space-y-4 z-50';
    document.body.appendChild(toastContainer);
    root = createRoot(toastContainer);
  }
}

const toasts = new Set();

const showToast = (variant, message, duration = 3000) => {
  const toastId = Date.now();
  
  const removeToast = () => {
    toasts.delete(toastId);
    renderToasts();
  };

  const toastProps = {
    key: toastId,
    message,
    variant,
    onClose: removeToast,
    duration,
  };

  toasts.add(toastProps);
  renderToasts();
};

const renderToasts = () => {
  if (root) {
    root.render(
      <div className="space-y-4">
        {Array.from(toasts).map((props) => (
          <Toast {...props} />
        ))}
      </div>
    );
  }
};

export const toast = {
  success: (message) => showToast('success', message),
  error: (message) => showToast('error', message),
  warning: (message) => showToast('warning', message),
  info: (message) => showToast('info', message)
};