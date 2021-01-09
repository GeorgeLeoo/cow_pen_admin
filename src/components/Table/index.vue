<!--
  组件名：表格 AiTable

  属性：
  data <Array> 表格数据
  height <String｜Number> 表格高度
  setting <Array> 表格配置项
    label <String> 表格列名
    prop <String> data中对应的要渲染的属性名
    formatter <Function> 格式化最终值函数
    img <Boolean> 是否以图片的形式显示
    btn <String｜Array> 按钮的值 格式 "详情" 或 ["详情", "删除"]
    dropdown(scope) <Function> 下拉列表 必须返回一个数组 格式例如 [{command: "1", text: "删除"}]
      command <any> 命令值
      text <String> 文本
    btnGroup <Boolean> 是否显示btn和dropdown
    sortable <Boolean> 是否显示排序
    slot <String> 插槽的名称，拥有这个属性即可使用对应的插槽，例如:
        <bu-table :data="tableData" :setting="setting" @command="handleCommand">
          <template slot="name" slot-scope="scope">
            <div>scope.row['name']</div>
          </template>
        </bu-table>

  事件：
  operation(index, val, item) 表格操作按钮事件
  command(command, template, item) 表格下拉选择列表事件

-->
<template>
  <div>
    <el-table
      v-loading="loading"
      class="table-body"
      :data="state.tableData"
      :stripe="stripe"
      :border="border"
      :span-method="spanMethod"
      :cell-class-name="cellClassName"
      :header-cell-style="headerCellStyle"
      :cell-style="cellStyle"
      @sort-change="handleSort"
      @cell-mouse-enter="handlerCellMouseEnter"
      @cell-mouse-leave="handlerCellMouseLeave"
      @selection-change="handleSelectionChange"
    >
      <template v-for="(item, index) in setting">
        <el-table-column
          v-if="item.type"
          :key="index + ''"
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
          :min-width="item.minWidth"
          :fixed="item.fixed"
          :align="item.align"
          :type="item.type"
        />
        <el-table-column
          v-else
          :key="index + ''"
          :label="item.label"
          :sortable="item.sortable"
          :prop="item.prop"
          :width="item.width"
          :min-width="item.minWidth"
          :fixed="item.fixed"
          :align="item.align"
        >
          <template v-slot="scope">
            <slot
              v-if="item.slot"
              :name="item.slot"
              :row="scope.row"
              :scope="scope"
              :item="item"
            ></slot>
            <div v-else-if="item.btnGroup">
              <template v-if="isString(item.btn)">
                <el-button
                  type="text"
                  @click="handleOperation(0, item.btn, scope.row)"
                  >{{ item.btn }}
                </el-button>
              </template>
              <template v-if="isArray(item.btn)">
                <el-button
                  v-for="(btn, index) in item.btn"
                  :key="btn"
                  type="text"
                  @click="handleOperation(index, btn, scope.row)"
                  >{{ btn }}
                </el-button>
              </template>
              <template v-if="item.dropdown">
                <el-dropdown
                  v-if="item.dropdown"
                  @command="handleCommand($event, scope.row)"
                  trigger="click"
                >
                  <span class="el-dropdown-link">
                    <el-button
                      type="text"
                      icon="el-icon-more"
                      style="color: #F56C6C;"
                    ></el-button>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu class="ai-dropdown-menu">
                      <el-dropdown-item
                        v-for="(dropDownItem, index) in item.dropdown(
                          scope.row
                        )"
                        :key="index"
                        :command="dropDownItem.command"
                        :row="scope.row"
                      >
                        {{ dropDownItem.text }}
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template>
            </div>
            <div
              v-else
              :class="[
                { pre: item.pre },
                typeof item.style === 'function'
                  ? item.style(scope.row[item.prop], scope.row)
                  : ''
              ]"
              @click="handlerColumnClick(index, scope.row, setting)"
            >
              {{
                typeof item.formatter === "function"
                  ? item.formatter(scope.row[item.prop], scope.row)
                  : scope.row[item.prop]
              }}
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
import DataType from '@/libs/DataType'
import { deepClone, bubbleSort } from '@/utils'
import { reactive, ref, watch } from 'vue'
import HttpRequest from '@/libs/HttpRequest'

export default {
  name: 'Table',
  components: {},
  props: {
    url: {
      type: String,
      default: ''
    },
    filter: {
      type: Object,
      default: () => {
        return {}
      }
    },
    total: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default () {
        return [10, 20, 30, 50]
      }
    },
    showPaging: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    validator: {
      type: Function,
      default: () => {
        return true
      }
    },
    paging: {
      type: Boolean,
      default: true
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    filterFunction: {
      type: Function,
      default: null
    },
    /**
     * 表格数据
     */
    data: {
      type: Array,
      default: () => []
    },
    /**
     * 表格配置
     */
    setting: {
      type: Array,
      default: () => []
    },
    height: [String, Number],
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    fetch: {
      type: Boolean,
      default: false
    },
    spanMethod: Function,
    cellClassName: [Function, String],
    headerCellStyle: {
      type: [Function, Object],
      default: () => {
        return {}
      }
    },
    cellStyle: [Function, Object]
  },
  setup (props, { emit }) {
    const state = reactive({
      tableData: [],
      cacheData: []
    })

    const pLimit = ref(20)
    const pPage = ref(1)
    const pTotal = ref(0)
    const isLoading = ref(false)

    const handleSelectionChange = selection => {
      emit('selection-change', selection)
    }

    const handlerColumnClick = (index, row, setting) => {
      emit('column-click', index, row, setting)
    }

    const handlerCellMouseEnter = (row, column, cell, event) => {
      emit('cell-mouse-enter', row, column, cell, event)
    }
    const handlerCellMouseLeave = (row, column, cell, event) => {
      emit('cell-mouse-leave', row, column, cell, event)
    }
    const isArray = obj => {
      return DataType.isArray(obj)
    }
    const isString = obj => {
      return DataType.isString(obj)
    }
    const handleOperation = (index, val, item) => {
      emit('operation', index, val, item)
    }
    const handleCommand = (command, item) => {
      emit('command', command, item)
    }
    const handleSort = ({ prop, order }) => {
      if (order === 'ascending') {
        state.tableData = deepClone(bubbleSort(state.cacheData, prop))
      } else if (order === 'descending') {
        state.tableData = deepClone(bubbleSort(state.cacheData, prop, true))
      } else {
        state.tableData = deepClone(state.cacheData)
      }
    }

    const fetchData = (filterData, type) => {
      if (!props.url) {
        return
      }
      if (!props.validator()) {
        return
      }
      if (type === 'init') {
        pPage.value = 1
      }
      if (pPage.value === 1) {
        state.tableData = []
      }
      let data = {}
      if (props.paging) {
        data = { PN: pPage.value, PAGE_SIZE: pLimit.value }
      }
      if (filterData) {
        data = Object.assign({}, data, filterData)
      } else {
        data = Object.assign({}, data, props.filter)
      }
      if (props.loading) {
        isLoading.value = true
      }
      HttpRequest.request({
        url: props.url,
        method: 'get',
        params: data
      }).then(res => {
        emit('fetch-end')
        emit('after-request', res.data)
        if (props.filterFunction && DataType.isFunction(props.filterFunction)) {
          state.tableData = reactive(props.filterFunction(res))
        } else {
          state.tableData = reactive(res.data)
        }
        res.extraData &&
          res.extraData.page &&
          (pTotal.value = res.extraData.page.querySize)
        if (props.loading) {
          isLoading.value = false
        }
      }).catch(() => {
        emit('fetch-end')
      })
    }

    watch(
      () => props.data,
      val => {
        // tableData = val
        state.cacheData = deepClone(val)
      }
    )

    watch(
      () => props.fetch,
      () => {
        fetchData()
      }
    )

    watch(
      () => props.filter,
      val => {
        if (DataType.isObject(val) && Object.keys(val).length > 0) {
          fetchData()
        }
      }
    )

    watch(
      () => props.limit,
      val => {
        pLimit.value = val
      }
    )

    watch(
      () => props.page,
      val => {
        pPage.value = val
      }
    )

    fetchData()

    return {
      state,
      handleSelectionChange,
      handlerColumnClick,
      handlerCellMouseEnter,
      handlerCellMouseLeave,
      isArray,
      isString,
      handleOperation,
      handleCommand,
      handleSort,
      pLimit,
      pPage,
      pTotal,
      isLoading,
      fetchData
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/index.scss";
::v-deep .el-table__header,
::v-deep .el-table__body,
::v-deep .el-table__footer {
  width: 100% !important;
}
.table-body {
  // .green {
  //   color: $color-success;
  // }

  // .grey {
  //   color: $text-color-grey;
  // }

  // .red {
  //   color: $color-primary;
  // }

  // .icon-more {
  //   color: $color-primary;
  // }

  .ai-dropdown-menu {
    min-width: 140px !important;
  }

  .el-dropdown-link {
    margin-right: 12px;
  }

  .pre {
    white-space: pre-wrap;
  }

  .border {
    border-bottom: 1px solid #ebeef5;
  }
}
</style>
