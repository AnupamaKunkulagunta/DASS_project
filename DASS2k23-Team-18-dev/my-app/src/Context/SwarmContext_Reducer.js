import React, { createContext, useReducer, useContext } from "react";
import { SwarmReducer } from "../reducer/SwarmReducer";

//* The initial state
const InitialState = { currSwarmID: 1 , moveSwarm: true , isLoading: false, error: null };

//* Create context
export const SwarmContext = createContext(InitialState);

//* The context provider
const SwarmProvider = ({ children }) => {
   const [state, dispatch] = useReducer(SwarmReducer, InitialState);

   const setCurrSwarmID = (id) => {
      dispatch({
         type: 'SET_SWARM_ID',
         payload: id,
      })
   }

   const stopSwarm=(val)=>{
      dispatch({
         type: 'STOP_SWARM',
         payload: val,
      })
   }


//    const fetchSubreddit = async (name) => {
//       dispatch({
//          type: 'GET_SUB'
//       })
//       try {
//          const response = await axios.get(`/api/subreddit/g/${name}`);
//          const subreddit = response.data;
//          console.log(subreddit);
//          dispatch(
//             {
//                type: "SET_SUB_SUCCESS",
//                payload: subreddit,
//             }
//          )
//       } catch (err) {
//          console.log("ERROR");
//          if (err.response) {
//             console.log(err.response.data);
//             console.log(err.response.status);
//             console.log(err.response.headers);
//             dispatch({
//                type: "SET_SUB_FAILURE",
//                payload: err.response.data
//             })
//          } else if (err.request) {
//             console.log(err.request);
//          } else {
//             console.log("Error", err.message);
//          }
//       }
//    }
   return (
      <div>
         <SwarmContext.Provider
            value={{ ...state, dispatch, setCurrSwarmID, stopSwarm}}>
               {children}
         </SwarmContext.Provider>
      </div>
   );
};

export default SwarmProvider;

