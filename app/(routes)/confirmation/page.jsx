"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Confirmation = () => {
  const [seconds, setSeconds] = useState(10);
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          router.replace('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000); 
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className='flex flex-col items-center justify-center '>
      <div className='font-bold text-2xl mt-10'>Confirmation Page</div>
      <h2 className='text-lg mt-5'>Redirecting to home page in {seconds} seconds...</h2>
    </div>
  );
};

export default Confirmation;
