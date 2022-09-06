<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar title="登录" class="nav-bar" />
    <!-- 表单 -->
    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请填写手机号"
        :rules="[{ required: true, message: '请填写手机号' },{pattern:/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,message:'手机号格式错误'}]"
      ><template #left-icon>
 <span class="toutiao toutiao-shouji"></span>
      </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请填写验证码"
        :rules="[{ required: true, message: '请填写验证码' },{pattern:/^[0-9]{6}$/,message:'验证码格式错误'}]"
      ><template #left-icon>
 <span class="toutiao toutiao-yanzhengma"></span>
      </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
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
.toutiao{
    margin-right: 25px;
    font-size: 40px;
}
</style>
