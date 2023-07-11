import React from 'react';
import { useMqttState } from 'mqtt-react-hooks';

const Publisher =({topic, message, text, classname}) => {
    const { client } = useMqttState();

    const handleClick = () => {
        return client.publish(topic, message);
    }

    return (
        <button className={classname} type="button" onClick={handleClick}>
        { text }
        </button>
    );
}

export default Publisher
