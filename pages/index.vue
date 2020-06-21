<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <div class="img">
          <img src="@/static/laptop-with-slack-by-oblik-studio.png" />
        </div>
        <el-form ref="form" :model="data" :rules="rules">
          <div class="content">
            <h2>Sign up</h2>
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
            <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
          </el-form-item>
          <el-form-item label="code">
            <el-input v-model="data.generator"></el-input>
            <el-button @click="verefyc">verefy</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="generator">generator qrcode</el-button>

            <el-button @click="create">Create new Account</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
export default {
  components: { QrcodeVue },
  data() {
    return {
      value: '',
      size: 300,
      verefy: '',
      data: { email: '', password: '', generator: '' },
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
    create() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            const data = {
              email: this.data.email,
              password: this.data.password
            }
            await this.$store.dispatch('create', data)
          } catch (e) {}
        } else {
          return false
        }
      })
    },
    async generator() {
      try {
        const code = await this.$store.dispatch('generator')
        this.value = code
      } catch (e) {
        console.log(e)
      }
    },
    async verefyc() {
      try {
        const formCode = {
          code: this.data.generator,
          secret: this.$store.getters.secret
        }
        const verefy = await this.$store.dispatch('verefyc', formCode)
        this.verefy = verefy
      } catch (e) {}
    }
  },
  head: {
    title: '2 factor auth'
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
