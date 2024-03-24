<template>
  <div id="StepSecond">
    <h3>結帳資訊</h3>
    <div class="my-5 row justify-content-center">
      <Form ref="form" class="col-md-12" v-slot="{ errors }" @submit="onSubmit">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <Field
            id="email_addr"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="formData.user.email"
          ></Field>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">訂購人</label>
          <Field
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="required"
            v-model="formData.user.name"
          ></Field>
          <error-message name="姓名" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">聯絡電話</label>
          <Field
            id="tel"
            name="電話"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話"
            :rules="phoneRule"
            v-model="formData.user.tel"
          ></Field>
          <error-message name="電話" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收貨地址</label>
          <Field
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
            v-model="formData.user.address"
          ></Field>
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <Field
            id="message"
            name="留言"
            as="textarea"
            class="form-control"
            cols="30"
            rows="10"
            v-model="formData.message"
          ></Field>
        </div> 
        <div class="button-area">
          <button type="button" class="btn btn-outline-danger btn-lg" @click="clickPrev">
            上一步
          </button>
          <button type="submit" class="btn btn-danger btn-lg" @click="clickNext">送出訂單</button>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { Form, Field } from 'vee-validate'

export default {
  components: {
    Loading,
    Form,
    Field
  },
  data() {
    return {
      VITE_URL: import.meta.env.VITE_URL,
      VITE_NAME: import.meta.env.VITE_NAME,
      formData: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  mounted() {},

  methods: {
    phoneRule(value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '請填寫正確的手機號碼'
    },

    clickPrev() {
      this.$emit('step', 1)
    },

    onSubmit() {
      const datas = { ...this.formData }

      this.$http
        .post(`${this.VITE_URL}/api/${this.VITE_NAME}/order`, { data: datas })
        .then((res) => {
          console.log('res', res)
          alert(res.data.message)
          //清空表單
          this.$refs.form.resetForm()
          this.$emit('step', 3)
        })
        .catch((e) => {
          console.log('error', e)
        })
    }
  }
}
</script>
<style  lang="scss">
@import '../../assets/reset.scss';

#StepSecond {
  h3 {
    font-size: 24px;
    font-weight: 500;
    text-align: center;
  }

}
</style>

