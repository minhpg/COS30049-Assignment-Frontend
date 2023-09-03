import Marquee from "react-fast-marquee";

/* Marquee to display running list of current crypto prices */
export default () => {
  return (
    <div className="z-40 items-center sticky backdrop-blur-lg backdrop-saturate-150 bg-background/70 h-8 text-xs flex gap-4 overflow-hidden w-screen">
      <Marquee>
        <PriceUp />
        <PriceDown />
        <PriceUp />
        <PriceDown />
        <PriceUp />
        <PriceDown />
        <PriceUp />
        <PriceDown />
        <PriceUp />
        <PriceDown />
        <PriceUp />
        <PriceDown />
        <PriceUp />
        <PriceDown />
        <PriceUp />
        <PriceDown />
        <PriceUp />
        <PriceDown />
        <PriceUp />
        <PriceDown />
        <PriceUp />
        <PriceDown />
        <PriceUp />
        <PriceDown />
      </Marquee>
    </div>
  );
};

const PriceUp = () => {
  return (
    <div className="flex gap-1 mx-2">
      ETH: <span className="font-bold text-primary">$1,634.99 </span>
      <span className="font-bold text-success flex">
        (
        <span className="mt-0.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3 h-3"
          >
            <path
              fillRule="evenodd"
              d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        1.69%)
      </span>
    </div>
  );
};

const PriceDown = () => {
  return (
    <div className="flex gap-1 mx-2">
      ETH: <span className="font-bold text-primary">$1,634.99 </span>
      <span className="font-bold text-danger flex">
        (
        <span className="mt-0.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-3 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </span>
        1.69%)
      </span>
    </div>
  );
};
