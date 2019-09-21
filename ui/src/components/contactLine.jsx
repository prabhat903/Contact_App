import React, { Component } from 'react';
/**************
 * One Row of the Contact List....
 */
class ContactLine extends Component {
    constructor(props) {
        super(props);
        this.openContact = this.openContact.bind(this);
        this.deleteContact = this.deleteContact.bind(this); 
    }
    render() {
        let { firstName,
            lastName,
            email,
            phoneNum,
            isActive } = this.props.contact;
        return (
            <>
                <tr>
                    <td>{firstName} {lastName}</td>
                    <td>{email}</td>
                    <td>{phoneNum}</td>
                    <td>{isActive?"Active":"In-Active"}</td>
                    <td>
                        <button onClick={this.openContact}>Open</button>
                        <button onClick={this.deleteContact}>Delete</button>
                    </td>
                </tr>
            </>
        );
    }
    // Open contact..
    openContact(){
        this.props.openContact(this.props.contact.id);
    }
    // delete Contact...
    deleteContact(){
        this.props.deleteContact(this.props.contact.id);
    }
}

export default ContactLine;