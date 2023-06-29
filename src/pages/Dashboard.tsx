import { Toggle } from "@fluentui/react";
import { useState } from "react";

export default function Dashboard() {

    const [isEnabled, setIsEnabled] = useState(false);

    const _masterSwitchOnChange = (event: React.MouseEvent<HTMLElement>, checked?: boolean) => {
        setIsEnabled(checked ?? false);
    }

    return (
        <>
            <h1>Dashboard</h1>
            <Toggle 
                label="Master Switch" 
                onText="On" 
                offText="Off" 
                onChange={_masterSwitchOnChange} 
            />
            <h3>type: {isEnabled.toString()}</h3>
        </>
    );
}

