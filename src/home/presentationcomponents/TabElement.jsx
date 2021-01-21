import React from 'react'


export default function TabElement (props) {
    return (
        <div key={props.tabNum} label={"tab" + props.tabNum}> 
            {props.tabContent}  
        </div> 
    )
}