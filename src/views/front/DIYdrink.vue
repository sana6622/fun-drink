<template>
  <div id="DIY">
    <h1>DIY調飲室</h1>
    <main class="front-container">
      <nav>
        <ul>
          <li
            v-for="(navItem, navIndex) in ingredientsMenu"
            :key="navIndex"
            :class="{ clicked: selectedNavIndex === navIndex }"
            @click="selectItem(navIndex)"
          >
            {{ navItem.title }}
          </li>
        </ul>
      </nav>

      <div class="main-area">
        <h3 class="area-select">請選擇{{ ingredientsMenu[0].title }}</h3>
        <div class="area-product">
          <p class="remind">點選圖片可加入產品</p>
          <ul>
            <li
              class="card"
              v-for="(product, productIndex) in products"
              :key="`product-${productIndex}`"
              :class="{ clickedProduct: selectedProductIndex === productIndex }"
              @click="selectPrduct(productIndex, product.id, product.title, product.imageUrl, 10)"
            >
              <div class="img">
                <img :src="product.imageUrl" alt="" />
              </div>
              <p>{{ product.title }}</p>
            </li>
          </ul>
        </div>

        <div class="area-button">
          <h4>基底比例 :</h4>

          <div class="d-flex">
            <p
              v-for="(pickedItem, pickedIndex) in pickedTemp"
              :key="`button-${pickedIndex}`"
              :style="{ width: pickedItem.rate + '%' }"
            >
              {{ pickedItem.title }}
            </p>
          </div>
          <div class="progress">
            <div
              class="progress-bar"
              role="progressbar"
              v-for="(pickedItem, pickedIndex) in pickedTemp"
              :key="`button-${pickedIndex}`"
              :style="{ width: pickedItem.rate + '%', backgroundColor: pickedItem.color }"
              :aria-valuenow="pickedItem.rate"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {{ pickedItem.rate }}
            </div>
          </div>
        </div>

        <div class="area-picked">
          <p class="remind">點選圖片可移除產品</p>
          <ul>
            <li
              class="picked-box"
              v-for="(pickedItem, pickedIndex) in pickedTemp"
              :key="`picked-${pickedIndex}`"
            >
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click.prevent="clickRate('minus', pickedIndex, pickedItem.rate)"
              >
                -
              </button>
              <div class="card" @click="removePicked(pickedIndex)">
                <div class="img">
                  <img :src="pickedItem.imageUrl" alt="" />
                </div>
                <p>{{ pickedItem.title }}</p>
              </div>
              <button
                type="button"
                class="btn btn-outline-success btn-sm"
                @click.prevent="clickRate('plus', pickedIndex, pickedItem.rate)"
              >
                +
              </button>
            </li>
            <li v-for="(plus, plusIndex) in 4 - pickedTemp.length" :key="`plus-${plusIndex}`">
              <div class="card clickedProduct">
                <div class="img">
                  <img src="../../../public/cup.png" alt="" />
                </div>
                <p>請選擇</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      isLoading: false,
      VITE_URL: import.meta.env.VITE_URL,
      VITE_NAME: import.meta.env.VITE_NAME,
      // navItems: ['基底', '配料', '糖類'],
      ingredientsMenu: [
        { title: '基底', subTitle: ['茶類', '果汁', '其他基底'] },
        { title: '配料', subTitle: ['口感配料', '水果類', '香料與草本', '其他配料'] },
        { title: '糖類', subTitle: ['糖類'] }
      ],
      selectedNavIndex: 0,
      selectedProductIndex: '',
      products: [],
      // pickedBasic:[{id:'',imageUrl:'',title:''},{id:'',imageUrl:'',title:''},{id:'',imageUrl:'',title:''},{id:'',imageUrl:'',title:''}]
      pickedBasic: [],
      pickedTemp: [],
      color: ['#ffb6bb', '#bbe7ba', '#95d5ee', '#ffe691']
    }
  },
  mounted() {
    this.selectItem(0)
  },

  methods: {
    selectItem(index) {
      console.log('index', index)
      this.products = []
      this.selectedProductIndex = ''
      this.selectedNavIndex = index
      this.ingredientsMenu[index].subTitle.forEach((category) => {
        this.getProducts(category)
      })
    },
    getProducts(category) {
      console.log('123', category)
      // this.isLoading = true
      this.$http
        // .get(`${this.VITE_URL}/api/${this.VITE_NAME}/products/all`)
        .get(`${this.VITE_URL}/api/${this.VITE_NAME}/products?category=${category}`)
        .then((res) => {
          const data = Object.values(res.data.products)
          const datas = [...this.products, ...data]
          this.products = datas
          console.log('product', this.products)
          // this.isLoading = false
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    selectPrduct(index, id, title, image, rate) {
      console.log('selectProduct', index, id, title, image, rate)
      this.selectedProductIndex = index
      //加入下方picked
      if (this.pickedTemp.length < 4) {
        //有無重複
        const check = this.pickedTemp.some((item) => item.id === id)
        if (!check) {
          this.pickedTemp.push({
            id: id,
            imageUrl: image,
            title: title,
            rate: rate,
            color: ''
          })
          this.changeColor()
          console.log('this.picked', this.pickedTemp)
        }
      } else {
        Swal.fire({
          // icon: "error",
          title: '已超過4樣產品',
          showConfirmButton: false,
          timer: 1500
        })
      }
      console.log('picked', this.pickedTemp)
    },

    removePicked(index) {
      console.log('picked remove', index)
      this.pickedTemp.splice(index, 1)
      this.changeColor()
      console.log('pick', this.pickedTemp)
    },

    //加減比率
    clickRate(status, index, rate) {
      console.log('click rate', status, index, rate)
      let totalRate = 0
      if (status == 'plus') {
        this.pickedTemp.forEach((item) => {
          totalRate += item.rate
        })
        console.log('totalRate', totalRate)
        if (totalRate < 100) {
          this.pickedTemp[index].rate += 10
        }
      } else {
        if (this.pickedTemp[index].rate >= 20) this.pickedTemp[index].rate -= 10
      }
    },
    //重新渲染進度條顏色
    changeColor() {
      this.pickedTemp.map((item, index) => {
        console.log('item', item)
        item.color = this.color[index]
      })
    }
  }
}
</script>

<style >
@import '../../style/front/DIYdrink.scss';
</style>
