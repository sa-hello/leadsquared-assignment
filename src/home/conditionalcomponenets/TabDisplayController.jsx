import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd';

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
            activeTab: "tab-" + 1,
            tabCount: 3,
            totalCount: 3,
        }

        this.tabState = {}
        this.createTabs = this.createTabs.bind(this);
        this.closeTabItem = this.closeTabItem.bind(this);
        this.confirmCloseTabItem = this.confirmCloseTabItem.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.setActiveTab = this.setActiveTab.bind(this);
        this.getTabCount = this.getTabCount.bind(this);
        this.getTotalCount = this.getTotalCount.bind(this);
        this.addNewTab = this.addNewTab.bind(this);

        this.onDragEnd = this.onDragEnd.bind(this);
    }

    componentWillMount() {
        this.createTabs()
    }
    
    getTabCount() {
        return this.state.tabCount
    }
    
    getTotalCount() {
        return this.state.totalCount
    }

    addNewTab() {
        let tabNum = this.getTotalCount() + 1

        this.tabState["tab-" + tabNum] = {
            "label": "tab" + tabNum,
            "key": tabNum - 1,
            "tabNum": "tab-" + tabNum,
            "tabContent": "Content Placeholder here. Tab number is " + tabNum
        }; 

        const { tabList } = this.state
        let isTabListEmpty = tabList.length > 0 ? false : true 

        tabList.push(
            <TabElement key={tabNum} 
                tabNum={"tab-" + tabNum} 
                tabContent={"Content Placeholder here. Tab number is " + tabNum}
                label={"tab" + tabNum}
                index={tabNum}
            />
        )

        const tabCount = tabList.length

        if(isTabListEmpty) {
            this.setState({
                tabList, 
                tabCount, 
                totalCount: tabNum, 
                activeTab: "tab-" + tabNum
            })
        } else {
            this.setState({
                tabList, 
                tabCount, 
                totalCount: tabNum
            })
        }
    }

    createTabs(tabCount=this.state.tabCount) {
        const tabList = []
        const tabState = {}
        
        // if initializes data 
        if(Object.keys(this.tabState).length > 0) {
            for(let tab in this.tabState) {
                tabList.push(
                    <TabElement key={this.tabState[tab]['key']} 
                        tabNum={this.tabState[tab]['tabNum']} 
                        tabContent={this.tabState[tab]['tabContent']}
                        label={this.tabState[tab]['label']}
                        index={this.tabState[tab]['key']+1}
                    />
                )
            }

        } else {
            for(let i= 0; i< tabCount; i++) {
                let label = "tab" + (i+1)
    
                tabState["tab-" + (i+1)] = {
                    "label": label,
                    "key": i,
                    "tabNum": "tab-" + (i+1),
                    "tabContent": "Content Placeholder here. Tab number is " + (i+1)
                }; 

                tabList.push(
                    <TabElement key={i} 
                        // tabNum={i+1} 
                        tabNum={"tab-" + (i+1)} 
                        tabContent={"Content Placeholder here. Tab number is " + (i+1)}
                        label={"tab" + (i+1)}
                        index={i+1}
                    />
                )
            }
            this.tabState = tabState
        }

        this.setState({tabList})
    }

    openModal() {
        this.setState({showModal: true})
    }

    closeModal() {
        this.setState({showModal: false})
    }

    confirmCloseTabItem(tabNum) {
        this.setState({showModal: true, deleteTab: tabNum})
    }
    
    closeTabItem() {
        delete this.tabState[this.state.deleteTab]

        // set active tab to 1st tab if active tab is deleted
        if(this.state.deleteTab === this.state.activeTab) {
            this.setState({
                deleteTab: undefined, 
                showModal: false, 
                activeTab: Object.keys(this.tabState)[0], 
                tabCount: this.getTabCount() - 1
            }, () => {
                this.createTabs()
            })
        } else {
            this.setState({
                deleteTab: undefined, 
                showModal: false, 
                tabCount: this.getTabCount() - 1
            }, () => {
                this.createTabs()
            })
        }
    }

    setActiveTab(activeTab) {
        this.setState({activeTab})
    }

    onDragEnd(result) {
        const { destination, source, draggableId } = result
        // console.log(result)
        
        /* return if drog and drop on the same position or
         * destination outside of context
         */
        if(!destination) return
        
        let sourceKey = source.index
        let destinationKey = destination.index

        if(sourceKey === destinationKey) return
        
        // reorder by changing position of current tabState key array
        let tempObj = Object.assign({}, this.tabState)
        let dummy = {}
        const existingOrder = Object.keys(tempObj)
        const newOrder = Array.from(existingOrder)
        newOrder.splice(sourceKey, 1)
        newOrder.splice(destinationKey, 0, draggableId)

        for(let key of newOrder) {
            dummy[key] = tempObj[key]
        }

        this.tabState = Object.assign({}, dummy)
        this.createTabs();
    }

    
    render() {
        let modalBodyText = "Do you really want to delete this tab. The information will be lost forever!"
        let tabStateKeys = Object.keys(this.tabState)
        
        return (
            <div className="navigation">
                <h1 className="navigation__header">Demo Navigation</h1>

                <DragDropContext onDragEnd={this.onDragEnd}>
                    
                    <Tabs activeTab={this.state.activeTab} 
                        closeTabItem={this.confirmCloseTabItem} 
                        setActiveTab={this.setActiveTab}
                        addNewTab={this.addNewTab}
                        tabCount={this.state.tabCount}
                        firstTab={tabStateKeys[0]}
                        lastTab={tabStateKeys[tabStateKeys.length - 1]}
                    > 
                        {this.state.tabList}
                    </Tabs> 

                </DragDropContext>
                
                {this.state.showModal 
                    ? <Modal headerText={"Delete " + this.state.deleteTab + " ?"}  
                        modalBody={modalBodyText}
                        confirmButton={true}
                        confirmButtonText={"Delete"}
                        confirmButtonAction={this.closeTabItem}
                        closeButtonAction={this.closeModal}
                    />
                    : null
                }
            </div>
        )
    }
}