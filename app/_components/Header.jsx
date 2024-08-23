"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Search, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SignInButton, SignedOut, UserButton, SignedIn, SignUpButton, useUser } from '@clerk/nextjs';
import { useContext } from 'react';
import { CartUpdateContext } from '../_context/CartUpdateContext';
import GlobalApi from '../_utils/GlobalApi';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Cart from './Cart';


const Header = () => {
  const { user, isSignedIn } = useUser();
  const {updateCart,setUpdateCart}=useContext(CartUpdateContext);
const [cart,setCart]=useState([]);
  useEffect(()=>{
    // console.log("execute me header")
  GetUserCart();
  },[updateCart]);

  const GetUserCart=()=>{
    GlobalApi.GetUserCart(user?.emailAddresses).then(res=>{
      // console.log(res);
      setCart(res?.userCarts);
      setUpdateCart(!updateCart)
    })
  }
  return (
    <div className='flex justify-between items-center p-4 md:px-20 shadow-sm w-full top-0 z-20 bg-white'>
      <Image src="/logo.jpg" alt="logo" width={100} height={100} />
      <div className='hidden lg:flex p-2 rounded-lg bg-gray-200 w-96'>
        <input type="text" className='bg-transparent w-full outline-none' placeholder="Search..." />
        <Search className='text-primary'/>
      </div>
      
      {isSignedIn ? (
        <div className='flex gap-3 items-center'>
       
        <Popover>
  <PopoverTrigger > <div className='flex gap-2 cursor-pointer group items-center'>
        <ShoppingCart/>
        <label className='px-2 bg-slate-400 rounded-xl text-center'>{cart.length}</label>
        </div>
      </PopoverTrigger>
  <PopoverContent className="w-full"><Cart cart={cart}/>
  </PopoverContent>
</Popover>

        <UserButton />
        </div>
      ) : (
        <div className='flex gap-5'>
          <SignInButton mode='modal'>
            <Button variant="outline">Login</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button>Sign Up</Button>
          </SignUpButton>
        </div>
      )}
    </div>
  );
}

export default Header;
