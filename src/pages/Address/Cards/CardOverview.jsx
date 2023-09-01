import { Card, CardHeader, CardBody } from "@nextui-org/react";

const CardOverview = () => {
  return (
    <Card className="h-full">
      <CardHeader className="px-5">
        <h2 className="text-xl font-bold">Overview</h2>
      </CardHeader>
      <CardBody className="gap-4">
        <div>
          <h3 className="uppercase font-light text-sm">ETH Balance</h3>
          <p>0 ETH</p>
        </div>
        <div>
          <h3 className="uppercase font-light text-sm">ETH Value</h3>
          <p>$0.00</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardOverview;
