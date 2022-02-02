var confirmationDialog = new bootstrap.Modal(document.querySelector("#confirmation-dialog"));

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

new Vue({
    el: "#app",

    data: {
        hasAllChecked: false,
        contacts: [],
        searchTerm: "",
        idList: [],
        lastName: "",
        name: "",
        phone: ""
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

        removeContact: function (contact) {
            this.deleteContacts([contact.id]);
        },

        removeContacts: function () {
            this.deleteContacts(this.idList);

            this.hasAllChecked = false;
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

        addContact: function () {
            var currentThis = this;

            var request = {
                lastName: this.lastName,
                name: this.name,
                phone: this.phone
            }

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
        }
    }
});