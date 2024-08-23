"use client"

import React from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import GlobalApi from '../_utils/GlobalApi'
import { toast } from 'sonner'
import { useContext } from 'react'
import { CartUpdateContext } from '../_context/CartUpdateContext'
import Link from 'next/link'
const Cart = ({cart}) => {

    const {updateCart,setUpdateCart}=useContext(CartUpdateContext);
    const calculateamount=()=>{
        let total=0;
        cart.forEach(item => {
            total=total+item?.price;
        });
   return total.toFixed(2);
    }
    
  const RemoveItemFromCart=(id)=>{
GlobalApi.DisconnectRestaurantFromCartItem(id).then(res=>{
    console.log(res);
    if(res){
        GlobalApi.DeleteItemCart(id).then(res=>{
            console.log(res);
            toast("Item deleted!🎈")
            setUpdateCart(!updateCart)
        })
    }
})
  }
  return (
    <div>
      <h2 className='font-bold text-lg'>{cart[0]?.restaurant?.name}</h2>
      <div className='mt-5 flex flex-col gap-3'>
        <h2 className='font-bold'>My Order</h2>
        {cart&&cart.map((item,index)=>(
            <div key={index} className='flex justify-between gap-8 items-center'>
                <div className='flex gap-2 items-center'>
                <Image src={item?.productImage} 
                    alt="productImg"
                    width={40}
                    height={40}
                    className='h-[40px] w-[40px] rounded-lg object-cover'
                />
                <h2 className='text-sm'>{item?.productName}</h2>
                </div>
                <h2 className='font-semibold flex gap-2 items-center'>{item?.price}rs/-
                <X onClick={()=>RemoveItemFromCart(item?.id)} className='h-3 w-3 text-primary border border-primary rounded-sm hover:bg-orange-200'/>
                </h2>
            </div>

        ))}
       <Link href={"/checkout?restaurant="+cart[0]?.restaurant?.name}><Button className="w-full">Checkout {calculateamount()}rs</Button></Link>
      </div>
    </div>
  )
}

export default Cart
