import { useEffect, useState, useContext } from "react";
import { MultiDirectedGraph } from "graphology";
import {
  SigmaContainer,
  useLoadGraph,
  ControlsContainer,
  ZoomControl,
  FullScreenControl,
  useRegisterEvents,
  useSigma,
  useSetSettings,
} from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { useLayoutCircular } from "@react-sigma/layout-circular";
import {
  LayoutForceAtlas2Control,
  useWorkerLayoutForceAtlas2,
} from "@react-sigma/layout-forceatlas2";
import { uniqueId, sample } from "lodash";
import { Card, CardBody } from "@nextui-org/card";

import { GraphContext } from "./GraphContext";
import { getAllTransactions } from "../../../../api/models/Transactions";
import { truncateAddress } from "../../../../utils";

const randomColor = () => {
  // Palette: https://colorpalettes.io/bohemian-color-palette/
  const palette = [
    "#3F2021",
    "#B04A5A",
    "#BA5B3F",
    "#CB9576",
    "#7FA0AC",
    "#EEE5D3",
  ];
  return sample(palette);
};

const FA2 = () => {
  const { start, kill, isRunning } = useWorkerLayoutForceAtlas2();

  useEffect(() => {
    start();
    return () => {
      kill();
    };
  }, [start, kill]);

  return null;
};

const MyGraph = () => {
  const { assign } = useLayoutCircular();
  const [transactions, setTransactions] = useState(null);

  const graphContext = useContext(GraphContext);

  const graph = new MultiDirectedGraph();
  const loadGraph = useLoadGraph();
  const registerEvents = useRegisterEvents();
  const sigma = useSigma();

  useEffect(() => {
    const dataFetch = async () => {
      const limit = 1000;
      const response = await getAllTransactions(limit);
      setTransactions(response);
    };
    dataFetch();
  }, []);

  useEffect(() => {
    const added_address = [];
    if (transactions) {
      for (const { buyer_address, seller_address, hash } of transactions) {
        if (!added_address.includes(buyer_address)) {
          added_address.push(buyer_address);
          graph.addNode(buyer_address, {
            x: 0,
            y: 0,
            label: truncateAddress(buyer_address),
            size: 10,
            color: randomColor(),
          });
        }
        if (!added_address.includes(seller_address)) {
          added_address.push(seller_address);
          graph.addNode(seller_address, {
            x: 0,
            y: 0,
            label: truncateAddress(seller_address),
            size: 10,
            color: randomColor(),
          });
        }
        const unique_id = uniqueId("rel_");
        graph.addEdgeWithKey(unique_id, buyer_address, seller_address, {
          label: hash,
          type: "arrow",
        });
      }
    }

    loadGraph(graph);
    assign();

    registerEvents(
      {
        enterNode: (event) => setHoveredNode(event.node),
        leaveNode: () => setHoveredNode(null),
        clickNode: (event) => {
          console.log("doubleClickNode", event.node);
          graphContext.setAddress(event.node);
          event.preventSigmaDefault();
        },
      },
      []
    );
  }, [assign, loadGraph, transactions, registerEvents, graphContext]);

  const [hoveredNode, setHoveredNode] = useState(null);
  const setSettings = useSetSettings();

  useEffect(() => {
    setSettings({
      nodeReducer: (node, data) => {
        const graph = sigma.getGraph();

        const newData = { ...data, highlighted: data.highlighted || false };

        if (node == graphContext.address) {
          newData.size = 20;
          newData.highlighted = true;
        }

        if (hoveredNode) {
          if (
            node === hoveredNode ||
            graph.neighbors(hoveredNode).includes(node)
          ) {
            newData.highlighted = true;
            newData.label = node;
            newData.size = 15;
          } else {
            newData.color = "#E2E2E2";
            newData.highlighted = false;
          }
        }
        return newData;
      },
      edgeReducer: (edge, data) => {
        const graph = sigma.getGraph();
        const newData = { ...data, hidden: false };

        if (hoveredNode && !graph.extremities(edge).includes(hoveredNode)) {
          newData.hidden = true;
        }
        return newData;
      },
    });
  }, [hoveredNode, setSettings, sigma, graphContext]);

  return null;
};

const Graph = () => {
  return (
    <Card shadow="none">
      <CardBody className="p-0 h-96">
        <SigmaContainer
          style={{ height: "100%", width: "100%" }}
          className="rounded-medium bg-accent"
          graph={MultiDirectedGraph}
          settings={{
            renderEdgeLabels: true,
            defaultEdgeType: "arrow",
          }}
        >
          <MyGraph />
          <FA2 />
          <ControlsContainer position={"bottom-right"}>
            <ZoomControl />
            <FullScreenControl />
            <LayoutForceAtlas2Control
              settings={{ settings: { slowDown: 10 } }}
            />
          </ControlsContainer>
        </SigmaContainer>
      </CardBody>
    </Card>
  );
};

export default Graph;
