import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import _ from 'lodash'
import LABEL from '@/constants/label'
import { loginAPI } from '@/services/auth'

import { setSessionStorageByItem } from '@/constants/utils'

type UserState = {
  roleUser: Number
  json: any
}

const defaultState = {
  roleUser: 2,
  json: null,
  email: 'tuanpv2@rikkeisoft.com',
  password: '12345678'
}

export const useAuthStore = defineStore(
  'auth',
  () => {
    const loggedIn = ref(false)

    const state = reactive<UserState>({
      ..._.cloneDeep(defaultState)
    })

    const login = async (params: any) => {
      const response: { [key: string]: any } = await loginAPI(params)
      console.log(response)
      if (response?.success === false) {
        alert(response.message)
      } else {
        if (response) {
          // Lưu token
          setSessionStorageByItem('USER_LOGIN', response)

          if (response.user) {
            if (response.user.role === '01') {
              state.roleUser = 1
            } else {
              state.roleUser = 2
            }
          }

          if (String(state.roleUser) === LABEL.COMMON.NUMBER.TWO) {
            router.replace('/admin')
          } else {
            router.replace('/')
          }
        }
      }
    }

    const logout = () => {
      sessionStorage.removeItem('USER_LOGIN')
      // loggedIn.value = false
      router.push('/login')
    }
    const changeRole = (value: number) => {
      console.log('value: ', value)
      state.roleUser = value
    }

    return { state, loggedIn, login, logout, changeRole }
  },
  {
    persist: {
      paths: ['state.roleUser'],
      storage: sessionStorage
    }
  }
)
