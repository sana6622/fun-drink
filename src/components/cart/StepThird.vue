<template>
  <div id="StepThird">
    <main>
      <h3>訂購完成</h3>
      <!-- <h4>訂單編號</h4> -->
      <div class="text-area">
        <p>親愛的顧客，</p>
        <p>非常感謝您訂購。我們感到非常榮幸能夠為您提供優質的飲品，並將竭盡全力確保您的滿意度。</p>
        
        <p>
          我們的團隊一直在努力提供最好的，並將繼續不斷改進，以滿足您的需求和期望。如果您對我們的飲品或服務有任何建議或反饋，請隨時與我們聯繫。我們非常重視您的意見，並將竭盡所能改進和完善。
        </p>

        <p>再次感謝您的支持和信任，我們期待為您提供更多卓越的體驗。</p>
        <p>最誠摯的感謝</p>
      </div>
      <div class="button-area">
        <button type="button" class="btn btn-outline-danger btn-lg " @click="clickPrev">
          回首頁
        </button>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  methods: {
    clickPrev() {
      this.$router.push('/')
    }
  }
}
</script>
<style  lang="scss">
@import '../../assets/reset.scss';

#StepThird {
  h3 {
    font-size: 24px;
    font-weight: 500;
    text-align: center;
  }
  .text-area{
    margin-top: 30px;
    padding: 20px 30px;
    // background-color: rgba(255, 173, 80, 0.87);
    background-color: #fee59c7a;
    border-radius: 10px;   
    box-shadow: 11px 10px 10px -5px #581d059a;
    p{
        font-size: 20px;
        line-height: 26px;
        margin-bottom: 20px;
    }
  }
  .button-area{    
    display: flex;  
     
    button{
        margin-left: auto;
        
    }
  }

}
</style>
