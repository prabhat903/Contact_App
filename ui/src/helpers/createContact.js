/***************
 * contact creation Constructor To get defined fields....
 */
export const CreateContact = class {
    constructor({ firstName, lastName, phoneNum, email, isActive, _id, id }) {
        this.firstName = (firstName || "").trim();
        this.lastName = (lastName || "").trim();
        this.isActive = isActive || false;
        this.phoneNum = phoneNum || "";
        this.email = (email || "").trim();
        this.id = _id || id || ""
    }
}
/*************
 * Check Validation of the fields and provide Object with errors....
 */
export const isFormValid = function (obj) {
    let errorObj = {}, key, value, message = { firstName: "First Name", lastName: "Last Name" }, errorFlag = false;
    for (key in obj) {
        switch (key) {
            case 'firstName':
            case 'lastName':
                value = obj[key];
                if (!value.trim()) {
                    errorObj[key] = message[key] + ' is required';
                    errorFlag = true;
                } else if (!(/^([a-z ]+)$/i).test(value.trim())) {
                    errorObj[key] = 'Please Enter Valid ' + message[key];
                    errorFlag = true;
                } else {
                    errorObj[key] = "";
                }
                continue;
            case 'phoneNum':
                value = parseInt(obj[key]);
                if (!value) {
                    errorObj[key] = 'Phone Number is required';
                    errorFlag = true;
                } else if (!(/^(\d{10})$/).test(value)) {
                    errorObj[key] = 'Please Enter Valid phone number of 10 digits';
                    errorFlag = true;
                } else {
                    errorObj[key] = "";
                }
                continue;
            case 'email':
                value = obj[key];
                if (value && !(/^(\w+@[a-z]+\.[a-z]{2,3})$/i).test(value.trim())) {
                    errorObj[key] = 'Please Enter Valid email Address';
                    errorFlag = true;
                } else {
                    errorObj[key] = "";
                }
                continue;
            default: break;
        }
    }
    return { errorObj, errorFlag };
}
