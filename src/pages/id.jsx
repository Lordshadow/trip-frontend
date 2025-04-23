import React from 'react';
import Booking from './booking';

const ParentComponent = () => {
  const roomId = 1; 

  return <Booking roomId={roomId} />;
};

export default ParentComponent;
