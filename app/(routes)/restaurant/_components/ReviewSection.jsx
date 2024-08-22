"use client"
import React, { useEffect } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Rating as ReactRating } from '@smastrom/react-rating'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'
import ReviewList from './ReviewList'

const ReviewSection = ({ restaurant }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const { user } = useUser();
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    restaurant && getReviewList();
  }, [restaurant]);

  const handleSubmit = () => {
    const data = {
      email: user?.emailAddresses,
      userName: user?.fullName,
      profileImage: user?.imageUrl,
      star: rating,
      reviewText: reviewText,
      RestroSlug: restaurant?.slug
    };
    GlobalApi.AddNewReview(data).then(res => {
      toast('Review Added ✅🎉');
      res&&getReviewList(); // Refresh the review list after submitting
    });
  };

  const getReviewList = () => {
    GlobalApi.getRestaurantReviews(restaurant?.slug).then(res => {
      console.log(res);
      setReviewList(res?.reviews);
    });
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 mt-10 gap-10'>
      {/* Add Review Section */}
      <div className='flex flex-col gap-2 p-5 shadow-2xl rounded-lg bg-slate-300 max-h-64'>
        <h2 className='text-lg font-bold mb-1'>Add Your Review</h2>
        <ReactRating 
          style={{ maxWidth: 100 }} 
          value={rating} 
          onChange={setRating} 
        />
        <Textarea 
          className='border border-gray-400 h-24 resize-none' 
          placeholder='Write your review here...' 
          onChange={(e) => setReviewText(e.target.value)} 
        />
        <Button 
          className='w-full mt-auto' 
          disabled={rating === 0 || !reviewText} 
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>

      {/* Review List Section */}
      <div className='col-span-2 p-5 shadow-2xl rounded-lg bg-slate-50 border border-gray-200'>
        <h2 className='text-lg font-bold mb-4'>Reviews</h2>
        <ReviewList reviewList={reviewList} />
      </div>
    </div>
  );
};

export default ReviewSection;
