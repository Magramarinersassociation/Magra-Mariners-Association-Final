import React, { useState, useEffect } from 'react';
import { FaImage, FaRedo } from 'react-icons/fa';
import './SafeImage.css';

/**
 * SafeImage Component
 * Robust multi-candidate path resolver with loading skeleton and fail-proof error fallback.
 */
const SafeImage = ({
  src,
  alt = 'Photo',
  className = '',
  containerClassName = '',
  fallbackText = 'Photo unavailable',
  showRetry = true,
  onClick
}) => {
  const [status, setStatus] = useState('loading'); // 'loading' | 'loaded' | 'error'
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!src || typeof src !== 'string' || !src.trim()) {
      setCandidates([]);
      setStatus('error');
      return;
    }

    const initial = src.trim();
    if (initial.startsWith('http') || initial.startsWith('data:')) {
      setCandidates([initial]);
    } else {
      const fileName = initial.split('/').pop();
      const base = import.meta.env.BASE_URL || './';
      const cleanBase = base.endsWith('/') ? base : `${base}/`;

      const list = [
        initial,
        `${cleanBase}gallery/${fileName}`,
        `./gallery/${fileName}`,
        `gallery/${fileName}`,
        `/gallery/${fileName}`
      ];
      setCandidates([...new Set(list)]);
    }

    setCandidateIndex(0);
    setStatus('loading');
  }, [src, retryCount]);

  const handleLoad = () => {
    setStatus('loaded');
  };

  const handleError = () => {
    if (candidateIndex + 1 < candidates.length) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setStatus('error');
    }
  };

  const handleRetry = (e) => {
    if (e) e.stopPropagation();
    setStatus('loading');
    setCandidateIndex(0);
    setRetryCount((prev) => prev + 1);
  };

  const activeSrc = candidates[candidateIndex] || src;

  if (status === 'error' || !activeSrc) {
    return (
      <div className={`safe-image-container ${containerClassName} image-error-state`} onClick={onClick}>
        <div className="safe-image-fallback">
          <FaImage className="fallback-icon" />
          <span className="fallback-text">{fallbackText}</span>
          {showRetry && retryCount < 3 && (
            <button 
              type="button" 
              className="fallback-retry-btn" 
              onClick={handleRetry}
              title="Retry loading photo"
            >
              <FaRedo className="retry-icon" /> Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`safe-image-container ${containerClassName}`} onClick={onClick}>
      {status === 'loading' && (
        <div className="safe-image-skeleton">
          <div className="skeleton-pulse"></div>
        </div>
      )}
      <img
        key={`${activeSrc}-${retryCount}`}
        src={activeSrc}
        alt={alt}
        className={`safe-image-img ${className} ${status === 'loaded' ? 'image-loaded' : 'image-loading'}`}
        onLoad={handleLoad}
        onError={handleError}
        loading="eager"
      />
    </div>
  );
};

export default SafeImage;
