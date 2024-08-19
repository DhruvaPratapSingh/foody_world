"use client";
import React from 'react';
import Image from 'next/image';

const BusinessItem = ({ business }) => {
  return (
    <div className='p-3 
    border-2 border-transparent
    hover:border-2 hover:border-primary rounded-xl cursor-pointer hover:bg-orange-50'>
      <Image
        src={business?.banner?.url}
        alt={business?.name || 'Restaurant Image'}  // Ensure alt text is provided
        height={130}
        width={500}
        className='h-[130px] rounded-xl object-cover'
      />
      <div className='mt-2'>
        <h2 className="font-bold text-2xl">{business.name}</h2>
        <div className='flex justify-between items-center mr-3'>
          <div className='flex gap-2 items-center'>
            <Image
            src="/star.png"
            alt="star"
            width={14}
            height={14}
             />
            <label className='text-gray-500 text-sm'>4.5</label>
            <h2 className='text-gray-700 text-sm '>{business?.restroType}</h2>
          </div>
          <h2 className='text-sm text-primary'>{business.categories[0]?.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default BusinessItem;
