import React from 'react'

export default function TabElement (props) {
    return (
        // <div className="navigation__tablist__tab">
        //     <h1>Hello Wors! {props.tabNum}</h1>
        // </div>
        <div key={props.tabNum} label={"tab" + props.tabNum}> 
            {props.tabContent}  
        </div> 
    )
}