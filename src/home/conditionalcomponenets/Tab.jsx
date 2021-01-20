import React from 'react'


export default class Tab extends React.Component {
    onClick = (e) => {
        if(e.target.className !== "tab-close") {
            const { tabNum, onClick } = this.props;
            onClick(tabNum);
        }
    }

    closeTab = (tabNum) => {
        this.props.closeTabItem(tabNum - 1)
    }
    
    render() {
        const { onClick, props: { activeTab, label, tabNum } } = this;
        // console.log(this.props)
    
        let className = 'tab-list-item';
    
        // if (activeTab === label) {
        if (activeTab === tabNum) {
          className += ' tab-list-active';
        }
    
        return (
            <li
                className={className}
                onClick={onClick}
            >
                {label}
                <span onClick={() => this.closeTab(tabNum)} className="tab-close">x</span>
            </li>
        );
    }
}