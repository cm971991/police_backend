<template>
    <div class="user-contain">
        <el-form :inline="true" :model="filters" class="form-inline">
            <el-form-item>
                <el-input v-model="filters.phone" placeholder="手机号" :maxlength="11"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search" style="margin-left: 10px;">查询</el-button>
                <el-button type="primary" @click="exportExcel">导出</el-button>
                <!--<a class="export" href="/policeApi/downloadSingleQueryNumberResult.view">导出</a>-->
            </el-form-item>
        </el-form>
        <iTable :tableData="dataList" :columns="columns" :loading="loading"
                :pagination="pagination" @handleTableChange="handleTableChange" ref="iTable"></iTable>
    </div>
</template>

<script>
  import iTable from '../../../components/iTable.vue'
  import api from './singleTracking'
  import url from '../../../api/api_config'

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
          {prop: 'telephone', label: '手机号', type: ''},
          {prop: 'cityName', label: '地市', type: ''},
          {
            prop: 'queryTime',
            label: '查询时间',
            type: '',
            format: (row, column) => {
              return this.$utils.Date.format(row[column.prop], 'yyyy年MM月dd日 hh:mm:ss')
            }
          }
        ], // 数据列
        operateColumn: {},
        loading: true,
        filters: {
          phone: null
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
      /**
       * 查询
       */
      search () {
        if (!this.$utils.Validate.chkFormat(this.filters.phone, 'phone') && this.filters.phone !== null) {
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
      /**
       * 获取列表数据
       * @param params
       */
      fetch (params) {
        api.querySingleNumberPosition(params)
          .then(({total, list}) => {
            this.loading = false
            this.dataList = list
            this.pagination.total = total
          })
          .catch((ex) => {
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
      },
      /**
       * 导出
       */
      exportExcel () {
        this.$utils.Common.exportFile(url.getUrl('downloadSingleQueryNumberResult'), {
          phone: this.filters.phone,
          token: this.$store.state.auth.token || ''
        })
      }
    }
  }
</script>

<style lang="less">
    .user-contain {
        background-color: #fff;
        .form-inline {
            input {
                width: 160px;
            }
            .export {
                display: inline-block;
                line-height: 1;
                white-space: nowrap;
                cursor: pointer;
                color: #fff;
                background-color: #20a0ff;
                border-color: #20a0ff;
                padding: 10px 15px;
                border-radius: 4px;
                margin-left: 10px;
            }
        }
    }
</style>
