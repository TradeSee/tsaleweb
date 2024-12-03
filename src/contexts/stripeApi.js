import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('a');

export default stripePromise;
