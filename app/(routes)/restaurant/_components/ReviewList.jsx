"use client"
import React from 'react'
import Image from 'next/image'
import { Rating as ReactRating } from '@smastrom/react-rating'
import moment from 'moment'

const ReviewList = ({ reviewList }) => {
  return (
    <div className='flex flex-col gap-5'>
      {reviewList && reviewList.length > 0 ? (
        reviewList.map((review, index) => (
          <div key={index} className="flex items-center gap-5 shadow-2xl rounded-lg bg-slate-200 p-5 border">
            <Image
              src={review?.profileImage}
              alt={'profileImage'}
              width={50}
              height={50}
              className='rounded-full '
            />
            <div>
              <h2 className='text-sm'>{review?.userName} at {moment(review?.publishedAt).format('DD-MM-YYYY')}</h2>
              <ReactRating 
                style={{ maxWidth: 100 }} 
                value={review?.star} 
                isDisabled={true} 
              />
              <h2>{review?.reviewText}</h2>
            </div>
          </div>
        ))
      ) : (
        [1, 2, 3, 4].map((item, index) => (
          <div key={index} className='h-[50px] w-full bg-slate-300 animate-pulse rounded-lg'></div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
