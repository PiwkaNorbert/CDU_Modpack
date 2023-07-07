import { useState } from "react";
import { fetchFromAPI } from "../API/fetchPaymentData";
import { useStripe } from "@stripe/react-stripe-js";
import { useUser } from "../Context/useUser";

export function Checkout() {
  const stripe = useStripe();
  const { user } = useUser();

  const [product, setProduct] = useState({
    name: "Hat",
    description: "Pug hat. A hat your pug will love.",
    images: ["https://i.imgur.com/EHyR2nP.png"],
    amount: 799,
    currency: "usd",
    quantity: 0,
  });

  const changeQuantity = (v: number) =>
    setProduct({ ...product, quantity: Math.max(0, product.quantity + v) });

  const handleClick = async () => {
    const body = { line_items: [product], user_id: user?.id };
    const { id: sessionId } = await fetchFromAPI("checkouts", {
      body,
    });

    const { error } = await stripe?.redirectToCheckout({
      sessionId,
    });

    if (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section
        id="modpack__payment"
        className="flex h-full w-full flex-col justify-normal self-start bg-bg text-text lg:justify-center "
      >
        <div className="relative z-20  bg-bg shadow-2xl shadow-bg/20 dark:shadow-none lg:max-w-4xl lg:justify-center lg:place-self-center lg:rounded-xl ">
          <div
            className={`grid h-full items-center p-4 lg:rounded-md  lg:shadow-2xl `}
          >
            <h3>{product.name}</h3>
            <h4>Stripe Amount: {product.amount}</h4>

            <img src={product.images[0]} width="250px" alt="product" />
            {/* style payment button changeQuantity */}
            <div className=" flex items-center gap-2">
              <button
                className="  border border-text/20 p-2"
                onClick={() => changeQuantity(-1)}
              >
                -
              </button>
              <span>{product.quantity}</span>
              <button
                className=" border border-text/20 p-2 px-2 "
                onClick={() => changeQuantity(1)}
              >
                +
              </button>
            </div>
            <hr />

            <button onClick={handleClick} disabled={product.quantity < 1}>
              Start Checkout
            </button>
          </div>
          <div className="absolute inset-0 -z-10 h-full w-full flex-1 bg-sec opacity-20"></div>
        </div>
      </section>
    </>
  );
}
export const CheckoutSuccess = () => {
  const url = window.location.href;
  const sessionId = new URL(url).searchParams.get("session_id");

  return <h3>Checkout was a Success! {sessionId}</h3>;
};
export const CheckoutFail = () => {
  return <div>CheckoutFail</div>;
};
