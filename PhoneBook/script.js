$(function f() {
    var dellButton = $(".phone-book-dell-button");
    var search = $(".phone-book-search");
    var clearButton = $(".phone-book-clear-search-button");
    var massCheckbox = $(".phone-book-checkbox");
    var phoneBook = $(".phone-book");
    var inputLastName = $(".phone-book-lastname");
    var inputName = $(".phone-book-name");
    var inputPhone = $(".phone-book-phone");
    var addButton = $(".phone-book-add-button");
    var confirmationDialog = new bootstrap.Modal(document.querySelector("#confirmation-dialog"));
    var alertDialog = new bootstrap.Modal(document.querySelector("#alert-dialog"));

    function performSearch() {
        var substring = search.val().trim().toLowerCase();
        var contacts = $(".phone-book-contact");

        if (!substring) {
            contacts.each(function () {
                $(this).show();
            });

            return;
        }

        contacts.each(function () {
            var contact = $(this);

            if (contact.find(".contact-lastname").text().toLowerCase().indexOf(substring) >= 0
                || contact.find(".contact-name").text().toLowerCase().indexOf(substring) >= 0
                || contact.find(".contact-phone").text().toLowerCase().indexOf(substring) >= 0) {
                contact.show();
            } else {
                contact.hide();
            }
        });
    }

    search.on("input", _.debounce(performSearch, 300));

    clearButton.click(function () {
        if (search.val()) {
            search.val("");

            performSearch();
        }
    });

    function setContactsNumber() {
        $(".phone-book-contact").each(function (i) {
            $(this).find(".contact-number").text(i + 1);
        });
    }

    dellButton.click(function () {
        $("#confirmation-dialog .modal-body").text("Вы действительно хотите удалить контакт(ы)?");
        $("#confirmation-dialog .confirmation-button").click(function () {
            $(".phone-book-contact").each(function () {
                var hasRemoved = false;
                var contact = $(this);

                if (contact.find("input[type='checkbox']").is(":checked")) {
                    hasRemoved = true;
                    contact.remove();
                }

                if (hasRemoved) {
                    setContactsNumber();
                }

                massCheckbox.prop("checked", false);
            });
        });

        confirmationDialog.show();
    });

    massCheckbox.change(function () {
        var isChecked = massCheckbox.is(":checked");

        $(".phone-book-contact").each(function () {
            $(this).find("input[type='checkbox']").prop("checked", isChecked);
        });
    });

    function chekValidNewContact(lastName, name, phone, contacts) {
        var hasNotDuplicate = true;
        var alertText = $("#alert-dialog .modal-body");

        if (!lastName) {
            inputLastName.addClass("is-invalid");
            alertText.text("Введите фамилию!");

            return false;
        }

        if (!name) {
            inputName.addClass("is-invalid");
            alertText.text("Введите имя!");

            return false;
        }

        if (!phone) {
            inputPhone.addClass("is-invalid");
            alertText.text("Введите номер телефона!");

            return false;
        }

        contacts.each(function (i) {
            if (phone === $(this).find(".contact-phone").text()) {
                inputPhone.addClass("is-invalid");
                alertText.text("Этот телефона у контакта №" + (i + 1));
                hasNotDuplicate = false;

                return false; // break this each
            }
        });

        return hasNotDuplicate;
    }

    addButton.click(function () {
        var lastName = inputLastName.val().trim();
        var name = inputName.val().trim();
        var phone = inputPhone.val().trim();
        var contacts = $(".phone-book-contact");
        var newContact = $("<div></div>");

        inputLastName.removeClass("is-invalid");
        inputName.removeClass("is-invalid");
        inputPhone.removeClass("is-invalid");

        if (!chekValidNewContact(lastName, name, phone, contacts)) {
            alertDialog.show();
            $(".is-invalid").focus(); // куда убегает этот фокус, и как его сюда вернуть?

            return;
        }

        newContact.addClass("phone-book-contact row my-1");
        newContact.html("<div class='col-1 bg-light text-center'><label><input type='checkbox'></label></div>"
            + "<div class='col-1 contact-number bg-primary text-white text-center'></div>"
            + "<div class='col-3 contact-lastname bg-light text-nowrap'></div>"
            + "<div class='col-2 contact-name bg-light text-nowrap'></div>"
            + "<div class='col-4 contact-phone bg-light text-nowrap'></div>"
            + "<div class='col-1 bg-light text-center'><button class='contact-dell-button btn btn-danger btn-sm align-top'>X</button></div>"
        );
        newContact.find(".contact-number").text(contacts.length + 1);
        newContact.find(".contact-lastname").text(lastName);
        newContact.find(".contact-name").text(name);
        newContact.find(".contact-phone").text(phone);

        newContact.find(".contact-dell-button").click(function () {
            $("#confirmation-dialog .modal-body").text("Вы действительно хотите удалить контакт?");
            $("#confirmation-dialog .confirmation-button").click(function () {
                newContact.remove();

                setContactsNumber();
            });

            confirmationDialog.show();
        })

        phoneBook.append(newContact);

        inputLastName.val("");
        inputName.val("");
        inputPhone.val("");

        search.val("");
        performSearch();

        inputLastName.focus();
    });
})();