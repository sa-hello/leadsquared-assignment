import React from 'react'
import { Droppable } from 'react-beautiful-dnd';

import Tab from './Tab'


export default class Tabs extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            // activeTab: this.props.children[0].props.label,
            // activeTab: this.props.children[0].props.tabNum,
            activeTab: "tab-1",
        };
    }
    
    onClickTabItem = (tab) => {
        this.setState({ activeTab: tab });
        // console.log(tab)
        this.props.setActiveTab(tab)
    }

    closeTabItem = (tab) => {
        // console.log(tab)
        this.props.closeTabItem(tab)
    }

    render() {
        // console.log(this)
        const { onClickTabItem, props: { children, activeTab } } = this;

        return (
            <div className="tabs">
                <div style={{display: 'flex'}}>
                    {/* <h1>&#x3c;</h1> */}
                    <Droppable droppableId="droppable-nav" direction="horizontal">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <ol className="tab-list">
                                    {children.map((child, index) => {
                                    const { label, tabNum } = child.props;
                        
                                    return (
                                        <Tab
                                            activeTab={activeTab}
                                            key={label}
                                            label={label}
                                            tabNum={tabNum}
                                            index={index}
                                            onClick={onClickTabItem}
                                            closeTabItem={this.closeTabItem}
                                        />
                                    );
                                    })}
                                    
                                </ol>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    {/* <h1>&#x3e;</h1> */}
                </div>
                <div className="tab-content">
                    {children.map((child) => {
                        if (child.props.tabNum !== activeTab) return undefined;
                            // return child.props.children;
                            return child.props.tabContent;
                        })}
                </div>
            </div>
        );
    }
}