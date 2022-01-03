Vue.component("todo-item", {
    template: "#todo-item-template",

    props: {
        todoItem: {
            type: Object,
            required: true
        }
    },

    data: function () {
        return {
            isEditing: false,
            newText: "",
            isInvalid: false
        };
    },

    methods: {
        performEditing: function () {
            this.newText = this.todoItem.text;
            this.isEditing = true;
        },

        saveChange: function () {
            if (!this.newText) {
                this.isInvalid = true;

                return;
            }

            this.$emit("change-todo-item", this.todoItem, this.newText);
            this.newText = "";
            this.isEditing = false;
        }
    },

    watch: {
        newText: function (newValue) {
            if (newValue) {
                this.isInvalid = false;
            }
        }
    }
});

new Vue({
    el: "#app",

    data: {
        newTodoItemText: "",
        currentTodoItemId: 1,
        isNewTodoItemInvalid: false,
        todoItems: []
    },

    methods: {
        addNewTodoItem: function () {
            if (!this.newTodoItemText) {
                this.isNewTodoItemInvalid = true;

                return;
            }

            this.todoItems.push({
                text: this.newTodoItemText,
                id: this.currentTodoItemId,
            });

            this.newTodoItemText = "";
            ++this.currentTodoItemId;
        },

        deleteTodoItem: function (deletedTodoItem) {
            this.todoItems = this.todoItems.filter(function (todoItem) {
                return todoItem !== deletedTodoItem;
            });
        },

        changeTodoItem: function (todoItem, newText) {
            todoItem.text = newText;
        }
    },

    watch: {
        newTodoItemText: function (newValue) {
            if (newValue.length > 0) {
                this.isNewTodoItemInvalid = false;
            }
        }
    }
});