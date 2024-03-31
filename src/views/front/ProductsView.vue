<template>

  <div id="ProductView">
    <LoadingAnimation :isLoading="isLoading"></LoadingAnimation>  

    <div class="sub-navbar front-container">
      <ul class="sub-nav-ul">
        <li class="nav-drink" @click.prevent="clickNav('drinkMenu')">
          <p class="nav-title">飲品</p>
          <ul class="nav-list">
            <li v-for="(list, index) in drinkMenu" :key="index" class="list-li">
              <p @click.prevent="clickMenu(list.title)">{{ list.title }}</p>
            </li>
          </ul>
        </li>
        <li class="nav-ingredient" @click.prevent="clickNav('ingredientsMenu')">
          <p class="nav-title">各式配料</p>
          <ul class="nav-list">
            <li v-for="(list, index) in ingredientsMenu" :key="`${'list'+index}`" class="list-li">
              <p @click.prevent="clickMenu(list.title)">{{ list.title }}</p>
              <ul class="list-item">
                <li v-for="(item, itemIndex) in list.subTitle" :key="`${'item'+itemIndex}`" @click.prevent="clickMenu(item)">{{ item }}</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <!-- <form role="search ">
        <input class="form-control" type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-danger disabled" type="submit">Search</button>
      </form> -->
    </div>
    <main class="front-container">

      <ul class="menu">
        <li v-for="(menu, index) in menu" :key="index" class="menu-li">
          <p  @click.prevent="clickMenu(menu.title)">{{ menu.title }}</p>
          <ul v-if="menu.subTitle" class="menu-subtitle">
            <li v-for="(item, itemIndex) in menu.subTitle" :key="`${'menu'+itemIndex}`" @click.prevent="clickMenu(item)">{{ item }}</li>
          </ul>
        </li>
      </ul>   

      <div class="products">
        <h2>{{ productCategory }}</h2>
        <ul>
          <li class="card" v-for="(item, index) in products" :key="`product-${index}`">
            <div class="list-card">
              <p class="card-tag-before" v-show="item.description[1].tag!=''"></p>
              <p class="card-tag" v-show="item.description[1].tag !=''">{{ item.description[1].tag }}</p>
              <!-- <p class="card-tag-"></p> -->
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
                <span v-show="item.price==item.origin_price">價格 ${{ item.price }}</span>
                <span v-show="item.price!=item.origin_price">優惠價 ${{ item.price }}</span>
                <span v-show="item.price!=item.origin_price">原價 ${{ item.origin_price }}</span>
              </div>
              <div class="card-btn">
                <button type="button" class="btn btn-outline-danger" @click="addToDIY(item)" v-if="isIngredient">加入調飲室</button>
                <button type="button" class="btn btn-danger" @click="addToCart(item.id,1)" v-else>加入購物車</button>
              </div>
            </div>
          </li>

        </ul>
      </div>
    </main>
  </div>
</template>

<script>
import LoadingAnimation from '../../components/LoadingAnimation.vue'

import {mapActions} from 'pinia'
import DIYStore from '../../stores/DIYStore'

export default {
  components: {
    LoadingAnimation,
  },

  data() {
    return {
      isLoading:false,
      VITE_URL: import.meta.env.VITE_URL,
      VITE_NAME: import.meta.env.VITE_NAME,
      menu: {},
      drinkMenu: [{ title: '熱門飲品' }, { title: '創意飲品' }],
      ingredientsMenu: [
        { title: '基底飲品', subTitle: ['茶類', '果汁', '其他基底'] },
        { title: '配料', subTitle: ['口感配料', '水果類', '香料與草本', '其他配料'] },
        { title: '糖類',subTitle: ['糖類'] }
      ],
      productCategory:'熱門飲品',
      products:[],
      isIngredient:false,
    }
  },
  mounted() {
    this.menu = this.drinkMenu
    this.getProducts(this.productCategory)
  },
  methods: {
    getProducts(category) {    
      this.isLoading = true      
      this.$http
        .get(`${this.VITE_URL}/api/${this.VITE_NAME}/products?category=${category}`)
        .then((res) => {
          const data = Object.values(res.data.products)       
          const datas =[...this.products,...data]       
          this.products = datas   
          this.isLoading = false       
        })
        .catch((error) => {
          console.log('error', error)
        })
    },

    clickNav(menu) {      
      if (menu == 'drinkMenu') {
        this.menu = this.drinkMenu
        this.isIngredient = false
      } else {
        this.menu = this.ingredientsMenu
        this.isIngredient = true
      }
    },

    clickMenu(item){     
      this.productCategory = item
      //如果是點選基底飲品(大項目) = 茶類+果汁+其他基底
      //如果是點配料 = 口感配料+水果+香料+其他
      const itemIndex = this.ingredientsMenu.findIndex(el=>el.title===item)     
    
      if(itemIndex === -1){
        //點擊子項目
        this.products=[]
        this.getProducts(item)       
      }else{
        //點擊大項目
      this.products=[]
      this.ingredientsMenu[itemIndex].subTitle.forEach(category=>{        
      this.getProducts(category)
      })            
      }
    },

    clickMore(id){
      console.log('click id',id)
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
@import '../../style/ProductView.scss';
@import url('https://fonts.googleapis.com/css2?family=Coiny&display=swap');

</style>