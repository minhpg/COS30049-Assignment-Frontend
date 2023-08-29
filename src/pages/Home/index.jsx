import NodeGraph from "./components/NodeGraph";
import CardTable from "./components/Overview/CardTable";
import Hero from "./components/Hero";
import CardWebInformation from "./components/Overview/CardWebInfo";
import Charts from "./components/Charts";
import CardETHInfo from "./components/Overview/CardETHInfo";
import CardNFT from "./components/Overview/CardNFT";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="container mx-auto -mt-10">
        <div className="grid grid-cols-12 p-5 gap-5">
          <div className="col-span-12">
            <h1 className="text-2xl font-black">Overview</h1>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <CardWebInformation />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <CardETHInfo />
          </div>
          <div className="col-span-12">
            <h1 className="text-2xl font-black">Overview</h1>
          </div>
          <div className="col-span-12">

            <Charts />
          </div>
          <div className="col-span-12">
            <h1 className="text-2xl font-black">Transactions</h1>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <CardTable />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <CardNFT />
          </div>
          <div className="col-span-12">
            <div className="py-3">
              <h1 className="text-2xl font-black">Network Visualization</h1>
            </div>
            <NodeGraph />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
