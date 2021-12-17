$(function () {
    var liNumber = $(".li_number");
    var inputText = $(".input");
    var addButton = $(".add_button");
    var list = $(".list");

    function editLiNumber() {
        var listItemCount = $(".list .list_item").length;

        liNumber.text((listItemCount + 1) + ".");
    }

    function addListItem() {
        var text = inputText.val().trim();
        var listItem = $("<li>");

        function setViewMode() {
            listItem.html("<p class='list_item_text'></p>"
                + "<button class='edit_button'>Редактировать</button> <button class='delete_button'>Удалить</button>");

            listItem.find(".delete_button").click(function () {
                listItem.remove();

                editLiNumber();
            });

            listItem.find(".edit_button").click(function () {
                setEditMode();
            });

            listItem.find(".list_item_text").text(text);
        }

        function setEditMode() {
            listItem.html("<input class='list_item_edit'>"
                + "<button class='save_button'>Сохранить</button> <button class='cancel_button'>Отмена</button>");

            var editInput = listItem.find(".list_item_edit");

            function editListItem() {
                var editText = editInput.val().trim();

                if (!editText) {
                    alert("Нельзя оставлять пустую запись.");

                    return;
                }

                text = editText;

                setViewMode();
            }

            listItem.find(".save_button").click(editListItem);

            listItem.find(".cancel_button").click(function () {
                setViewMode();
            });

            editInput.on("keydown", function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();

                    editListItem();
                }
            });

            editInput.focus();
            editInput.val(text);
        }

        if (!text) {
            alert("Нельзя добавлять пустую запись.");

            return;
        }

        setViewMode();

        listItem.addClass("list_item");
        list.append(listItem);
        inputText.focus();
        inputText.val("");

        editLiNumber();
    }

    addButton.click(addListItem);

    inputText.on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();

            addListItem();
        }
    });
})();