<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <div class="img">
          <img src="@/static/laptop-with-slack-by-oblik-studio.png" />
        </div>
        <el-form ref="form" :model="data" :rules="rules">
          <div class="content">
            <h2>Sign in</h2>
          </div>
          <el-form-item label="email" prop="email">
            <el-input v-model="data.email"></el-input>
          </el-form-item>
          <el-form-item label="password" prop="password">
            <el-input
              v-model="data.password"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <vue-recaptcha
              ref="recaptcha"
              sitekey="6LealJMUAAAAAEtYcN5wjrIIPWNIZ4WeaEGVkff8"
              :load-recaptcha-script="true"
              @expired="onCaptchaExpired"
              @verify="onCaptchaVerified"
            ></vue-recaptcha>
            <el-button :disabled="!verefy" @click="login">sign in</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'

export default {
  components: { VueRecaptcha },
  data() {
    return {
      verefy: false,
      data: { email: '', password: '' },
      rules: {
        email: [
          { required: true, message: 'email is required' },
          { type: 'email', message: 'email is need valide' }
        ],
        password: [{ required: true, message: 'password is required' }]
      }
    }
  },
  methods: {
    login() {
      this.$refs.form.validate(async (valid) => {
        if (valid && this.verefy === true) {
          try {
            const data = {
              email: this.data.email,
              password: this.data.password
            }
            await this.$store.dispatch('login', data)
          } catch (e) {}
        } else {
          return false
        }
      })
    },
    async onCaptchaVerified(recaptchaToken) {
      const token = { token: recaptchaToken }
      const verefy = await this.$store.dispatch('verefy', token)
      this.verefy = verefy.success
    },
    onCaptchaExpired() {
      this.$refs.recaptcha.reset()
    }
  }
}
</script>
<style lang="scss" scoped>
.img img {
  width: 200px;
}
.img {
  display: flex;
  justify-content: center;
  margin: 50px 0;
}
.content {
  display: flex;
  justify-content: center;
}
</style>
