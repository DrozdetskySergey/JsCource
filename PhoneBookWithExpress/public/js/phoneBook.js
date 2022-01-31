// var confirmationDialog = new bootstrap.Modal(document.querySelector("#confirmation-dialog"));

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
    el: "@app",

    data: {
        contacts: [],
        searchTerm: "",
        idList: [],
        lastname: "",
        name: "",
        phone: ""
    },

    created: function () {
        this.loadContacts();
    },

    methods: {
        clearSearchTerm: function () {
            this.searchTerm = "";
        },

        loadContacts: function () {
            var currentThis = this;

            get("/api/getContacts", {term: this.searchTerm}).done(function (contacts) {
                currentThis.contacts = contacts;
            }).fail(function () {
                alert("Не удалось загрузить контакты!");
            });
        },

        deleteContact: function (contact) {
            this.deleteContacts([contact.id]);
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
                    currentThis.lastname = "";
                    currentThis.name = "";
                    currentThis.phone = "";

                    return;
                }

                alert("Server: " + response.message);
            }).fail(function () {
                alert("Не удалось добавить контакт!");
            });
        }
    }
});