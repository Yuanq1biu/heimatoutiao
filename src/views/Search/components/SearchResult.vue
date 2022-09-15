<template>
  <div class="result">
    <van-list
      @load="getResults"
      v-model="loading"
      :finished="finished"
      finished-text="没有了"
      :error.sync="error"
      error-text="点击重新加载"
    >
      <van-cell
        @click="
          $router.push({ path: '/detail', query: { articleId: item.art_id } })
        "
        v-for="item in results"
        :title="item.title"
        :key="item.art_id"
      >
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultsAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      perPage: 10,
      results: [],
      finished: false,
      error: false
    }
  },
  methods: {
    async getResults() {
      try {
        // 测试用
        // if (Math.random() < 0.8) {
        //   throw new Error()
        // }
        const { data } = await getResultsAPI(
          this.page++,
          this.perPage,
          this.keywords
        )
        const results = data.data.results
        if (results.length === 0) {
          this.finished = true
        }
        this.results = [...this.results, ...data.data.results]
        this.loading = false
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.result {
  height: calc(100vh - 108px);
  overflow: overlay;
}
</style>
