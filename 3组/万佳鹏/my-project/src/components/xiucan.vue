<template>
    <div>
        <template>
            <el-table :data="lists" style="width: 100%" :border="true" @expand-change="kan">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <ul class="ul">
                            <li>
                                <el-tag v-if="ite.name" v-for="(ite,ind) in props.row.attr_vals" :key="ind" closable :disable-transitions="false" @close="handleClose(ite,props.row)">
                                    {{ite.name}}
                                </el-tag>
                                <el-input class="input-new-tag" v-if="props.row.attr_id==zcid" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(props.row)" @blur="handleInputConfirm(props.row)">
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput(props.row)">+ New Tag</el-button>
                            </li>
                        </ul>
                    </template> 
                </el-table-column>
                <el-table-column type="index">
                </el-table-column>
                <el-table-column prop="attr_name" label="参数名称">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope" >
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="editshu(scope.row)">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>
<script>
export default {
  props: ["lists"],
  data() {
    return {
      zcid:0,
      inputValue: "",
    };
  },
  methods: {
    handleClose(tag,row) {
        let i=this.lists.findIndex(item=>{
            return item.attr_id==row.attr_id
        })
        let j=this.lists[i].attr_vals.findIndex(item=>{
            return item.cid==tag.cid
        })
        this.lists[i].attr_vals.splice(j,1); 
       this.$emit("delsc",this.lists[i]) 
    },
    showInput(row) {
      this.zcid=row.attr_id
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm(row) {
      let inputValue = this.inputValue;
       let i=this.lists.findIndex(item=>{
            return item.attr_id==row.attr_id
        })
      if (inputValue) {
        this.lists[i].attr_vals.push({
            id:row.attr_id,
            name:inputValue,
            cid:this.lists[i].attr_vals.length+1
        });
          this.$emit("delsc",this.lists[i]) 
      }
      this.zcid=0
      this.inputValue = "";
    },
    kan(item) { 
    },
    del(row){
      console.log(row);
      this.$emit("delfen",row.attr_id)
    },
    editshu(row){
      this.$emit("editshu",row)
    }
  }
};
</script>
<style lang="scss" scoped>
.ul {
  display: flex;
  align-items: center;
  li {
    margin-left: 10px;
  }
}
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom; 
  }
</style>


