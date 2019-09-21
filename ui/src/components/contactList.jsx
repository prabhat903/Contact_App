import React, { Component } from 'react';
import ContactLine from './contactLine';
import { Get, Delete } from '../helpers/connect';
import { CreateContact } from '../helpers/createContact';
import { List, Tab } from '../helpers/EventBus';
import Loading from './loading';

/*************
 * Tabular List of the Contacts....
 */
class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rawList: [],
            contacts: [],
            pages: [""],
            currentPage: 1,
            pageSize: 5,
            records: 0,
            filter: 'all',
            loading: true
        }
        List.on('updateList', this.getContactList.bind(this));
        this.openContact = this.openContact.bind(this)
        this.deleteContact = this.deleteContact.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.sizeChange = this.sizeChange.bind(this);
    }
    render() {
        return (
            <>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th><span>Status</span>
                                <select className="filter" value={this.state.filter} onChange={this.onFilter}>
                                    <option value="all">All</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">In-Active</option>
                                </select>
                            </th>
                            <th>Actions</th>
                        </tr>
                        {this.listContact()}
                    </tbody>
                </table>
                <div className="paggination">
                    <button onClick={this.prevPage.bind(this)}> Prev </button>
                    <span>{this.state.currentPage}</span>
                    <button onClick={this.nextPage.bind(this)}>Next</button>
                    <span>Total Pages : {this.state.pages.length - 1}</span>
                    <select value={this.state.pageSize} onChange={this.sizeChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                    <span>Total contacts : {this.state.records}</span>
                </div>
            </>
        );
    }
    /***********
     * iteregate Over List of contact loading and No data....
     */
    listContact() {
        if (!this.state.contacts.length) return (<tr>
            <th className="noData" colSpan="5">{this.state.loading ? <Loading></Loading> : 'No Contact Found !!'}</th>
        </tr>)
        return this.state.contacts.map(ele => {
            return (
                <ContactLine key={ele._id} contact={ele} openContact={this.openContact} deleteContact={this.deleteContact}></ContactLine>
            )
        })
    }
    /************
     * Delete Contact server request...
     */
    deleteContact(id) {
        Delete({
            action: 'contact/' + id
        }).then((response) => {
            alert(response.message);
            this.getContactList()
        },
            (error) => {
                alert(error);
            });
    }
    /***********
     * Open the contact tab...
     */
    openContact(id) {
        Tab.emit('addTab', {
            id
        });
    }
    /**********
     * getContact Server Request...
     * sorted By create date...
     */
    getContactList() {
        Get({
            action: 'contact'
        }).then(data => {
            let list = data.sort((a, b) => {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });
            this.setState(previousState => {
                return { rawList: list.map(ele => new CreateContact(ele)), loading: false }
            }, this.setPagging);
        }, (error) => {
            alert(error);
            this.setState({ loading: false });
        });
    }
    componentDidMount() {
        this.getContactList();
    }
    /***************
     * Create Pagging basded on finlter and pageSize...
     */
    setPagging() {
        this.setState(previousState => {
            let { rawList: list, pageSize, filter } = previousState,
                pages = [], totalPages, records;
            list = list.filter(ele => {
                switch (filter) {
                    case 'all': return true
                    case 'active': return ele.isActive;
                    case 'inactive': return !ele.isActive
                }
            });
            records = list.length;
            totalPages = Math.ceil(list.length / pageSize);
            for (let i = 1; i <= totalPages; i++) {
                pages[i] = list.splice(0, pageSize);
            }
            return { pages, contacts: pages[1] || [], records, currentPage: 1 }
        });
    }
    /*************
     * on filtering The status of the Contacts....
     */
    onFilter(event) {
        this.setState({ filter: event.target.value }, this.setPagging);
    }
    /************
     * pagging to next page....
     */
    prevPage() {
        if (this.state.currentPage == 1) return;
        this.setState(previousState => {
            let newPageNum = previousState.currentPage - 1;
            return {
                currentPage: newPageNum, contacts: previousState.pages[newPageNum]
            }
        })
    }
    /***********
     * pagging to previous page....
     */
    nextPage() {
        let pagesLength = this.state.pages.length - 1;
        if (this.state.currentPage >= pagesLength) { return };
        this.setState(previousState => {
            let newPageNum = previousState.currentPage + 1;
            return {
                currentPage: newPageNum, contacts: previousState.pages[newPageNum]
            }
        })
    }
    /**********
     * on change of page size....
     */
    sizeChange(event) {
        this.setState({ pageSize: event.target.value }, this.setPagging);
    }
}

export default ContactList;