import React, { Component } from 'react';
import { CreateContact, isFormValid } from '../helpers/createContact';
import { List, Tab } from '../helpers/EventBus';
import { Get, Post, Update } from '../helpers/connect';
import Loading from './loading';
/***********
 * Form to create Contact.....
 */
class Contact extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.submitUser = this.submitUser.bind(this);
        this.close = this.close.bind(this);
        this.cancel = this.cancel.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNum: "",
            isActive: true,
            id: "",
            isFromValid: false,
            errorFields: {},
            readMode: true,
            loading:true
        }
    }
    /*************
     * Get Detials of the form open...
     *********/
    componentDidMount() {
        if (this.props.id != 'new') {
            let getContact = Get({
                action: 'contact/' + this.props.id
            });
            getContact.then((data) => {
                let contact = new CreateContact(data);
                this.setState((previousState) => {
                    return { ...contact ,loading: false}
                });
                Tab.emit('setName',{id:this.props.tabId,name:`Contact: ${contact.firstName}`});
            },
            (error)=>{
                alert(error);
                this.setState({loading:false})
            })
        } else {
            this.setState({ id: 'new', readMode: false ,loading:false})
        }
    }
    render() {
        let { firstName, lastName, isActive, email, phoneNum, errorFields, readMode, id ,loading} = this.state;
        if (loading) {
            return <Loading></Loading>
        } else {
            return (<>
                <form name="userForm" className="userForm">
                    <div>
                        <label><span>First Name <span className="mand">*</span> :</span>
                            {readMode ?
                                <span>{firstName}</span> :
                                <input type="text" value={firstName} name="firstName" onChange={this.handleChange}></input>
                            }</label>
                        <div className="error">{errorFields['firstName']}</div>
                    </div>
                    <div>
                        <label><span>Last Name <span className="mand">*</span> :</span>
                            {readMode ?
                                <span>{lastName}</span> :
                                <input type="textx" value={lastName} name="lastName" onChange={this.handleChange}></input>
                            }</label>
                        <div className="error">{errorFields['lastName']}</div>
                    </div>
                    <div>
                        <label><span>Email : </span>
                            {readMode ?
                                <span>{email}</span> :
                                <input type="email" value={email} name="email" onChange={this.handleChange}></input>
                            }</label>
                        <div className="error">{errorFields['email']}</div>
                    </div>
                    <div>
                        <label><span>Phone Number <span className="mand">*</span> :</span>
                            {readMode ?
                                <span>{phoneNum}</span> :
                                <input type="number" value={phoneNum} name="phoneNum" onChange={this.handleChange}></input>
                            }</label>
                        <div className="error">{errorFields['phoneNum']}</div>
                    </div>
                    <div>
                        <label><span>Status : </span>
                            {readMode ?
                                <span>{isActive ? 'Active' : "In-Active"}</span> :
                                <input type="checkbox" checked={isActive} name="isActive" onChange={this.handleChange}></input>
                            }</label>
                    </div>
                </form >
                <div className="actionButton">
                    {readMode || id == 'new' ? <button onClick={this.close}>Close</button> :
                        <button onClick={this.cancel}>Cancel</button>}
                    {readMode ? <button onClick={this.onEdit}>Edit</button> :
                        <button type="submit" onClick={this.submitUser}>Save</button>
                    }
                </div>
            </>
            )
        }
    }
    // enabling Edit...
    onEdit(event) {
        this.setState(previousState => {
            return { readMode: false }
        })
    }
    //close Edit view and.....
    cancel(event) {
        this.setState(previousState => {
            return { readMode: true }
        })
    }
    /************
     * Handle change in the input fields and inline Rule checks...
     *******/
    handleChange(event, e) {
        var name = event.target.name,
            value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({ [name]: value });
        this.setState(previousState => {
            let { errorObj } = isFormValid({ [name]: value });
            return { errorFields: { ...previousState.errorFields, ...errorObj } }
        });
    }
    /**************
     * Check validation of the contact details and request update...
     ******/
    submitUser(event) {
        this.setState(previousState => {
            let { errorObj, errorFlag } = isFormValid(this.state);
            return {
                errorFields: errorObj, isFromValid: !errorFlag
            }
        }, () => {
            if (this.state.isFromValid) {
                this.createUser(new CreateContact(this.state));
            } else alert('Please fill the mandatory fields to proceed!!');
        });
    }
    /********
     * Close of the open tab...
     * ************ */
    close(event) {
        Tab.emit('closeTab', { id: this.props.tabId });
    }
    /************ 
     * Server Requestes to to update and create base on Id... 
     * *************/
    createUser(user) {
        if (this.state.id == 'new') {
            Post({
                action: 'contact',
                data: user
            }).then((response) => {
                alert('Contact Created');
                this.setState((previousState) => {
                    return { id: response._id }
                }, this.cancel)
                List.emit('updateList', undefined, () => {
                    Tab.emit('switchTab', 'tab1');
                    this.close();
                });
            }).catch(error => {
                alert('Error While Creating', error);
            })
        } else {
            Update({
                action: 'contact/' + this.state.id,
                data: user
            }).then(() => {
                alert('Contact Updated');
                this.cancel();
                List.emit('updateList');
            }).catch(error => {
                alert('Error While Updating', error);
            })
        }
    }
}
export default Contact;