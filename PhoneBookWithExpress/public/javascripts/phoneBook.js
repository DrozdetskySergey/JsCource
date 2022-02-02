function get(url, data) {
    return $.get(url, data);
}

function post(url, data) {
    return $.post({
        url: url,
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
        showModal1: false,
        showModal2: false,
        showModal3: false,
        hasAllChecked: false,
        contacts: [],
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

            get("/api/getContacts", {term: this.searchTerm}).done(function (contacts) {
                currentThis.contacts = contacts;
            }).fail(function () {
                alert("Не удалось загрузить контакты!");
            });
        },

        removeContact: function () {
            this.showModal1 = false;

            this.deleteContacts([this.contactId]);
        },

        removeContacts: function () {
            this.showModal2 = false;
            this.hasAllChecked = false;

            this.deleteContacts(this.idList);
        },

        deleteContacts: function (idList) {
            if (idList.length) {
                var currentThis = this;

                post("/api/deleteContacts", idList).done(function (response) {
                    if (response.isSuccess) {
                        currentThis.loadContacts();

                        return;
                    }

                    alert("Server: " + response.message);
                }).fail(function () {
                    alert("Не удалось удалить контакт(ы)!");
                });
            }
        },

        checkNewContactValid: function () {
            var lastName = this.lastName.trim();
            var name = this.name.trim();
            var phone = this.phone.trim()
                .replace(/\D/g, "")
                .slice(0, 11);

            if (!lastName) {
                this.isLastNameInvalid = true;

                return;
            }

            if (!name) {
                this.isNameInvalid = true;

                return;
            }

            if (phone.length < 11) {
                this.isPhoneInvalid = true;

                return;
            }

            this.lastName = lastName;
            this.name = name;
            this.phone = phone;

            this.showModal3 = true;
        },

        addContact: function () {
            this.showModal3 = false;

            var request = {
                lastName: this.lastName,
                name: this.name,
                phone: this.phone
            }

            var currentThis = this;

            post("/api/addContact", request).done(function (response) {
                if (response.isSuccess) {
                    currentThis.loadContacts();

                    currentThis.lastName = "";
                    currentThis.name = "";
                    currentThis.phone = "";

                    return;
                }

                alert("Server: " + response.message);
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