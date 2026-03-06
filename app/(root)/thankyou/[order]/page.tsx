// server component

import { ThankYouPage } from '@/components/thankyou/ThankyouPage';
import { fetchOrderByIdApi } from '@/service/orders.service';
import React from 'react';

const page = async({params} : {params: {order: string}}) => {
  const orderId = params.order;
  const orderData = await fetchOrderByIdApi(orderId);

  return (
    <>
      <ThankYouPage orderData={orderData} />
    </>
  )
}

export default page