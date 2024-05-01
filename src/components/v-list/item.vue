<script setup lang="ts" generic="T extends Record<string, unknown>">
 import type { Header } from '@/types/v-list'
 import { computed, toRefs } from 'vue'

 interface Props {
   item: T;
   headers: Header[]
 }

 const props = defineProps<Props>();
 const { item } = toRefs(props);

 const value = computed(() => (key: keyof T) => item.value[key])
</script>

<template>
  <div class="v-list-item">
    <div class="v-list-item__cell" v-for="header in headers" :key="header.value">
      <slot :name="`cell(${header.value})`">
        {{ value(header.value) || '-' }}
      </slot>
    </div>
  </div>
</template>

<style scoped>
.v-list-item {
  display: flex;
  gap: 4px;
  margin: 12px 0;
}
.v-list-item__cell {
  padding: 8px;
  border: 1px solid;
  border-radius: 4px;
  transition: .2s;
}
.v-list-item__cell:hover {
  scale: 0.8;
  cursor: pointer;

}
</style>