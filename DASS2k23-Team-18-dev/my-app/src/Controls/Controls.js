import React from "react";

const Controls = ({ children }) => {
	//console.log("from Control", children)
	let i=0;
	return <div >{children && children.map((child) => {
		return <div key={++i}>{child}</div>
	})}</div>;
};

export default Controls;
