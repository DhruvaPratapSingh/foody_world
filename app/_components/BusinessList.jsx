import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi';

const BusinessList = () => {
    const aprams=useSearchParams();
    const [category,setCategory]=useState('all');
    useEffect(()=>{
        params&&setCategory(params.get('category'))
        params&&getBusinessList(params.get('category'))
    },[params])

    const getBusinessList=(category_)=>{
        GlobalApi.GetBusiness(category_).then(res=>{
            console.log(res);
        })
    }
  return (
    <div>
      businessList
    </div>
  )
}

export default BusinessList
