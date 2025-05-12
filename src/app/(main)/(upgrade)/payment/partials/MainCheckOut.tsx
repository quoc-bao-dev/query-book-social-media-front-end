'use client';

import { Button } from '@/components/common/Button';
import { config } from '@/config';
import axiosClient from '@/httpClient';
import { loadStripe } from '@stripe/stripe-js';

const MainCheckOut = () => {
  const makeCheckOut = async () => {
    const stripe = await loadStripe(config.NEXT_PUBLIC_STRIPE_PUBLISH_KEY);

    //FIXME: fix data
    const data = {
      name: 'John Doe',
      email: 'g5Fjy@example.com',
      typeAccount: '3_month',
    };
    const response = await axiosClient.post('/payment/checkout', data);

    console.log(response);

    const session = response.data.id;

    await stripe?.redirectToCheckout({
      sessionId: session,
    });
  };
  return (
    <div>
      MainCheckOut
      <Button onClick={makeCheckOut}> Checkout</Button>
    </div>
  );
};

export default MainCheckOut;
