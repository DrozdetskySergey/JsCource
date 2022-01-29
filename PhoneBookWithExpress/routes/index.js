var express = require("express");
var router = express.Router();

var contacts = []; // { id, lastName, name, phone }
var newContactId = 1;

// ?term=...
router.get("/api/getContacts", function (req, res) {
    var term = (req.query.term || "").toLowerCase();

    var result = !term ? contacts : contacts.filter(function (contact) {
        return contact.lastName.toLowerCase().includes(term) ||
            contact.name.toLowerCase().includes(term) ||
            contact.phone.toLowerCase().includes(term);
    });

    res.send(result);
});

// [id, ...]
router.post("/api/deleteContact", function (req, res) {
    var idList = req.body.slice();
    
    if (idList.length === 0) {
        res.send({
            isSuccess: false,
            message: "No one ID to delete."
        });
        
        return;
    }

    contacts = contacts.filter(function (contact) {
        return !idList.includes(contact.id);
    });

    res.send({
        isSuccess: true,
        message: null
    });
});

// { lastName, name, phone }
router.post("/api/addContact", function (req, res) {
    var requestBody = req.body;

    requestBody.phone = requestBody.phone.replace(/\D/g, "").slice(0, 11);

    if (!requestBody.lastName || !requestBody.name || !requestBody.phone) {
        res.send({
            isSuccess: false,
            message: "New contact is invalid."
        });

        return;
    }

    if (contacts.some(function (contact) {
        return contact.phone === requestBody.phone;
    })) {
        res.send({
            isSuccess: false,
            message: "Contact with this phone already exists."
        });

        return;
    }

    var newContact = {
        id: newContactId,
        lastName: requestBody.lastName,
        name: requestBody.name,
        phone: requestBody.phone
    }

    contacts.push(newContact);

    res.send({
        isSuccess: true,
        message: null
    });

    newContactId++;
});

module.exports = router;
