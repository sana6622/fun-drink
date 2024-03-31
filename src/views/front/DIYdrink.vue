<template>
  <div id="DIY">
    <LoadingAnimation :isLoading="isLoading"></LoadingAnimation>

    <h1 class="front-container">DIY調飲室</h1>
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
        <div class="d-flex">
          <h3 class="area-select">請選擇{{ ingredientsMenu[selectedNavIndex].title }}</h3>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="addProduct"
              v-model="productSource"
            />
            <label class="form-check-label mt-1" for="inlineRadio1">已加入調飲室</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="allProduct"
              v-model="productSource"
            />
            <label class="form-check-label mt-1" for="inlineRadio2"
              >所有{{ ingredientsMenu[selectedNavIndex].title }}</label
            >
          </div>
        </div>

        <div class="area-product">
          <div v-if="products.length == 0" class="product-empty">
            <p>調飲室內沒有產品喔!</p>
            <p>
              可以選擇「所有{{
                ingredientsMenu[selectedNavIndex].title
              }}」或至「產品介紹」點選加入調飲室
            </p>
          </div>

          <div v-else>
            <p class="remind">點選圖片可加入產品</p>
            <ul>
              <li
                class="card"
                v-for="(product, productIndex) in products"
                :key="`product-${productIndex}`"
                :class="{ clickedProduct: selectedProductIndex === productIndex }"
                @click="selectPrduct(product, productIndex)"
              >
                <!-- @click="selectPrduct(productIndex, product.id, product.title, product.imageUrl)" -->
                <div class="img">
                  <img :src="product.imageUrl" alt="" />
                </div>
                <p>{{ product.title }}</p>
              </li>
            </ul>
          </div>
        </div>

        <div class="area-allocate">
          <div class="allocate-basic">
            <h4>基底比例 : {{ totalRateBasic }}%</h4>
            <div class="bar-word">
              <p
                v-for="(pickedItem, pickedIndex) in pickedBasic"
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
                v-for="(pickedItem, pickedIndex) in pickedBasic"
                :key="`button-${pickedIndex}`"
                :style="{ width: pickedItem.rate + '%', backgroundColor: pickedItem.color }"
                :aria-valuenow="pickedItem.rate"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {{ pickedItem.rate }}%
              </div>
            </div>
          </div>

          <div class="allocate-ingredient">
            <h4>配料比例 : {{ totalRateIngredient }}份</h4>
            <div class="bar-word">
              <p
                v-for="(pickedItem, pickedIndex) in pickedIngredient"
                :key="`button-${pickedIndex}`"
                :style="{ width: `${pickedItem.rate * 20}%` }"
              >
                {{ pickedItem.title }}
              </p>
            </div>
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar "
                v-for="(pickedItem, pickedIndex) in pickedIngredient"
                :key="`button-${pickedIndex}`"
                :style="{ width: `${pickedItem.rate * 20}%`, backgroundColor: pickedItem.color }"
                :aria-valuenow="pickedItem.rate"
                aria-valuemin="0"
                aria-valuemax="5"
              >
                <p class="white">{{ pickedItem.rate }}份</p>
              </div>
            </div>
          </div>

          <div class="allocate-sweet">
            <h4>甜度比例 : {{ totalRateSweet }}分</h4>
            <div class="bar-word">
              <p
                v-for="(pickedItem, pickedIndex) in pickedSweet"
                :key="`button-${pickedIndex}`"
                :style="{ width: `${pickedItem.rate * 10}%` }"
              >
                {{ pickedItem.title }}
              </p>
            </div>
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar "
                v-for="(pickedItem, pickedIndex) in pickedSweet"
                :key="`button-${pickedIndex}`"
                :style="{ width: `${pickedItem.rate * 10}%`, backgroundColor: pickedItem.color }"
                :aria-valuenow="pickedItem.rate"
                aria-valuemin="0"
                aria-valuemax="5"
              >
                {{ pickedItem.rate }}份
              </div>
            </div>
          </div>
          <div class="allocate-ice">
            <h4>冰量:</h4>
            <div class="form-check form-check-inline" v-for="ice in iceList" :key="ice.id">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                :id="ice.id"
                :value="ice.value"
                v-model="iceData"
              />
              <label class="form-check-label mt-1" :for="ice.id">{{ ice.value }}</label>
            </div>
          </div>

          <div class="allocate-price">
            <span>總金額: {{ totalPrice }}</span>
            <span>原價:{{ totalOriginPrice }}</span>
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
                @click.prevent="clickRate('minus', pickedIndex)"
              >
                -
              </button>
              <div class="card" @click="removePicked(pickedIndex)">
                <div class="img">
                  <img :src="pickedItem.imageUrl" alt="" />
                </div>
                <p>{{ pickedItem.title }} {{ pickedItem.originPrice }}</p>
              </div>
              <button
                type="button"
                class="btn btn-outline-success btn-sm"
                @click.prevent="clickRate('plus', pickedIndex)"
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

      <!-- Button trigger modal -->
      <div class="text-end">
        <button type="button" class="btn btn-danger" @click="addDrink()">加入購物車</button>
      </div>
    </main>
    <!-- Modal -->
    <div
      class="modal fade"
      id="nameModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="modal"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">請為您的飲料命名</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="飲料名稱"
                aria-label="Username"
                v-model="drinkName"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="submitDrink()">送出</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import Modal from 'bootstrap/js/dist/modal'
import { mapState } from 'pinia'
import DIYStore from '@/stores/DIYStore'
import LoadingAnimation from '../../components/LoadingAnimation.vue'

export default {
  components: {
    LoadingAnimation
  },
  data() {
    return {
      isLoading: false,
      modal: {},
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
      productSource: 'addProduct',
      products: [],
      pickedBasic: [],
      pickedIngredient: [],
      pickedSweet: [],
      pickedTemp: [],
      colorBasic: ['#ffb6bb', '#bbe7ba', '#95d5ee', '#ffe691'],
      colorIngredient: ['#92c9da', '#c9b1cf', '#8cc296', '#f8b976'],
      colorSweet: ['#ffe691', '#95d5ee', '#ffb6bb', '#bbe7ba'],
      rateNumber: 0,
      totalPrice: 0,
      totalOriginPrice: 0,
      iceList: [
        { id: 'ice1', value: '正常' },
        { id: 'ice2', value: '少冰' },
        { id: 'ice3', value: '去冰' },
        { id: 'ice4', value: '常溫' },
        { id: 'ice5', value: '溫' },
        { id: 'ice6', value: '熱' }
      ],
      iceData: '正常',
      drinkName: ''
    }
  },

  mounted() {
    ;(this.modal = new Modal(this.$refs.modal)), this.selectItem(0)
  },

  methods: {
    showModal() {
      this.modal.show()
    },
    hideModal() {
      this.modal.hide()
    },

    selectItem(index) {
      this.products = []
      this.selectedProductIndex = ''
      this.selectedNavIndex = index

      if (index === 0) {
        this.rateNumber = 10
      } else if (index === 1 || index === 2) {
        this.rateNumber = 1
      }

      if ((this.productSource == 'addProduct') & (index === 0)) {
        this.products = [...this.diyBasic]
      } else if ((this.productSource == 'addProduct') & (index === 1)) {
        this.products = [...this.diyIngredient]
      } else if ((this.productSource == 'addProduct') & (index === 2)) {
        this.products = [...this.diySweet]
      } else {
        this.ingredientsMenu[index].subTitle.forEach((category) => {
          this.getProducts(category)
        })
      }
    },

    getProducts(category) {
      this.isLoading = true
      this.$http
        // .get(`${this.VITE_URL}/api/${this.VITE_NAME}/products/all`)
        .get(`${this.VITE_URL}/api/${this.VITE_NAME}/products?category=${category}`)
        .then((res) => {
          const data = Object.values(res.data.products)
          const datas = [...this.products, ...data]
          this.products = datas
          this.isLoading = false
        })
        .catch((error) => {
          console.log('error', error)
        })
    },

    selectPrduct(product, index) {
      this.selectedProductIndex = index

      //有無重複
      const check = this.pickedTemp.some((item) => item.id === product.id)

      if (this.selectedNavIndex === 0 && this.totalRateBasic === 100) {
        Swal.fire({
          // icon: "error",
          title: '基底比例已達100%',
          showConfirmButton: false,
          timer: 1500
        })
      } else if (this.pickedTemp.length < 4) {
        // 加入下方 基底 picked
        if (!check) {
          this.pickedTemp.push({
            id: product.id,
            imageUrl: product.imageUrl,
            title: product.title,
            type: product.category,
            unit: product.unit,
            originPrice: product.origin_price,
            price: product.price,
            rate: this.rateNumber,
            selectedNavIndex: this.selectedNavIndex,
            color: ''
          })
          // this.calculatePrice()
          this.changeColor(this.selectedNavIndex)
        }
      } else if (this.pickedTemp.length >= 4) {
        Swal.fire({
          // icon: "error",
          title: '已超過4樣產品',
          showConfirmButton: false,
          timer: 1500
        })
      }
    },

    removePicked(index) {
      this.pickedTemp.splice(index, 1)
      this.changeColor(this.selectedNavIndex)
    },

    //加減比率
    clickRate(status, index) {
      let totalRate = 0
      let maxNumber = 100
      let minNumber = 10
      if (this.selectedNavIndex === 1) {
        maxNumber = 5
        minNumber = 1
      } else if (this.selectedNavIndex === 2) {
        maxNumber = 10
        minNumber = 1
      }

      if (status == 'plus') {
        this.pickedTemp.forEach((item) => {
          totalRate += item.rate
        })
        if (totalRate < maxNumber) {
          this.pickedTemp[index].rate += this.rateNumber
        }
      } else {
        if (this.pickedTemp[index].rate > minNumber) this.pickedTemp[index].rate -= this.rateNumber
      }
    },

    //重新渲染進度條顏色
    changeColor(selectedNavIndex) {
      if (selectedNavIndex === 0) {
        this.pickedTemp.map((item, index) => {
          item.color = this.colorBasic[index]
        })
        this.pickedBasic = [...this.pickedTemp]
      } else if (selectedNavIndex === 1) {
        this.pickedTemp.map((item, index) => {
          item.color = this.colorIngredient[index]
        })
        this.pickedIngredient = [...this.pickedTemp]
      } else if (selectedNavIndex === 2) {
        this.pickedTemp.map((item, index) => {
          item.color = this.colorSweet[index]
        })
        this.pickedSweet = [...this.pickedTemp]
      }
    },

    calculateTotalRate(rateType) {
      let totalRate = 0
      this[rateType].forEach((item) => {
        totalRate += item.rate
      })
      return totalRate
    },

    calculatePrice(priceType) {
      const pickedAll = [...this.pickedBasic, ...this.pickedIngredient, ...this.pickedSweet]
      let total = 0
      pickedAll.forEach((item) => {
        if (item.selectedNavIndex === 0) {
          total += item[priceType] * (item.rate / 10)
        } else if (item.selectedNavIndex === 1) {
          total += item[priceType] * item.rate
        }
      })
      return total
    },

    //加入購物車
    addDrink() {
      //確保資料都已儲存
      switch (this.selectedNavIndex) {
        case 0:
          this.pickedBasic = [...this.pickedTemp]
          break
        case 1:
          this.pickedIngredient = [...this.pickedTemp]
          break
        case 2:
          this.pickedSweet = [...this.pickedTemp]
          break
      }
      this.checkDrink()
    },

    //確定是否都有填寫
    checkDrink() {
      let totalRate = 0
      this.pickedBasic.forEach((item) => {
        totalRate += item.rate
      })

      if (totalRate == 0) {
        Swal.fire({
          position: 'top-center',
          icon: 'error',
          title: '請選擇基底',
          showConfirmButton: false,
          timer: 1500
        })
      } else if (totalRate > 0 && totalRate < 100) {
        Swal.fire({
          position: 'top-center',
          icon: 'error',
          title: '基底比例應為100%，請再調整',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        this.showModal()
      }
    },

    submitDrink() {
      if (this.drinkName == '') {
        Swal.fire({
          position: 'top-center',
          icon: 'error',
          title: '請為您的飲料命名',
          showConfirmButton: false,
          timer: 1500
        })
      }
      //因為API限制，所以只能先登入，進行create 商品，再加入購物車,完成後登出

      //登入
      ;(this.isLoading = true),
        this.$http
          .post(`${this.VITE_URL}/admin/signin`, {
            username: 'taniya.hsu@gmail.com',
            password: '123456789'
          })
          .then((res) => {
            const { token, expired } = res.data
            document.cookie = `hexschoolToken=${token}; expires=${new Date(expired)}`
            const token1 = document.cookie.replace(
              /(?:(?:^|.*;\s*)hexschoolToken\s*=\s*([^;]*).*$)|^.*$/,
              '$1'
            )
            this.$http.defaults.headers.common['Authorization'] = token1
            this.createProduct()
          })
          .catch((error) => {
            console.log('login error', error)
          })

      //登出
    },

    createProduct() {
      const pickedAll = [...this.pickedBasic, ...this.pickedIngredient, ...this.pickedSweet]
      let content = []
      pickedAll.forEach((item) => {
        content.push({
          count: item.rate,
          goods: item.title,
          type: item.type,
          unit: item.unit
        })
      })

      const timestamp = Date.now()
      const title = `${this.drinkName}-${timestamp}`

      const data = {
        category: 'DIY',
        content: content,
        is_enabled: 1,
        num: 1,
        origin_price: this.totalOriginPrice,
        unit: '杯',
        price: this.totalPrice,
        title: title,
        description: [{ des: ['自創飲品'] }, { tag: '' }, { sell: 1 }, { ice: this.iceData }]
      }

      this.$http
        .post(`${this.VITE_URL}/api/${this.VITE_NAME}/admin/product`, { data: data })
        .then((res) => {
          console.log('create res', res)
          this.findDIYProduct(title)
        })
        .catch((error) => {
          console.log('error', error)
        })
    },

    //尋找產品id + 加入購物車
    findDIYProduct(title) {
      this.$http
        .get(`${this.VITE_URL}/api/${this.VITE_NAME}/products?category=DIY`)
        .then((res) => {
          const datas = res.data.products
          const index = datas.findIndex((item) => item.title === title)
          const findId = datas[index].id
          this.addIdToCart(findId, 1)
        })
        .catch((error) => {
          console.log('find error', error)
        })
    },

    addIdToCart(product_id, qty) {
      const cartData = {
        product_id,
        qty
      }
      this.$http
        .post(`${this.VITE_URL}/api/${this.VITE_NAME}/cart`, { data: cartData })
        .then((res) => {
          console.log('res', res)
          ;(this.isLoading = false), this.hideModal()
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: '已成功加入購物車',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch((error) => {
          console.log('cart error', error)
        })
    }

    //
  },
  computed: {
    //取pinia值
    ...mapState(DIYStore, ['diyBasic']),
    ...mapState(DIYStore, ['diyIngredient']),
    ...mapState(DIYStore, ['diySweet']),

    totalRateBasic() {
      return this.calculateTotalRate('pickedBasic')
    },
    totalRateIngredient() {
      return this.calculateTotalRate('pickedIngredient')
    },
    totalRateSweet() {
      return this.calculateTotalRate('pickedSweet')
    },

    totalPrice() {
      const countPrice = this.calculatePrice('price')
      //因為要存到API 所以需要this.totalPrice
      this.totalPrice = countPrice
      return countPrice
    },
    totalOriginPrice() {
      const countPrice = this.calculatePrice('originPrice')
      this.totalOriginPrice = countPrice
      return countPrice
    }
  },

  watch: {
    selectedNavIndex(newValue, oldValue) {
      //當頁籤改變時，為了保留中間的比例資料，需要將暫存資料(temp)存到對應的picked資料(Basic Ingredient Sweet)中
      //同時 要賦值新的暫存(temp)資料
      if (oldValue === 0) {
        this.pickedBasic = [...this.pickedTemp]
      } else if (oldValue === 1) {
        this.pickedIngredient = [...this.pickedTemp]
      } else if (oldValue === 2) {
        this.pickedSweet = [...this.pickedTemp]
      }

      this.pickedTemp = []

      switch (newValue) {
        case 0:
          return (this.pickedTemp = [...this.pickedBasic])
        case 1:
          return (this.pickedTemp = [...this.pickedIngredient])
        case 2:
          return (this.pickedTemp = [...this.pickedSweet])
      }
    },

    productSource(newSource) {
      if (newSource === 'addProduct') {
        switch (this.selectedNavIndex) {
          case 0:
            return (this.products = [...this.diyBasic])
          case 1:
            return (this.products = [...this.diyIngredient])
          case 2:
            return (this.products = [...this.diySweet])
        }
      } else {
        this.products = []
        this.ingredientsMenu[this.selectedNavIndex].subTitle.forEach((category) => {
          this.getProducts(category)
        })
      }
    }
  }
}
</script>

<style >
@import '../../style/front/DIYdrink.scss';
</style>
