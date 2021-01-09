<!--
  组件名：下拉选择 AiSelect

  属性：
  options <Array> 下拉选择列表项
  default <Boolean> 默认选中下拉选择列表项的第0项
  placeholder <string> 无选择时显示的文字
  clearable <string> 无选择时显示的文字
  labelText <string> 对于下拉列表的 label 值
  valueText <string> 对于下拉列表的 value 值
  remote <object> select 使用请求的配置项
    url <string> 请求的url
    body <object> 请求的参数
  multiple <boolean> 是否多选
  filterFunction <function> 处理请求的结果， 必须 return 最终结果

  事件：
  remote(val) 与element用法一致
  loadMore 加载更多的事件
  select(value, label) 选择下拉列表项后触发事件
  beforeSend 在请求之前的处理操作

-->
<!--:remote="remoteable"-->
<template>
  <div class="select" ref="select">
    <span v-if="label" class="select-label">{{ label }}</span>
    <el-select
      ref="el-select"
      class="select__item"
      v-model="value"
      v-loadmore="loadMore"
      :style="{width: width + 'px'}"
      :clearable="clearable"
      :placeholder="placeholder"
      :multiple="multiple"
      :filterable="filterable"
      :filter-method="remoteSearch"
      @focus="handlerFocus"
      @blur="handlerBlur"
      @change="handleChange"
      @clear="handlerClear"
      @visible-change="v => visibleChange(v, 'el-select')"
    >
      <el-option v-for='(item, index) in optionList' :key="index" :label='item[labelText]'
                 :value='item[valueText]'></el-option>
      <el-option v-if="loading" v-loading="loading" class="loading" value=""></el-option>
    </el-select>
  </div>
</template>
<script>
import DataType from '@/libs/DataType'
import HttpRequest from '@/libs/HttpRequest'

export default {
  name: 'Select',
  props: {
    width: {
      type: Number,
      default: 130
    },
    options: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    labelText: {
      type: String,
      default: 'label'
    },
    valueText: {
      type: String,
      default: 'value'
    },
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
    multiple: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    default: {
      type: Boolean,
      default: false
    },
    paging: {
      type: Boolean,
      default: true
    },
    filterFunction: {
      type: Function,
      default: null
    },
    selectValue: {
      type: String,
      default: ''
    },
    validator: {
      type: Function,
      default: null
    },
    footerEl: {
      type: Function,
      default: null
    },
    footerList: {
      type: Array,
      default: () => {
        return []
      }
    },
    hiddenWhenClickFooter: {
      type: Boolean,
      default: false
    },
    extraData: {
      type: [Number, Boolean, String, Object, Array],
      default: ''
    }
  },
  data () {
    return {
      optionList: [],
      value: '',
      filterable: false,
      remoteable: false,
      loading: false,
      page: 1,
      limit: 20,
      searchKey: '',
      over: false
    }
  },
  watch: {
    selectValue: {
      handler (val) {
        this.value = val
      },
      immediate: true
    },
    url: {
      handler (val) {
        if (val) {
          this.filterable = true
          this.remoteable = true
          this.over = false
          this.page = 1
          this.optionList = []
          this.fetchData()
        }
      },
      immediate: true
    },
    filter: {
      handler (val) {
        if (DataType.isObject(val) && Object.keys(val).length > 0) {
          this.fetchData()
        }
      },
      immediate: true,
      deep: true
    },
    options: {
      handler (val) {
        this.optionList = val
      },
      immediate: true
    }
  },
  directives: {
    loadmore (el, binding) {
      const $el = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
      $el && $el.addEventListener('scroll', function () {
        const condition = this.scrollHeight - this.scrollTop <= this.clientHeight
        if (condition) {
          binding.value()
        }
      })
    }
  },
  methods: {
    handlerFocus (e) {
      this.$emit('focus', e, this.$refs['el-select'])
    },
    handlerBlur (e) {
      this.$emit('blur', e, this.$refs['el-select'])
    },
    /**
     * 点击添加品牌
     */
    categoriesClick () {
      this.openOff = true
    },
    /**
     * 为element-ui的Select添加操作按钮
     * @param visible
     * @param refName  设定的ref名称
     */
    visibleChange (visible, refName) {
      if (visible && DataType.isArray(this.footerList) && this.footerList.length > 0) {
        const ref = this.$refs[refName]

        let popper = ref.$refs.popper

        if (popper.$el) popper = popper.$el

        if (!Array.from(popper.children).some(v => v.className === 'select__footer')) {
          let btnHTML = ''
          // 生成 btn 组
          // eslint-disable-next-line no-return-assign
          this.footerList.forEach((item, index) =>
            btnHTML += `<span
                        class="select__footer__btn"
                        data-index="${index}"
                        data-value="${item}"
                        style="cursor:pointer;display:inline-block;text-align:center;margin-right:10px;font-size:12px;height: 30px;line-height: 30px;width: 70px;border: 1px solid #FF5C50;color: #FF5C50"
                        >${item}</span>`)

          // 创建ul
          const el = document.createElement('ul')
          el.className = 'select__footer'
          el.style = 'border-top: solid 1px #E4E7ED; padding:0; color: #606266;text-align:right'
          el.innerHTML = `<li class="" style="height:50px;line-height: 50px;list-style:none;">${btnHTML}</li>`

          popper.appendChild(el)

          const btns = document.getElementsByClassName('select__footer__btn')

          // 添加 click
          for (let i = 0; i < btns.length; i++) {
            const itemEl = btns[i]

            itemEl.onclick = (e) => {
              this.$emit('footer-click', { e, data: { ...e.target.dataset } })
              // 以下代码实现点击后弹层隐藏
              if (this.hiddenWhenClickFooter) {
                if (ref.toggleDropDownVisible) {
                  ref.toggleDropDownVisible(false)
                } else {
                  ref.visible = false
                }
              }
            }
          }
        }
      }
      this.$emit('visible-change', visible, this.$refs.select, this.extraData, this.$refs[refName])
    },
    handlerClear () {
      this.searchKey = ''
      this.fetchData(1)
      this.$emit('clear', this.$refs.select)
    },
    remoteSearch (val) {
      this.searchKey = val || ''
      if (!this.url) {
        return
      }
      this.optionList = []
      this.page = 1
      this.fetchData()
      this.$emit('remote', val)
    },
    loadMore () {
      if (this.paging) {
        if (this.loading || this.over) {
          return
        }

        this.page++
        this.fetchData()
        this.$emit('load-more')
      }
    },
    handleChange () {
      let label = ''
      let item = {}
      for (let i = 0; i < this.optionList.length; i++) {
        if (this.optionList[i].value === this.value) {
          label = this.optionList[i].label
          item = this.optionList[i]
          break
        }
      }
      this.$emit('select', this.value, label, item, this.extraData)
    },
    fetchData (p) {
      this.$emit('before-send')
      if (DataType.isFunction(this.validator) && !this.validator()) {
        return
      }
      // 若 p === 1 则刷新数据
      if (DataType.isNumber(p)) {
        this.page = p
        if (p === 1) {
          this.value = ''
          this.optionList = []
          // this.remote && (this.remote.body['SEARCH_KEY'] = '')
        }
      }
      if (!this.url) {
        return
      }
      let page = {}
      if (this.paging) {
        page = { PN: this.page, PAGE_SIZE: this.limit }
      }

      const body = Object.assign(
        {},
        this.filter,
        page,
        { SEARCH_KEY: this.searchKey ? this.searchKey : '' },
        { search: this.searchKey ? this.searchKey : '' }
      )
      this.loading = true
      HttpRequest.request({
        url: this.url,
        params: body,
        method: 'get'
      }).then(res => {
        if (res.data.length === 0) {
          this.over = true
        }
        this.loading = false
        this.$emit('after-request', res.data)
        if (this.filterFunction && DataType.isFunction(this.filterFunction)) {
          const list = this.filterFunction(res)
          if (this.page === 1) {
            this.optionList = list
            if (this.default) {
              this.value = list[0][this.valueText]
              this.handleChange()
            }
            return
          }
          this.optionList.push(...list)
        } else {
          if (this.page === 1) {
            this.optionList = res.data
            if (this.default) {
              this.value = res.data[0][this.valueText]
              this.handleChange()
            }
            return
          }
          this.optionList.push(...res.data)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.select {
  display: inline-block;
  border: 1px solid #dcdfe6;
  border-radius: 4px;

  .select-label {
    padding-left: 10px;
    font-size: 14px;
    color: #404D5B;
  }

  ::v-deep .el-input__inner {
    border-width: 0;
    padding-left: 10px;
  }

  .loading {
    height: 80px;
  }

  ::v-deep .select-footer {
    position: fixed;
    bottom: 0;
  }
}
</style>
