module.exports = (app) => {
    const createContact = require('./contact/createContact');
    const getContact = require('./contact/getContact');
    const updateContact = require('./contact/updateContact');
    const deleteContact = require('./contact/deleteContact');

    app.post('/contact', createContact.createContact);

    app.get('/contact', getContact.findAll);

    app.get('/contact/:contactId', getContact.findOne);

    app.put('/contact/:contactId',updateContact.updateContact);

    app.delete('/contact/:contactId',deleteContact.deleteContact);
}