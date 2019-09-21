const Contact = require('../../dataBase/contactSchema/contact');
exports.createContact = (req, res) => {
    console.log(req.body);
    if (!req.body.phoneNum) {
        return res.status(400).send({
            message: "Number can not be negative"
        });
    }
    const contact = new Contact({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNum: req.body.phoneNum,
        isActive: req.body.isActive||false
    });
    contact.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Contact."
            });
        });
};
