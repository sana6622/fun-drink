<template>
  <div class="container">
    <h2>後台商品頁面 (待處理)</h2>
    <!--產品列表-->
    <table>
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td style="width: 200px">
            <div
              style="height: 100px; background-size: cover; background-position: center"
              :style="{ backgroundImage: `url(${product.imageUrl})` }"
            ></div>
          </td>
          <td>
            {{ product.title }}
          </td>
          <td>
            <div class="h5" v-if="product.price === product.origin_price">
              {{ product.price }} 元
            </div>
            <div v-else>
              <del class="h6">原價 {{ product.origin_price }} 元</del>
              <div class="h5">現在只要 {{ product.price }} 元</div>
            </div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button type="button" class="btn btn-outline-secondary" @click="openModal(product)">
                <!-- <i class="fas fa-spinner fa-pulse"></i> -->
                查看更多
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="addToCart(product.id, 1)"
                :disabled="addToCartLoading === product.id"
              >
                <i class="fas fa-spinner fa-pulse" v-if="addToCartLoading === product.id"></i>
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const { VITE_URL } = import.meta.env
const { VITE_NAME } = import.meta.env

export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      addToCartLoading: '',
      cartChangeLoading: '',
      carts: {}
    }
  },

  mounted() {
    console.log('VITE_URL',VITE_URL)
    console.log('VITE_Name',VITE_NAME)
    console.log('`${VITE_URL}/api/${VITE_NAME}/products/all`',`${VITE_URL}/api/${VITE_NAME}/products/all`)

    this.getProducts()
  
  },

  methods: {
    getProducts() {
      this.$http
        .get(`${VITE_URL}/api/${VITE_NAME}/products/all`)
        .then((res) => {
          this.products = res.data.products
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    openModal(product) {
      this.tempProduct = product
      console.log('open', this.tempProduct)
      this.$refs.userModalRef.openUserModal()
    }
  }
}
</script>
