import { Navbar } from "@nextui-org/react";
import HorizontalLoop from "./HorizontalLoop";
import useIsomorphicLayoutEffect from "./IsomorphicLayout";
import { useRef } from "react";
import gsap from "gsap-trial";
//https://stackblitz.com/edit/stackblitz-starters-9etsod?file=helpers%2FhorizontalLoop.js

export default () => {
  const content = useRef();
  useIsomorphicLayoutEffect(() => {
    let ctx;
    window.addEventListener("load", () => {
      ctx = gsap.context(() => {
        const tl = HorizontalLoop("div", {
          repeat: -1,
          paddingRight: 10,
        });
      }, content);
    });

    return () => ctx && ctx.revert();
  }, []);
  return (
    <Navbar ref={content} className="h-8 text-xs flex gap-4 overflow-hidden w-screen">
      <PriceUp />
      <PriceDown />
      <PriceUp />
      <PriceDown />
      <PriceUp />
      <PriceDown />
      <PriceUp />
      <PriceDown />
    </Navbar>
  );
};

const PriceUp = () => {
  return (
    <div className="flex gap-1">
      ETH: <span className="font-bold text-primary">$1,634.99 </span>
      <span className="font-bold text-success flex">
        (
        <span className="mt-0.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-3 h-3"
          >
            <path
              fill-rule="evenodd"
              d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
              clip-rule="evenodd"
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
    <div className="flex gap-1">
      ETH: <span className="font-bold text-primary">$1,634.99 </span>
      <span className="font-bold text-danger flex">
        (
        <span className="mt-0.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-3 h-3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </span>
        1.69%)
      </span>
    </div>
  );
};
