import { getUserInfo, login, logout } from './../../api/user'
import { setToken, getToken } from '@/utils'

interface State {
  user: {};
  token: string;
  tokenInfo: {};
}

interface Store {
  commit: Function;
  state: State;
}

interface Store {
  commit: Function;
  state: State;
}

interface LoginInfo {
  username: string;
  password: string;
}

interface TokenInfo {
  token: string;
  expiresIn: number;
}

export default {
  state: {
    user: {},
    tokenInfo: {},
    token: getToken()
  },
  getters: {
  },
  mutations: {
    login (state: State, tokenInfo: TokenInfo) {
      state.tokenInfo = tokenInfo
    },
    setToken (state: State, token: string) {
      state.token = token
      setToken(token)
    },
    getUserInfo (state: State, userInfo: LoginInfo) {
      state.user = userInfo
    }
  },
  actions: {
    login ({ commit }: Store, loginInfo: LoginInfo): Promise<void> {
      return new Promise(resolve => {
        const { username, password } = loginInfo
        login(username, password).then(({ data }) => {
          commit('setToken', data.token ? data.token : '')
          commit('login', data.token)
          resolve()
        })
      })
    },
    logout ({ commit }: Store): Promise<void> {
      return new Promise(resolve => {
        logout().then().catch()
        commit('setToken', '')
        resolve()
      })
    },
    getUserInfo ({ commit }: Store): Promise<void> {
      return new Promise((resolve, reject) => {
        getUserInfo().then(({ data }) => {
          commit('getUserInfo', data)
          resolve()
        }).catch((err: {} | []) => {
          reject(err)
        })
      })
    }
  }
}
