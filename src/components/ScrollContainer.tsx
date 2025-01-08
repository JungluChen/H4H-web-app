import React, { ReactNode } from 'react';

interface ScrollContainerProps {
  children: ReactNode;
  withTopBar?: boolean;
  withBottomBar?: boolean;
}

const ScrollContainer = ({ children, withTopBar = true, withBottomBar = true }: ScrollContainerProps) => {
  return (
    <div 
      className="scroll-container"
      style={{
        height: `calc(100vh - ${withTopBar ? '60px' : '0px'} - ${withBottomBar ? '60px' : '0px'})`,
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        padding: '20px',
        paddingBottom: withBottomBar ? '80px' : '20px',
        backgroundColor: '#f5f5f5'
      }}
    >
      {children}
    </div>
  );
};

export default ScrollContainer; 