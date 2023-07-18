import { useState } from "react";
import { fetchFromAPI } from "../API/fetchPaymentData";
import { useStripe } from "@stripe/react-stripe-js";
import { useUser } from "../Context/useUser";
import { Link, useParams } from "react-router-dom";
import usePackDetailData from "../API/usePackDetailData";

export function Checkout() {
  const { modpackId } = useParams();

  const stripe = useStripe();
  const { user } = useUser();
  const { data, isLoading, isError } = usePackDetailData(modpackId);

  // const [product, setProduct] = useState({
  //   name: "Hat",
  //   images: ["https://i.imgur.com/EHyR2nP.png"],
  //   price: 29.99,
  //   currency: "usd",
  //   quantity: 1,
  // });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const product = {
    images: [`https://www.trainjumper.com${data?.imageUrl}`],
    currency: "usd",
    quantity: 1,
    user_id: user?.id,
  };

  const handleClick = async () => {
    const body = { line_items: [product] };
    const { id: sessionId } = await fetchFromAPI(
      `create-checkout-session/${modpackId}`,
      {
        body,
      }
    );

    const { error } = await stripe.redirectToCheckout({
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
        <div className="relative z-20 bg-bg  p-4 shadow-2xl shadow-bg/20 dark:shadow-none lg:max-w-4xl lg:justify-center lg:place-self-center lg:rounded-xl ">
          <Link
            className="mr-auto flex w-min cursor-pointer items-center gap-2 rounded-md px-3 py-1 text-text hover:bg-sec hover:bg-opacity-20 hover:text-text dark:hover:bg-hover-2"
            to={`/pack-details/${modpackId}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-8 w-8 text-text`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <p className={` text-text`}>Cancel</p>
          </Link>
          <div
            className={`grid h-full items-center p-4 lg:rounded-md  lg:shadow-2xl `}
          >
            <h3>{data?.name}</h3>

            <img
              src={`https://www.trainjumper.com${data?.imageUrl}`}
              width="250px"
              alt="product"
            />
            {/* style payment button changeQuantity */}
            <div className=" flex items-center gap-2">
              <span>1</span>
            </div>
            <hr />

            <button onClick={handleClick}>Start Checkout</button>
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
