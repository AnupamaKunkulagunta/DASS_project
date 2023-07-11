import React from 'react';
import { useSubscription } from 'mqtt-react-hooks';

const Subscriber = ({ topics }) => {
  const { message } = useSubscription(topics);
  if (message)
  {
    var json = message.message["Task"]
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '5px', marginRight: '10px'}}>
        <span>{`TOPIC : ${message && message.topic} MESSAGE: ${message && message.message}`}</span>
      </div>
      <div>
        {json}
      </div>
    </>
  );
}

export default Subscriber;
