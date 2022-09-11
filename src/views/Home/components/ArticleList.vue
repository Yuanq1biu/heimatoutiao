<template>
  <div>
    <ariticle-item
      v-for="item in articles"
      :key="item.art_id"
      :article="item"
    ></ariticle-item>
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
      articles: []
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
    }
  }
}
</script>

<style></style>
