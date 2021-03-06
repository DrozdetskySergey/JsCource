(function () {
    var liNumber = document.querySelector(".li_number");
    var inputText = document.querySelector(".input");
    var addButton = document.querySelector(".add_button");
    var list = document.querySelector(".list");

    function editLiNumber() {
        var listItemCount = list.childNodes.length;

        liNumber.textContent = (listItemCount + 1) + ".";
    }

    function addListItem() {
        var text = inputText.value.trim();
        var listItem = document.createElement("li");

        function setViewMode() {
            listItem.innerHTML = "<p class='list_item_text'></p>"
                + "<button class='edit_button'>Редактировать</button> <button class='delete_button'>Удалить</button>";

            listItem.querySelector(".delete_button").addEventListener("click", function () {
                listItem.remove();

                editLiNumber();
            });

            listItem.querySelector(".edit_button").addEventListener("click", function () {
                setEditMode();
            });

            listItem.querySelector(".list_item_text").textContent = text;
        }

        function setEditMode() {
            listItem.innerHTML = "<input class='list_item_edit'>"
                + "<button class='save_button'>Сохранить</button> <button class='cancel_button'>Отмена</button>";

            var editInput = listItem.querySelector(".list_item_edit");

            function editListItem() {
                var editText = editInput.value.trim();

                if (!editText) {
                    alert("Ваша запись пустая!");

                    return;
                }

                text = editText;

                setViewMode();
            }

            listItem.querySelector(".save_button").addEventListener("click", editListItem);

            listItem.querySelector(".cancel_button").addEventListener("click", function () {
                setViewMode();
            });

            editInput.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();

                    editListItem();
                }
            });

            editInput.focus();
            editInput.value = text;
        }

        if (!text) {
            alert("Ваша запись пустая!");

            return;
        }

        setViewMode();

        listItem.classList.add("list_item");
        list.append(listItem);
        inputText.focus();
        inputText.value = "";

        editLiNumber();
    }

    addButton.addEventListener("click", addListItem);

    inputText.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();

            addListItem();
        }
    });
})();