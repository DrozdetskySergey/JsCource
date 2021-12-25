$(function () {
    var deleteButton = $(".phone-book-delete-button");
    var search = $(".phone-book-search");
    var clearButton = $(".phone-book-clear-search-button");
    var massCheckbox = $(".phone-book-checkbox");
    var phoneBook = $(".phone-book");
    var inputLastName = $(".phone-book-lastname");
    var inputName = $(".phone-book-name");
    var inputPhone = $(".phone-book-phone");
    var addButton = $(".phone-book-add-button");
    var confirmationDialog = new bootstrap.Modal(document.querySelector("#confirmation-dialog"));



    inputPhone.on("input", _.debounce(function () {
        var digits = inputPhone.val()
            .replace(/\D/g, "")
            .split("")
            .slice(0, 11);

        if (digits.length >= 8) {
            digits.splice(7, 0, '-');
        }

        if (digits.length >= 5) {
            digits.splice(4, 0, '-');
        }

        if (digits.length >= 2) {
            digits.splice(1, 0, '-');
        }

        inputPhone.val(digits.join(""));
    }, 100));



    function performSearch() {
        var substring = search.val().trim().toLowerCase();
        var contacts = $(".phone-book-contact");

        if (!substring) {
            contacts.show();

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



    deleteButton.click(function () {
        $("#confirmation-dialog .modal-body").text("Вы действительно хотите удалить контакт(ы)?");
        $("#confirmation-dialog .confirmation-button").click(function () {
            $(".phone-book-contact").each(function () {
                var hasRemoved = false;
                var contact = $(this);

                if (contact.find("input[type='checkbox']").is(":checked") && contact.is(":visible")) {
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
        $(".phone-book-contact input[type='checkbox']").prop("checked", massCheckbox.is(":checked"));
    });



    function checkValidNewContact(lastName, name, phone, contacts) {
        var isValid = true;

        if (!lastName) {
            inputLastName.addClass("is-invalid");
            isValid = false;
        }

        if (!name) {
            inputName.addClass("is-invalid");
            isValid = false;
        }

        if (phone.length < 14 || phone.charAt(0) !== "8") {
            $("#phone-invalid-feedback-text").text("Введите номер 8-XXX-XXX-XXXX");
            inputPhone.addClass("is-invalid");
            isValid = false;
        } else {
            contacts.each(function (i) {
                if (phone === $(this).find(".contact-phone").text()) {
                    inputPhone.addClass("is-invalid");
                    $("#phone-invalid-feedback-text").text("Этот телефона у контакта №" + (i + 1));
                    isValid = false;

                    return false; // break this each
                }
            });
        }

        return isValid;
    }



    addButton.click(function () {
        var lastName = inputLastName.val().trim();
        var name = inputName.val().trim();
        var phone = inputPhone.val().trim();
        var contactTitle = lastName + " " + name + " " + phone;
        var contacts = $(".phone-book-contact");
        var newContact = $("<div></div>");

        inputLastName.removeClass("is-invalid");
        inputName.removeClass("is-invalid");
        inputPhone.removeClass("is-invalid");

        if (!checkValidNewContact(lastName, name, phone, contacts)) {
            $(".is-invalid").eq(0).focus();

            return;
        }

        newContact.addClass("phone-book-contact row my-1");
        newContact.attr("title", contactTitle);
        newContact.html("<div class='col-1 bg-light text-center'><label><input type='checkbox' class='form-check-input'></label></div>"
            + "<div class='col-1 contact-number bg-primary text-white text-center'></div>"
            + "<div class='col-3 contact-lastname bg-light text-nowrap'></div>"
            + "<div class='col-2 contact-name bg-light text-nowrap'></div>"
            + "<div class='col-4 contact-phone bg-light text-nowrap'></div>"
            + "<div class='col-1 bg-light text-center'><button class='contact-delete-button btn btn-danger btn-sm align-top' title='Удалить контакт'>X</button></div>"
        );
        newContact.find(".contact-number").text(contacts.length + 1);
        newContact.find(".contact-lastname").text(lastName);
        newContact.find(".contact-name").text(name);
        newContact.find(".contact-phone").text(phone);

        newContact.find(".contact-delete-button").click(function () {
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