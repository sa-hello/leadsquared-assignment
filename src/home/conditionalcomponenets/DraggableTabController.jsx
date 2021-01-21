import React from 'react'

import TabDisplayController from './TabDisplayController'


export default class DraggableTabController extends React.Component {
    render() {
        return (
            <TabDisplayController {...this.state} 
                addNewTab={this.addNewTab}
                closeTabItem={this.deleteTab}
            />
        )
    }
}