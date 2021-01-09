<template>
  <el-dialog
    class="template-dialog"
    :title="state.title"
    :visible="value"
    width="500px"
    :before-close="handleClose">
    <div>
      <Select
        url="/course/one"
        label-text="courseName"
        value-text="id"
        :width="460"
        :select-value="state.id"
        placeholder="一级课程名称"
        @select="handlerSelect"
      />
      <el-input
        class="course-name"
        v-model="state.courseName"
        placeholder="二级课程名"
      />
      <div class="btns">
        <el-button
          type="primary"
          @click="handlerSave"
        >保存</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from 'vue'
import Select from '@/components/Select'

export default defineComponent({
  name: 'AddDialog',
  components: {
    Select
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    courseName: {
      type: String,
      default: ''
    },
    courseLevelOneId: {
      type: Number,
      default: 0
    }
  },
  emits: ['input', 'confirm'],
  setup (props, { emit }) {
    const state = {
      courseName: '',
      title: '添加二级科目',
      id: ''
    }

    watch(
      () => props.courseName,
      val => {
        state.courseName = val
      }
    )

    watch(
      () => props.courseLevelOneId,
      val => {
        state.id = val
      }
    )

    const handleClose = () => {
      emit('input', !props.value)
    }

    const handlerSave = () => {
      emit('confirm', { courseName: state.courseName, courseOneId: state.id })
    }

    const handlerSelect = (val) => {
      state.id = val
    }

    return {
      state,
      handleClose,
      handlerSave,
      handlerSelect
    }
  }
})
</script>

<style scoped lang='scss'>
.course-name {
  margin-top: 30px;
  margin-bottom: 30px;
}
.btns {
  text-align: right;
}
</style>
