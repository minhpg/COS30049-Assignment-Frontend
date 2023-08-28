import { Card, CardBody } from "@nextui-org/react";
import ChartDailyVolume from "./ChartDailyVolume";
import ChartYearlyVolume from "./ChartYearlyVolume";
const Charts = () => {
  return (
    <Card className="light">
      <CardBody className="grid grid-cols-12 overflow-hidden">
        <div className="col-span-12 md:col-span-6">
          <div class="p-3">
            <h2 className="text-xl font-bold">Daily Volume</h2>
          </div>
          <ChartDailyVolume />
        </div>
        <div className="col-span-12 md:col-span-6">
        <div class="p-3">
            <h2 className="text-xl font-bold">Yearly Volume</h2>
          </div>
          <ChartYearlyVolume />
        </div>
      </CardBody>
    </Card>
  );
};

export default Charts;
