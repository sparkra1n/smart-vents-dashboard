import { ChangeEvent, useState } from "react";
import CircularSlider from "advanced-react-circular-slider";
import Switch from "@mui/material/Switch";

const Dashboard = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const _masterSwitchOnChange = (event: React.ChangeEvent<HTMLElement>, checked?: boolean) => {
    setIsEnabled(checked ?? false);
  };

  return (
    <>
      <h1>Master</h1>
      <Switch onChange={_masterSwitchOnChange} />
      <h3>type: {isEnabled.toString()}</h3>

      <CircularSlider
        labelColor="#FFF"
        hideLabelValue={true}
        // labelTop="Target Temp"
        roundLabelFontSize={"0"}
        width={300}
        min={60}
        max={80}
        step={1}
        labelStep={1}
        // appendToValue="&deg;"
        trackColor={"#242B33"}
        knobColor={"#FFF"}
        progressColorFrom="#584F8D"
        progressColorTo="#988DD4"
      />
    </>
  );
};

export default Dashboard;
