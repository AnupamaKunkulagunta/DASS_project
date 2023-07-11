import React,{useEffect, useState} from 'react'
import { Publisher } from '../Publisher'

export default function SwarmControls() {

    let currSwarmID=localStorage.getItem("currSwarmID")
    const [moveSwarm, stopSwarm]=useState(true)

    useEffect(()=>{
        localStorage.setItem("moveSwarm",moveSwarm)
    },[moveSwarm])

    function startSwarms(){
        stopSwarm(true) // =>moveDrones is true
    }

    function stopSwarms(){
        stopSwarm(false) // =>moveDrones is false
    }
  
    return (
    <>
    <table className="hud" style={{top: '10'}}>
        <thead>
        <tr className="hud-tr">
            <th width="25%" className="hud-th">Swarm Controls</th>
        </tr>
        </thead>
        <tbody>
        <tr className="hud-tr">
            <td className="hud-td">
                {/* Drone Controls */}
                <button type="button" className='hud-bt' onClick={startSwarms}>Start</button>
                <button type="button" className='hud-bt' onClick={stopSwarms}>Stop</button>
                <Publisher classname='hud-bt' topic="drones/tasks" message={JSON.stringify({ id: {currSwarmID}, task: "take off" })} text="Take Off" />
                <Publisher classname="hud-bt" topic="drones/tasks" message={JSON.stringify({ id: {currSwarmID}, task: "land" })} text="Land" />
                <Publisher classname="hud-bt" topic="drones/tasks" message={JSON.stringify({ id: {currSwarmID}, task: "arm" })} text="Arm" />
                <Publisher classname="hud-bt" topic="drones/tasks" message={JSON.stringify({ id: {currSwarmID}, task: "disarm" })} text="Disarm" />
                <Publisher classname="hud-bt" topic="drones/tasks" message={JSON.stringify({ id: {currSwarmID}, task: "expand" })} text="Expand" />
                <Publisher classname="hud-bt" topic="drones/tasks" message={JSON.stringify({ id: {currSwarmID}, task: "compress" })} text="Compress" />
                <Publisher classname="hud-bt" topic="drones/tasks" message={JSON.stringify({ id: {currSwarmID}, task: "kill" })} text="Kill" />
            </td>
        </tr>
        </tbody>
    </table>
    </>
  )
}
