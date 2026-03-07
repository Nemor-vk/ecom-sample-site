// server component

import { ThankYouPage } from '@/components/thankyou/ThankyouPage';
import { fetchOrderByIdApi } from '@/service/orders.service';
import React from 'react';

type ThankYouParams = Promise<{ order: string }>;

interface ThankYouProps {
  params: ThankYouParams;
}

const page = async({params} : ThankYouProps) => {
  const orderId = await params.then(p => p.order);
  const orderData = await fetchOrderByIdApi(orderId);

  return (
    <>
      <ThankYouPage orderData={orderData} />
    </>
  )
}

export default page