import { useState } from "react";
import { fetchFromAPI } from "../API/fetchPaymentData";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function Payments() {
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState(0);
  const [paymentIntent, setPaymentIntent] = useState();

  // Create a payment intent on the server
  const createPaymentIntent = async (event) => {
    // Clamp amount to Stripe min/max
    const validAmount = Math.min(Math.max(amount, 50), 9999999);
    setAmount(validAmount);

    // Make the API Request
    const pi = await fetchFromAPI("payments", {
      body: { amount: validAmount },
    });
    setPaymentIntent(pi);
  };

  // Handle the submission of card details
  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    // Confirm Card Payment
    const { paymentIntent: updatedPaymentIntent, error } =
      await stripe.confirmCardPayment(paymentIntent.client_secret, {
        payment_method: { card: cardElement },
      });

    if (error) {
      console.error(error);
      error.payment_intent && setPaymentIntent(error.payment_intent);
    } else {
      setPaymentIntent(updatedPaymentIntent);
    }
  };

  return (
    <>
      <section
        id="modpack__payment"
        className="flex h-full w-full flex-col justify-normal self-start bg-bg text-text lg:justify-center "
      >
        <div className="relative z-10  bg-bg shadow-2xl shadow-bg/20 dark:shadow-none lg:max-w-4xl lg:justify-center lg:place-self-center lg:rounded-xl ">
          <div
            className={` z-10 grid h-full items-center p-4 lg:rounded-md  lg:shadow-2xl `}
          >
            <div className="mb-4 flex gap-4">
              <input
                type="number"
                value={amount}
                className="input rounded-md border border-text/20 bg-bg p-2 px-2 text-text"
                disabled={paymentIntent}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                className={`text-content cursor-pointer rounded-md border  border-sec px-3 py-1 text-justify text-xs hover:border-opacity-20 hover:bg-sec  hover:bg-opacity-20 disabled:bg-slate-700 disabled:hover:cursor-default   `}
                disabled={amount <= 0}
                onClick={createPaymentIntent}
                hidden={paymentIntent}
              >
                {amount <= 0
                  ? "Disabled"
                  : `Ready to Pay ${(amount / 100).toFixed(2)}`}
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <CardElement />
              <button
                className={`text-content mt-3 cursor-pointer rounded-md border border-sec  px-3 py-1 text-justify text-base hover:border-opacity-20 hover:bg-sec hover:bg-opacity-20  disabled:bg-slate-700 disabled:hover:cursor-default `}
                type="submit"
              >
                Pay
              </button>
            </form>
          </div>
          <div className="absolute inset-0 -z-10 h-full w-full flex-1 bg-sec opacity-20"></div>
        </div>
      </section>
    </>
  );
}
