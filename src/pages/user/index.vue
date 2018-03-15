<template>
  <div class="container" v-if="current_user">
    <h3>{{ current_user.get('username') }}</h3>

    <hr>
    <div class="oprator" v-if="user">
      <!-- 如果登录用户不等于当前的用户页面，则显示关注按钮 -->
      <button v-if="user.id != current_user.id" @click="toggleFollow">{{ followed? '取消关注':'关注' }}该用户</button>
      <button v-if="user.id != current_user.id" @click="dialogFormVisible = true">发送私信</button>
    </div>
    <el-dialog title="发送私信给该用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" label-width="80px" label-position="top" :rules="rules">
        <el-form-item label="私信内容" prop="msg">
          <el-input type="textarea" v-model="form.msg"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"  @click="sendMsg">确 定</el-button>
      </div>
    </el-dialog>
    <ul>
      <li v-for="article in articles" :key="article.id">
        <router-link :to="{ name: 'ArticleShow', params: {id: article.id} }">{{ article.get('title') }}</router-link>
      </li>
    </ul>

  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {

  name: 'user',

  data () {
    const id = this.$route.params.id;
    return {
      dialogFormVisible: false,
      current_user: null,
      articles: null,
      followed: false, //当前显示用户是否被登录用户关注
      id,
      form: {
        msg: ''
      },
      rules:{
        msg: [
          { required: true, message:'必填项', trigger: 'blur' },
        ]
      }
    };
  },
  computed: mapState(['user']),
  created(){
    this.getCurrentUser();
  },
  methods: {
    getCurrentUser(){
      const id = this.id;
      let q = new this.$api.SDK.Query('_User');
      q.get(id).then((user) => {
        this.current_user = user;
        return user;
      }).then((user) => {
        this.getArticles(user);
        this.checkFollowed();
      }).catch(console.error);
    },
    getArticles(user){
      let q = new this.$api.SDK.Query('Article');
      q.equalTo('author', user);
      q.ascending('createdAt');
      q.find().then(articles => {
        this.articles = articles;
        this.$Progress.finish();
      }).catch(console.error)
    },
    toggleFollow(){
      const id = this.id;
      if(this.followed){
        // 取消关注
        this.user.unfollow(id).then(() => {
          this.followed = false;
          this.$message({type:'success', message: '取消关注成功'});
        }).catch(console.error);
      }else{
        // 关注
        this.user.follow(id).then(() => {
          this.followed = true;
          this.$message({type:'success', message: '关注成功'});
        }).catch(console.error);
      }
    },
    checkFollowed(){
      const id = this.id;
      const q = this.user.followeeQuery(); // 查询当前登录用户的关注对象
      q.include('followee');
      q.find().then(followee => {
        if (followee.length) {
          // some() 方法会依次执行数组的每个元素：如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
          if (followee.some(f => f.id == id)) {
            this.followed = true; // 如果登录用户关注了当前页面的用户，则返回followed=true
          }
          return;
        }
      }).catch(console.error)

    },
    sendMsg(){
      if (!this.form.msg) {
        this.$message.error("信息不能为空");
        return;
      }
      const Status = this.$api.SDK.Status;
      const status = new Status(null, this.form.msg);
      status.set('from', this.user);
      status.set('to', this.current_user);
      Status.sendPrivateStatus(status, this.current_user.id).then((status) => {
        if (status) {
          this.dialogFormVisible = false;
          this.$message({message:'发送私信成功！', type:'success'});
        }
      },(err) =>{
        this.$message.error(err);
      })
    }
  }

};
</script>

<style lang="css" scoped>
</style>
