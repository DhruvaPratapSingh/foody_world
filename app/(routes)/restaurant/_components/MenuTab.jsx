"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { SquarePlus } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'
import { CartUpdateContext } from '@/app/_context/CartUpdateContext'

const MenuTab = ({ restaurant }) => {

    const [menuItemList,setMenuItemList]=useState([]);
const {updateCart,setUpdateCart}=useContext(CartUpdateContext);

    const {user}=useUser();

    useEffect(()=>{
    restaurant?.menu&&FilterMenu(restaurant?.menu[0]?.category)
    },[restaurant]);
    const FilterMenu=(category)=>{
const result=restaurant?.menu?.filter((item)=>
item.category==category)
setMenuItemList(result[0]);

}
const AddToCarthandler=(item)=>{
  toast('Adding to cart 🚀')
const data={
  email: user?.emailAddresses,
  name:item?.name,
  description:item?.description,
  productImage:item?.productImage?.url,
  price:item?.price,
  restaurantSlug:restaurant?.slug
}
GlobalApi.AddToCart(data).then(res=>{
  // console.log(res);
  setUpdateCart(!updateCart);
  toast('✅Added to Cart🎉')
})
}

  return (
    <div className='grid grid-cols-4 mt-2'>
      <div className='hidden md:flex flex-col mr-10 gap-2'>
        {restaurant?.menu?.map((item, index) => {
          return <Button key={index} variant="ghost"
         className="flex justify-start" 
         onClick={()=>FilterMenu(item.category)}
         >{item.category}</Button>
        })}
      </div>
      <div className='col-span-4 md:col-span-3'>
       <h2 className='font-bold text-lg'>{menuItemList?.category || "currently no data available"}</h2>
       <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 cursor-pointer'>
        {menuItemList?.menuitem?.map((item,index)=>(
            <div className='p-2 flex gap-5 items-start border rounded-xl mt-5 hover:bg-orange-50 hover:border-primary'>
      <Image 
        src={item?.productImage?.url}
        alt={item.name}
        width={120}
        height={120}
        className='object-cover w-[120px] h-[120px] rounded-xl'
      />
      <div className='flex flex-col gap-1'>
        <h2 className='font-bold'>{item.name}</h2>
        <h2>{item.price}₹</h2>
        <h2 className='text-sm text-gray-600 line-clamp-2'>{item.description}</h2>
        <SquarePlus className='cursor-grab' onClick={()=>AddToCarthandler(item)}/>
      </div>
            </div>
        ))}
       </div>
      </div>
    </div>
  )
}

export default MenuTab
