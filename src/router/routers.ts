import { ROUTER_PATH, ROUTER_NAME, ROLE } from '@/constants'
import LoginView from '@/views/login/LoginView.vue'
import RegisterSimulator from '@/views/user/simulation/RegisterSimulator.vue'
import SalesComponent from '@/views/user/SalesComponent.vue'
import AdminView from '@/views/admin/AdminView.vue'
import SearchSimulator from '@/views/user/SearchSimulator.vue'
import ModeSetting from '@/views/user/user-setting/ModeSetting.vue'
import ElectricEquipment from '@/views/user/user-setting/ElectricEquipment.vue'
import NewGas from '@/views/user/user-setting/NewGas.vue'
import NewElectrics from '@/views/user/user-setting/NewElectrics.vue'
import EditGas from '@/views/user/user-setting/EditGas.vue'
import EditElectrics from '@/views/user/user-setting/EditElectrics.vue'
import ListGas from '@/views/user/user-setting/ListGas.vue'
import UserView from '@/views/user/components/UserView.vue'
import ElectricsView from '@/views/user/components/ElectricsView.vue'
import GasView from '@/views/user/components/GasView.vue'
import NotFound from '@/views/notFound/NotFound.vue'

import {
  AdminPage,
  UserInfoForm,
  SearchUser,
  UserEdit,
  UserList,
  UserDelete,
  ListPowerCompanies,
  ListPowerCompaniesView,
  PowerCompanyDetail,
  CommonSettingRegistration,
  UserRegister,
  GasAppliancesList,
  ElectricalEquipmentList,
  ElectricalEquipmentListView,
  DeviceDetail,
  GasPrice
} from '@/views/admin/components'

const routers = [
  {
    path: ROUTER_PATH.LOGIN,
    name: ROUTER_NAME.LOGIN,
    component: LoginView,
    meta: { requiresAuth: true }
  },
  {
    path: ROUTER_PATH.USER,
    name: ROUTER_NAME.USER,
    component: SalesComponent,
    meta: { role: ROLE.USER }
  },
  {
    path: ROUTER_PATH.ADMIN,
    name: ROUTER_NAME.ADMIN,
    component: AdminView,
    meta: { role: ROLE.ADMIN },
    children: [
      { path: '', component: AdminPage },
      {
        path: ROUTER_PATH.SETTING_USER,
        name: ROUTER_NAME.SETTING_USER,
        component: UserRegister
      },
      {
        path: ROUTER_PATH.SETTING_ADMIN_USER,
        name: ROUTER_NAME.SETTING_ADMIN_USER,
        component: UserRegister,
        props: { isAdminMode: true }
      },
      {
        path: ROUTER_PATH.USER_REGISTER,
        name: ROUTER_NAME.USER_REGISTER,
        component: UserInfoForm
      },
      {
        path: ROUTER_PATH.USER_ADMIN_REGISTER,
        name: ROUTER_NAME.USER_ADMIN_REGISTER,
        component: UserInfoForm,
        props: { isAdminMode: true }
      },
      {
        path: ROUTER_PATH.USER_SEARCH,
        name: ROUTER_NAME.USER_SEARCH,
        component: SearchUser
      },
      {
        path: ROUTER_PATH.USER_ADMIN_SEARCH,
        name: ROUTER_NAME.USER_ADMIN_SEARCH,
        component: SearchUser,
        props: { isAdminMode: true }
      },
      {
        path: ROUTER_PATH.USER_EDIT,
        name: ROUTER_NAME.USER_EDIT,
        component: UserEdit
      },
      {
        path: ROUTER_PATH.USER_ADMIN_EDIT,
        name: ROUTER_NAME.USER_ADMIN_EDIT,
        component: UserEdit,
        props: { isAdminMode: true }
      },
      {
        path: ROUTER_PATH.USER_LIST,
        name: ROUTER_NAME.USER_LIST,
        component: UserList
      },
      {
        path: ROUTER_PATH.USER_ADMIN_LIST,
        name: ROUTER_NAME.USER_ADMIN_LIST,
        component: UserList,
        props: { isAdminMode: true }
      },
      {
        path: ROUTER_PATH.USER_DELETE,
        name: ROUTER_NAME.USER_DELETE,
        component: UserDelete
      },
      {
        path: ROUTER_PATH.USER_ADMIN_DELETE,
        name: ROUTER_NAME.USER_ADMIN_DELETE,
        component: UserDelete,
        props: { isAdminMode: true }
      },
      {
        path: ROUTER_PATH.COMMON_SETTING,
        name: ROUTER_NAME.COMMON_SETTING,
        component: CommonSettingRegistration
      },
      {
        path: ROUTER_PATH.GAS_PRICE,
        name: ROUTER_NAME.GAS_PRICE,
        component: GasPrice
      },
      {
        path: ROUTER_PATH.GAS_APPLIANCES,
        name: ROUTER_NAME.GAS_APPLIANCES,
        component: ElectricalEquipmentListView,
        children: [
          {
            path: '',
            component: GasAppliancesList
          },
          {
            path: ROUTER_PATH.DEVICE_DETAIL,
            name: ROUTER_NAME.DEVICE_DETAIL_GAS_APP,
            component: DeviceDetail,
            props: { isNewForm: false, isElectricEquipment: false }
          },
          {
            path: ROUTER_PATH.DEVICE_NEW,
            name: ROUTER_NAME.DEVICE_DETAIL_GAS_APP_NEW,
            component: DeviceDetail,
            props: { isNewForm: true, isElectricEquipment: false }
          }
        ]
      },
      {
        path: ROUTER_PATH.ELECTRIC_EQUIPMENT,
        name: ROUTER_NAME.ELECTRIC_EQUIPMENT,
        component: ElectricalEquipmentListView,
        children: [
          {
            path: '',
            component: ElectricalEquipmentList
          },
          {
            path: ROUTER_PATH.DEVICE_DETAIL,
            name: ROUTER_NAME.DEVICE_DETAIL_ELECTRIC,
            component: DeviceDetail,
            props: { isNewForm: false, isElectricEquipment: true }
          },
          {
            path: ROUTER_PATH.DEVICE_NEW,
            name: ROUTER_NAME.DEVICE_DETAIL_ELECTRIC_NEW,
            component: DeviceDetail,
            props: { isNewForm: true, isElectricEquipment: true }
          }
        ]
      },

      {
        path: ROUTER_PATH.LIST_POWER_COMPANIES,
        name: ROUTER_NAME.LIST_POWER_COMPANIES,
        component: ListPowerCompaniesView,
        children: [
          {
            path: '',
            component: ListPowerCompanies
          },
          {
            path: ROUTER_PATH.POWER_COMPANY_DETAIL,
            name: ROUTER_NAME.POWER_COMPANY_DETAIL,
            component: PowerCompanyDetail
          }
        ]
      }
    ]
  },
  {
    path: ROUTER_PATH.USER_SETTING,
    name: ROUTER_NAME.USER_SETTING,
    component: ModeSetting,
    meta: { role: ROLE.USER }
  },
  {
    path: ROUTER_PATH.SIMULATOR,
    name: ROUTER_NAME.SIMULATOR,
    component: UserView,
    meta: { role: ROLE.USER },
    children: [
      { path: '', component: RegisterSimulator },
      {
        path: ROUTER_PATH.ELECTRIC_EQUIPMENT_USER,
        name: ROUTER_NAME.ELECTRIC_EQUIPMENT_USER,
        component: ElectricsView,
        children: [
          { path: '', component: ElectricEquipment },
          {
            path: ROUTER_PATH.NEW_ELECTRICS,
            name: ROUTER_NAME.NEW_ELECTRICS,
            component: NewElectrics
          },
          {
            path: ROUTER_PATH.EDIT_ELECTRICS,
            name: ROUTER_NAME.EDIT_ELECTRICS,
            component: EditElectrics
          }
        ]
      },
      {
        path: ROUTER_PATH.LIST_GAS_USER,
        name: ROUTER_NAME.LIST_GAS_USER,
        component: GasView,
        children: [
          { path: '', component: ListGas },
          {
            path: ROUTER_PATH.NEW_GAS,
            name: ROUTER_NAME.NEW_GAS,
            component: NewGas
          },
          {
            path: ROUTER_PATH.EDIT_GAS,
            name: ROUTER_NAME.EDIT_GAS,
            component: EditGas
          }
        ]
      }
    ]
  },
  {
    path: ROUTER_PATH.SEARCH_SIMULATOR,
    name: ROUTER_NAME.SEARCH_SIMULATOR,
    component: SearchSimulator,
    meta: { role: ROLE.USER }
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]
export default routers
