import { useState, useEffect } from "react";
import { getTopNFTs } from "../../../api/models/NFTs";
import { Img } from "react-image";

import { Card, CardFooter } from "@nextui-org/react";
const CardUserNFTs = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const dataFetch = async () => {
      let res = await getTopNFTs(10, {});
      setData(res);
    };

    dataFetch();
  }, []);

  return (
    <div className="gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      <h2 className="col-span-3 md:col-span-1 font-black text-2xl">
        NFTs owned
      </h2>
      {data.map((item, index) => (
        <Card
          shadow="sm"
          key={index}
          isPressable
          isFooterBlurred
          className="border-none"
        >
          <Img
            src={item.image_urls}
            alt={item.name}
            className="w-full h-48 object-cover"
          />
          <CardFooter
            className="
            rounded-none
            w-full
            justify-center 
            py-0.5 
            absolute 
            bottom-0 
            z-10
                "
          >
            <a
              className="text-sm
                text-center font-bold"
            >
              {item.name}
            </a>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CardUserNFTs;
