import React from 'react'

import TabDisplayController from './TabDisplayController'


export default class DraggableTabController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabCount: 3
        }

        this.getTabCount = this.getTabCount.bind(this);
        this.addNewTab = this.addNewTab.bind(this);
        this.deleteTab = this.deleteTab.bind(this);
    }

    getTabCount() {
        return this.state.tabCount
    }

    addNewTab() {
        this.setState({ tabCount: this.getTabCount() + 1 })
    }

    deleteTab() {
        this.setState({ tabCount: this.getTabCount() - 1 })
    }


    render() {
        return (
            // <div className="navigation">
                // {/* {this.state.tabCount >= 5
                //     ? <h1>&#x3c;</h1>
                //     : null
                // } */}
                <TabDisplayController {...this.state} 
                    addNewTab={this.addNewTab}
                    closeTabItem={this.deleteTab}
                />
            //     {/* {this.state.tabCount >= 5
            //         ? <h1>&#x3e;</h1>
            //         : null
            //     } */}
            //     {/* <h1 onClick={this.addNewTab}>+</h1> */}
            // {/* </div> */}
        )
    }
}