<template>
  <div class="level">
    <div class="header">
      <el-button icon="el-icon-plus" type="primary" @click="handlerAddClick">添加</el-button>
    </div>
    <Table
      url="/course"
      :filter="{level: 1}"
      :fetch="isFetch"
      :setting="setting"
      :data="tableData"
      @operation="handleOperation"
      @fetch-end="handlerfetchEnd"
    />
  </div>
</template>

<script lang='ts'>
import Table from '@/components/Table/index.vue'
import setting from './setting'
import { ElMessage, ElMessageBox } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { addLevelOne, deleteCourseOneById, updateCourseOneById } from '@/api/courseManage'
import { InterfaceCourseOne } from '@/interface/course'
import { confirm } from '@/utils'

export default defineComponent({
  name: 'LevelOne',
  components: {
    Table
  },
  setup () {
    const isFetch = ref(false)

    const updatePage = () => {
      isFetch.value = true
    }

    const apiAddLevelOne = (courseName: string) => {
      return addLevelOne(courseName)
    }

    const promot = (id?: number, courseName?: string) => {
      ElMessageBox.prompt('', '一级科目名称', {
        confirmButtonText: '确定',
        cancelButtonText: '确定',
        inputValue: courseName,
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            if (!instance.inputValue) {
              ElMessage.warning('请输入课程名称')
              return
            }
            instance.confirmButtonLoading = true
            if (id) {
              updateCourseOneById(id, instance.inputValue).then(() => {
                ElMessage.success('修改成功')
                updatePage()
                done()
              }).finally(() => {
                instance.confirmButtonLoading = false
              })
            } else {
              apiAddLevelOne(instance.inputValue).then(() => {
                ElMessage.success('添加成功')
                updatePage()
                done()
              }).finally(() => {
                instance.confirmButtonLoading = false
              })
            }
          } else {
            done()
          }
        }
      })
    }

    const handlerAddClick = () => {
      promot()
    }

    const apiDeteteLevelOne = async (id: number) => {
      confirm('确定删除吗？', '警告').then(() => {
        deleteCourseOneById(id).then(() => {
          ElMessage.success('删除成功')
          updatePage()
        }).catch(() => {
          ElMessage.success('删除失败')
        })
      })
    }

    const handleOperation = (index: number, val: string, item: InterfaceCourseOne) => {
      if (index === 0) {
        promot(item.id, item.courseName)
      }

      if (index === 1) {
        apiDeteteLevelOne(item.id)
      }
    }

    const handlerfetchEnd = () => {
      isFetch.value = false
    }

    const tableData = reactive([])
    return {
      setting,
      handlerAddClick,
      updatePage,
      tableData,
      handleOperation,
      isFetch,
      handlerfetchEnd
    }
  }
})
</script>

<style scoped lang="scss">
.level {
  .header {
    text-align: right;
  }
}
</style>
