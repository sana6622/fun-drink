<template>
  <div id="StepSecond">
    <h3>訂購資訊</h3>
    <div class="my-5 row justify-content-center pt-3">
      <div class="cart-list col-12 col-md-6 d-flex flex-column shadow rounded py-5 px-4">
        <div
          v-for="(item, index) in carts"
          :key="`item-${index}`"
          class="shadow py-3 px-4 bg-body rounded mb-5"
        >
          <div class="row mb-2">
            <div class="col-10 col-sm-6 fs-5 fw-bolder">
              {{ index + 1 }}. {{ item.product.title }}
            </div>
            <div class="col-sm-2 fs-5 d-none d-sm-block">{{ item.qty }}杯</div>
            <div class="col-sm-3 fs-5 text-end d-none d-sm-block">${{ item.total }}</div>
            <div class="col-1">
              <RiSkipDownLine
                v-show="!opened[index]"
                @click.prevent="opened[index] = !opened[index]"
              ></RiSkipDownLine>
              <RiSkipUpLine
                v-show="opened[index]"
                @click.prevent="opened[index] = !opened[index]"
              ></RiSkipUpLine>
            </div>
          </div>

          <div v-show="opened[index]">
            <div class="my-3 mb-1 px-4 fs-5 d-sm-none">數量: {{ item.qty }}杯</div>
            <div class="my-3 mb-1 px-4 fs-5 d-sm-none">共{{ item.total }}元</div>

            <p class="my-3 mb-1 px-4 fs-5">產品內容</p>
            <div class="px-5 py-1">
              <div
                v-for="(content, contentIndex) in item.product?.content"
                :key="`content-${contentIndex}`"
                class="mb-2"
              >
                <p>
                  <span>{{ content.goods }}:</span>
                  <span>{{ content.count }} {{ content.unit }}</span>
                </p>
              </div>
            </div>          
            <div class="my-3 mb-1 px-4 fs-5" v-if="item.product?.description[3]?.ice">冰量:{{item.product.description[3].ice}}</div>
          </div>
        </div>
        <p class="total-price d-flex fs-3 py-3 fw-bolder">
          總金額 : <span>{{ totalPrice }}元</span>
        </p>
      </div>

      <Form
        ref="form"
        class="col-12 col-md-6 d-flex flex-column justify-content-between shadow py-5 px-4 rounded"
        v-slot="{ errors }"
        @submit="onSubmit"
      >
        <div>
          <div class="mb-3">
            <label for="email" class="form-label fs-5">Email</label>
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
            <label for="name" class="form-label fs-5">訂購人</label>
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
            <label for="tel" class="form-label fs-5">聯絡電話</label>
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
            <p class="fs-5 mb-2">取貨方式</p>
            <div class="form-check form-check-inline me-5">              
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="自取"
                v-model="addressType"
                @click="render"
              />
              <label class="form-check-label" for="inlineRadio1">自取</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="外送"
                v-model="addressType"
                @click="render"
              />
              <label class="form-check-label" for="inlineRadio2">外送</label>
            </div>
          </div>

          <div class="mb-3 " v-show="addressType=='外送'" :key="renderAddress">
            <label for="address" class="form-label fs-5">收貨地址</label>
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
            <label for="message" class="form-label fs-5">留言</label>
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
import Swal from 'sweetalert2'
import 'vue-loading-overlay/dist/css/index.css'
import { Form, Field } from 'vee-validate'
import { RiSkipDownLine, RiSkipUpLine } from '@remixicon/vue'

export default {
  components: {
    Loading,
    Form,
    Field,
    RiSkipDownLine,
    RiSkipUpLine
  },
  data() {
    return {
      VITE_URL: import.meta.env.VITE_URL,
      VITE_NAME: import.meta.env.VITE_NAME,
      carts: {},
      opened: [],
      totalPrice: 0,
      formData: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      addressNew: '99999',
      addressType: '外送',
      renderAddress:0,
    }
  },
  mounted() {
    this.getCarts()
  },

  methods: {
    getCarts() {
      this.$http
        .get(`${this.VITE_URL}/api/${this.VITE_NAME}/cart`)
        .then((res) => {
          const data = res.data.data.carts
          this.carts = Object.values(data)
          this.totalPrice = res.data.data.final_total
          this.carts.forEach(item=>{            
            const index = item.product.title.lastIndexOf('-')
            if(index!=-1){
              item.product.title = item.product.title.substring(0,index)
            }
          })
          this.cartChangeLoading = ''
          
          //toggle 功能
          const num = this.carts.length
          this.opened = Array(num).fill(false)
          console.log('open', this.opened)
        })
        .catch((error) => {
          console.log('error', error)
        })
    },

    phoneRule(value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '請填寫正確的手機號碼'
    },

    clickPrev() {
      this.$emit('step', 1)
    },
    render(){    
      this.renderAddress++
    },

    onSubmit() {
      // const datas = { ...this.formData }
      console.log('formData.user.email', this.formData.user.email)
      const currentTime = new Date()  
      const date =`${ currentTime.getMonth() + 1}/${currentTime.getDate()} `;       
      const Time = `${currentTime.getHours()}:${currentTime.getMinutes()}`;    

      const datas = {
        user: {         
          name: this.formData.user.name,
          email: this.formData.user.email,
          tel: this.formData.user.tel,
          address: this.addressType =='自取'? '自取':this.formData.user.address       
         },
        message: [
          { message: this.formData.message }, 
          { addressType: this.addressType },
          { orderDate: date},
          { orderTime:Time}
         ]
      }

      this.$http
        .post(`${this.VITE_URL}/api/${this.VITE_NAME}/order`, { data: datas })
        .then((res) => {
          console.log('res', res)
          Swal.fire({
          position: "top-center",
          icon: "success",
          title: "已成功建立訂單",
          showConfirmButton: false,
          timer: 1500
        });
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
  .cart-list {
    .total-price {
      margin-top: auto;
      display: flex;
      span {
        margin-left: auto;
      }
    }
  }
}
</style>

