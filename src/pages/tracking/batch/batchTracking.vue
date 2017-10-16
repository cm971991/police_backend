<template>
    <div class="batch-contain">
        <el-form :inline="true" class="form-inline">
            <el-form-item>
                <el-upload
                        class="upload-file"
                        action="temp"
                        accept=".txt"
                        :before-upload="beforeUpload">
                    <el-button type="primary">导入</el-button>
                </el-upload>
                <el-button type="primary" class="refresh" @click="refresh">刷新</el-button>
            </el-form-item>
        </el-form>
        <iTable :tableData="dataList" :columns="columns" :loading="loading" :operateColumn="operateColumn"
                :pagination="pagination" @handleTableChange="handleTableChange" ref="iTable"></iTable>
    </div>
</template>

<script>
  import iTable from '../../../components/iTable.vue'
  import api from '../batch/batchTracking'
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
          {prop: 'id', label: '序号', type: '', width: 100},
          {prop: 'fileName', label: '文件名称', type: '', width: 300},
          {prop: 'totalCount', label: '查询号码总数', type: '', width: 150},
          {prop: 'successCount', label: '查询号码成功数', type: '', width: 150},
          {
            prop: 'status',
            label: '状态',
            type: '',
            width: 150,
            format: (row, column) => {
              return this.getStatus(row[column.prop])
            }
          },
          {
            prop: 'importTime',
            label: '导入时间',
            type: '',
            width: 250,
            format: (row, column) => {
              return this.$utils.Date.format(row[column.prop], 'yyyy年MM月dd日 hh:mm:ss')
            }
          }
        ], // 数据列
        operateColumn: {
          width: 100,
          fixed: 'right',
          list: [
            {
              type: 'warning',
              name: '导出',
              icon: 'document',
              method: (index, row) => {
                this.$utils.Common.exportFile(url.getUrl('downloadBatchQueryNumberResult'), {
                  fileId: row.id,
                  token: this.$store.state.auth.token || ''
                })
              },
              disabled: (index, row) => {
                return row.status === 3
              }
            }
          ]
        },
        loading: true,
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
       * 刷新
       */
      refresh () {
        this.search()
      },
      /**
       * 查询
       */
      search () {
        this.currentIndex = 1
        this.$refs.iTable.handleCurrentChange(1, false)
        this.fetch({
          pageNo: this.currentIndex,
          pageSize: this.pagination.size,
          ...this.sort
        })
      },
      /**
       * 获取列表数据
       * @param params
       */
      fetch (params) {
        api.queryBatchNumberFiles(params).then(({total, list}) => {
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
          ...this.sort
        })
      },
      /**
       * 导入
       * @param file
       * @returns {boolean}
       */
      beforeUpload (file) {
        let fd = new FormData()
        fd.append('file', file)
        api.importBatchNumberFile(fd)
          .then((res) => {
            this.$notify.success({
              title: '成功',
              message: res.desc
            })
            this.search()
          })
          .catch((ex) => {
          })
        return false
      },
      /**
       *
       * @param status
       * @returns {*}
       */
      getStatus (status) {
        switch (status) {
          case 1:
            return '<span class="el-tag el-tag--success">批量查询成功</span>'
          case 2:
            return '<span class="el-tag el-tag--warning">批量查询失败</span>'
          case 3:
            return '<span class="el-tag el-tag--gray">批量查询中</span>'
          default :
            return '<span class="el-tag el-tag--danger">未知异常</span>'
        }
      }
    }
  }
</script>

<style lang="less">
    .batch-contain {
        background-color: #fff;
        .form-inline {
            input {
                width: 160px;
            }
        }
        .upload-file {
            width: 70px;
            height: 36px;
            float: left;
            div.el-upload--text {
                width: 60px;
                height: 36px;
            }
        }
        .refresh {
            padding: 9px 15px;
        }
    }
</style>
