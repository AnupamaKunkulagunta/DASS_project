import React from 'react'
import {HUDsubscriber } from "../Subscriber";

export default function SwarmInformation() {
  return (
    <div>
        <table className="hud" style={{bottom: '0'}}>
            <thead>
            <tr className="hud-tr">
                <th className="hud-th">Information Display</th>
            </tr>
            </thead>
            <tbody>
            <tr className="hud-tr">
                <td className="hud-td">
                    <HUDsubscriber topics={['drones/info']} currDroneID={1} />
                </td>
            </tr>
            </tbody>
        </table>
    </div>
  )
}
