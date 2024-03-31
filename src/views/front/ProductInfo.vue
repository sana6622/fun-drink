<template>
  <div id="ProductInfo">
    <LoadingAnimation :isLoading="isLoading"></LoadingAnimation>

    <div class="return front-container">
      <button type="button" class="btn btn-outline-danger btn-lg" @click="clickReturn">
        <RiArrowGoBackLine></RiArrowGoBackLine>
        <!-- <spna>回產品介紹</spna> -->
      </button>
    </div>
    <main class="front-container">
      <div class="main-info">
        <div class="info-img">
          <img :src="product.imageUrl" alt="" />
        </div>

        <div class="info-detail">
          <h1>{{ product.title }}</h1>
          <div class="detail-des" v-for="(des, index) in descrtption" :key="`des-${index}`">
            <span>
              <RiDrinks2Fill></RiDrinks2Fill>
            </span>
            <span> {{ des }}</span>
          </div>

          <div class="detail-price">
            <span v-show="product.price == product.origin_price"
              >價格 ${{ product.price }} /{{
                product.unit == '%' ? ' 每單位 10%' : product.unit
              }}</span
            >
            <span v-show="product.price != product.origin_price"
              >優惠價 ${{ product.price }}/{{ product.unit }}</span
            >
            <span v-show="product.price != product.origin_price"
              >原價 ${{ product.origin_price }}</span
            >
          </div>
          <div class="detail-num">
            <label for="">數量:</label>
            <input type="number" min="0" max="99" v-model="quantity" />
          </div>
          <div class="detail-button">
            <button type="button" class="btn btn-outline-danger btn-lg w-100" v-if="isIngredient">
              加入調飲室
            </button>
            <button
              type="button"
              class="btn btn-danger btn-lg w-100"
              @click="addToCart(product.id, quantity)"
              v-else
            >
              加入購物車
            </button>
          </div>
        </div>
        <!--end of info-->
      </div>
    </main>
  </div>
</template>
<script>
import { RiDrinks2Fill, RiArrowGoBackLine } from '@remixicon/vue'
import Swal from 'sweetalert2'
import LoadingAnimation from '../../components/LoadingAnimation.vue'

export default {
  components: {
    RiDrinks2Fill,
    RiArrowGoBackLine,
    LoadingAnimation
  },
  data() {
    return {
      isLoading: false,
      VITE_URL: import.meta.env.VITE_URL,
      VITE_NAME: import.meta.env.VITE_NAME,
      product: '',
      quantity: 1,
      descrtption: [],
      categoryIngredient: [
        '茶類',
        '果汁',
        '其他基底',
        '口感配料',
        '水果類',
        '香料與草本',
        '其他配料',
        '糖類'
      ],
      isIngredient: false
    }
  },
  mounted() {
    const { id } = this.$route.params
    this.getProductInfo(id)
  },
  methods: {
    getProductInfo(id) {
      this.isLoading = true
      this.$http
        .get(`${this.VITE_URL}/api/${this.VITE_NAME}/product/${id}`)
        .then((res) => {
          this.product = res.data.product
          this.descrtption = this.product.description[0].des
          this.isIngredient = this.categoryIngredient.some((item) => item === this.product.category)
          this.isLoading = false
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    clickReturn() {
      this.$router.push(`/products`)
    },
    addToCart(product_id, qty) {
      this.isLoading = true
      const cartData = {
        product_id,
        qty
      }
      this.$http
        .post(`${this.VITE_URL}/api/${this.VITE_NAME}/cart`, { data: cartData })
        .then(() => {
          this.isLoading = false
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: '已成功加入購物車',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch((error) => {
          console.log('error', error)
        })
    }
  }
}
</script>
<style >
@import '../../style/front/ProductInfo.scss';
@import url('https://fonts.googleapis.com/css2?family=Coiny&display=swap');
</style>
