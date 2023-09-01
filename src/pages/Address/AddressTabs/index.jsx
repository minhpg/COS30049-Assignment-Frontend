import { Tabs, Tab } from "@nextui-org/react";

import NodeGraph from "./NodeGraph";
import CardTable from "./CardTable";

const AddressTabs = () => {
  return (
    <Tabs aria-label="data">
      <Tab key="visualization" title="Visualization">
        <NodeGraph />
      </Tab>
      <Tab key="transactions" title="Transactions">
        <CardTable />
      </Tab>
    </Tabs>
  );
};

export default AddressTabs;
