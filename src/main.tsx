
import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import App from './App.tsx';
import Loader from './components/Loader.tsx';
import './index.css';

// Ensure dark mode works with Tailwind
document.documentElement.classList.add('light');

const RootComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (you can remove this in production)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        <App />
      </div>
    </>
  );
};

createRoot(document.getElementById("root")!).render(<RootComponent />);
