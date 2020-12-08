const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '首页',
      icon: 'home'
    }
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      title: '关于',
      icon: 'mine'
    }
  },
  {
    path: '/error',
    name: 'Error',
    redirect: '/error/404',
    meta: {
      title: 'Error',
      icon: 'find'
    },
    children: [
      {
        path: '404',
        name: '404',
        meta: {
          title: '404',
          icon: 'money'
        }
      },
      {
        path: '401',
        name: '401',
        meta: {
          title: '401',
          icon: 'msg'
        }
      }
    ]
  },
  {
    path: '/parent',
    name: 'Parent',
    redirect: '/parent/4041',
    meta: {
      title: 'parent',
      icon: 'chat'
    },
    children: [
      {
        path: '4041',
        name: '4041',
        meta: {
          title: '4041',
          icon: 'like'
        }
      },
      {
        path: '4012',
        name: '4012',
        meta: {
          title: '4012',
          icon: 'ok'
        }
      }
    ]
  }
]

const to = {
  path: '404',
  name: '404',
  meta: {
    title: '404',
    icon: 'money'
  }
}
let list = []
let li = []
function setRoutes (routes) {
  let index = 0
  while (index < routes.length) {
    if (routes[index].name === to.name) {
      console.log(routes[index].name, to.name)
      list.push(routes[index])
      for (let i = 0; i < list.length; i++) {
        li[i] = list[i]
      }
      break
    } else if (routes[index].children) {
      list.push(routes[index])
      setRoutes(routes[index].children)
    } else if (index + 1 === routes.length) {
      list = []
    }
    index++
  }
}

setRoutes(routes)
console.log(list)
