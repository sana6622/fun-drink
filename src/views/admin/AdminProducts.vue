<template>
  <div id="AdminProduct">
    <h2>後台商品頁面 (待處理)</h2>
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openModal('create')">建立新的產品</button>
    </div>
    <div class="table-product">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>圖片</th>
            <th>產品名稱</th>
            <th>類別</th>
            <th>價格</th>
            <th>銷售狀態</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>
              <img :src="product.imageUrl" />
            </td>
            <td>{{ product.title }}</td>
            <td>{{ product.category }}</td>
            <td>
              <div v-if="product.price === product.origin_price">售價: {{ product.price }} 元</div>
              <div v-else>
                <p>售價: {{ product.price }} 元</p>
                <p>原價: {{ product.origin_price }} 元</p>               
              </div>
            </td>
            <td>
              <span v-if="product.is_enabled">已上架</span>
              <span v-else>停售中</span>
            </td>
            <td>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-md"
                  data-bs-toggle="modal"
                  data-bs-target="#openModal"
                  @click.prevent="openModal('edit', product)"
                >
                  編輯
                </button>

                <button
                  type="button"
                  class="btn btn-outline-danger btn-md"
                  @click.prevent="deleModal(product.id, product.title)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ProductModal
      :product="tempProduct"
      :isCreate="isCreate"
      @product-change="getProducts"
      ref="productModal"
    ></ProductModal>

    <DeleteProductModal
      :id="deleteProductId"
      :title="deleteProductTitle"
      @delete="getProducts"
      ref="deleteModal"
    ></DeleteProductModal>
  </div>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue'
import DeleteProductModal from '@/components/DeleteProductModal.vue'
import Swal from 'sweetalert2'

export default {
  components: {
    ProductModal,
    DeleteProductModal
  },

  data() {
    return {
      VITE_URL: import.meta.env.VITE_URL,
      VITE_NAME: import.meta.env.VITE_NAME,
      products: [],
      tempProduct: {},
      addToCartLoading: '',
      cartChangeLoading: '',
      carts: {},
      deleteProductId: '',
      deleteProductTitle: '',
      isCreate: false
    }
  },

  mounted() {
    //取得token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexschoolToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    this.$http.defaults.headers.common['Authorization'] = token
    this.getProducts()
  },

  methods: {
    getProducts() {   
       
      this.$http
        .get(`${this.VITE_URL}/api/${this.VITE_NAME}/admin/products/all`)
        .then((res) => {
          this.products = res.data.products
          console.log('get', res.data.products)
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    openModal(status, product) {
      this.tempProduct = {}
      this.$refs.productModal.showModal()
      this.tempProduct = product
      console.log('status', status)
      if (status === 'create') {
        this.isCreate = true
      } else {
        this.isCreate = false
      }
    },

    deleModal(id, title) {
      this.deleteProductId = id
      this.deleteProductTitle = title
      this.$refs.deleteModal.showModal()
      this.getProducts()
    },
 
  }
}
</script>
<style  lang="scss">
@import '../../style/admin/AdminProduct.scss';
</style>