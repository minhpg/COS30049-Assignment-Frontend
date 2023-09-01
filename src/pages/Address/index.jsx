import { Card, CardHeader, Image } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { useDocumentTitle } from "usehooks-ts";

import CardMoreInfo from "./Cards/CardMoreInfo";
import CardOverview from "./Cards/CardOverview";
import CardUserNFTs from "./Cards/CardUserNFTs";
import AddressTabs from "./AddressTabs";


const Address = () => {
  const { address } = useParams();
  useDocumentTitle("Address " + address);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 p-5 gap-5">
        <div className="col-span-12">
          <h1 className="text-3xl font-black break-words">Address {address}</h1>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <CardOverview />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <CardMoreInfo />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <Card className="col-span-12 sm:col-span-4 md:h-full h-96">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">
                Ads placement
              </p>
              <h4 className="text-white font-medium text-large">
                Creates beauty like a beast
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src="/public/card-example-2.jpeg"
            />
          </Card>
        </div>
        <div className="col-span-12">
          <CardUserNFTs />
        </div>
        <div className="col-span-12">
          <AddressTabs />
        </div>
      </div>
    </div>
  );
};

export default Address;
