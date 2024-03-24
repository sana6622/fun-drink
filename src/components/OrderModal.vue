<template>
  <div
    class="modal fade modal-lg"
    id="orderModal"
    tabindex="-1"
    aria-labelledby="orderModalLabel"
    aria-hidden="true"
    ref="orderModal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fs-2" id="orderModalLabel">訂單編號:{{ tempOrder.id }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div v-for="(item,itemIndex) in order.products" :key="`item-${itemIndex}`" class="mb-5  ">
            
                <p class="mb-2">產品id:{{ item.product.id }}</p>
                <p class="mb-2">產品名稱:{{ item.product.title }}</p>
                <p class="mb-2">產品數量:{{ item.qty }}</p>
               
              </div>
              
             
            </div>
            <div class="col-sm-8">               
              <div class="row d-flex align-items-center  mb-2">
                <p class="col-3 fs-5">總金額</p>
                <p class="col-3 fs-5">{{ tempOrder.total }}元</p>
                <!-- <label for="price" class="form-label col-3 fs-5">總金額</label>
                <input
                  id="price"
                  type="number"
                  class="form-control  w-75"                 
                  v-model="order.total"
                /> -->
              </div>
              <div class="row d-flex align-items-center  mb-2">
                <p class="col-3 fs-5">付款狀態</p>
                <p class="col-3 fs-5">{{tempOrder.is_paid? '已付款':'尚未付款' }}</p>               
              </div>
              <div class="row d-flex align-items-center  mb-2">
                <label for="name" class="form-label col-3 fs-5">購買人</label>
                <input
                  id="name"
                  type="text"
                  class="form-control  w-75"                 
                  v-model="tempOrder.user.name"
                />
              </div>
              <div class="row d-flex align-items-center  mb-2">
                <label for="tel" class="form-label col-3 fs-5">聯絡電話</label>
                <input
                  id="tel"
                  type="text"
                  class="form-control  w-75"                 
                  v-model="tempOrder.user.tel"
                />
              </div>
              <div class="row d-flex align-items-center  mb-2">
                <label for="email" class="form-label col-3 fs-5">email</label>
                <input
                  id="email"
                  type="text"
                  class="form-control  w-75"                 
                  v-model="tempOrder.user.email"
                />
              </div>
              <div class="row d-flex align-items-center  mb-2">
                <label for="address" class="form-label col-3 fs-5">送貨地址</label>
                <input
                  id="address"
                  type="text"
                  class="form-control  w-75"                 
                  v-model="tempOrder.user.address"
                />
              </div>
              <div class="row d-flex align-items-center  mb-2">
                <label for="message" class="form-label col-3 fs-5">留言</label>
                <input
                  id="message"
                  type="text"
                  class="form-control  w-75"                 
                  v-model="tempOrder.message"
                />
              </div>     
            </div>        
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="submitOrder">確定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
import Swal from 'sweetalert2'

export default {
  // props: ['tempProduct', 'updateProduct'],
  props: {
    order: {
      type: Object,
      default() {
        return {}
      }
    },   
  },
  data() {
    return {
      orderModal: {},
      VITE_URL: import.meta.env.VITE_URL,
      VITE_NAME: import.meta.env.VITE_NAME,
      tempOrder: {
        user: {
      address: "",
      email: "",
      name: "",
      tel: ""
    },
      },
     
    }
  },
  mounted() {
    this.orderModal = new Modal(this.$refs.orderModal)
  },

  watch: {
    order() {
      this.tempOrder = {...this.order}
      
    }
  },

  methods: {
    showModal() {
      this.orderModal.show()
    },

    hideModal() {
      this.orderModal.hide()
    },
    submitOrder(){
      // console.log('tempOrder',this.tempOrder)
      // const datas = {     
      //   message: this.tempOrder.message,   
      //   user:{...this.tempOrder.user},
      // }
      // console.log('data',datas)

      // this.$http
      //     .put( `${this.VITE_URL}/api/${this.VITE_NAME}/admin/order/${this.tempOrder?.id}`, { data: datas })
      //     .then((res) => {
      //       console.log('update res', res)
      //       this.orderModal.hide()
      //       // this.$emit('product-change')
      //       // Swal.fire({
      //       //   icon: 'success',
      //       //   title: '已更新'
      //       // })

      //     })
      //     .catch((error) => {
      //       console.log('carate error', error)
      //     })
          this.orderModal.hide()

    }

  
    

   
  },
  computed: {
   

    
  }
}
</script>

<style lang="scss">
#orderModal {
  .btn-danger {
    --bs-btn-color: white;
    --bs-btn-hover-color: white;
    --bs-btn-active-color: white;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  }
}
</style>
