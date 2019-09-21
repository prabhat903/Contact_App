import React, { Component } from "react";
import Contact from './contactForm';
import ContactList from './contactList';
import {Tab} from '../helpers/EventBus';
/***************
 * Tabs component To handel Tab functionality...
 */
class Tabs extends Component {
  // by default Contact List tab seslected and not closebale...
  constructor(props) {
    super(props);
    this.state = {
      tabList: [
        { id: "tab1", title: "Contacts", content: ContactList },
      ],
      activeTab: "tab1"
    };
    this.tabCount = 1;
    Tab.on('addTab',this.addTab.bind(this));
    Tab.on('closeTab',this.removeTab.bind(this));
    Tab.on('switchTab',this.selectTab.bind(this));
    Tab.on('setName',this.setName.bind(this));
  }
  render() {
    let { activeTab } = this.state;
    return (
      <>
        <div className="tabHead">
          {this.state.tabList.map((ele, ind) => {
            return (
              <div
                key={ele.id}
                className={activeTab === ele.id ? "active " : ""}
                onClick={this.selectTab.bind(this, ele.id)}
              >
                <span className="tab">
                  <span>{ele.title}</span>
                  {ele.close && (
                    <button
                      className="closeTab"
                      onClick={this.removeTab.bind(this, { id: ele.id })}
                    >
                      x
                    </button>
                  )}
                </span>
              </div>
            );
          })}
          <button onClick={this.addTab.bind(this,{id:'new'})}>Create Contact</button>
        </div>
        <div className="tabContainer">
          {this.state.tabList.map((ele,ind) => (
            <div key={ele.id} className={activeTab === ele.id ? "active" : ""}>
              <ele.content {...ele.props} tabId={ele.id}></ele.content>
            </div>
          ))}
        </div>
      </>
    );
  }
  /*********
   * swithc to the tab whose Id id passed...
   */
  selectTab(id, event) {
    this.setState((previousState) => {
      let isfound = previousState.tabList.find(ele => ele.id === id);
      return isfound ? { activeTab: id } : {};
    });
  }
  /**************
   * add a new tab if tab is not present else switch to the existing one....
   */
  addTab(contactId) {  
    if (!this.checkOpen(contactId.id)) {
      this.tabCount++;
      this.setState(previousState => {
        let tabId = "tab" + this.tabCount,
          tabs = [
            ...previousState.tabList,
            {
              id: tabId,
              title: contactId.id === 'new' ? "New Contact" : "Contact",
              content: Contact,
              close: true,
              props: contactId
            }
          ];
        return { tabList: tabs, activeTab: tabId };
      });
    }
  }
  /***********
   * check for is the tab Open...
   */
  checkOpen(id) {
    let open = this.state.tabList.find(ele => ele.props&& ele.props.id == id);
    if (open) {
      this.setState(() => {
        return { activeTab: open.id }
      })
      return true;
    }
  }
  /************
   * closing of tab remove from list.....
   */
  removeTab({ id }) {
    this.tabCount++;
    this.setState(previousState => {
      let openTab = 0,
        tabs = previousState.tabList.filter((ele,ind) =>{
          if(ele.id !== id){
            return true;
          }
          openTab = ind - 1
          return false;
        })
      return { activeTab:  previousState.tabList[openTab].id, tabList: tabs };
    });
  }
  /************
   * changing of any open tab...
   */
  setName({id,name}){
    this.setState(previousState=>{
      return {tabList : previousState.tabList.map(ele=>ele.id == id?{...ele,title:name}:ele)}
    })
  }
}

export default Tabs;
