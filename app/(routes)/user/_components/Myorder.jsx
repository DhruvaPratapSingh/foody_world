// "use client"
// import GlobalApi from '@/app/_utils/GlobalApi'
// import { useUser } from '@clerk/nextjs';
// import React, { useEffect, useState } from 'react'

// const MyOrder = () => {
// const {user}=useUser();
// // const [orderlist,setorderlist]=useState([])
//     useEffect(()=>{
//         GetUserOrders();
//     },[user]);
//     const GetUserOrders=()=>{
//         GlobalApi.GetUserOrders(user?.emailAddresses).then((res)=>{
//             console.log(res);
//         })
//     }
    
//   return (
//     <div>
//     <h2 className='font-bold text-center text-2xl'>My orders</h2>
//       <div>
//       {
//         orderlist.map((order,index)=>{
//             <h2>{order?.createdAt}</h2>
//         })
//       } 
//       hello
//       </div>
//     </div>
//   )
// }

// export default MyOrder
