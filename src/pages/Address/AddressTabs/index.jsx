import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import NodeGraph from "./NodeGraph";
import CardAddressInformation from "./CardAddressInformation";
import CardTable from "./CardTable";

const AddressTabs = () => {
  return (
    <Tabs aria-label="Options">
      <Tab key="transactions" title="Transactions">
        <CardTable />
      </Tab>
      <Tab key="visualization" title="Visualization">
        <Card>
          <CardBody className="p-0">
            <NodeGraph />
          </CardBody>
        </Card>
      </Tab>
      <Tab key="analytics" title="Analytics">
        <CardAddressInformation />
      </Tab>
    </Tabs>
  );
};

export default AddressTabs;
