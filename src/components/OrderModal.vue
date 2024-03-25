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
            <div class="col-sm-5">
              <div
                v-for="(item, index) in productArray"
                :key="`item-${index}`"
                class="shadow py-3 px-2 mb-3 bg-body rounded"
              >
                <div class="row mb-2">
                  <div class="col-10 fs-5">{{ index + 1 }}. {{ item.product?.title }}</div>

                  <div class="col-1">
                    <RiSkipDownLine
                      v-show="!opened[index]"
                      @click.prevent="opened[index] = !opened[index]"
                    ></RiSkipDownLine>
                    <RiSkipUpLine
                      v-show="opened[index]"
                      @click.prevent="opened[index] = !opened[index]"
                    ></RiSkipUpLine>
                  </div>
                </div>

                <div v-show="opened[index]">
                  <p class="mb-3 fs-5">
                    <span> 產品id:</span>
                    <span class="mb-3 fs-6">{{ item.product?.id }}</span>
                  </p>
                  <p class="mb-3 fs-5">
                    <span> 數量: </span>
                    <span class="mb-3">{{ item.qty }}</span>
                  </p>
                  <!-- <div class="d-flex align-items-center justify-content-center mb-2">
                    <label class="w-25 fs-5">數量:</label>
                    <input
                      id="count"
                      type="number"
                      class="form-control"
                      placeholder="請輸入數量"
                      v-model="item.qty"
                    />
                  </div> -->

                  <p class="mb-3 mt-3 fs-5">單價: {{ item.product.price }}</p>
                  <p class="mb-1 fs-5">產品內容</p>
                  <div class="px-3 py-1">
                    <div
                      v-for="(content, contentIndex) in item.product?.content"
                      :key="`content-${contentIndex}`"
                      class="mb-2"
                    >
                      <p>
                        <span>{{ content.goods }}:</span>
                        <span>{{ content.count }} {{ content.unit }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-7">
              <div class="row d-flex align-items-center mb-2">
                <p class="col-3 fs-5">總金額</p>
                <p class="col-3 fs-5">{{ tempOrder.total }}元</p>
              </div>
              <div class="row d-flex align-items-center mb-2">
                <p class="col-3 fs-5">付款狀態</p>
                <p class="col-6 fs-5">{{ tempOrder.is_paid ? '已付款' : '尚未付款' }}</p>
                <div class="col-3 form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :value="tempOrder.is_paid"
                    id="flexCheckChecked"
                    v-model="tempOrder.is_paid"
                  />
                  <label class="form-check-label fs-5" for="flexCheckChecked"> 付款 </label>
                </div>
              </div>
              <div class="row d-flex align-items-center mb-2">
                <label for="name" class="form-label col-3 fs-5">購買人</label>
                <input
                  id="name"
                  type="text"
                  class="form-control w-75"
                  v-model="tempOrder.user.name"
                />
              </div>
              <div class="row d-flex align-items-center mb-2">
                <label for="tel" class="form-label col-3 fs-5">聯絡電話</label>
                <input
                  id="tel"
                  type="text"
                  class="form-control w-75"
                  v-model="tempOrder.user.tel"
                />
              </div>
              <div class="row d-flex align-items-center mb-2">
                <label for="email" class="form-label col-3 fs-5">email:</label>
                <input
                  id="email"
                  type="text"
                  class="form-control w-75"
                  v-model="tempOrder.user.email"
                />
              </div>
              <div class="row d-flex align-items-center mb-2">
                <label for="address" class="form-label col-3 fs-5">送貨地址:</label>
                <input
                  id="address"
                  type="text"
                  class="form-control w-75"
                  v-model="tempOrder.user.address"
                />
              </div>

              <div class="row d-flex align-items-center mb-2">
                <p class="col-3 fs-5">留言:</p>
                <p class="w-75">{{ tempOrder.message }}</p>
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
import { RiSkipDownLine, RiSkipUpLine } from '@remixicon/vue'
import Modal from 'bootstrap/js/dist/modal'
import Swal from 'sweetalert2'

export default {
  props: {
    order: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    RiSkipDownLine,
    RiSkipUpLine
  },
  data() {
    return {
      orderModal: {},
      VITE_URL: import.meta.env.VITE_URL,
      VITE_NAME: import.meta.env.VITE_NAME,
      tempOrder: {
        user: {
          address: '',
          email: '',
          name: '',
          tel: ''
        }
      },
      productNum: 0,
      productArray: [],
      opened: []
    }
  },
  mounted() {
    this.orderModal = new Modal(this.$refs.orderModal)
  },

  watch: {
    order() {
      this.tempOrder = { ...this.order }
      this.productArray = Object.values(this.tempOrder.products)
      this.totalPrice = this.tempOrder.total

      //toggle 功能
      const num = this.productArray.length
      this.opened = Array(num).fill(false)
    }
  },
  // computed: {
  //   totalPrice() {
  //     // let total = 0
  //     // this.productArray.forEach(item=>{
  //     //   console.log('item',item)
  //     //   total += item.qty*item.product.price
  //     // })
  //     // return total

  //     return this.productArray.reduce((acc, item) => {
  //       item.total = item.qty * item.product?.price
  //       return acc + item.total
  //     }, 0)
  //   }
  // },

  methods: {
    showModal() {
      this.orderModal.show()
    },

    hideModal() {
      this.orderModal.hide()
    },
    submitOrder() {
      const datas = {
        is_paid: this.tempOrder.is_paid,
        user: { ...this.tempOrder.user }
      }

      this.$http
        .put(`${this.VITE_URL}/api/${this.VITE_NAME}/admin/order/${this.tempOrder?.id}`, {
          data: datas
        })
        .then((res) => {
          console.log('update res', res)
          this.$emit('product-change')
          Swal.fire({
            icon: 'success',
            title: '已更新'
          })
        })
        .catch((error) => {
          console.log('carate error', error)
        })
    }
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
