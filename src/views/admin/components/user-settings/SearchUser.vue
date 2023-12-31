<script setup lang="ts">
import { ROUTER_NAME } from '@/constants'
import router from '@/router'
import { reactive, ref } from 'vue'
import { useUserAdminStore } from '@/stores/user_admin'
import type { FormInstance, FormRules } from 'element-plus/lib/components/index.js'
import { storeToRefs } from 'pinia'
import CustomGroupSelect from '@/components/CustomGroupSelect.vue'

const props = defineProps<{
  isAdminMode: boolean
}>()
const userAdminStore = useUserAdminStore()
const { userAdminData } = storeToRefs(userAdminStore)
const { setUserAdminData, $reset } = userAdminStore
$reset()
const ruleFormRef = ref<FormInstance>()

const listCompanies = reactive<any>([
  {
    label: 'Company 1',
    value: 'company 1'
  },
  {
    label: 'Company 2',
    value: 'company 2'
  }
])

const validateName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('This field is required'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<typeof userAdminData>>({
  userId: [{ validator: validateName, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      // setUserAdminData({
      //   userId: userAdminData.value.userId,
      //   company: userAdminData.value.company,
      //   availability: userAdminData.value.availability,
      //   registration_status: userAdminData.value.registration_status
      // })
      router.push({ name: props.isAdminMode ? ROUTER_NAME.USER_ADMIN_LIST : ROUTER_NAME.USER_LIST })
    } else {
      console.log('error submit!')
      return false
    }
  })
}
const listRadio1 = ['可', '不可']
const listRadio2 = ['利用中', '削除済']
</script>

<template>
  <div class="block-element">
    <el-form
      ref="ruleFormRef"
      :model="userAdminData"
      :rules="rules"
      label-width="170px"
      class="user-search-form"
    >
      <el-form-item :label="props.isAdminMode ? 'AdminユーザーID' : 'ユーザーID'" prop="userId">
        <el-input v-model="userAdminData.userId" type="text" />
      </el-form-item>
      <el-form-item label="電力会社" v-if="!props.isAdminMode" class="select-company">
        <el-select v-model="userAdminData.company" placeholder="Select company name">
          <el-option
            v-for="company in listCompanies"
            :key="company.name"
            :label="company.label"
            :value="company.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="使用可否">
        <CustomGroupSelect
          v-model:dataVModal="userAdminData.availability"
          :data="listRadio1"
          :config="{ class: 'checkbox-items' }"
          type="radio"
        />
      </el-form-item>

      <el-form-item label="登録状況">
        <CustomGroupSelect
          v-model:dataVModal="userAdminData.registration_status"
          :data="listRadio2"
          :config="{ class: 'checkbox-items' }"
          type="radio"
        />
      </el-form-item>

      <el-form-item>
        <el-button class="custom-button-type" @click.enter="submitForm(ruleFormRef)"
          >検索</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.block-element {
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 100px 150px 50px;
  background: var(--form-background);
  border-radius: 12px;

  .user-search-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  :deep(.el-input__wrapper) {
    height: 48px;
    border: 1px solid #000;
    border-radius: unset;
  }

  .select-company {
    :deep(.el-input__wrapper) {
      border-radius: 4px;
    }
  }

  :deep(.el-form-item) {
    align-items: center;
    width: 100%;

    &:last-child {
      margin-top: 40px;
    }

    .el-form-item__content {
      min-width: 300px;

      .el-select {
        min-width: inherit;
      }
    }

    &:last-child {
      .el-form-item__content {
        justify-content: center;
      }
    }

    .el-radio-group {
      .el-radio {
        min-width: 60px;

        .el-radio__label {
          font-size: 20px;
        }
      }
    }
  }
  :deep(.el-form-item__content:last-child) {
    margin-left: 0 !important;
  }

  :deep(.el-form-item__label) {
    display: inline-block;
    text-align: left;
    font-size: 20px;
  }
  :deep(.el-button) {
    width: 250px;
    height: 48px;
    font-size: 20px;
    background-color: var(--button-background);
    color: var(--button-color);

    span {
      letter-spacing: 2px;
    }

    &:active {
      opacity: 0.7;
    }
  }
}
</style>

<style lang="scss">
.block-element {
  .checkbox-items {
    .custom-checkbox {
      min-width: 100px;
    }
  }
}
</style>
