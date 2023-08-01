import { fetchFromAPI } from "../API/fetchPaymentData";
import { useStripe } from "@stripe/react-stripe-js";
import { useUser } from "../Context/useUser";
import { Link, useParams } from "react-router-dom";
import usePackDetailData from "../API/usePackDetailData";
import { LazyLoadImage } from "react-lazy-load-image-component";

export function Checkout() {
  const { modpackId: id } = useParams();
  const modpackId = id as string;

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
    user_id: user?.id,
    modpack_id: modpackId,
  };

  const handleClick = async () => {
    const body = { line_items: [product] };
    const { id: sessionId } = await fetchFromAPI(
      `create-checkout-session/${modpackId}`,
      {
        body,
      }
    );

    const { error } = await stripe!.redirectToCheckout({
      sessionId,
    });

    if (error) {
      console.log(error);
    }
  };

  return (
    <section
      id="modpack__payment"
      className="z-10 grid h-full w-full  flex-1 justify-normal text-text lg:mx-auto lg:min-w-[900px] lg:max-w-[900px] "
    >
      <div className="relative h-min overflow-hidden border-t-2 pb-4  bg-bg dark:border-none dark:shadow  md:mb-4 md:rounded-b-md  md:border-none md:shadow-xl  ">
        <div className={` z-10 grid h-full items-center  lg:rounded-md   `}>
          <div className=" z-10 flex justify-between gap-2  px-8 pt-4  max-[350px]:flex-col sm:gap-0 md:px-4 ">
            <Link
              className="flex min-w-fit cursor-pointer items-center gap-2 rounded-md px-3 py-1 text-text hover:bg-sec hover:bg-opacity-20 hover:text-text dark:hover:bg-hover-2"
              to={`/pack-details/${modpackId}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-8 w-8 text-${data?.color}-500`}
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
              <p className={` text-${data?.color}-500`}>Cancel</p>
            </Link>
            <h2 className={`prose-2xl capitalize text-${data?.color}-500`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM180,192a12,12,0,1,1-12,12A12,12,0,0,1,180,192Zm-96,0a12,12,0,1,1-12,12A12,12,0,0,1,84,192Z" />
              </svg>
            </h2>
          </div>
          <div className={`z-[5] grid items-center md:px-4 `}>
            <div className=" my-4 grid px-4 sm:grid-cols-2  md:space-x-4 ">
              {/* toggle images in production */}

              <LazyLoadImage
                src={`https://www.trainjumper.com${data.imageUrl}`}
                alt="random"
                width="412"
                height="233"
                placeholderSrc={`/src/assets/placeholderImg.png`}
                className={`  mx-auto aspect-video place-self-center overflow-hidden rounded-md border-2 object-cover object-center sm:max-h-52   sm:object-fill  lg:max-h-60
               border-${data?.color}-500 bg-${data?.color}-500`}
              />
              <div className="grid w-full items-center justify-center md:mr-4 md:space-y-4">
                <p className="text-content my-4 break-normal text-center text-4xl uppercase  md:my-0 ">
                  {data?.name}
                </p>

                <p className="text-content my-4 break-normal text-center text-xs uppercase  md:my-0 ">
                  Suggested By:
                  <br />{" "}
                  <span className="text-text/50">{data?.suggestedBy}</span>
                </p>
                <button
                  className={`group mx-auto h-10 max-w-fit rounded-md text-text hover:bg-opacity-80 disabled:bg-slate-300 disabled:text-slate-500 dark:disabled:bg-slate-700 dark:disabled:text-slate-500  bg-${data?.color}-400 dark:bg-${data?.color}-600 px-3 py-1 text-sm xl:text-base`}
                  onClick={handleClick}
                >
                  Checkout!
                </button>
              </div>
            </div>

            <div className="absolute inset-0 -z-10 h-full w-full flex-1 bg-sec opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
export const CheckoutSuccess = () => {
  const url = window.location.href;
  const sessionId = new URL(url).searchParams.get("session_id");

  return (
    <section
      id="modpack__payment--success"
      className="z-10 grid h-full w-full flex-1 justify-normal bg-bg text-text lg:mx-auto lg:min-w-[900px] lg:max-w-[900px] "
    >
      <div className="relative h-min overflow-hidden border-t-2 py-8  dark:border-none dark:shadow  md:mb-4 md:rounded-b-md  md:border-none md:shadow-xl  ">
        <div className={`flex flex-col   items-center p-4  `}>
          <h2 className="prose-2xl mb-4">Checkout was a Success! {`😁`}</h2>
          <p className=" w-full break-all text-center text-text/60">
            {" "}
            {sessionId}{" "}
          </p>

          {/* redirecting to homepage modpack */}

          <Link
            className="flex min-w-fit cursor-pointer items-center gap-2 rounded-md px-3 py-1 text-text hover:bg-sec hover:bg-opacity-20 hover:text-text dark:hover:bg-hover-2"
            to={`/`}
          >
            <p className={` `}>Go Back Home</p>
          </Link>
        </div>
        <div className="absolute inset-0 -z-10 h-full w-full flex-1 bg-sec opacity-20"></div>
      </div>
    </section>
  );
};

export const CheckoutFail = () => {
  const url = window.location.href;
  const sessionId = new URL(url).searchParams.get("session_id");

  return (
    <section
      id="modpack__payment--failed"
      className="z-10 grid h-full w-full flex-1 justify-normal bg-bg text-text lg:mx-auto lg:min-w-[900px] lg:max-w-[900px] "
    >
      <div className="relative h-min overflow-hidden border-t-2 py-8  dark:border-none dark:shadow  md:mb-4 md:rounded-b-md  md:border-none md:shadow-xl  ">
        <div className={`flex flex-col   items-center p-4  `}>
          <h2 className="prose-2xl mb-4">Checkout Failed! {`☹️`}</h2>
          <p className=" w-full break-all text-center text-text/60">
            {" "}
            {sessionId}{" "}
          </p>
        </div>
        <div className="absolute inset-0 -z-10 h-full w-full flex-1 bg-sec opacity-20"></div>
      </div>
    </section>
  );
};
