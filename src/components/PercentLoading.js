import React, { useState, useEffect } from 'react';
import { Progress } from 'antd';

function LoadingBar({ isLoading }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;

    if (isLoading) {
      setProgress(0); 
      const interval = 2000 / 100; 
      timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer);
            return 100;
          }
          return Math.min(oldProgress + 1, 100);
        });
      }, interval);
    } else {
      setProgress(0); // Reset progress when loading stops
    }

    return () => {
      clearInterval(timer);
    };
  }, [isLoading]);

  return <Progress percent={progress} strokeColor="#1890ff" />;
}

export default LoadingBar;
