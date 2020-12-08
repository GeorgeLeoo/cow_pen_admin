import { RouteRecordRaw } from 'vue-router'

interface State {
  routes: RouteRecordRaw[];
  breadCrumbList: RouteRecordRaw[];
  tagNavList: RouteRecordRaw[];
}

interface Store {
  commit: Function;
  state: State;
}

interface RemoveTagNav {
  index: number;
  name: string;
  type: string;
}

export default {
  state: {
    routes: [],
    breadCrumbList: [],
    tagNavList: []
  },
  getters: {
    tagNavList: (state: State) => state.tagNavList,
    breadCrumbList: (state: State) => state.breadCrumbList
  },
  mutations: {
    setRoutes (state: State, routes: RouteRecordRaw[]) {
      for (const route of routes) {
        if (route.name === 'Layout') {
          const children = route.children
          if (children) {
            state.routes = children
          }
        }
      }
      if (routes.length > 0) {
        state.tagNavList.push(state.routes[0])
      }
    },
    setTagNavList (state: State, to: RouteRecordRaw) {
      const findItem = state.tagNavList.find(item => to.name === item.name)
      if (!findItem) {
        state.tagNavList.push(to)
      }
    },
    removeTagNav (state: State, { name, type, index }: RemoveTagNav) {
      if (type === 'ITEM') {
        state.tagNavList.splice(index, 1)
      }
      if (type === 'ALL') {
        state.tagNavList = [state.routes[0]]
      }
      if (type === 'OTHER') {
        const result = []
        for (let index = 0; index < state.tagNavList.length; index++) {
          const element = state.tagNavList[index]
          if (index === 0 || element.name === name) {
            result.push(element)
          }
        }
        state.tagNavList = result
      }
    },
    breadCrumbList (state: State, to: RouteRecordRaw) {
      let _breadCrumbList: RouteRecordRaw[] = []
      const final: RouteRecordRaw[] = []

      const getRoutes = (routes: RouteRecordRaw[]) => {
        let index = 0
        while (index < routes.length) {
          if (routes[index].name === to.name) {
            _breadCrumbList.push(routes[index])
            for (let i = 0; i < _breadCrumbList.length; i++) {
              final[i] = _breadCrumbList[i]
            }
            break
          } else if (routes[index].children) {
            _breadCrumbList.push(routes[index])
            const children = routes[index].children
            if (children) {
              getRoutes(children)
            }
          } else if (index + 1 === routes.length) {
            _breadCrumbList = []
          }
          index++
        }
      }

      getRoutes(state.routes)

      state.breadCrumbList = final
    }
  },
  actions: {
    setTagNavList ({ commit }: Store, to: RouteRecordRaw) {
      commit('setTagNavList', to)
    },
    setRoutes ({ commit }: Store, routes: RouteRecordRaw[]) {
      commit('setRoutes', routes)
    },
    removeTagNav ({ commit, state }: Store, { name, type, index }: RemoveTagNav) {
      return new Promise(resolve => {
        commit('removeTagNav', { type, index, name })
        if (type === 'ITEM') {
          resolve(state.tagNavList[index - 1])
        }
        if (type === 'ALL') {
          resolve(state.tagNavList[0])
        }
      })
    },
    breadCrumbList ({ commit }: Store, to: RouteRecordRaw) {
      commit('breadCrumbList', to)
    }
  }
}
