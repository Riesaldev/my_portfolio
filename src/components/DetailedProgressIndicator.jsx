import { useI18n } from './I18nProvider';

/**
 * Componente para mostrar el progreso detallado de carga de recursos
 * @param {Object} resourcesLoaded - Estado de carga de cada tipo de recurso
 * @param {number} progress - Progreso total (0-100)
 */
export default function DetailedProgressIndicator({ resourcesLoaded, progress }) {
  const { t } = useI18n();

  const resourceTypes = [
    { key: 'images', label: 'Imágenes', icon: '🖼️' },
    { key: 'audio', label: 'Audio', icon: '🎵' },
    { key: 'fonts', label: 'Fuentes', icon: '🔤' },
    { key: 'critical', label: 'Recursos críticos', icon: '⚡' },
    { key: 'locales', label: 'Traducciones', icon: '🌐' }
  ];

  return (
    <div className="detailed-progress-container">
      {/* Progreso general */}
      <div className="general-progress">
        <div className="progress-circle">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="35"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="6"
            />
            <circle
              cx="40"
              cy="40"
              r="35"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${(progress / 100) * 220} 220`}
              transform="rotate(-90 40 40)"
              style={{ transition: 'stroke-dasharray 0.5s ease' }}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5e04f0" />
                <stop offset="100%" stopColor="#f801a6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="progress-text">
            <span className="progress-percentage">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      {/* Progreso por tipo de recurso */}
      <div className="resource-progress-list">
        {resourceTypes.map(({ key, label, icon }) => (
          <div key={key} className="resource-item">
            <div className="resource-icon">{icon}</div>
            <div className="resource-info">
              <span className="resource-label">{label}</span>
              <div className="resource-status">
                {resourcesLoaded[key] ? (
                  <div className="status-complete">
                    <span className="checkmark">✓</span>
                    <span>Completado</span>
                  </div>
                ) : (
                  <div className="status-loading">
                    <div className="loading-spinner"></div>
                    <span>Cargando...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .detailed-progress-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          padding: 20px;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }

        .general-progress {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .progress-circle {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .progress-text {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .progress-percentage {
          font-size: 1.2rem;
          font-weight: bold;
          color: #ffffff;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .resource-progress-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          max-width: 300px;
        }

        .resource-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .resource-icon {
          font-size: 1.2rem;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .resource-info {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .resource-label {
          font-size: 0.9rem;
          color: #ffffff;
          font-weight: 500;
        }

        .resource-status {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .status-complete {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #4ade80;
          font-size: 0.8rem;
        }

        .checkmark {
          font-weight: bold;
          background: #4ade80;
          color: #000;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
        }

        .status-loading {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #fbbf24;
          font-size: 0.8rem;
        }

        .loading-spinner {
          width: 12px;
          height: 12px;
          border: 2px solid rgba(251, 191, 36, 0.3);
          border-top: 2px solid #fbbf24;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 480px) {
          .detailed-progress-container {
            padding: 15px;
          }
          
          .resource-progress-list {
            max-width: 280px;
          }
          
          .resource-item {
            padding: 6px 10px;
          }
          
          .resource-label {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
