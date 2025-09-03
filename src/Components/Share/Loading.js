import React from 'react'
import ReactLoading from "react-loading";
const Loading = ({margin}) => {
  return (
    <div
 
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <ReactLoading className={`${margin}`}  type="bars" color="black" />
  </div>
  )
}

export default Loading