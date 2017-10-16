<template>
    <div class="log-contain">
        <el-form :inline="true" :model="filters" class="form-inline">
            <el-form-item>
                <el-input type="tel" v-model="filters.operatorPhone" placeholder="手机号" :maxlength="11"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search" style="margin-left: 10px;">查询</el-button>
            </el-form-item>
        </el-form>
        <iTable :tableData="dataList" :columns="columns" :loading="loading"
                :pagination="pagination" @handleTableChange="handleTableChange" ref="iTable"></iTable>
    </div>
</template>

<script>
  import iTable from '../../components/iTable.vue'
  import api from './log'

  export default {
    components: {iTable},
    data () {
      return {
        sort: {},
        dataList: [],
        props: {
          value: 'value',
          children: 'cities'
        },
        pagination: {size: 20},
        customStyle: '', // 每页样式
        columns: [
          {prop: 'operateType', label: '操作类型', type: ''},
          {prop: 'operatorPhone', label: '操作人', type: ''},
          {
            prop: 'operateTime',
            label: '操作时间',
            type: '',
            width: 200,
            format: (row, column) => {
              return this.$utils.Date.format(row[column.prop], 'yyyy年MM月dd日 hh:mm:ss')
            }
          },
          {prop: 'operateDesc', label: '操作详情', type: '', width: 600}
        ], // 数据列
        operateColumn: {},
        loading: true,
        filters: {
          operatorPhone: null
        },
        currentIndex: 1
      }
    },
    computed: {},
    created () {
    },
    mounted () {
      this.$nextTick(() => {
        this.search()
      })
    },
    beforeDestroy () {},
    methods: {
      search () {
        if (!this.$utils.Validate.chkFormat(this.filters.operatorPhone, 'phone') && this.filters.operatorPhone !== null) {
          this.$notify.error({title: '错误', message: '请输入正确的手机号'})
          return
        }
        this.currentIndex = 1
        this.$refs.iTable.handleCurrentChange(1, false)
        this.fetch({
          pageNo: this.currentIndex,
          pageSize: this.pagination.size,
          ...this.sort,
          ...this.filters
        })
      },
      fetch (params) {
        api.queryOperateLogByPage(params).then(({total, list}) => {
          this.loading = false
          this.dataList = list
          this.pagination.total = total
        }).catch(() => {
          this.loading = false
        })
      },
      handleTableChange (pagination, sort) {
        this.currentIndex = pagination.current
        if (sort) {
          this.sort = {
            sortname: sort.prop,
            sorttype: sort.order
          }
        }
        this.fetch({
          pageNo: pagination.current,
          pageSize: pagination.pageSize,
          ...this.sort,
          ...this.filters
        })
      }
    }
  }
</script>

<style lang="less">
    .log-contain {
        background-color: #fff;
        .form-inline {
            input {
                width: 160px;
            }
        }
    }
</style>
