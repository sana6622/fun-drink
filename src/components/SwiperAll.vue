<template>
  <div class="swiper-box">
    <swiper  
    :slidesPerView = "1" 
    :spaceBetween = "10" 
    
    >   
      <swiper-slide >  1  </swiper-slide> 
      <swiper-slide >  2  </swiper-slide>
      <swiper-slide >  3  </swiper-slide>  
      
    </swiper>
  
    <div class="swiper-button-prev" ></div>
    <div class="swiper-button-next" ></div>
  </div>
</template>

<script lang="ts">
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';


  import { Pagination, Navigation } from 'swiper';

  // import { Component, Prop, Vue } from "vue-facing-decorator";
  // import tigermaster from "fdtigermaster-client-sdk";
  
  // @Component({
  //   components: {
  //       Swiper,
  //       SwiperSlide,        
  //   },
  // })   
export default  {
  // @Prop() datas!:[];
  // @Prop() breakpoints!:[];
  // @Prop() id!:'';
  // @Prop() navigation!:[];
  components: {
      Swiper, SwiperSlide
    },
  modules : [Navigation, Pagination],

}

</script>
   
   
<style module>
   /* @import "./../../style/components/swiper.css"; */
</style>

