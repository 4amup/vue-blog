<template>
  <div class="container" v-if="current_user">
    <h3>{{ current_user.get('username') }}</h3>

    <hr>
    <div class="oprator" v-if="user">
      <!-- 如果登录用户不等于当前的用户页面，则显示关注按钮 -->
      <button v-if="user.id != current_user.id" @click="toggleFollow">{{ followed? '取消关注':'关注' }}该用户</button>
    </div>
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
      current_user: null,
      articles: null,
      followed: false, //当前显示用户是否被登录用户关注
      id,
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

    }
  }

};
</script>

<style lang="css" scoped>
</style>
