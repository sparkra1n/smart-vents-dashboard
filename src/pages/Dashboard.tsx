import { ChangeEvent, useState } from "react";
import Switch from "@mui/material/Switch";

const Dashboard = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  // const _masterSwitchOnChange = (event: React.ChangeEvent<HTMLElement>, checked?: boolean) => {
  //   setIsEnabled(checked ?? false);
  // };

  return (
    <>
      {/* <h1>Master</h1>
      <Switch onChange={_masterSwitchOnChange} />
      <h3>type: {isEnabled.toString()}</h3> */}
    </>
  );
};

export default Dashboard;
