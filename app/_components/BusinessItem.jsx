"use client";
import React from 'react';
import Image from 'next/image';

const BusinessItem = ({ business }) => {
  return (
    <div>
      <Image
        src={business?.banner?.url}
        alt={business?.name || 'Restaurant Image'}  // Ensure alt text is provided
        height={320}
        width={400}
        className='h-[230px] rounded-xl object-cover'
      />
      <div>
        <h2 className="font-bold text-2xl">{business.name}</h2>
      </div>
    </div>
  );
};

export default BusinessItem;
