<template>
  <div id="home">
    <div class="fix-orange">
      <img src="../../../public/ImgFixed.png" />
    </div>
    <div class="fix-blueberry">
      <img src="../../../public/ImgFixed02.png" />
    </div>

    <div class="banner">
      <div class="banner-img-bg d-none d-sm-block">
        <img src="../../../public/ImgBanner.png" alt="Banner image" />
      </div>
      <div class="banner-img-sm d-sm-none">
        <img src="../../../public/ImgBannerM.png" alt="Banner image" />
      </div>
      <div class="banner-text">
        <h1>飲料、就是這麼好玩！</h1>
        <h2>你的飲品、你主宰</h2>
        <p>自由搭配、彈性選擇</p>
        <p>每一杯都是獨一無二的享受</p>
      </div>
    </div>
    <main>
      <section class="customer">
        <div class="customer-main section-container">
          <h3>如果你是...</h3>
          <div class="customer-items">
            <div class="customer-item">
              <div class="item-image">
                <img src="../../../public/imgFeature01.png" alt="" />
              </div>
              <div class="item-text">
                <h4>個性化的追求者</h4>
                <p>你可以在這裡根據你的口味及喜好，創造出完全屬於你的獨特飲品。</p>
              </div>
            </div>

            <div class="customer-item">
              <div class="item-image">
                <img src="../../../public/imgFeature02.png" alt="" />
              </div>
              <div class="item-text">
                <h4>愛好創意的探險家</h4>
                <p>你可以在這裡自由搭配，探索無限的飲品組合，享受創造新口味的樂趣。</p>
              </div>
            </div>

            <div class="customer-item">
              <div class="item-image">
                <img src="../../../public/imgFeature03.png" alt="" />
              </div>
              <div class="item-text">
                <h4>對食物成分敏感的消費者</h4>
                <p>你可以在這裡精準選擇每一種配料，確保飲品符合你的飲食需求和偏好。</p>
              </div>
            </div>

            <div class="customer-item">
              <div class="item-image">
                <img src="../../../public/imgFeature04.png" alt="" />
              </div>
              <div class="item-text">
                <h4>互動體驗的愛好者</h4>
                <p>你可以在這裡參與飲品的製作過程，享受定制過程中的樂趣和成就感。</p>
              </div>
            </div>

            <div class="customer-item">
              <div class="item-image">
                <img src="../../../public/imgFeature05.png" alt="" />
              </div>
              <div class="item-text">
                <h4>注重健康的生活家</h4>
                <p>你可以在這裡精準選擇每一種配料，確保飲品符合你的飲食需求和偏好。</p>
              </div>
            </div>
          </div>
        </div>
        <!--end customer-main-->
      </section>
      <!--end customer-->

      <section class="manufacture section-container">
        <div class="main-drink">
          <img src="../../../public/ImgStepMain.png" alt="飲料" />
          <img src="../../../public/ImgStepMint.png" alt="葉子" />
        </div>
        <div class="main-step">
          <h3>做出專屬 你的飲料</h3>
          <ul>
            <li>選擇基底飲品</li>
            <li>選擇配料</li>
            <li>選擇糖類</li>
            <li>選擇冷熱</li>
            <li>為自己的飲品命名</li>
          </ul>
          <button type="button" class="btn btn-danger">立即開始製作</button>
        </div>
      </section>
      <!--end manufacture-->

      <section class="news section-container">
        <h3>最新消息</h3>
        <ul>
          <li>
            <div class="news-title">
              <p>限時優惠</p>
              <h4>消費滿100折10元</h4>
            </div>
            <p class="news-info">活動時間：2024/2/20 止</p>
            <p class="news-info">消費滿 100 元輸入優惠碼「fun drink 99」可折扣 10 元</p>
          </li>
          <li>
            <div class="news-title">
              <p>期間限定</p>
              <h4>新鮮草莓新上市</h4>
            </div>
            <p class="news-info">
              不論是製作健康果汁、奶昔、茶飲還是雞尾酒，新鮮草莓都是完美的搭配選擇。
            </p>
            <p class="news-info">來吧，用草莓為您的日常添加一點創意和樂趣</p>
          </li>
          <li>
            <div class="news-title">
              <p>新品上市</p>
              <h4>QQ 粉角新上市</h4>
            </div>
            <p class="news-info">
              獨特口感：QQ 粉角擁有獨特的彈牙口感，讓您的每一口飲品都充滿驚喜。
            </p>
            <p class="news-info">
              多樣搭配：無論是搭配奶茶、果汁，QQ 粉角都能為您的飲品增添特別的風味。
            </p>
          </li>
          <li>
            <div class="news-title">
              <p>公益活動</p>
              <h4>每一杯飲品共同傳遞愛心</h4>
            </div>
            <p class="news-info">
              為回饋社會，我們承諾每售出一杯飲品，將捐出銷售額的 1%
              用於支持「弱勢兒童基金會」與我們一起，為改變世界貢獻一份力量。
            </p>
          </li>
        </ul>
        <div class="news-button">
          <button type="button" class="btn btn-outline-danger">更多最新消息</button>
        </div>
      </section>
      <!--end of new-->

      <section class="products section-container">
        <ul class="products-title">
          <li @click="clickCategory('熱門飲品')">熱門飲品</li>
          <li @click="clickCategory('創意飲品')">創意飲品</li>
          <li @click="clickCategory('熱門配料')">熱門配料</li>
        </ul>
        <div class="products-swiper">
          <swiper
            :slidesPerView="1"
            :spaceBetween="10"
            :navigation="navigation"
            :pagination="{
              clickable: true
            }"
            :breakpoints="breakpoints"
            :autoplay="{ display: 1000, disableOnInteraction: false }"
            :modules="modules"
            class="mySwiper"
          >
            <swiper-slide class="card" v-for="(item, index) in products" :key="`product-${index}`">
              <div class="list-card">
                <p class="card-tag-before"></p>
                <p class="card-tag">{{ item.description[1].tag }}</p>
                <div class="card-img">
                  <img :src="item.imageUrl" alt="飲料圖片" />
                </div>
                <h6>{{ item.title }}</h6>
                <div class="card-des">
                  <p
                    v-for="(des, desIndex) in item.description[0].des"
                    :key="`product-${desIndex}`"
                  >
                    {{ des }}
                  </p>
                </div>
                <p class="card-more" @click="clickMore(item.id)">查看詳情</p>
                <div class="card-price">
                  <span>優惠價 ${{ item.price }}</span>
                  <span>原價 ${{ item.origin_price }}</span>
                </div>
                <div class="card-btn">
                  <button type="button" class="btn btn-outline-danger" @click="addToDIY(item)" v-if="isIngredient">加入調飲室</button>
                  <button type="button" class="btn btn-danger" @click="addToCart(item.id,1)" v-else>加入購物車</button>
                </div>
              </div>
            </swiper-slide>
          </swiper>

          <div class="swiper-navigation">
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>
      </section>
      <!--end of products-->

      <section class="recommend section-container">
        <h3>好評推薦</h3>
        <ul>
          <li v-for="item in recommends" :key="item.name">
            <div class="recommend-title">
              <img class="title-img" :src="item.img" alt="" />
              <div class="title-star">
                <img
                  src="../../../public/grade.png"
                  alt=""
                  v-for="(score, index) in item.score"
                  :key="`${'score' + index}`"
                />
                <img
                  src="../../../public/gradeGray.png"
                  alt=""
                  v-for="(score, index) in 5 - item.score"
                  :key="index"
                />
              </div>
            </div>
            <div class="recommend-info">
              <p>{{ item.name }}</p>
              <p>{{ item.des }}</p>
            </div>
          </li>
        </ul>
        <!-- <div class="recommend-button">
          <button type="button" class="btn btn-outline-danger">更多好評推薦</button>
        </div>         -->
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import DIYStore from '../../stores/DIYStore'

import { RiShoppingCart2Line } from '@remixicon/vue'
import { RiStarSLine } from '@remixicon/vue'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css' // core Swiper
import 'swiper/css/navigation' // Navigation module
import 'swiper/css/pagination' // Pagination module
import { Pagination, Navigation, Autoplay } from 'swiper'

import people1 from '../../../public/people1.png'
import people2 from '../../../public/people2.png'
import people3 from '../../../public/people3.png'

export default {
  components: {
    RiShoppingCart2Line,
    RiStarSLine,
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      VITE_URL: import.meta.env.VITE_URL,
      VITE_NAME: import.meta.env.VITE_NAME,
      modules: [Navigation, Pagination, Autoplay],
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 10 },
        375: { slidesPerView: 1, spaceBetween: 10 },
        576: { slidesPerView: 1, spaceBetween: 10 },
        768: { slidesPerView: 2, spaceBetween: 10 },
        992: { slidesPerView: 2, spaceBetween: 10 },
        1200: { slidesPerView: 3, spaceBetween: 10 },
        1400: { slidesPerView: 3, spaceBetween: 10 }
      },
      recommends: [
        {
          name: '王明明',
          des: '這裡的自選調配真是太棒了！我能根據心情和口味來創造完美的飲品。每次的組合都讓我驚喜連連！',
          img: [people1],
          score: 5
        },
        {
          name: '好奇寶寶',
          des: '從未試過這麼多創新的飲品組合！每次來都有新驚喜，絕對是我的最愛之一！！',
          img: [people3],
          score: 4
        },
        {
          name: '藍藍',
          des: '對於喜愛嘗鮮的我來說，這裡就像天堂。每次的自選調配都能滿足我的好奇心。',
          img: [people2],
          score: 5
        }
      ],
      // category:'熱門飲品',
      products: [],
      isIngredient:false,
    }
  },
  mounted() {
    this.getProducts('熱門飲品')
  },

  methods: {
    getProducts(category) {     
      this.$http
        .get(`${this.VITE_URL}/api/${this.VITE_NAME}/products?category=${category}`)
        .then((res) => {
          const data = Object.values(res.data.products)
          this.products = data
            .sort((a, b) => b.description[2].sell - a.description[2].sell)
            .slice(0, 6)
        })
        .catch((error) => {
          console.log('error', error)
        })
    },

    clickCategory(category) {
      if (category === '熱門配料') {
        this.getProducts('口感配料')
        this.isIngredient = true
      } else {
        this.getProducts(category)
        this.isIngredient = false
      }
    },

    clickMore(id){    
      this.$router.push(`products/${id}`)
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

      //加入pinia 
      ...mapActions(DIYStore,['addToDIY'])
  }
}
</script>

<style >
@import '../../style/HomeView.scss';
@import url('https://fonts.googleapis.com/css2?family=Coiny&display=swap');
@import '../../assets/swiper.scss';
</style>

