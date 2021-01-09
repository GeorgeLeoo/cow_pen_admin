const Panel = () => import(/* webpackChunkName: "panel" */ '../../components/Panel/Panel.vue')
const LevelOne = () => import(/* webpackChunkName: "LevelOne" */ '@/views/CourseManage/LevelOne/LevelOne.vue')
const LevelTwo = () => import(/* webpackChunkName: "LevelTwo" */ '@/views/CourseManage/LevelTwo/LevelTwo.vue')
const LevelThree = () => import(/* webpackChunkName: "LevelThree" */ '@/views/CourseManage/LevelThree/LevelThree.vue')

const courseMangeRouter = {
  path: '/course-manage',
  name: 'CourseMange',
  redirect: '/error/404',
  component: Panel,
  meta: {
    title: '课程管理',
    icon: 'find'
  },
  children: [
    {
      path: 'level-one',
      name: 'LevelOne',
      component: LevelOne,
      meta: {
        title: '一级科目',
        icon: 'money'
      }
    },
    {
      path: 'level-two',
      name: 'LevelTwo',
      component: LevelTwo,
      meta: {
        title: '二级科目',
        icon: 'money'
      }
    },
    {
      path: 'level-three',
      name: 'LevelThree',
      component: LevelThree,
      meta: {
        title: '三级科目',
        icon: 'money'
      }
    }
  ]
}

export default courseMangeRouter
