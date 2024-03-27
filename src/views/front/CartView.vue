<template>
  <div id="CartView" class="cart front-container">
    <h2>購物車</h2>     
    <StepFirst v-if="step===1" v-on:step="getStep"></StepFirst>
    <StepSecond v-else-if="step===2" v-on:step="getStep"></StepSecond>
    <StepThird v-else-if="step===3" v-on:step="getStep"></StepThird>
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
      step:1,
      buttonNextText:'下一步',
      formData:{},
    }
  },
  mounted(){
    console.log('step',this.step)

  },
  methods:{
    getStep(number){
      console.log('get numb',number)
      this.step = number
      console.log('get step',number)
    },
  }
}
</script>


<style lang="scss">
@import '../../assets/reset.scss';


#CartView{
    padding-top: 70px;
    padding-bottom: 300px;  
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



