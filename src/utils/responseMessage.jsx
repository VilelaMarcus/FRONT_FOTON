import React from 'react';

const ResponseMessage = ({ text }) => {
  const messageStyle = {
    position: 'fixed',
    top: '50%',
    left: '60%',
    transform: 'translate(-50%, -50%)',    
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    color: 'black',
    padding: '20px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    zIndex: 100,
  };

  console.log('chama funcao')

  return (
    <div style={messageStyle}>
      {text}
    </div>
  );
};

export default ResponseMessage;
