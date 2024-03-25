<template>
  <div id="AdminProduct">
    <h1>訂單列表</h1>
    
    <!-- <div class="select-area">
      <p>篩選類別</p>
      <select class="form-select" aria-label="Select sub-categoty" v-model="selectedCagetory">
        <option :value="item" v-for="(item, index) in categoryOption" :key="`category-${index}`">
          {{ item }}
        </option>
      </select>
      <button class="btn btn-outline-primary" @click="getProducts">確定</button>
    </div>  -->

    <div class="table-product">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>序號</th>
            <th>訂單編號</th> 
            <th>杯數</th>           
            <th>訂單總價</th>
            <th>付款狀態</th>         
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orderData" :key="order.id">
            <td>{{ order.num }}</td>
            <td>{{ order.id }}</td>   
            <td>{{ order.totalQty }}</td>        
            <td>{{ order.total }}</td>
            <td>{{ order.is_paid? '已付款':'尚未付款'}}</td>
           
            <td>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#orderModal"
                  @click.prevent="openModal(order)"
                >
                  編輯
                </button>

                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click.prevent="dele(order.id)"
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

    <OrderModal
      :order="tempOrder"    
     
      ref="orderModal"
    ></OrderModal>

    <DeleteModal
      :status="status"
      :id="deleteId"
      
      @delete="getOrders"
      ref="deleteModal"
    ></DeleteModal>

  </div>
</template>

<script>

import DeleteModal from '@/components/DeleteModal.vue'
import OrderModal from'@/components/OrderModal.vue'

import Swal from 'sweetalert2'
import { watch } from 'vue'

export default {
  components: {  
    DeleteModal,
    OrderModal
  },

  data() {
    return {
      VITE_URL: import.meta.env.VITE_URL,
      VITE_NAME: import.meta.env.VITE_NAME,
      orderData:[], 
      tempOrder:{},
      deleteId:'',
      status:'deleteOrder',      
     
      pagination: 1,
      totalPage: 1
    }
  },

  mounted() {
    //取得token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexschoolToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    this.$http.defaults.headers.common['Authorization'] = token
    this.getOrders()
  },

  methods: {
    getOrders() {    
        this.$http
          .get(`${this.VITE_URL}/api/${this.VITE_NAME}/admin/orders?page=${this.pagination}`)
          .then((res) => {
            console.log('res data', res.data)
            this.orderData = res.data.orders           
            this.totalPage = res.data.pagination.total_pages 
            this.countNumber()       
        
          })
          .catch((error) => {
            console.log('error', error)
          })
    
    },

    //計算總杯數
    countNumber(){
      console.log(123)
      this.orderData.forEach(item=>{
        let totalQty = 0;
        Object.values(item.products).forEach(product => {
          console.log('prodcut.qty',product.qty)
            totalQty += product.qty;
            
         });
        item.totalQty = totalQty
        
      })
    

    },
    openModal( order) {   
      this.tempOrder = {}
      this.$refs.orderModal.showModal()
      this.tempOrder = order
    },

    dele(id) {
      this.deleteId = id
      console.log('id外',this.deleteId)
      // this.deleteProductTitle = title
      this.$refs.deleteModal.showModal()

      // this.$http
      //   .delete(`${this.VITE_URL}/api/${this.VITE_NAME}/admin/order/${id}`)
      //   .then((res) => {
      //     console.log('res',res)
      //     // this.deleModal.hide()         
      //     this.$emit('delete')
         
      //     Swal.fire({
      //       icon: 'success',
      //       title: '已成功刪除'
      //     })
      //   })
      //   .catch((error) => {
      //     console.log('error', error)
      //     Swal.fire({
      //       icon: 'error',
      //       title: '無法刪除'
      //     })
      //   })
      this.getOrders()
    },

    clickPage(page) {
      console.log('click page', page)
      this.pagination = page
      
    }

 
  },
  watch: {
    // pagination() {
    //   console.log('change page')
    //   this.getProducts()
    // }
  }
}
</script>
<style  lang="scss">
@import '../../style/admin/AdminOrder.scss';
</style>

