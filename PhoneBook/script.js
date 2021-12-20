$(function f() {
    var modal = new bootstrap.Modal(document.querySelector("#delete-confirmation-dialog"));
    var dellButton = $(".phone-book-dell-button");
    var search = $(".phone-book-search");
    var clearButton = $(".phone-book-clear-search-button");
    var massCheckbox = $(".mass-checkbox");
    var phoneBook = $(".phone-book");
    var addButton = $(".phone-book-add-button");
    var inputLastName = $(".phone-book-lastname");
    var inputName = $(".phone-book-name");
    var inputPhone = $(".phone-book-phone");

    function performSearch() {
        var text = search.val().trim();
        var contacts = $(".phone-book-contact");

        if (!text) {
            contacts.each(function () {
                $(this).show();
            });

            return;
        }

        contacts.each(function () {
            var contact = $(this);

            if (contact.find(".contact-lastname").text().indexOf(text) >= 0
                || contact.find(".contact-name").text().indexOf(text) >= 0
                || contact.find(".contact-phone").text().indexOf(text) >= 0) {
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

    function setContactsNumbers() {
        $(".phone-book-contact").each(function (i) {
            $(this).find(".contact-number").text(i + 1);
        });
    }

    dellButton.click(function () {
        $(".delete-confirmation-button").click(function () {
            $(".phone-book-contact").each(function () {
                var hasRemoved = false;
                var contact = $(this);

                if (contact.find("input[type='checkbox']").is(":checked")) {
                    hasRemoved = true;
                    contact.remove();
                }

                if (hasRemoved) {
                    setContactsNumbers();
                }

                massCheckbox.prop("checked", false);
            });
        });

        modal.show();
    });

    massCheckbox.change(function () {
        var isChecked = massCheckbox.is(":checked");

        $(".phone-book-contact").each(function () {
            $(this).find("input[type='checkbox']").prop("checked", isChecked);
        });
    });

    addButton.click(function () {
        var lastname = inputLastName.val().trim();
        var name = inputName.val().trim();
        var phone = inputPhone.val().trim();
        var newContact = $("<div></div>");
        var number = $(".phone-book-contact").length + 1;

        // TODO valid

        newContact.addClass("phone-book-contact row my-1");
        newContact.html("<div class='col-1 bg-light text-center'><label><input type='checkbox'></label></div>"
            + "<div class='col-1 contact-number bg-primary text-white text-center'></div>"
            + "<div class='col-3 contact-lastname bg-light text-nowrap'></div>"
            + "<div class='col-2 contact-name bg-light text-nowrap'></div>"
            + "<div class='col-4 contact-phone bg-light text-nowrap'></div>"
            + "<div class='col-1 bg-light text-center'><button class='contact-dell-button btn btn-danger btn-sm align-top'>X</button></div>"
        );
        newContact.find(".contact-number").text(number);
        newContact.find(".contact-lastname").text(lastname);
        newContact.find(".contact-name").text(name);
        newContact.find(".contact-phone").text(phone);

        newContact.find(".contact-dell-button").click(function () {
            $(".delete-confirmation-button").click(function () {
                newContact.remove();

                setContactsNumbers();
            });

            modal.show();
        })

        phoneBook.append(newContact);

        inputLastName.val("");
        inputName.val("");
        inputPhone.val("");

        inputLastName.focus();
    });
})();