<template>

  <div class="cart">
    <div class="test">
      123123123
    </div>
    <h2>購物車頁面</h2>
    <p>12312312313232123</p>
    <swiper :slides-per-view="3" :space-between="50">
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>
    <swiper-slide>Slide 6</swiper-slide>
    <swiper-slide>Slide 7</swiper-slide>
    <swiper-slide>Slide 8</swiper-slide>
    <swiper-slide>Slide 9</swiper-slide>
    <!-- Add more <swiper-slide> elements for more slides -->
  </swiper>
  <!-- <SwiperAll
          :datas="cardData"      
          :breakpoints="swiperOption[0].breakpoints"
          :id="swiperOption[0].id"
          :navigation="swiperOption[0].navigation"
        >
        </SwiperAll> -->
        <div class="swiper-box">
    <swiper  
    :slidesPerView = "4" 
    :spaceBetween = "10" 
    :pagination="{
      type: 'fraction',
    }"
    :navigation="true"
    :modules="modules"
    :autoplay="{display:1000,disableOnInteraction:false}"
    class="mySwiper"    
    
    >   
    <swiper-slide class="card">Slide 1</swiper-slide>
    <swiper-slide class="card">Slide 2</swiper-slide>
    <swiper-slide class="card">Slide 3</swiper-slide>
    <swiper-slide class="card">Slide 4</swiper-slide>
    <swiper-slide class="card">Slide 5</swiper-slide>
    <swiper-slide class="card">Slide 6</swiper-slide>
    <swiper-slide class="card">Slide 7</swiper-slide>
    <swiper-slide class="card">Slide 8</swiper-slide>
    <swiper-slide class="card">Slide 9</swiper-slide>
      
    </swiper>
  
    <div class="swiper-button-prev" @click.stop="prevE1(item,index)"></div>
    <div class="swiper-button-next" @click.stop="nextE1(item,index)"></div>
  </div>

  <swiper
    :pagination="{
      type: 'fraction',
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide>Slide 11</swiper-slide>
    <swiper-slide>Slide 12</swiper-slide><swiper-slide>Slide 13</swiper-slide>
    <swiper-slide>Slide 14</swiper-slide><swiper-slide>Slide 15</swiper-slide>
    <swiper-slide>Slide 16</swiper-slide><swiper-slide>Slide 17</swiper-slide>
    <swiper-slide>Slide 18</swiper-slide><swiper-slide>Slide 19</swiper-slide>
  </swiper>

  <swiper :slides-per-view="4" :space-between="50"
      :modules="modules"
      navigation
      :pagination="{ clickable: true }">
      <swiper-slide>
        <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1529&q=80" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="">
      </swiper-slide>
    </swiper>

    

    
  </div>

</template>
<script>
 // Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperAll from "../../components/SwiperAll.vue";

// Import Swiper styles
import 'swiper/css'; // core Swiper
import 'swiper/css/navigation'; // Navigation module
import 'swiper/css/pagination'; // Pagination module

import { Pagination, Navigation ,Autoplay} from 'swiper';


export default {
  data () {
    return {
      modules: [Navigation, Pagination]
    }
  },
  components: {
    Swiper,
    SwiperSlide
  }
}


   
  
</script>

<style  lang="scss">
.cart{
  height: 500px;
  background-color: pink;
  .test{
    width: 200px;
    height: 200px;
    background-color: blue;
  }
  h2{
    color:blue;
  }
  .card{
    width: 50px;
    height: 100px;
  
    outline:2px solid red;
  }
}


</style>