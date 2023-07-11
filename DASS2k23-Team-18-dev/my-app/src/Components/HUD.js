import React, { useState, useEffect, useContext } from "react";

import SwarmControls from "./SwarmControls";
import SwarmDropDown from "./SwarmDropDown";
import SwarmInformation from "./SwarmInformation";


// import Waypoints from "./Waypoints";

const HUD = ({source, ID=null}) => {   
    return (
      <div>
       <div className="responsive">
            <SwarmDropDown source={source} ID={ID} />
            {/* <div style={{ float: 'right' }}> */}
            {/* <Subscriber topics={['drones/tasks', 'drones/locations', 'drones/waypoints', 'ports/location']} /> */}
            {/* </div> */}
            <br/>
            <SwarmControls />
            <SwarmInformation />
        </div>
      <div style={{ float: "right" }}>
        <Subscriber
          topics={[
            "drones/tasks",
            "drones/locations",
            "drones/waypoints",
            "ports/location",
          ]}
        />
      </div>
      <br/>
      <br/>
      <table className="hud" style={{ height:"21vh", left: "0" }}>
        <tr className="hud-tr">
          {/* <th width="18%" className="hud-th">Left Joystick</th> */}
          <th className="hud-th">Swarm Control Panel</th>
        </tr>
        <tr className="hud-tr">
          
          <td className="hud-td">
            {/* Drone Controls */}
            <Publisher
              classname="hud-bt"
              topic="drones/tasks"
              message={JSON.stringify({ id: currDroneID, task: "take off" })}
              text="Take Off"
            />
            <Publisher
              classname="hud-bt"
              topic="drones/tasks"
              message={JSON.stringify({
                id: currDroneID,
                task: "start mission",
              })}
              text="Start Mission"
            />
            <Publisher
              classname="hud-bt"
              topic="drones/tasks"
              message={JSON.stringify({
                id: currDroneID,
                task: "stop mission",
              })}
              text="Stop Mission"
            />
            <br/>
            <Publisher
              classname="hud-bt"
              topic="drones/tasks"
              message={JSON.stringify({ id: currDroneID, task: "return home" })}
              text="Return to Home"
            />
            <Publisher
              classname="hud-bt"
              topic="drones/tasks"
              message={JSON.stringify({ id: currDroneID, task: "start scan" })}
              text="Start Scan"
            />
            <Publisher
              classname="hud-bt"
              topic="drones/tasks"
              message={JSON.stringify({ id: currDroneID, task: "end scan" })}
              text="End Scan"
            />
          </td>
        </tr>
        <tr className="hud-tr"></tr>
      </table>
      <table className="hud" style={{ bottom: "0", right: "0" }}>
        <tr className="hud-tr">
          <th className="hud-th">FOD Gallery</th>
        </tr>
        <tr className="hud-tr">
          <td className="hud-td">
            <HUDsubscriber topics={["drones/info"]} currDroneID={currDroneID} />
          </td>
        </tr>
        <tr className="hud-tr"></tr>
      </table>
    </div>
  );
};

export default HUD;
