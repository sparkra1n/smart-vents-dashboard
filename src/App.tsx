import React, { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import History from "./pages/History";

interface IAppProps {}

interface IVentData {}

function App(props: IAppProps) {
  const [ventData, setVentData] = useState<IVentData>();

  useEffect(() => {
    fetchVentData().then((ventData) => setVentData(ventData));
  }, [props]);

  console.log(ventData); 

  return (
    <>
      <Dashboard />
      <Rooms />
      <History />
    </>
  );
}

export const fetchVentData = async () => {
  const data = await fetch("http://smart-vents-api.azurewebsites.net/Thermostat/VentData");
  return await data.json();
};

export default App;
