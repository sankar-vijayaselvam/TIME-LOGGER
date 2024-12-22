import React from 'react';
import Navbar from '../../Component/Navbar';
import useAuth from '../../Hooks/auth';

export default function Home() {
  useAuth()
  return (
    <>
    <div>
      <Navbar/>
        
    </div>
    </>
  );
}
