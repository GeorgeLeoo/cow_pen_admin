import dayjs from 'dayjs'

const setting = [
  {
    label: '',
    width: 52,
    align: 'center',
    type: 'selection'
  },
  {
    label: '序号',
    prop: 'index',
    width: 80,
    align: 'center',
    type: 'index'
  },
  {
    label: '课程名称',
    prop: 'courseName',
    align: 'center'
  },
  {
    label: '课程代码',
    prop: '_id'
  },
  {
    label: '创建时间',
    prop: 'createdAt',
    width: 200,
    formatter: (val: string, data: any) => {
      return dayjs(val).format('YYYY-MM-DD hh:mm:ss')
    }
  },
  {
    label: '操作人',
    prop: 'user',
    formatter: (val: string, data: any) => {
      return data?.user?.username
    }
  },
  {
    label: '操作',
    align: 'center',
    btnGroup: true,
    width: 100,
    btn: ['修改', '删除']
  }
  // 删除，编辑，修改
]

export default setting
