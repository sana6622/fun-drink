<template>
  <div id="CartView" class="cart front-container">
    <h2>購物車</h2>   
  
    <StepFirst v-if="step===1"></StepFirst>
    <StepSecond v-else-if="step===2"></StepSecond>
    <StepThird v-else-if="step===3"></StepThird>

    <div class="button-area">
      <button type="button" class="btn btn-outline-danger btn-lg" @click="clickPrev">上一步</button>
      <button type="button" class="btn btn-danger btn-lg" @click="clickNext">下一步</button>
    </div>
  </div>
</template>
<script>

import StepFirst from '../../components/cart/StepFirst.vue'
import StepSecond from '../../components/cart/StepSecond.vue'
import StepThird from '../../components/cart/StepThird.vue'

export default {
  components: {
    StepFirst,
    StepSecond,
    StepThird  

  },
  data() {
    return {
      step:1
    }
  },
  mounted(){
    console.log('step',this.step)

  },
  methods:{
    clickPrev(){       
      if(this.step!=1){
        this.step--
      }     

    },
    clickNext(){  
     
      if(this.step!=3){
        this.step++
      }
   
    },
  }
}
</script>


<style lang="scss">
@import '../../assets/reset.scss';


#CartView{
    padding-top: 70px;
    padding-bottom: 300px;
    height: 700px;
  

    background: url(../../../public/ImgCSBg.png);
    background-size: 100% 100%;
    @media screen and (max-width: 575px) {
        background: url(../../../public/ImgNewsBgM.png);
        background-size: 100% 100%;
    }
    h2{
      font-size: 32px;
      font-weight: 700;
      margin-top: 30px;  
    }

    .button-area{
        margin-top: 60px;
        display: flex;
        justify-content: space-between;
    }

}
</style>



