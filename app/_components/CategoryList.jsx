"use client";

import React, { useState, useEffect, useRef } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image';
import { ArrowRightCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const CategoryList = () => {

    const listRef=useRef(null)

  const [categoryList, setCategoryList] = useState([]);
  const params=useSearchParams();

  const [selectedCategory,setSelectedCategory]=useState([]);

   useEffect(()=>{
  setSelectedCategory(params.get('category'));
   },[params])

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.GetCategory().then((res) => {
      console.log(res.categories);
      setCategoryList(res.categories);
    });
  };
const ScrollRightHandler=()=>{
    if(listRef.current){
        listRef.current.scrollBy({
            left:200,
            behavior:"smooth"
        })
    }
}
  return (
    <div className='mt-10 relative'>
      <div className='flex gap-4 overflow-auto scrollbar-hide 'ref={listRef}>
        {categoryList && categoryList.map((category, index) => (
          <Link href={"?category="+category.slug} key={index} className={`flex flex-col items-center gap-2 p-3 border rounded-xl min-w-28 hover:border-primary hover:bg-orange-50 cursor-pointer group ${selectedCategory==category.slug && 'text-primary boder-primary bg-orange-50 hover:border-primary hover:bg-orange-50 cursor-pointer'}`}>
            <div className="w-14 h-14 overflow-hidden flex items-center justify-center">
              <Image
                className="object-cover
                 group-hover:scale-125 transition-all duration-200"
                src={category.icon?.url}
                alt={category.name}
                width={80}
                height={80}
              />
            </div>
            <h2 className="text-center text-sm font-medium group-hover:text-primary">{category.name}</h2>
          </Link>
        ))}
      </div>
      <ArrowRightCircle className='absolute -right-10 top-14 bg-gray-500 rounded-full h-8 w-8 text-white cursor-pointer' onClick={()=>ScrollRightHandler()}/>
    </div>
  );
};

export default CategoryList;
