var happy = happy || {};

happy.get = function (url, data) {
    return $.get(url, data);
}

happy.post = function (url, data) {
    return $.post({
        url: url,
        contentType: "application/json",
        data: JSON.stringify(data)
    });
}

happy.delete = function (url, data) {
    return $.ajax({
        url: url,
        type: "delete",
        contentType: "application/json",
        data: JSON.stringify(data)
    });
}

Vue.component("modal", {
    template: "#modal-template"
});

new Vue({
    el: "#app",

    data: {
        isDisabledDeleteButton: true,
        showModal: 0, // 0(disabled), 1, 2, 3
        hasAllChecked: false,
        contacts: [], // { id, lastName, name, phone }
        searchTerm: "",
        idList: [],
        contactId: 0,
        lastName: "",
        name: "",
        phone: "",
        isLastNameInvalid: false,
        isNameInvalid: false,
        isPhoneInvalid: false,
    },

    created: function () {
        this.loadContacts();
    },

    methods: {
        clearSearchTerm: function () {
            this.searchTerm = "";

            this.loadContacts();
        },

        loadContacts: function () {
            var currentThis = this;

            happy.get("/api", {term: this.searchTerm}).done(function (contacts) {
                currentThis.contacts = contacts;
            }).fail(function () {
                alert("Не удалось загрузить контакты!");
            });
        },

        removeContact: function () {
            this.showModal = 0;

            this.deleteContacts([this.contactId]);
        },

        removeContacts: function () {
            this.showModal = 0;

            if (!this.searchTerm) {
                this.deleteContacts(this.idList);

                return;
            }

            var actualContactsIdList = this.contacts.map(function (contact) {
                return contact.id;
            });

            var idList = this.idList.filter(function (id) {
                return actualContactsIdList.indexOf(id) !== -1;
            });

            this.deleteContacts(idList);
        },

        deleteContacts: function (idList) {
            if (idList.length > 0) {
                var currentThis = this;

                happy.delete("/api", idList).done(function (response) {
                    if (response.isSuccess === false) {
                        alert(response.message);

                        return;
                    }

                    currentThis.idList = currentThis.idList.filter(function (id) {
                        return idList.indexOf(id) === -1;
                    });

                    if (currentThis.idList.length === 0) {
                        currentThis.hasAllChecked = false;
                        currentThis.isDisabledDeleteButton = true;
                    }

                    currentThis.loadContacts();
                }).fail(function () {
                    alert("Не удалось удалить контакт(ы)!");
                });
            }
        },

        checkNewContactValid: function () {
            var phone = this.phone.replace(/\D/g, "");

            if (!this.lastName) {
                this.isLastNameInvalid = true;
            }

            if (!this.name) {
                this.isNameInvalid = true;
            }

            if (phone.length !== 11) {
                this.isPhoneInvalid = true;
            }

            if (this.isLastNameInvalid || this.isNameInvalid || this.isPhoneInvalid) {
                return;
            }

            this.phone = phone;

            this.showModal = 3;
        },

        addContact: function () {
            this.showModal = 0;

            var request = {
                lastName: this.lastName,
                name: this.name,
                phone: this.phone
            }

            var currentThis = this;

            happy.post("/api", request).done(function (response) {
                if (response.isSuccess === false) {
                    alert(response.message);

                    return;
                }

                currentThis.loadContacts();

                currentThis.lastName = "";
                currentThis.name = "";
                currentThis.phone = "";
            }).fail(function () {
                alert("Не удалось добавить контакт!");
            });
        }
    },

    watch: {
        hasAllChecked: function (newValue) {
            this.idList.splice(0, this.idList.length);

            if (newValue) {
                var currentThis = this;

                this.contacts.forEach(function (contact) {
                    currentThis.idList.push(contact.id);
                });
            }
        },

        idList: function (newValue) {
            this.isDisabledDeleteButton = newValue.length === 0;
        },

        lastName: function (newValue) {
            if (newValue.length > 0) {
                this.isLastNameInvalid = false;
            }
        },

        name: function (newValue) {
            if (newValue.length > 0) {
                this.isNameInvalid = false;
            }
        },

        phone: function (newValue) {
            if (newValue.length > 10) {
                this.isPhoneInvalid = false;
            }
        }
    }
});