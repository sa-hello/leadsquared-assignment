import React from 'react'
import { Draggable } from 'react-beautiful-dnd';


export default class Tab extends React.Component {
    onClick = (e) => {
        if(e.target.className !== "tab-close") {
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
    
        let className = 'tab-list-item';
    
        // if (activeTab === label) {
        if (activeTab === tabNum) {
          className += ' tab-list-active';
        }
    
        return (
            <Draggable draggableId={tabNum} index={index}>
                {(provided) => (
                    <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={className}
                        onClick={onClick}
                    >
                        {label}
                        <span onClick={() => this.closeTab(tabNum)} className="tab-close">x</span>
                    </li>
                )}
            </Draggable>
        );
    }
}