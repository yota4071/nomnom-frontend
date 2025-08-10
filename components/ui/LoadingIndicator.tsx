// components/ui/LoadingIndicator.tsx

type LoadingIndicatorProps = {
  message?: string;
};

export default function LoadingIndicator({ 
  message = 'データを読み込み中...' 
}: LoadingIndicatorProps) {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
      <p className="loading-message">{message}</p>
      
      <style jsx>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 1rem;
          text-align: center;
        }
        
        .loading-spinner {
          margin-bottom: 1rem;
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f4f6;
          border-top: 4px solid var(--primary-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        .loading-message {
          color: var(--text-light);
          font-size: 0.875rem;
          margin: 0;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 480px) {
          .loading-container {
            padding: 2rem 1rem;
          }
          
          .spinner {
            width: 32px;
            height: 32px;
            border-width: 3px;
          }
          
          .loading-message {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}