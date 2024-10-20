"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { MapPin } from 'lucide-react'

const Intro = ({restaurant}) => {
  const [totalreview,settotalreview]=useState(1);
const [avgrating,setavgrating]=useState();
  useEffect(()=>{
 restaurant&&calculaterating();
  },[restaurant])
  const calculaterating=()=>{
    let total=0;
    let count=0;
    restaurant?.review?.forEach(item => {
      total=total+item?.star;
      count++;
    });
    settotalreview(count);
    const res=total/count;
    setavgrating(res?res.toFixed(1):3.5);
  }
  return (
    <div>
      {restaurant ?<div className='mt-5'>
      <Image 
       src={restaurant?.banner?.url}
       alt="banner"
       width={1000}
       height={300}
       className='w-full h-[250px] object-cover rounded-xl'
      />
      </div>
      :<div className='h-[250px] w-full bg-slate-400 animate-pulse rounded-xl'>
      </div>
      }
      <h2 className='text-3xl font-bold mt-2'>{restaurant.name}</h2>
      <div className='flex items-center gap-2'>
        <Image src="/star.png" 
            alt='star'
            width={20}
            height={20}
        />
       <label>{avgrating}/({totalreview})</label>
      </div>
      <h2 className='mt-1 flex gap-2 items-center'>
      <MapPin/>
       {restaurant.address}</h2>
    </div>
  )
}

export default Intro
