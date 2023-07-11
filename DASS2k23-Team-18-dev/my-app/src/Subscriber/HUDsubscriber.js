import React, { Fragment } from 'react';
import { useState } from 'react';
import { useSubscription } from 'mqtt-react-hooks';

const HUDsubscriber = ({ topics, currDroneID }) => {
    const { message } = useSubscription(topics);
    const [droneInfo, setDroneInfo] = useState(null)

    let data;

    //console.log(message)
    if (message) {
        let unchecked_data = JSON.parse(message.message);
        if (unchecked_data.id == currDroneID) {
            data = unchecked_data
        }
        // console.log(1, droneInfo);
        // console.log(2, data);
        // console.log(3, message);
    }

    return (
            <div className='table-info'>
                <table>
                    <tbody>
                    <tr>
                        <th>Swarm ID:</th>
                        <td>{data && data.id}</td>
                    </tr>
                    <tr>
                        <th>GPS Data: </th>
                        <td>{data && data.lonlat[0]}, {data && data.lonlat[1]}</td>
                    </tr>
                    <tr>
                        <th>Battery Level:</th>
                        <td>{data && data.battery}</td>
                    </tr>
                    <tr>
                        <th>Altitude:</th>
                        <td>{data && data.altitude}</td>
                    </tr>
                    <tr>
                        <th>Climb (m/s):</th>
                        <td>{data && data.climb}</td>
                    </tr>
                    <tr>
                        <th>Pitch:</th>
                        <td>{data && data.pitch}</td>
                    </tr>
                    <tr>
                        <th>Roll:</th>
                        <td>{data && data.roll}</td>
                    </tr>
                    <tr>
                        <th>Yaw:</th>
                        <td>{data && data.yaw}</td>
                    </tr><tr>
                        <th>Voltage:</th>
                        <td>{data && data.voltage}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
    );
}

export default HUDsubscriber;
