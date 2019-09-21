const Contact = require('../../dataBase/contactSchema/contact');
exports.updateContact = (req, res) => {
    console.log('from update',req.body)
    if (!req.body.phoneNum) {
        return res.status(400).send({
            message: "Number can not be negative"
        });
    }
    Contact.findByIdAndUpdate(req.params.contactId,{
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNum: req.body.phoneNum,
        isActive: req.body.isActive || false
    }, {new: true})
    .then(contact => {
        if(!contact) {
            return res.status(404).send({
                message: "contact not found with id " + req.params.contactId
            });
        }
        res.send(contact);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "contact not found with id " + req.params.contactId
            });                
        }
        return res.status(500).send({
            message: "Error updating contact with id " + req.params.contactId
        });
    });
};