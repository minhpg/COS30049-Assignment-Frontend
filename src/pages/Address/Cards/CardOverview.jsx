import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

const CardOverview = ({ handleScroll }) => {
  return (
    <Card className="h-full">
      <CardHeader className="px-7 pt-5 -mb-2">
        <h2 className="text-xl font-bold">Overview</h2>
      </CardHeader>
      <CardBody className="gap-4 px-7">
        <div>
          <h3 className="uppercase font-light text-sm">ETH Balance</h3>
          <p>0 ETH</p>
        </div>
        <div>
          <h3 className="uppercase font-light text-sm">ETH Value</h3>
          <p>$0.00</p>
        </div>
        <div>
          <a
            className="text-primary hover:underline mt-5 text-sm"
            onClick={() => {
              console.log("clicked");
              handleScroll();
            }}
          >
            View address transactions
          </a>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardOverview;
