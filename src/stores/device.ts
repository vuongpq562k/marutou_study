import { ref } from 'vue'
import { defineStore } from 'pinia'
import _ from 'lodash'
import type { Device } from '@/constants/types'

const defaultState = {
  title: '',
  name: ''
}

export const useDeviceStore = defineStore(
  'device',
  () => {
    const deviceData = ref<Device>({
      ..._.cloneDeep(defaultState)
    })
    const $reset = () => {
      deviceData.value = { ...defaultState }
    }
    const setDeviceData = (params: Device) => {
      deviceData.value = { ...defaultState, ...params }
    }

    return { deviceData, setDeviceData, $reset }
  },
  { persist: { storage: sessionStorage } }
)
