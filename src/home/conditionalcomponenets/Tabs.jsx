import React from 'react'

import Tab from './Tab'


export default class Tabs extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            // activeTab: this.props.children[0].props.label,
            // activeTab: this.props.children[0].props.tabNum,
            activeTab: 1,
        };
    }
    
    onClickTabItem = (tab) => {
        this.setState({ activeTab: tab });
        this.props.setActiveTab(tab)
    }

    closeTabItem = (tab) => {
        this.props.closeTabItem(tab)
    }

    render() {
        console.log(this)
        const { onClickTabItem, props: { children, activeTab } } = this;

        return (
            <div className="tabs">
                <div style={{display: 'flex'}}>
                    <h1>&#x3c;</h1>
                    <ol className="tab-list">
                        {children.map((child) => {
                        const { label, tabNum } = child.props;
            
                        return (
                            <Tab
                                activeTab={activeTab}
                                key={label}
                                label={label}
                                tabNum={tabNum}
                                onClick={onClickTabItem}
                                closeTabItem={this.closeTabItem}
                            />
                        );
                        })}
                    </ol>
                    <h1>&#x3e;</h1>
                </div>
                <div className="tab-content">
                    {children.map((child) => {
                        if (child.props.label !== activeTab) return undefined;
                            // return child.props.children;
                            return child.props.tabContent;
                        })}
                </div>
            </div>
        );
    }
}