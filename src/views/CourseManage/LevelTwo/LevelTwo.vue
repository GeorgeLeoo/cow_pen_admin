<template>
  <div class="level">
    <div class="header">
      <el-button icon="el-icon-plus" type="primary" @click="handlerAddClick">添加</el-button>
    </div>
    <Table
      url="/course"
      :filter="{level: 2}"
      :fetch="isFetch"
      :setting="setting"
      :data="tableData"
      @operation="handleOperation"
      @fetch-end="handlerfetchEnd"
    />
    <add-dialog
      v-model="showAddDialog"
      :courseName="courseName"
      :courseLevelOneId="courseLevelOneId"
      @confirm="handlerConfirm"
    />
  </div>
</template>

<script lang='ts'>
import Table from '@/components/Table/index.vue'
import setting from './setting'
import { ElMessage, ElMessageBox } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { addLevelOne, addLevelTwo, deleteCourseOneById, deleteCourseTwoById, updateCourseOneById } from '@/api/courseManage'
import { InterfaceAddDialogConfirm, InterfaceCourseOne } from '@/interface/course'
import { confirm } from '@/utils'
import AddDialog from '../components/AddDialog/AddDialog.vue'

export default defineComponent({
  name: 'LevelTwo',
  components: {
    Table,
    AddDialog
  },
  setup () {
    const isFetch = ref(false)
    const showAddDialog = ref(false)
    const courseName = ref('')
    const courseLevelOneId = ref(0)

    const updatePage = () => {
      isFetch.value = true
    }

    const handlerAddClick = () => {
      showAddDialog.value = true
    }

    const apiDeteteLevelOne = async (id: number) => {
      confirm('确定删除吗？', '警告').then(() => {
        deleteCourseTwoById(id).then(() => {
          ElMessage.success('删除成功')
          updatePage()
        }).catch(() => {
          ElMessage.success('删除失败')
        })
      })
    }

    const handlerConfirm = (data: InterfaceAddDialogConfirm) => {
      addLevelTwo(data.courseOneId, data.courseName).then(() => {
        ElMessage.success('添加成功')
        showAddDialog.value = false
        updatePage()
      })
    }

    const handleOperation = (index: number, val: string, item: InterfaceCourseOne) => {
      if (index === 0) {
        showAddDialog.value = true
        if (item.courseLevelOneId) {
          courseLevelOneId.value = item.courseLevelOneId
        }
        courseName.value = item.courseName
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
      handlerfetchEnd,
      showAddDialog,
      handlerConfirm,
      courseName,
      courseLevelOneId
    }
  }
})
</script>

<style scoped src="./LevelTwo"></style>
