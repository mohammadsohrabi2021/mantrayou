import React from 'react';

const loaderContainerStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
};

const loaderStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const dotStyles = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: '#000',
  margin: '0 2px',
  animation: 'dotFlashing 1s infinite linear alternate',
};

const keyframes = `
  @keyframes dotFlashing {
    0% {
      background-color: #000;
    }
    50%,
    100% {
      background-color: #FFF;
    }
  }
`;

const Loader = () => {
  return (
    <div style={loaderContainerStyles}>
      <style>{keyframes}</style>
      <div style={loaderStyles}>
        <span style={{ ...dotStyles, animationDelay: '0s' }}></span>
        <span style={{ ...dotStyles, animationDelay: '0.2s' }}></span>
        <span style={{ ...dotStyles, animationDelay: '0.4s' }}></span>
      </div>
    </div>
  );
};

export default Loader;
