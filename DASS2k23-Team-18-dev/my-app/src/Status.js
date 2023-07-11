import React, { Fragment, useEffect, useState, useContext } from 'react'
import { useMqttState, useSubscription } from 'mqtt-react-hooks';
import { none } from 'ol/centerconstraint';
// import SwarmContext from './Context/SwarmContext'

const NO_OF_DRONES_IN_A_SWARM=6;
const NO_OF_DEBRIS_PER_SWARM=1;
let NO_OF_DEBRIS=0;

function simulateDrone(i){
    const x=0.1*(i**2)*Math.random()
    const y=0.1*(i**2)*Math.random()
    return [x,y]
} 

function moveSwarmFunction(){
    const lati=(17.452506-17.229646)/5000
    const long=0
    // (78.483854-78.414775)/1000 
    return [lati,long]
}

export default function Status() {
    
    const { client, connectionStatus } = useMqttState();
    // const [moveSwarm,stopSwarm]=useState(true);

    // setInterval(()=>{
    //     stopSwarm(localStorage.getItem("moveSwarm"))
    // },1000)

    // useEffect(()=>{
    //     console.log(moveSwarm)
    // },[moveSwarm])
        

    let lat=[17.22858, 17.22878, 17.22897]
    let lon=[78.414775, 78.428539, 78.442474]

    const simulateSwarms =(i)=>{
        let coordinates=moveSwarmFunction()
        lon[i]+=coordinates[0]
        lat[i]+=coordinates[1]

        for(let j=0; j<NO_OF_DRONES_IN_A_SWARM; j++){
            let drone_id=NO_OF_DRONES_IN_A_SWARM*i + (j+1)
            coordinates={id:drone_id ,lonlat:[lon[i] + 0.000003*j,lat[i] + 0.00001*j], battery: 100}
            client.publish(`drone/${drone_id}`,JSON.stringify(coordinates), { qos: 1, retain: false })
            // console.log(coordinates)
        }
    }

    function simulateDebris(i){
        for(let j=0; j<NO_OF_DEBRIS_PER_SWARM; j++){
            let coordinates={id: `debri/${++NO_OF_DEBRIS}`,lonlat:[lon[i] + 0.000007*Math.random(),lat[i] + 0.00006*Math.random()]}
            if(Math.random()>0.8){
                client.publish(`debri/${NO_OF_DEBRIS}`,JSON.stringify(coordinates), { qos: 1, retain: false })
            }
            // console.log(coordinates)
        }
    }
    
    // //Reconnecting to the broker
    // client.on('reconnect', function () {
    //     console.log('Reconnecting...')
    // });
    
    
    // //Closing the connection
    // client.on('close', function () {
    //     console.log('Disconnected')
    // });
    
    // //Error
    // client.on('error', function (error) {
    //     console.log(error)
    // });
    
    
    // //Received a message
    // client.on('message', (topic, message, packet) => {
    //     console.log('Received Message :', topic, message.toString())
    // });
    
    // //Publish the co-ordinate to a drone
    // function publish(drone,message){
    //     client.publish(drone, message, { qos: 1, retain: false }, function (error) {
    //     if (error) {
    //       console.log(error)
    //     }
    //   })
    // }

    // console.log(connectionStatus)
    // console.log(moveSwarm)
    if(connectionStatus==='Connected'){
        setInterval(()=>{
            // console.log(moveSwarm)
            for(let i=0; i<3; i++){
                simulateSwarms(i)
                simulateDebris(i)
                // moveSwarm=localStorage.getItem("moveSwarm")
            }
        },1000)
    }
            
            
    // useEffect(() => {
    //     if (message) {
    //         //setMessages((msgs: any) => [...msgs, message]);
    //         console.log(message.topic,message.message)
    //     }
    // }, [message]);
                
    return <Fragment></Fragment>
}