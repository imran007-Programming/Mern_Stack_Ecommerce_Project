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
   <ReactLoading type="spin" color="white" height={40} width={40} />

  </div>
  )
}

export default Loading