<template>
  <div class="container">
    <header>
      <h2>{{ title }}</h2>
    </header>
    <section>
      <article v-for="article in articles" :key="article.id">
        <h3>
          <span>文章：</span>
          <router-link :to="{ name:'ArticleShow', params: { id: article.id }}">
            {{ article.get('title') }}
          </router-link>
          <span>-</span>
          <span>作者：</span>
          <router-link :to="{name: 'User', params: { id: article.get('author').id}}">
            {{ article.get('author').get('username') }}
            </router-link>
        </h3>
      </article>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {

  name: 'List',

  data () {
    return {
      title: '',
      articles: []
    };
  },
  created(){
    this.match();
  },
  watch: {
    // 对路由变化作出相应
    // https://router.vuejs.org/zh-cn/essentials/dynamic-matching.html
    ['$route.query']() {
      console.log('re render');
      this.articles = [];
      this.match();
    }
  },
  computed: mapState(['user']),
  methods: {
    match(){
      let flag = this.$route.query.type || this.$route.query.cid ;

      this.$Progress.start();

      switch(flag){
        case 'me':
          this.getMyArticles();
          break;
        case 'all':
          this.getAllArticles();
          break;
        default:
          this.getCategoryArticle(flag);
      }
    },
    query(){
      // 第一步，创建查询实例
      let q = new this.$api.SDK.Query('Article');
      q.include('category'); // 关联属性查询
      q.include('author'); // 关联属性查询
      q.descending('cratedAt'); // 递减操作，新创建的在前面
      return q; //返回一个查询实例
    },
    setArticles(q){
      q.find().then((articles) => {
          this.articles = articles;
          this.$Progress.finish();
      }).catch(this.fail);
    },
    fail(error){
      this.$message.error(error);
      this.$Progress.fail();
    },
    getAllArticles(){
      this.title = "所有文章";
      const q = this.query();
      this.setArticles(q);
    },
    getMyArticles(){
      this.title = "我的文章";
      var user = this.$api.SDK.Object.createWithoutData('Author', this.user.id);
      const q = this.query().equalTo('author', user);
      this.setArticles(q);
    },
    // cid => category_id
    getCategoryArticle(cid){
      let cateObj = this.getCategoryObj(cid);
      const q = this.query();
      q.equalTo('category', cateObj);
      this.setArticles(q);
    },

    getCategoryObj(id){
      return this.$api.SDK.Object.createWithoutData('Category', id);
    },
  }
};
</script>

<style lang="css" scoped>
h2{
  text-align: center;
}

header{
  border-bottom: 1px solid #f2f2f2;
  margin-bottom: 5px;
  padding: 20px;
}
</style>
