import React from 'react'
import { Droppable } from 'react-beautiful-dnd';

import Tab from '../presentationcomponents/Tab'


export default class Tabs extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            activeTab: "tab-1",
        };
    }
    
    onClickTabItem = (tab) => {
        this.setState({ activeTab: tab });
        this.props.setActiveTab(tab)
    }

    closeTabItem = (tab) => {
        this.props.closeTabItem(tab)
    }

    showChevronAtTab = () => {
        if (window.screen.availWidth > 650) {
            return 4;
        } else {
            return 2;
        }
    }


    render() {
        // console.log(this)

        const { onClickTabItem, props: { children, activeTab } } = this;
        const showChevronAtTabNumber = this.showChevronAtTab()

        return (
            <div className="navigation__tab_overlay">
                <div className="navtabs">
                    {this.props.tabCount > showChevronAtTabNumber && 
                        this.props.firstTab !== this.props.activeTab
                        ? <p className="chevron chevron_left">&#x3c;</p>
                        : <span className="chevron_placeholder"></span>
                    }
                    
                    <Droppable droppableId="droppable-nav" direction="horizontal">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                // style={snapshot.isDraggingOver ? {background: 'red'} : {background: 'var(--nav-background)'}}
                            >
                                <ol className="tab_list">
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
                    
                    {this.props.tabCount > showChevronAtTabNumber && 
                        this.props.lastTab !== this.props.activeTab
                        ? <p className="chevron chevron_right">&#x3e;</p>
                        : null
                    }
                    
                    {this.props.tabCount < 10 
                        ? <h1 className="add_tab_button" onClick={this.props.addNewTab}>+</h1>
                        : null
                    }
                </div>

                <div className="navtab_content">
                    {children.map((child) => {
                        if (child.props.tabNum !== activeTab) return undefined;
                            return child.props.tabContent;
                        })
                    }
                </div>
            </div>
        );
    }
}