import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const DefaultDashboard = () => {
  const token = useSelector((state) => state.token);

  useEffect(() => {
    console.log('Token:', token);
  }, [token]);

  return (
    <>  
      Dashboard
    </>
  );
};

export default DefaultDashboard;