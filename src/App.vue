<script setup lang="ts">
import VList from '@/components/v-list/index.vue';
import type { Header, ListEvent } from '@/types/v-list'
import { ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'

const HEADERS_COUNT = 10;
const ITEMS_COUNT = 1000;

const list = ref<ListEvent | null | undefined>(null);
const headers = generateHeaders();
const items = ref(generateItems());



function generateHeaders(): Header[] {
  const result = [];
  for(let i = 0; i < 10; i++) {
    result.push({
      title: `TITLE ${i}`,
      value: `value${i}`
    })
  }
  return result;
}
function generateItems(): Record<string, string>[] {
  const result = [];
  for(let i = 0; i < ITEMS_COUNT; i++) {
    let newItem: Record<string, string> = {
      id: i
    };
   for (let j = 0; j < HEADERS_COUNT; j++) {
     newItem[`value${j}`] = `VALUE - ${j}`;
   }
   result.push(newItem);
  }
  return result;
}
function updateValues(): void {
  const visibleItems = list.value?.getVisibleItems();

  visibleItems?.forEach(item => {
    const index = item.index;

    if(index && items.value[index]) {
      for(let key in items.value[index]) {
        items.value[index][key] = `VALUE - ${Math.floor(Math.random() * 9)}`;
      }
    }
  })
}

useIntervalFn(updateValues, 1000)
</script>

<template>
  <div class="container">
    <v-list ref="list" :headers="headers" :items="items"/>
  </div>
</template>

<style scoped>
.container {
  padding: 30px;
}
</style>
