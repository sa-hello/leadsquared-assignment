import React from 'react'
import { Draggable } from 'react-beautiful-dnd';


export default class Tab extends React.Component {
    onClick = (e) => {
        if(e.target.className !== "tab_close") {
            const { tabNum, onClick } = this.props;
            onClick(tabNum);
        }
    }

    closeTab = (tabNum) => {
        this.props.closeTabItem(tabNum)
    }
    
    render() {
        // console.log(this.props)

        const { onClick, props: { activeTab, label, tabNum, index } } = this;
        let className = 'tab_list_item';
    
        if (activeTab === tabNum) {
          className += ' tab_list_active';
        }
    
        return (
            <Draggable draggableId={tabNum} index={index}>
                {(provided, snapshot) => (
                    <li ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={className}
                        onClick={onClick}
                        // style={snapshot.isDragging ? {background: 'red'} : {background: 'white'}}
                    >
                        {label}
                        <span onClick={() => this.closeTab(tabNum)} className="tab_close">x</span>
                    </li>
                )}
            </Draggable>
        );
    }
}