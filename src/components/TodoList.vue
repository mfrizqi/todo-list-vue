<template>
  <section class="flex flex-col items-center justify-center p-8">
    <div class="w-full max-w-[560px]">
      <h1 class="text-4xl font-bold mb-2 text-neutral-800">To do List</h1>
      <p class="mb-10 text-neutral-400">Write that down!</p>
      <form action="POST" @submit.prevent="handleAdd" class="mb-16">
        <div class="flex flex-col md:flex-row justify-center">
          <input
            type="text"
            name="todo-input"
            id="todo_input"
            class="text-zinc-700 text-2xl lg:text-5xl font-semibold border-b border-neutral-500 mr-2 py-2 px-4 w-full focus:outline-none focus:border-mountain-meadow-500 hover:border-mountain-meadow-500"
            v-model="todo.name"
          />
        </div>
        <div class="text-sm text-end text-neutral-400 mt-4">
          Press <kbd>enter</kbd> or click
          <button
            class="px-6 py-1 ml-1 bg-mountain-meadow-600 hover:shadow-md shadow-mountain-meadow-600/50 rounded text-white cursor-pointer disabled:opacity-60"
            :disabled="todo.name.length === 0"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </div>
    <div class="w-full max-w-[560px]">
      <section v-if="todos.list.length === 0">Add some</section>
      <div class="text-xs text-neutral-300">
        Drag and drop to reorder your to-do list.
      </div>
      <VueDraggable
        v-model="todos.list"
        class="flex flex-col gap-2 w-300px rounded py-4"
        target=".sort-target"
        :scroll="true"
        :disabled="disabled"
        :animation="150"
        ghostClass="ghost"
      >
        <TransitionGroup
          type="transition"
          tag="div"
          name="fade"
          class="sort-target"
          @before-enter="disableDelete = true"
          @after-leave="disableDelete = false"
        >
          <div
            v-for="(item, index) in todos.list"
            :key="item.id"
            class="bg-white shadow-md shadow-neutral-300/50 rounded flex justify-between p-2 py-3 mb-3 rounded-lg"
            :class="{
              'items-start': todoOption === item.id,
              'items-center': todoOption !== item.id,
            }"
          >
            <div
              class="flex grow cursor-move"
              :class="{
                'items-stretch': todoOption === item.id,
                'items-center': todoOption !== item.id,
              }"
            >
              <div
                class="flex items-center"
                :class="{
                  'mt-2 self-start': todoOption === item.id,
                  'mt-0': todoOption !== item.id,
                }"
              >
                <VueFeather
                  type="menu"
                  class="text-neutral-400 w-4 h-4"
                ></VueFeather>
              </div>
              <section class="ml-4 mr-2 grow flex overflow-hidden">
                <div
                  v-if="todoOption !== item.id"
                  class="text-zinc-700 line-clamp-3 break-all pr-3"
                >
                  {{ item.name }}
                </div>
                <div v-if="todoOption === item.id">
                  <label class="text-sm text-neutral-500">Todo Title</label>
                  <input
                    type="text"
                    v-model="item.name"
                    @blur="handleEdit(false)"
                    @keydown="handleEdit(true)"
                    class="border border-neutral-400 rounded-md py-1 px-3 w-full focus:outline-none focus:border-mountain-meadow-500 mb-3 mt-1 text-zinc-600"
                  />
                  <label class="text-sm text-neutral-500">Todo Detail</label>
                  <textarea
                    v-model="item.description"
                    rows="2"
                    class="w-full border border-neutral-400 rounded-sm focus:outline-none focus:border-mountain-meadow-500 py-1 px-3 mt-1 text-zinc-600"
                    @blur="handleEdit(false)"
                    @keydown="handleEdit(true)"
                    placeholder="Add detail"
                  ></textarea>
                </div>
              </section>
              <div
                class="flex flex-col justify-between"
                :class="{ 'flex-1': todoOption === item.id }"
              >
                <div class="flex justify-center items-center">
                  <div class="inline-flex items-center mr-1">
                    <label class="flex items-center cursor-pointer relative">
                      <input
                        type="checkbox"
                        v-model="item.check"
                        class="peer h-4 w-4 cursor-pointer transition-all appearance-none rounded border border-slate-300 checked:bg-mountain-meadow-600 checked:border-mountain-meadow-600"
                        @change="toggleCheck"
                      />
                      <span
                        class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="1"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </label>
                  </div>

                  <div @click="toggleOpen(item)" class="mt-2 cursor-pointer">
                    <VueFeather
                      type="chevron-down"
                      class="text-neutral-500 w-5 h-5"
                      v-if="todoOption !== item.id"
                    >
                    </VueFeather>
                    <VueFeather
                      type="chevron-up"
                      class="text-neutral-500 w-5 h-5"
                      v-if="todoOption === item.id"
                    >
                    </VueFeather>
                  </div>
                </div>
                <div
                  v-if="todoOption === item.id"
                  @click="todos.delete(index)"
                  class="flex self-end cursor-pointer text-neutral-500 hover:text-white hover:bg-rose-500 p-2 rounded-md shrink"
                >
                  <VueFeather type="trash-2" class="w-4 h-4"></VueFeather>
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </VueDraggable>
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
import { uuid } from "vue-uuid";

import { useTodoStore } from "../stores/todo";

const todos = useTodoStore();

onMounted(() => {
  todos.initValue();
  console.log(todos.list);
});

let todo = ref({
  name: "",
  description: "",
  check: "",
  id: "",
  option: {
    edit: false,
    open: false,
  },
});

let disabled = ref(false);
let disableDelete = ref(false);
let todoOption = ref(null);

function handleAdd() {
  todo.value.id = uuid.v4();
  todos.add(todo);
  setTimeout(() => {
    todo.value = {
      name: "",
      description: "",
      check: "",
      id: "",
      option: {
        edit: false,
        open: false,
      },
    };
  }, 10);
}

function handleEdit(isDebounce) {
  let time = isDebounce ? 500 : 0;
  setTimeout(() => {
    todos.edit(todos.list);
  }, time);
}

function toggleOpen(item) {
  if (!todoOption.value || todoOption.value !== item.id) {
    todoOption.value = item.id;
  } else if (todoOption.value === item.id) {
    todoOption.value = null;
  }
}

function toggleCheck() {
  todos.edit(todos.list)
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

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

textarea {
  resize: none;
}
</style>