import { Card, CardBody, Divider } from "@nextui-org/react";
import { Link, useParams } from "react-router-dom";
import { useDocumentTitle } from "usehooks-ts";

import { PreviewImage } from "../../components/PreviewImage";

const Transaction = () => {
  const { transaction } = useParams();
  useDocumentTitle("Transaction "+transaction)
  
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 p-5 gap-5">
        <div className="col-span-12">
          <h1 className="text-3xl font-black break-words">
            Transaction Details
          </h1>
        </div>
        <div className="col-span-12">
          <Card className="h-full">
            <CardBody className="gap-4 grid grid-cols-8 md:grid-cols-12 text-sm">
              <div className="col-span-4">
                <h2 className="font-bold">Transaction Hash</h2>
              </div>
              <div className="col-span-8">
                <p>{transaction}</p>
              </div>

              <div className="col-span-4">
                <h2 className="font-bold">Status</h2>
              </div>
              <div className="col-span-8">
                <p className="text-success flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mt-0.5 w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Success
                </p>
              </div>

              <div className="col-span-4">
                <h2 className="font-bold">Timestamp</h2>
              </div>
              <div className="col-span-8">
                <p>6 days 3 hrs ago (Aug-25-2023 01:00:59 AM +UTC)</p>
              </div>

              <div className="col-span-8 md:col-span-12">
                <Divider />
              </div>

              <div className="col-span-4">
                <h2 className="font-bold">From</h2>
              </div>
              <div className="col-span-8">
                <Link
                  to="/address/0xC58EF7ba444c41669cdf4d9191E1095feBad0b9D"
                  className="text-primary hover:underline"
                >
                  0xC58EF7ba444c41669cdf4d9191E1095feBad0b9D
                </Link>
              </div>

              <div className="col-span-4">
                <h2 className="font-bold">To</h2>
              </div>
              <div className="col-span-8">
                <Link
                  to="/address/0xC58EF7ba444c41669cdf4d9191E1095feBad0b9D"
                  className="text-primary hover:underline"
                >
                  0xC58EF7ba444c41669cdf4d9191E1095feBad0b9D
                </Link>
              </div>
              
              <div className="col-span-8 md:col-span-12">
                <Divider />
              </div>

              <div className="col-span-4">
                <h2 className="font-bold">Value</h2>
              </div>
              <div className="col-span-8">
                <p>
                  10 ETH <span className="text-xs">($12,231)</span>
                </p>
              </div>

              <div className="col-span-4">
                <h2 className="font-bold">Transaction Fee</h2>
              </div>
              <div className="col-span-8">
                <p>
                  0.0024001456813046 ETH{" "}
                  <span className="text-xs">($12,231)</span>
                </p>
              </div>
              
              <div className="col-span-4">
                <h2 className="font-bold">Gas Price</h2>
              </div>
              <div className="col-span-8">
                <p>
                  20.173529576 Gwei{" "}
                  <span className="text-xs">(0.000000020173529576 ETH)</span>
                </p>
              </div>

              <div className="col-span-8 md:col-span-12">
                <Divider />
              </div>

              <div className="col-span-8 md:col-span-12">
                <h2 className="font-bold text-lg">Transacted Item</h2>
              </div>
              <div className="col-span-8 md:col-span-12 flex justify-center">
                <div className=" w-96">
                  <PreviewImage alt="blabla" urls={[`/public/1371527.png`]} />
                </div>
              </div>
              <div className="col-span-4">
                <h2 className="font-bold">Name</h2>
              </div>
              <div className="col-span-8">
                <Link className="text-primary hover:underline">
                  NFT Yourself
                </Link>
              </div>
              <div className="col-span-4">
                <h2 className="font-bold">Description</h2>
              </div>
              <div className="col-span-8">
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Iusto voluptatem repellat accusamus ex totam, odit
                  repudiandae, tempora quas ipsa in fugiat. Deserunt iure
                  recusandae beatae blanditiis modi consectetur iusto
                  dignissimos!
                </p>
              </div>
              <div className="col-span-4">
                <h2 className="font-bold">Market</h2>
              </div>
              <div className="col-span-8">
                <a
                  href="https://www.cryptokitties.co/"
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  CryptoKitties
                </a>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
