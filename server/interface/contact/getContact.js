const Contact = require('../../dataBase/contactSchema/contact');
exports.findAll = (req, res) => {
    console.log('from get all',req.params)
    Contact.find()
    .then(contact => {
        res.send(contact);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving contact."
        });
    });
};
exports.findOne = (req, res) => {
    console.log('from get ',req.params)
    Contact.findById(req.params.contactId)
    .then(contact => {
        console.log(contact)
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
            message: "Error retrieving contact with id " + req.params.contactId
        });
    });
};