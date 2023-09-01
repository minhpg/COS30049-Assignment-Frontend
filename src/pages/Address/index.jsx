import { useParams } from "react-router-dom";
import { useDocumentTitle } from "usehooks-ts";
import { useRef } from "react";

import CardMoreInfo from "./Cards/CardMoreInfo";
import CardOverview from "./Cards/CardOverview";
import CardUserNFTs from "./Cards/CardUserNFTs";
import AddressTabs from "./AddressTabs";
import CardAddressInformation from "./Cards/CardAddressInformation";

const Address = () => {
  const { address } = useParams();
  useDocumentTitle("Address " + address);

  const scrollRef = useRef(null);
  const executeScroll = () => {
    console.log("scrolled");
    scrollRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 p-5 gap-5">
        <div className="col-span-12">
          <h1 className="text-3xl font-black break-words">Address {address}</h1>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <CardOverview handleScroll={executeScroll} />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <CardMoreInfo />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <CardAddressInformation />
        </div>
        <div className="col-span-12">
          <CardUserNFTs />
        </div>
        <div className="col-span-12" ref={scrollRef}>
          <AddressTabs />
        </div>
      </div>
    </div>
  );
};

export default Address;
