"use client";

import React from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SignInButton, SignedOut, UserButton, SignedIn, SignUpButton, useUser } from '@clerk/nextjs';

const Header = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className='flex justify-between items-center p-4 md:px-20 shadow-sm fixed w-full top-0 z-20 bg-white'>
      <Image src="/logo.jpg" alt="logo" width={100} height={100} />
      
      <div className='hidden lg:flex p-2 rounded-lg bg-gray-200 w-96'>
        <input type="text" className='bg-transparent w-full outline-none' placeholder="Search..." />
        <Search />
      </div>
      
      {isSignedIn ? (
        <UserButton />
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
