import React from 'react'

import Tabs from './Tabs'
import TabElement from '../presentationcomponents/TabElement'
import Modal from '../../sharedmodules/CommonModal'


export default class TabDisplayController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabList: [],
            showModal: false,
            deleteTab: undefined,
            activeTab: 1,
            tabCount: 3
        }

        this.tabState = {}
        this.createTabs = this.createTabs.bind(this);
        this.closeTabItem = this.closeTabItem.bind(this);
        this.confirmCloseTabItem = this.confirmCloseTabItem.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.setActiveTab = this.setActiveTab.bind(this);
        this.getTabCount = this.getTabCount.bind(this);
        this.addNewTab = this.addNewTab.bind(this);
    }

    componentWillMount() {
        this.createTabs()
    }

    getTabCount() {
        return this.state.tabCount
    }

    addNewTab() {
        let tabNum = this.getTabCount() + 1
        console.log('add tabnum ', tabNum)

        this.tabState[this.state.tabCount] = {
            "label": "tab" + tabNum,
            "key": tabNum,
            "tabNum": tabNum,
            "tabContent": "This is content. Tab  no is = " + tabNum
        }; 

        const { tabList } = this.state

        tabList.push(
            <TabElement key={tabNum} 
                tabNum={tabNum} 
                tabContent={"This is content. Tab  no is = " + tabNum}
                label={"tab" + tabNum}
            />
        )

        this.setState({tabList, tabCount: tabNum})
    }

    createTabs(tabCount=this.state.tabCount) {
        const tabList = []
        const tabState = {}
        
        
        if(Object.keys(this.tabState).length > 0) {
            for(let tab in this.tabState) {
                tabList.push(
                    <TabElement key={this.tabState[tab]['key']} 
                        tabNum={this.tabState[tab]['tabNum']} 
                        tabContent={this.tabState[tab]['tabContent']}
                        label={this.tabState[tab]['label']}
                    />
                )
            }

        } else {
            for(let i= 0; i< tabCount; i++) {
                let label = "tab" + (i+1)
    
                tabState[i] = {
                    "label": label,
                    "key": i,
                    "tabNum": i+1,
                    "tabContent": "This is content. Tab  no is = " + (i+1)
                }; 
    
                tabList.push(
                    <TabElement key={i} 
                        tabNum={i+1} 
                        tabContent={"This is content. Tab  no is = " + (i+1)}
                        label={"tab" + (i+1)}
                    />
                )
            }
            this.tabState = tabState
        }

        this.setState({tabList})
        // return tabList
    }

    openModal() {
        this.setState({showModal: true})
    }

    closeModal() {
        this.setState({showModal: false})
    }

    confirmCloseTabItem(tabNum) {
        console.log('dete tab', tabNum)
        this.setState({showModal: true, deleteTab: tabNum})
    }
    
    closeTabItem() {
        console.log("tab num", this.state.deleteTab, this.state.activeTab - 1)
        delete this.tabState[this.state.deleteTab]
        if(this.state.deleteTab === this.state.activeTab - 1) {
            this.setState({deleteTab: undefined, showModal: false, activeTab: 1, tabCount: this.getTabCount() - 1})
        } else {
            this.setState({deleteTab: undefined, showModal: false, tabCount: this.getTabCount() - 1})
        }
        console.log("tab after", this.tabState)
        this.createTabs()
    }

    setActiveTab(activeTab) {
        this.setState({activeTab})
    }
    
    
    render() {
        let modalBodyText = "Do you really want to delete this tab. The information will be lost forever!"
        
        
        return (
            // <ol className="navigation__tablist">
            //     {/* <h1>&#x3c;</h1> */}
            //     {this.createTabs(this.state.tabCount)}
            //     {/* <h1>&#x3e;</h1> */}
            // </ol>
            <div className="navigation">
                <Tabs activeTab={this.state.activeTab} 
                    closeTabItem={this.confirmCloseTabItem} 
                    setActiveTab={this.setActiveTab}> 
                    {/* {this.createTabs(this.props.tabCount)} */}
                    {this.state.tabList}
                    {/* <div label="Gator" style={{color: 'white'}}> 
                        See ya later, <em>Alligator</em>! 
                    </div> 
                    <div label="Croc" style={{color: 'white'}}> 
                        After 'while, <em>Crocodile</em>! 
                    </div> 
                    <div label="Sarcosuchus" style={{color: 'white'}}> 
                        Nothing to see here, this tab is <em>extinct</em>! 
                    </div>  */}
                </Tabs> 
                {this.state.showModal 
                    ? <Modal headerText="Delete Tab?" 
                        modalBody={modalBodyText}
                        confirmButton={true}
                        confirmButtonText={"Delete"}
                        confirmButtonAction={this.closeTabItem}
                        closeButtonAction={this.closeModal}
                    />
                    : null
                }
                {this.getTabCount() < 10 
                    ? <h1 onClick={this.addNewTab}>+</h1>
                    : null
                }
            </div>
        )
    }
}