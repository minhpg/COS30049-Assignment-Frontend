import { Card, CardBody, Divider } from "@nextui-org/react";
import ChartDailyVolume from "./ChartDailyVolume";
import ChartYearlyVolume from "./ChartYearlyVolume";
const Charts = () => {
  return (
    <Card className="dark">
      <CardBody className="grid grid-cols-12 overflow-hidden gap-5">
        <div className="col-span-12 md:col-span-6">
          <div className="p-3">
            <h2 className="text-xl font-bold">Daily Volume</h2>
          </div>
          {/* <Card className="light px-5"> */}
            <ChartDailyVolume />
          {/* </Card> */}
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className="p-3">
            <h2 className="text-xl font-bold">Yearly Volume</h2>
          </div>
          {/* <Card className="dark px-5"> */}
            <ChartYearlyVolume />
          {/* </Card> */}
        </div>
      </CardBody>
    </Card>
  );
};

export default Charts;
