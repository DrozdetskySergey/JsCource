var express = require("express");
var router = express.Router();

var contacts = []; // { id, lastName, name, phone }
var newContactId = 1;

router.get("/", function (req, res) {
    res.render("index");
});

// ?term=...
router.get("/api/getContacts", function (req, res) {
    alert("___");
    var searchTerm = (req.query.term || "").trim.toLowerCase();

    var result = !searchTerm ? contacts : contacts.filter(function (contact) {
        return contact.lastName.toLowerCase().includes(term) ||
            contact.name.toLowerCase().includes(term) ||
            contact.phone.toLowerCase().includes(term);
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
        lastName: req.body.lastName.trim,
        name: req.body.name.trim,
        phone: req.body.phone.trim
            .replace(/\D/g, "")
            .slice(0, 11)
    };

    if (!newContact.lastName || !newContact.name || !newContact.phone) {
        res.send({
            isSuccess: false,
            message: "Не корректный новый контакт."
        });

        return;
    }

    var hasPhone = contacts.some(function (contact) {
        return contact.phone === newContact.phone;
    });

    if (hasPhone) {
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
