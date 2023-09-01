import { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GraphContext = createContext();

const GraphContextProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [showAddressInformation, setShowAddressInformation] = useState(true)
  const { address: params_address } = useParams();
  useEffect(() => {
    setAddress(params_address);
  },[])
  return (
    <GraphContext.Provider
      value={{
        address,
        setAddress,
        showAddressInformation,
        setShowAddressInformation
      }}
    >
      { children }
    </GraphContext.Provider>
  );
};

const useGraphContext = () => {
    return useContext(GraphContext)
}

export { GraphContext, GraphContextProvider, useGraphContext };
