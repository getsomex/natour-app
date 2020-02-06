/* eslint-disable */
import axios from 'axios';

import { showAlert } from './alerts';
export const bookTour = async tourId => {
  const stripe = Stripe('pk_test_bXCGcS6mmduavwLAcDwXuaAz007ggHiApe');

  try {
    // 1)Get chckout session from API
    const session = await axios(`/api/v1/booking/checkout-session/${tourId}`);

    // 2)Create checkout form + charge credit card

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    showAlert('error', err);
  }
};
