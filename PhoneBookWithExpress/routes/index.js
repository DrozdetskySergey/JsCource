var express = require("express");
var router = express.Router();

var contacts = []; // { id, lastName, name, phone }
var newContactId = 1;

router.get("/", function (req, res) {
    res.render("index");
});

// ?term=...
router.get("/api/getContacts", function (req, res) {
    var searchTerm = (req.query.term || "").toLowerCase().toString().trim();

    var result = !searchTerm ? contacts : contacts.filter(function (contact) {
        return contact.lastName.toLowerCase().includes(searchTerm) ||
            contact.name.toLowerCase().includes(searchTerm) ||
            contact.phone.toLowerCase().includes(searchTerm);
    });

    res.send(result);
});

// [id, ...]
router.post("/api/deleteContacts", function (req, res) {
    var idList = req.body.slice();

    if (idList.length === 0) {
        res.send({
            isSuccess: false,
            message: "Отсутствуют ID для удаления."
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
    var newContact = {
        id: newContactId,
        lastName: req.body.lastName.toString().trim(),
        name: req.body.name.toString().trim(),
        phone: req.body.phone.toString()
            .replace(/\D/g, "")
            .slice(0, 11)
    };

    if (!newContact.lastName || !newContact.name || newContact.phone.length < 11) {
        res.send({
            isSuccess: false,
            message: "Не корректный новый контакт."
        });

        return;
    }

    var hasDuplicate = contacts.some(function (contact) {
        return contact.phone === newContact.phone;
    });

    if (hasDuplicate) {
        res.send({
            isSuccess: false,
            message: "Контакт с таким номером уже существует."
        });

        return;
    }

    contacts.push(newContact);

    res.send({
        isSuccess: true,
        message: null
    });

    newContactId++;
});

module.exports = router;
