"use client"
import { UserProfile,UserButton } from '@clerk/nextjs'
import { ArrowUpLeftFromSquare, MoveRight, ShoppingBag } from 'lucide-react'
import React from 'react'
import MyOrder from './_components/Myorder'

const User = () => {
  return (
    <div>
      {/* <UserButton>
        <UserButton.UserProfilePage label="My order" url="custom" labelIcon={<ShoppingBag/>}>
          <MyOrder/>
        </UserButton.UserProfilePage>
        <UserButton.UserProfileLink label="Homepage" url="/" labelIcon={<ShoppingBag/>} />
        <UserButton.UserProfilePage label="account" />
        <UserButton.UserProfilePage label="security" />
      </UserButton> */}
      <div className='min-h-screen w-80 h-10'>
      <UserProfile/>
      </div>
    </div>
  )
}

export default User
