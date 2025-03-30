<template>
  <section class="flex justify-center p-8">
    <div class="w-full max-w-[540px]">
      <h1 class="text-3xl font-bold text-center mb-20">Todo List</h1>
      <div class="flex flex-cols justify-center mb-16">
        <input
          type="text"
          name="todo-input"
          id="todo_input"
          class="border border-neutral-500 mr-2 rounded-md py-2 px-4"
        />
        <button
          @click="add"
          class="px-3 py-2 bg-mountain-meadow-600 hover:shadow rounded-md text-white cursor-pointer"
        >
          Add
        </button>
      </div>
      <VueDraggable
        v-model="list"
        class="flex flex-col gap-2 w-300px rounded py-4"
        target=".sort-target"
        :scroll="true"
        @start="onStart"
        @update="onUpdate"
        @end="onEnd"
        :disabled="disabled"
        :animation="150"
        ghostClass="ghost"
      >
        <TransitionGroup type="transition" tag="ul" name="fade" class="sort-target">
        <li
          v-for="(item, index) in list"
          :key="item.id"
          class="h-50px bg-neutral-300 rounded flex items-center justify-between p-2 mb-2 rounded-lg cursor-move"
        >
          <div class="flex items-center">
            <input
              v-if="false"
              type="checkbox"
              name="todo-checks"
              v-model="item.check"
              class="mr-2 appearance-none border-neutral-500 border w-4 h-4 rounded-sm bg-white checked:bg-blue-800 checked:border-0"
            />
            <input
              type="text"
              v-model="item.name"
              class="border border-black rounded-md py-1 px-3"
            />
          </div>
          <div @click="remove(index)">
            <VueFeather
              type="more-vertical"
              class="text-neutral-500"
            ></VueFeather>
          </div>
        </li>
        </TransitionGroup>
      </VueDraggable>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import VueFeather from "vue-feather";

const list = ref([
  {
    id: 1,
    name: "Joao",
    description: "",
    check: false,
  },
  {
    id: 2,
    name: "Jean",
    description: "",
    check: false,
  },
  {
    id: 3,
    name: "Johanna",
    description: "",
    check: false,
  },
  {
    id: 4,
    name: "Juan",
    description: "",
    check: false,
  },
]);

function add() {
  const length = list.value.length + 1;
  list.value.push({
    name: `Juan ${length}`,
    id: `${length}`,
    description: "",
    check: false,
  });
}

function remove(index) {
  list.value.splice(index, 1);
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