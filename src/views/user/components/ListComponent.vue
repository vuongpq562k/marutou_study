<script setup lang="ts">
import router from '@/router'
import { getListDevice } from '@/services/list'
import { onMounted, reactive } from 'vue'

interface Device {
  device: any | null
}

const props = withDefaults(
  defineProps<{
    mode: boolean
  }>(),
  {
    mode: true
  }
)
const datas = reactive<Device>({
  device: []
})

const clickNewBtn = () => {
  router.push(
    props.mode ? '/user-setting/electric-equipment/new-electric' : '/user-setting/list-gas/new-gas'
  )
}

const handleClickDevice = () => {
  router.push(
    props.mode
      ? '/user-setting/electric-equipment/edit-electric'
      : '/user-setting/list-gas/edit-gas'
  )
}

onMounted(async () => {
  const response: { [key: string]: any } = await getListDevice()
  console.log(response)
  datas.device = response.devices.data
})
</script>

<template>
  <div class="title-header-user ml-80 mt-10 font-weight-bold">
    {{ props.mode ? '電気機器一覧' : 'ガス機器一覧' }}
  </div>
  <div class="view-layout">
    <div class="view-list">
      <div class="list-container">
        <div
          @click="handleClickDevice"
          class="row-list item-company"
          :class="index % 2 === 0 ? 'bg-line' : ''"
          v-for="(device, index) in datas.device"
        >
          {{ device.device_name }}
        </div>
      </div>
      <div class="text-center mt-50">
        <el-button class="btn-addition" @click="clickNewBtn">追加 </el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 8px;
}

/* Track */

::-webkit-scrollbar-track {
  background: white;
}

/* Handle */

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: #ccc;
}

/* Handle on hover */

::-webkit-scrollbar-thumb:hover {
  background: #ccc;
}

.bg-line {
  background-color: #b6c8e8;
}
.row-list {
  padding: 5px 10px;
}
.view-layout {
  flex: 1;
  font-size: 20px;
}

.view-list {
  font-size: 20px;
  .btn-addition {
    background-image: linear-gradient(#e6ebf7, #b6c8e8, #e6ebf7);
    border: solid 1px #000;
    min-width: 100px;
    height: 40px;
    font-size: 20px;
  }
}
.list-container {
  min-width: 600px;
  min-height: 400px;
  max-height: 700px;
  max-width: 600px;
  overflow: auto;
  border: 1px solid #000;
  padding-bottom: 10px;
  border-radius: 5px;

  .item-company {
    font-weight: bold;
    text-decoration: none;
    color: #000;
  }
}
</style>
