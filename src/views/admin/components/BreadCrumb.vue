<script setup lang="ts">
import router from '@/router'
import { computed } from 'vue'
import { ArrowRightIcon } from '@/assets/icons'

const arrayBreadcrumbs = computed(() => {
  const currentPath = router.currentRoute.value.path
  const pathArray = currentPath.split('/')
  pathArray.shift()
  return pathArray
})

const getToPath = (item: string) => {
  const arrayPath = [...arrayBreadcrumbs.value]
  const indexItem = arrayPath.indexOf(item)
  router.push('/' + arrayPath.slice(0, indexItem + 1).join('/'))
}
</script>

<template>
  <div class="breadcrumb">
    <span
      class="item-breadcrumb"
      :class="{ active: idx === arrayBreadcrumbs.length - 1 }"
      v-for="(item, idx) in arrayBreadcrumbs"
      :key="idx"
    >
      <span @click="() => getToPath(item)">{{ item }}</span>
      <span class="icon" v-if="idx != arrayBreadcrumbs.length - 1"> <ArrowRightIcon /> </span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb {
  height: 48px;
  display: flex;
  align-items: center;
  padding: 12px;
  gap: 4px;
  background-color: #ebf1ff;

  .item-breadcrumb {
    cursor: pointer;
    display: flex;
    gap: 4px;
    .icon {
      font-size: 12px;
      display: flex;
      align-items: center;
    }

    &:hover {
      color: #416def;
    }
    &.active {
      cursor: unset;
      color: #416def !important;
    }
  }
}
</style>