import NodeGraph from "./components/NodeGraph";
import CardTable from "./components/Overview/CardTable";
import Hero from "./components/Hero";
import CardWebInformation from "./components/Overview/CardWebInfo";
import Charts from "./components/Charts";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="container mx-auto">
        <div class="grid grid-cols p-5 gap-5">
          <div className="">
            <div class="py-3">
              <h1 className="text-2xl font-bold">Overview</h1>
            </div>
            <div className="grid grid-cols-12 justify-center gap-2">
              <div className="col-span-12 md:col-span-6">
                <CardWebInformation />
              </div>
              <div className="col-span-12">
                <CardTable />
              </div>
            </div>
          </div>
          <div className="">
            <div class="py-3">
              <h1 className="text-2xl font-bold">Transaction Visualization</h1>
            </div>
            <Charts />
          </div>
          <div className="">
            <div class="py-3">
              <h1 className="text-2xl font-bold">Transaction Visualization</h1>
            </div>
            <NodeGraph />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
