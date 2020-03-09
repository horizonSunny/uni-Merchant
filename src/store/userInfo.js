import { getUserInfo } from '@/service/index'
const userModule = {
  state: {
    userInfo: {},
    custAddress: [
      {
        fullName: '张三',
        phone: '17717918675',
        province: '陕西省',
        city: '西安市',
        sex: '男士',
        area: '雁塔区',
        detailAddress: '高新四路11号'
      },
      {
        fullName: '张三',
        phone: '17717918675',
        sex: '男士',
        province: '陕西省',
        city: '西安市',
        area: '雁塔区',
        detailAddress: '高新四路11号'
      },
      {
        fullName: '张三',
        phone: '17717918675',
        sex: '男士',
        province: '陕西省',
        city: '西安市',
        area: '雁塔区',
        detailAddress: '高新四路11号'
      },
      {
        fullName: '张三',
        phone: '17717918675',
        sex: '男士',
        province: '陕西省',
        city: '西安市',
        area: '雁塔区',
        detailAddress: '高新四路11号'
      }
    ]
  },
  getters: {},
  mutations: {
    SET_USER: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  actions: {
    GetUserInfo({ commit }, params) {
      return getUserInfo(params).then(res => {
        commit('SET_USER', res.data)
        return res.data
      })
    }
  }
}
export default userModule
