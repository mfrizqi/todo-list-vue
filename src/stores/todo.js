import { defineStore } from "pinia";
import { uuid } from "vue-uuid";

function setTodoStorage(list) {
    localStorage.setItem('todo-list-vuevite', JSON.stringify(list))
}

function getTodoStorage() {
    return JSON.parse(localStorage.getItem('todo-list-vuevite'));
}

const todosPlaceholder = [
    {
        id: uuid.v1(),
        name: "Send presents for mommy <3",
        description: "",
        check: false,
    },
    {
        id: uuid.v1(),
        name: "Sunday ride with brother",
        description: "",
        check: false,
    },
    {
        id: uuid.v1(),
        name: "Buy pineapple seeds",
        description: "",
        check: false,
    },
]

export const useTodoStore = defineStore('todo', {
    state: () => {
        return {
            list: []
        }
    },
    actions: {
        add(todo) {
            this.list.push(
                {
                    id: todo.value.id,
                    name: todo.value.name,
                    description: "",
                    check: false,
                },
            )
            setTodoStorage(this.list)
        },
        delete(index) {
            this.list.splice(index, 1)
            setTodoStorage(this.list)
        },
        initValue() {
            if (localStorage.getItem('todo-list-vuevite') === null) {
                todosPlaceholder.forEach(placeholder => {
                    this.list.push(placeholder)
                });
                setTodoStorage(this.list)
            } else {
                this.list = getTodoStorage();
            }
        },
        edit(todos){
            this.list = todos
            setTodoStorage(this.list)
        }
    }
})