import { defineStore } from "pinia";
import { uuid } from "vue-uuid";

export const useTodoStore = defineStore('todo', {
    state: () => {
        return {
            list: [
                {
                    id: uuid.v1(),
                    name: "Joao",
                    description: "",
                    check: false,
                },
            ]
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
        },
        delete(index) {
            this.list.splice(index, 1)
        }
    }
})