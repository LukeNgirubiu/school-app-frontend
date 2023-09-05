import React from "react"
const Notifier=(props)=>{
    const color=props.type.colors
    const cls=props.type.display
  const close=()=>{
    props.close()
  }
    return(
        <div className={`alert ${color}`}>
            <h2>{props.contents}</h2>
            <button className={`close-btn ${color} ${cls}`} onClick={close}>x</button>
        </div>
    )
}
export default Notifier