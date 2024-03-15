<template>
  <div id="ProductView">
    <div class="sub-navbar page-container">
      <ul class="sub-nav-ul">
        <li class="nav-drink" @click.prevent="clickNav('drinkMenu')">
          <p class="nav-title">飲品</p>
          <ul class="nav-list">
            <li v-for="(list, index) in drinkMenu" :key="index" class="list-li">
              <p @click.prevent="click(list.title)">{{ list.title }}</p>
            </li>
          </ul>
        </li>
        <li class="nav-ingredient" @click.prevent="clickNav('ingredientsMenu')">
          <p class="nav-title">配料</p>
          <ul class="nav-list">
            <li v-for="(list, index) in ingredientsMenu" :key="`${'list'+index}`" class="list-li">
              <p>{{ list.title }}</p>
              <ul class="list-item">
                <li v-for="(item, itemIndex) in list.subTitle" :key="`${'item'+itemIndex}`" @click.prevent="click(item)">{{ item }}</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <form role="search ">
        <input class="form-control" type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-danger" type="submit">Search</button>
      </form>
    </div>
    <main class="page-container">

      <ul class="menu">
        <li v-for="(menu, index) in menu" :key="index" class="menu-li">
          <p  @click.prevent="click(menu.title)">{{ menu.title }}</p>
          <ul v-if="menu.subTitle" class="menu-subtitle">
            <li v-for="(item, itemIndex) in menu.subTitle" :key="`${'menu'+itemIndex}`" @click.prevent="click(item)">{{ item }}</li>
          </ul>
        </li>
      </ul>

      <div class="products">
        <h2>{{ productTitle }}</h2>
        <ul>
          <li class="card">
            <div class="list-card">
              <p class="card-tag-before"></p>
              <p class="card-tag">最佳創意</p>
              <p class="card-tag-"></p>
              <div class="card-img">
                <img src="../../../public/imgDrink.png" alt="" />
              </div>

              <h6>珍珠鮮奶茶</h6>
              <p class="card-des">
                結合了傳統奶茶和楓糖的溫馨味道，適合秋冬季節品嚐。結合了傳統奶茶和楓糖的溫馨味道，適合秋冬季節品嚐。結合了傳統奶茶和楓糖的溫馨味道，適合秋冬季節品嚐。
              </p>
              <p class="card-more">查看詳情</p>
              <div class="card-price">
                <span>優惠價 $65</span>
                <span>原價 $75</span>
              </div>
              <div class="card-btn">
                <button type="button" class="btn btn-outline-danger">加入調飲室</button>
                <button type="button" class="btn btn-danger">加入購物車</button>
              </div>
            </div>
          </li>
          <li class="card">
            <div class="list-card">
              <p class="card-tag-before"></p>
              <p class="card-tag">最佳創意</p>
              <p class="card-tag-"></p>
              <div class="card-img">
                <img src="../../../public/imgDrink.png" alt="" />
              </div>

              <h6>珍珠鮮奶茶</h6>
              <p class="card-des">
                結合了傳統奶茶和楓糖的溫馨味道，適合秋冬季節品嚐。結合了傳統奶茶和楓糖的溫馨味道，適合秋冬季節品嚐。結合了傳統奶茶和楓糖的溫馨味道，適合秋冬季節品嚐。
              </p>
              <p class="card-more">查看詳情</p>
              <div class="card-price">
                <span>優惠價 $65</span>
                <span>原價 $75</span>
              </div>
              <div class="card-btn">
                <button type="button" class="btn btn-outline-danger">加入調飲室</button>
                <button type="button" class="btn btn-danger">加入購物車</button>
              </div>
            </div>
          </li>
          <li class="card">
            <div class="list-card">
              <p class="card-tag-before"></p>
              <p class="card-tag">最佳創意</p>
              <p class="card-tag-"></p>
              <div class="card-img">
                <img src="../../../public/imgDrink.png" alt="" />
              </div>

              <h6>珍珠鮮奶茶</h6>
              <p class="card-des">
                結合了傳統奶茶和楓糖的溫馨味道，適合秋冬季節品嚐。結合了傳統奶茶和楓糖的溫馨味道，適合秋冬季節品嚐。結合了傳統奶茶和楓糖的溫馨味道，適合秋冬季節品嚐。
              </p>
              <p class="card-more">查看詳情</p>
              <div class="card-price">
                <span>優惠價 $65</span>
                <span>原價 $75</span>
              </div>
              <div class="card-btn">
                <button type="button" class="btn btn-outline-danger">加入調飲室</button>
                <button type="button" class="btn btn-danger">加入購物車</button>
              </div>
            </div>
          </li>
          <li class="card">
            <div class="list-card">
              <p class="card-tag-before"></p>
              <p class="card-tag">最佳創意</p>
              <p class="card-tag-"></p>
              <div class="card-img">
                <img src="../../../public/imgDrink.png" alt="" />
              </div>

              <h6>珍珠鮮奶茶</h6>
              <p class="card-des">
                結合了傳統奶茶和楓糖的溫馨味道，適合秋冬季節品嚐。結合了傳統奶茶和楓糖的溫馨味道，適合秋冬季節品嚐。結合了傳統奶茶和楓糖的溫馨味道，適合秋冬季節品嚐。
              </p>
              <p class="card-more">查看詳情</p>
              <div class="card-price">
                <span>優惠價 $65</span>
                <span>原價 $75</span>
              </div>
              <div class="card-btn">
                <button type="button" class="btn btn-outline-danger">加入調飲室</button>
                <button type="button" class="btn btn-danger">加入購物車</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      menu: {},
      drinkMenu: [{ title: '熱門飲料' }, { title: '創意飲品' }],
      ingredientsMenu: [
        { title: '基底飲品', subTitle: ['茶類', '果汁', '酒類', '其他'] },
        { title: '配料', subTitle: ['口感配料', '水果配料', '香草與草本', '其他配料'] },
        { title: '糖類' }
      ],
      productTitle:'熱門飲品'
    }
  },
  mounted() {
    this.menu = this.ingredientsMenu
  },
  methods: {
    clickNav(menu) {      
      if (menu == 'drinkMenu') {
        this.menu = this.drinkMenu
      } else {
        this.menu = this.ingredientsMenu
      }
    },

    click(item){
      console.log('click',item)
      this.productTitle = item

    }
  }
}
</script>

<style >
@import '../../style/ProductView.scss';
@import url('https://fonts.googleapis.com/css2?family=Coiny&display=swap');
</style>

