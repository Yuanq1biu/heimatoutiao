<template>
  <div class="article">
    <van-pull-refresh v-model="refreshLoading" @refresh="getNextPageArticle">
      <van-list
        v-model="loading"
        @load="getNextPageArticle"
        offset="100"
        :immediate-check="false"
        :finished="finished"
        finished-text="没有更多文章了"
        :error.sync="error"
        error-text="没有更多文章了"
      >
        <ariticle-item
          v-for="item in articles"
          :key="item.art_id"
          :article="item"
        ></ariticle-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getAriticle } from '@/api'
import AriticleItem from './ArticleItem.vue'
export default {
  name: 'ArticleList',
  components: { AriticleItem },
  props: {
    id: { String, Number }
  },
  data() {
    return {
      articles: [],
      loading: false,
      finished: false,
      error: false,
      refreshLoading: false
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      try {
        const { data } = await getAriticle(this.id, +new Date())
        this.articles = data.data.results
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    async getNextPageArticle() {
      try {
        const { data } = await getAriticle(this.id, this.preTimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        if (this.refreshLoading) {
          this.articles.unshift(...data.data.results)
        }
        this.articles.push(...data.data.results)
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;
  // &: 代表当前元素他爹
  // ::-webkit-scrollbar : 滚动槽
  // ::-webkit-scrollbar-thumb: 滚动的滑块
  &::-webkit-scrollbar {
    width: 15px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 192, 203, 0.648);
    border-radius: 15px;
  }
}
</style>
