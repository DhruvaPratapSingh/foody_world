"use client";
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import BusinessItem from './BusinessItem';

const BusinessList = () => {
    const params = useSearchParams();
    const [category, setCategory] = useState('all');
    const [businessList, setBusinessList] = useState([]);

    useEffect(() => {
        if (params) {
            const categoryParam = params.get('category');
            setCategory(categoryParam || 'all');
            getBusinessList(categoryParam || 'all');
        }
    }, [params]);

    const getBusinessList = (category_) => {
        GlobalApi.GetBusiness(category_).then(res => {
            console.log(res);
            setBusinessList(res?.resaurants || []); // Ensure it's an array
        });
    };

    return (
        <div className="mt-5">
            <h2 className="font-bold text-2xl">Popular {category} Restaurants</h2>
            <h2 className="text-primary font-bold">Total Restaurants: {businessList?.length}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {businessList?.map((restaurant, index) => (
                    <div key={index}>
                        <BusinessItem business={restaurant} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BusinessList;
