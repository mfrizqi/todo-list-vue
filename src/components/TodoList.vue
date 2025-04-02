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
            class="text-5xl font-semibold border-b border-neutral-500 mr-2 py-2 px-4 focus:outline-none focus:border-mountain-meadow-500 w-full"
            v-model="todo.name"
          />
        </div>
        <div class="text-sm text-end text-neutral-400 mt-4">
          Press <kbd>enter</kbd> or click
          <button
            class="px-5 py-1 bg-mountain-meadow-600 hover:shadow rounded-md text-white cursor-pointer disabled:opacity-60"
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
      <div class="text-xs text-neutral-300">Drag and drop to reorder your to-do list.</div>
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
            class="bg-white shadow-md rounded flex justify-between p-2 py-3 mb-3 rounded-lg"
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
              <section class="ml-4 mr-2 grow">
                <input
                  v-if="false"
                  type="checkbox"
                  name="todo-checks"
                  v-model="item.check"
                  class="mr-2 appearance-none border-neutral-500 border w-4 h-4 rounded-sm bg-white checked:bg-blue-800 checked:border-0"
                />
                <div
                  v-if="todoOption !== item.id"
                  class="text-zinc-700 line-clamp-3"
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
                @click="toggleOpen(item)"
                class="flex flex-col justify-between"
                :class="{ 'flex-1': todoOption === item.id }"
              >
                <div class="flex justify-center">
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
                <div
                  v-if="todoOption === item.id"
                  @click="todos.delete(index)"
                  class="flex items-center cursor-pointer text-neutral-500 hover:text-white hover:bg-rose-500 p-2 rounded-md shrink"
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
  event.preventDefault();
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
  console.log(item);
  console.log(todoOption);
  if (!todoOption.value || todoOption.value !== item.id) {
    todoOption.value = item.id;
  } else if (todoOption.value === item.id) {
    todoOption.value = null;
  }
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

/* .sort-target {
  padding: 0 1rem;
} */

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

textarea {
  resize: none;
}
</style>