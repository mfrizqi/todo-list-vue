<template>
  <section class="flex justify-center p-8">
    <div class="w-full max-w-[540px]">
      <h1 class="text-3xl font-bold text-center mb-20">Todo List</h1>
      <div class="flex flex-cols justify-center mb-16">
        <input type="text" name="todo-input" id="todo_input" class="border border-neutral-500 mr-2 rounded-md py-2 px-4"
          v-model="todo.name" />
        <button @click="handleAdd" @change="checkTodo"
          class="px-3 py-2 bg-mountain-meadow-600 hover:shadow rounded-md text-white cursor-pointer disabled:opacity-70"
          :disabled="todo.name.length === 0">
          Add
        </button>
      </div>
      <section>
        <VueDraggable v-model="todos.list" class="flex flex-col gap-2 w-300px rounded py-4" target=".sort-target"
          :scroll="true" :disabled="disabled" :animation="150" ghostClass="ghost">
          <TransitionGroup type="transition" tag="ul" name="fade" class="sort-target">
            <li v-for="(item, index) in todos.list" :key="item.id"
              class="h-50px bg-neutral-300 rounded flex items-center justify-between p-2 mb-2 rounded-lg cursor-move">
              <div class="flex items-center grow">
                <div class="flex items-center mr-2">
                  <VueFeather type="align-justify" class="text-neutral-500"></VueFeather>
                </div>
                <input v-if="false" type="checkbox" name="todo-checks" v-model="item.check"
                  class="mr-2 appearance-none border-neutral-500 border w-4 h-4 rounded-sm bg-white checked:bg-blue-800 checked:border-0" />
                <input type="text" v-model="item.name" @focus="disabled = true" @blur="handleEdit(false)"
                  @keydown="handleEdit(true)" class="border border-black rounded-md py-1 px-3 w-full" />
              </div>
              <div @click="todos.delete(index)" class="flex items-center">
                <VueFeather type="more-vertical" class="text-neutral-500"></VueFeather>
              </div>
            </li>
          </TransitionGroup>
        </VueDraggable>
      </section>
      <!-- Development Purposes -->
      <!-- <div>
        {{ todos.list }}
      </div> -->
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";

import VueFeather from "vue-feather";
import { VueDraggable } from "vue-draggable-plus";
import { uuid } from 'vue-uuid';

import { useTodoStore } from "../stores/todo";

const todos = useTodoStore()

onMounted(() => {
  todos.initValue()
  console.log(todos.list)
})

let todo = ref({
  name: '',
  description: '',
  check: '',
  id: uuid.v1()
})

let disabled = ref(false)

function handleAdd() {
  todos.add(todo)
}

function handleEdit(isDebounce) {
  let time = isDebounce ? 500 : 0
  setTimeout(() => {
    todos.edit(todos.list)
  }, time);

  this.disabled = false;
}
</script>

<style>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(0px, 0);
}

.sort-target {
  padding: 0 1rem;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>