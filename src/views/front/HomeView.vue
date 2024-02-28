<template>
  <div id="home">
    <div class="banner">
      <div class="banner-img-bg d-none d-sm-block">
        <img src="../../../public/ImgBanner.png" alt="" />
      </div>
      <div class="banner-img-sm d-sm-none">
        <img src="../../../public/ImgBannerM.png" alt="" />
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
        <!-- <div class="customer-img-bg d-none d-sm-block">
          <img src="../../../public/ImgFeatureBg.png" alt="" />
        </div>
        <div class="customer-img-sm d-sm-none">
          <img src="../../../public/ImgFeatureBgM.png" alt="" />
        </div> -->
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
        <!-- <div class="manufacture-img">
          <img src="../../../public/ImgBg.png" alt="背景圖" />
        </div> -->
       
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
            <button type="button">立即開始製作</button>
          </div>
       
      </section>
      <!--end manufacture-->
    </main>
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  components: {
    // HelloWorld
  }
}
</script>

<style >
@import '../../assets/home.scss';
@import url('https://fonts.googleapis.com/css2?family=Coiny&display=swap');
</style>

