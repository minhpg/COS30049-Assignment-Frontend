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
import { sample } from "lodash";
import { Card, CardBody } from "@nextui-org/card";

import { GraphContext } from "./GraphContext";
import { getAllTransactions } from "../../../../api/models/Transactions";
import { truncateAddress } from "../../../../utils";

/* 
Generates random color from pre-assigned palletes used for graph nodes
Palette: https://colorpalettes.io/bohemian-color-palette/
*/
const randomColor = () => {
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

/* 
Directed graph will be implemented using react-sigma library
*/

// Sigma's FA2 layout to assign nodes into clusters
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

// Creating graph instance
const CircularGraph = () => {
  // Nodes will be assigned in a circular layout
  const { assign } = useLayoutCircular();

  const [transactions, setTransactions] = useState(null);

  /* 
  Using Graph Context to share address between address information component and graph,
  which allows us to click nodes to change the address
  */
  const graphContext = useContext(GraphContext);

  // Using multi-directed graph to model multiple transaction edges between two addresses
  const graph = new MultiDirectedGraph();
  const loadGraph = useLoadGraph();
  const registerEvents = useRegisterEvents();
  const sigma = useSigma();

  // Initial data fetching
  useEffect(() => {
    const dataFetch = async () => {
      const limit = 1000;
      const response = await getAllTransactions(limit);
      setTransactions(response);
    };
    dataFetch();
  }, []);

  // Visualizing nodes and edges
  useEffect(() => {
    const added_address = [];
    const added_edges = []
    if (transactions) {
      for (const { buyer_address, seller_address, transaction_hash } of transactions) {
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
        if(!added_edges.includes(transaction_hash))
          {
            graph.addEdgeWithKey(transaction_hash, buyer_address, seller_address, {
              label: transaction_hash,
              type: "arrow",
            });
            added_edges.push(transaction_hash)
          }
      }
      // Set selected node to page's current address
      setSelectedNode(graphContext.address)
    }

    loadGraph(graph);
    assign();

    // Registering node click/hover events
    registerEvents(
      {
        enterNode: (event) => setHoveredNode(event.node),
        leaveNode: () => setHoveredNode(null),
        clickNode: (event) => {
          console.log("doubleClickNode", event.node);
          setSelectedNode(event.node)
          graphContext.setAddress(event.node);
          event.preventSigmaDefault();
        },
      },
      []
    );
  }, [assign, loadGraph, transactions, registerEvents, graphContext]);

  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null)
  const setSettings = useSetSettings();

  // Highlighting selected nodes and edges
  useEffect(() => {
    setSettings({
      nodeReducer: (node, data) => {
        const graph = sigma.getGraph();

        const newData = { ...data, highlighted: data.highlighted || false };

        if (selectedNode) {
          if (
            node === selectedNode ||
            graph.neighbors(selectedNode).includes(node)
          ) {
            newData.label = node;
            newData.size = 20;
            newData.highlighted = true;
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

        if (selectedNode && !graph.extremities(edge).includes(selectedNode)) {
          newData.hidden = true;
        }
        return newData;
      },
    });
  }, [selectedNode, setSettings, sigma, graphContext]);

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
          {/* Main Graph */}
          <CircularGraph />
          {/* Sigma's FA2 clustered layout */}
          <FA2 />
          {/* Graph controls component */}
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
