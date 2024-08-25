"use client"
import { useSearchParams } from 'next/navigation';
import { Input } from "@/components/ui/input";
import GlobalApi from '@/app/_utils/GlobalApi';
import React, { act, useContext, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { CartUpdateContext } from '@/app/_context/CartUpdateContext';
import { ArrowBigRight, Car, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PayPalButtons , BraintreePayPalButtons} from '@paypal/react-paypal-js';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


const Checkout = () => {
    const params = useSearchParams();
    const { user } = useUser();
    const [subtotal,setsubtotal]=useState(0)
    const [Cart, setCart] = useState([]);
    const {updateCart, setUpdateCart} = useContext(CartUpdateContext);
    const [Deliveryamount,setdeliveryamount]=useState(30)
    const [tax,settax]=useState(0);
   const [total,settotal]=useState(0);
   const[zip,setZip]=useState();
   const[phone,setPhone]=useState();
   const[email,setEmail]=useState();
   const [address,setAddress]=useState();
   const[userName,setUsername]=useState();
   const [loading,setLoading]=useState(false);
   const router=useRouter();
    useEffect(() => {
        console.log(params.get('restaurant'));
        user&&GetUserCart();
    }, [user||updateCart]);

    const GetUserCart = () => {
        GlobalApi.GetUserCart(user?.emailAddresses).then(res => {
            console.log(res);
            setCart(res?.userCarts);
            // setUpdateCart(!updateCart);
            calculateamount(res?.userCarts);
        });
    };
   const calculateamount=(cart_)=>{
    let total=0;
    cart_.forEach((item)=>{
        total=total+item?.price;
    })
    setsubtotal(total);
    settax(total*0.03);
    settotal(total+total*0.03+Deliveryamount);
   }

   const addToOrder=()=>{
    setLoading(true);
    const data={
        email:user?.emailAddresses,
        orderAmount:total,
        restaurantName:params.get('restaurant'),
        userName:user?.fullName,
        address:address,
        zipCode:zip,
        phone:phone
    }
   GlobalApi.CreateNewOrder(data).then(res=>{
    // console.log(res);
    const resultid=res?.createOrder?.id
    setUpdateCart(!updateCart)
    toast('order added ✅');
    // sendEmail();
        router.replace('/confirmation');
    if(resultid){
    Cart?.forEach((item)=>{
        GlobalApi.UpdateorderDetails({
            name: item.productName,
            price: item?.price,
            id: resultid,
            email:user?.emailAddresses
        }).then(result=>{
            console.log(result);
            setLoading(false);
        },
    (err)=>{
        setLoading(false)
    })
    })
    }
},(error)=>{
    setLoading(false)
})
   }
   const sendEmail=async()=>{
    try{
    const responce=await fetch('api/send-email',{
        method:'POST'
    })
    if(!responce){
        toast('your email part is not working')
    }
    else{
        toast('email sent succesfully')
    }
    }catch(err){
        toast('err to send email !!!')
    }
       }
    
  

    return (
        <div>
            <h2 className='font-bold text-2xl my-4 text-center'>checkout</h2>
            <div className='p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8'>
                <div className='flex flex-col w-64 mx-auto md:col-span-2 md:w-9/12 md:mx-20 '>
                    <h2 className='font-bold text-3xl'>Billing Details</h2>
                    <div className='md:grid md:grid-cols-2 md:gap-10 mt-3 flex flex-col gap-2'>
                        <Input placeholder="Name" onChange={(e) => setUsername(e.target.value)} />
                        <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='md:grid md:grid-cols-2 md:gap-10 mt-3 gap-2 flex flex-col'>
                        <Input placeholder='phone' onChange={(e) => setPhone(e.target.value)} />
                        <Input placeholder='Zip' onChange={(e) => setZip(e.target.value)} />
                    </div>
                    <div className='mt-3 mb-5'>
                        <Input placeholder='Address' onChange={(e) => setAddress(e.target.value)} />
                    </div>
                </div>
                <div className='md:mx-10 border mx-auto w-64 md:w-9/12'>
                    <h2 className='p-3 bg-gray-200 font-bold text-center'>Total Cart ({Cart?.length})</h2>
                    <div className='flex flex-col p-4 gap-4'>
                        <h2 className='font-bold flex justify-between'>subtotal <span> {subtotal.toFixed(2)}rs </span> </h2>
                        <hr />
                        <h2 className='flex justify-between text-sm font-light'>Delivery : <span> {Deliveryamount.toFixed(2)}rs </span></h2>
                        <h2 className='flex justify-between text-sm font-light'>Tax (3%) : <span> {tax.toFixed(2)}rs </span></h2>
                        <hr />
                        <h2 className='font-bold flex justify-between'>Total <span> {total.toFixed(2)}rs </span> </h2>
                        {/* <Button onClick={()=>onApprove({paymentid:123})}>Payment <ArrowBigRight/> </Button> */}
                        <Button  disabled={!(userName&&email&&address&&zip&&phone) || loading} onClick={() => addToOrder()}>
                       {loading ? <Loader className='animate-spin'/> :'make payment'}</Button>
                        {/* <Button onClick={() => sendEmail(user?.emailAddresses)}>
                       {loading ? <Loader className='animate-spin'/> :'send email'}</Button> */}
                        {/* <PayPalButtons style={{ layout: "horizontal" }}
                       disabled={!(userName&&email&&address&&zip&&phone) || loading}
                       onApprove={addToOrder} 
                //        createOrder={(data, actions) => {
                //     return actions.braintree.createPayment({
                //         flow: "checkout",
                //         amount: "10.0",
                //         currency: "USD",
                //         intent: "capture",
                //     });
                // }}
                       /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
