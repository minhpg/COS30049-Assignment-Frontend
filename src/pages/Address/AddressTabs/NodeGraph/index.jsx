// import { Card } from "@nextui-org/react";
// import SplitPane from "react-split-pane";

import CardAddressInformation from "./CardAddressInformation";
import Graph from "./Graph";
import { GraphContextProvider } from "./GraphContext";

import "./style.css";

const NodeGraph = () => {
  return (
    <GraphContextProvider>
      <NodeGraphContent />
    </GraphContextProvider>
  );
};

const NodeGraphContent = () => {
  return (
    <>
      {/* 
      For future implementation:
      Split pame component to display node data and directed graph
     */}
      {/* <Card className="hidden lg:block">
        <SplitPane
          split="vertical"
          minSize={-100}
          maxSize={0}
          primary="first"
          defaultSize={parseInt(localStorage.getItem("splitPos"), 10)}
          onChange={(size) => localStorage.setItem("splitPos", size)}
        >
          <CardAddressInformation />
          <Graph />
        </SplitPane>
      </Card> */}
      <div className="grid grid-cols-12 gap-2">
        <div className={`col-span-12 lg:col-span-4`}>
          <CardAddressInformation />
        </div>
        <div className={`col-span-12 lg:col-span-8`}>
          <Graph />
        </div>
      </div>
    </>
  );
};
export default NodeGraph;
