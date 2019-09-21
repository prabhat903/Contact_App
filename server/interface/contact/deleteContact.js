const Contact = require('../../dataBase/contactSchema/contact');
exports.deleteContact = (req, res) => {
    console.log('from delete',req.params)
    Contact.findByIdAndRemove(req.params.contactId)
    .then(contact => {
        if(!contact) {
            return res.status(404).send({
                message: "Contact not found with id " + req.params.contactId
            });
        }
        res.send({message: "Contact deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Contact not found with id " + req.params.contactId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Contact with id " + req.params.contactId
        });
    });
};