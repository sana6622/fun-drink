<template>
  <div id="AdminProduct">
    <h1>產品列表</h1>
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openModal('create', {})">建立新的產品</button>
    </div>
    <div class="select-area">
      <p>篩選類別</p>
      <select class="form-select" aria-label="Select sub-categoty" v-model="selectedCagetory">
        <option :value="item" v-for="(item, index) in categoryOption" :key="`category-${index}`">
          {{ item }}
        </option>
      </select>
      <button class="btn btn-outline-primary" @click="getProducts">確定</button>
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
              <span class="d-none d-sm-block" v-if="product.is_enabled">已上架</span>
              <span class="d-none d-sm-block" v-else>停售中</span>
              <span class="d-block d-sm-none" v-if="product.is_enabled">V</span>
              <span class="d-block d-sm-none" v-else>X</span>
            </td>
            <td>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#openModal"
                  @click.prevent="openModal('edit', product)"
                >
                  編輯
                </button>

                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
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

    <nav aria-label="Page navigation example ">
      <ul class="pagination justify-content-end my-5">
        <li
          class="page-item"
          v-for="page in totalPage"
          :key="`page-${page}`"
          @click="clickPage(page)"
        >
          <a class="page-link">{{ page }}</a>
        </li>
      </ul>
    </nav>

    <ProductModal
      :product="tempProduct"
      :isCreate="isCreate"
      @product-change="getProducts"
      ref="productModal"
    ></ProductModal>

    <DeleteModal
      :id="deleteProductId"
      :title="deleteProductTitle"
      :status="status"
      @delete="getProducts"
      ref="deleteModal"
    ></DeleteModal>
  </div>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue'
import DeleteModal from '@/components/DeleteModal.vue'
import Swal from 'sweetalert2'
import { watch } from 'vue'

export default {
  components: {
    ProductModal,
    DeleteModal
  },

  data() {
    return {
      VITE_URL: import.meta.env.VITE_URL,
      VITE_NAME: import.meta.env.VITE_NAME,
      products: [],
      filterProducts: [],
      tempProduct: {},
      addToCartLoading: '',
      cartChangeLoading: '',
      carts: {},
      deleteProductId: '',
      deleteProductTitle: '',
      isCreate: false,
      categoryOption: [
        '所有類別',
        '熱門飲品',
        '創意飲品',
        '茶類',
        '果汁',
        '其他基底',
        '口感配料',
        '水果類',
        '香料與草本',
        '其他配料',
        '糖類'
      ],
      selectedCagetory: '所有類別',
      pagination: 1,
      totalPage: 1,
      status: 'deleteProduct'
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
      let api = ''
      if (this.selectedCagetory === '所有類別') {
        api = `${this.VITE_URL}/api/${this.VITE_NAME}/admin/products?page=${this.pagination}`
      } else {
        api = `${this.VITE_URL}/api/${this.VITE_NAME}/admin/products?page=${this.page}&category=${this.selectedCagetory}`
      }
      this.$http
        .get(api)
        .then((res) => {
          this.totalPage = res.data.pagination.total_pages
          this.products = Object.values(res.data.products)
        })
        .catch((error) => {
          console.log('error', error)
        })
    },

    openModal(status, product) {
      if (status === 'create') {
        this.isCreate = true
      } else {
        this.isCreate = false
      }
      this.tempProduct = {}
      this.$refs.productModal.showModal()
      this.tempProduct = product
    },

    deleModal(id, title) {
      this.deleteProductId = id
      this.deleteProductTitle = title
      this.$refs.deleteModal.showModal()
      // this.getProducts()
    },

    clickPage(page) {
      this.pagination = page
    }

    // filterCategory(category) {
    //   if (category === '所有類別') {
    //     this.filterProducts = this.products
    //   } else {
    //     this.filterProducts = this.products.filter((item) => item.category === category)
    //   }

    // }
  },
  watch: {
    pagination() {
      console.log('change page')
      this.getProducts()
    }
  }
}
</script>
<style  lang="scss">
@import '../../style/admin/AdminProduct.scss';
</style>