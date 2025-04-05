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
        id: '',
        name: "Send presents for mommy <3",
        description: "",
        created_at: new Date().toLocaleString(),
        check: false,
    },
    {
        id: '',
        name: "Sunday ride with brother",
        description: "",
        created_at: new Date().toLocaleString(),
        check: false,
    },
    {
        id: '',
        name: "Buy pineapple seeds",
        description: "",
        created_at: new Date().toLocaleString(),
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
            const now = new Date().toLocaleString()
            this.list.push(
                {
                    id: todo.value.id,
                    name: todo.value.name,
                    description: "",
                    created_at: now,
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
                this.list = todosPlaceholder.map(placeholder => ({
                    ...placeholder,
                    id: uuid.v4()
                }));
                setTodoStorage(this.list)
            } else {
                this.list = getTodoStorage();
            }
        },
        edit(todos) {
            this.list = todos
            setTodoStorage(this.list)
        },
        clearList(){
            this.list = []
            setTodoStorage(this.list)
        }
    }
})