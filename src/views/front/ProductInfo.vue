<template>
  <div id="ProductInfo">
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
            <span v-show="product.price==product.origin_price">價格 ${{ product.price }} /{{ product.unit == '%' ? ' 每單位 10%':product.unit }}</span>
            <span v-show="product.price!=product.origin_price">優惠價 ${{ product.price }}/{{ product.unit }}</span>
            <span v-show="product.price!=product.origin_price">原價 ${{ product.origin_price }}</span>
          </div>
          <div class="detail-num">
            <label for="">數量:</label>
            <input type="number" min="0" max="99" v-model="quantity" />
          </div>
          <div class="detail-button">
            <button type="button" class="btn btn-outline-danger btn-lg">加入調飲室</button>
            <button type="button" class="btn btn-danger btn-lg" @click="addToCart(product.id,quantity)">加入購物車</button>
          </div>
        </div>
        <!--end of info-->
      </div>
    </main>
    
  </div>
</template>
<script>
import { RiDrinks2Fill,RiArrowGoBackLine } from '@remixicon/vue'
export default {
  components: {
    RiDrinks2Fill,
    RiArrowGoBackLine
  },
  data() {
    return {
      VITE_URL: import.meta.env.VITE_URL,
      VITE_NAME: import.meta.env.VITE_NAME,
      product: '',
      quantity: 1,
      descrtption: []
    }
  },
  mounted() {
    const { id } = this.$route.params
    this.getProductInfo(id)
  },
  methods: {    
    getProductInfo(id) {     
      this.$http
        .get(`${this.VITE_URL}/api/${this.VITE_NAME}/product/${id}`)
        .then((res) => {
          this.product = res.data.product          
          this.descrtption = this.product.description[0].des
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    clickReturn(){
        this.$router.push(`/products`)
    },
    addToCart(product_id,qty){      
        const cartData = {
        product_id,
        qty,
      };     
        this.$http
        .post(`${this.VITE_URL}/api/${this.VITE_NAME}/cart`,{data:cartData})
        .then((res) => {
         console.log('res',res)
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
  }
}
</script>
<style >
@import '../../style/front/ProductInfo.scss';
@import url('https://fonts.googleapis.com/css2?family=Coiny&display=swap');
</style>
