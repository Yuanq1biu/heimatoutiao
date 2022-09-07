<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar title="登录" class="nav-bar" />
    <!-- 表单 -->

    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请填写手机号"
        :rules="mobileRules"
        ><template #left-icon>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请填写验证码"
        :rules="codeRules"
        ><template #left-icon>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            native-type="button"
            type="default"
            size="small"
            round
            block
            class="btn"
            @click="sendCode"
            v-if="isShowCode"
            >获取验证码</van-button
          >
          <van-count-down
            v-else
            :time="60 * 1000"
            format="ss秒"
            @finish="isShowCode = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rules'
import { login, sendCodeAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCode: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async onSubmit() {
      this.loading()
      try {
        const { data } = await login(this.mobile, this.code)
        console.log(data)
        this.SET_TOKEN(data.data)
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (error) {
        if (error.reponse && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          console.dir(error)
          this.$toast.clear()
        }
      }
    },
    async sendCode() {
      await this.$refs.form.validate('mobile')
      this.loading()
      try {
        await sendCodeAPI(this.mobile)
        this.isShowCode = false
        this.$toast.success('发送验证码成功')
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 429 || error.response.status === 404)
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
.toutiao {
  margin-right: 25px;
  font-size: 40px;
}
.btn {
  height: 0.64rem;
  background-color: #eee;
  color: #a58594;
}
</style>
