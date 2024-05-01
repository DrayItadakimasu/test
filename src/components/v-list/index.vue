<script setup lang="ts" generic="T extends Record<string, unknown>">
import type { Header, ListEvent } from '@/types/v-list'
import VListItem from '@/components/v-list/item.vue';
import { toRefs } from 'vue'
import { useVirtualList } from '@vueuse/core'


interface Props {
  headers: Header[];
  items: T[];
  itemHeight?: number;
}

const props = withDefaults(defineProps<Props>(), {
  headers: () => [],
  items: () => [],
  itemHeight: 64
});
const { items } = toRefs(props);

const { containerProps, wrapperProps, list } =  useVirtualList(items, {
  itemHeight: 42
});

function getVisibleItems(): unknown[] {
  return list.value;
}

defineExpose<ListEvent>({
  getVisibleItems
});

</script>

<template>
<div class="v-list">
    <div v-bind="containerProps" class="v-list__container">
      <div v-bind="wrapperProps" class="v-list__wrapper">
        <v-list-item v-for="(item, i) in list" :key="i" :headers="headers" :item="item.data">
          <template v-for="header in headers" #[`cell(${header.value})`]>
            <slot :name="`cell(${header.value})`" v-bind="{ item, i }" />
          </template>
        </v-list-item>
      </div>
    </div>
</div>
</template>

<style scoped>
.v-list__container {
  height: 75vh;
  width: fit-content;
  max-width: 100%;
}
</style>