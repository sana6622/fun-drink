<template>
  <div id="StepFirst">
    <h3>購物明細</h3>
    <!-- <loading  v-model:active="isLoading"></loading> -->
    <div class="text-end">
      <button class="btn btn-outline-danger mb-2" type="button" @click="deleteAllCart">
        清空購物車
      </button>
    </div>
    <div class="table-cart">
      <table class="table align-middle table-hover">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th class="text-end">單價</th>
            <th class="text-end">小計</th>
          </tr>
        </thead>
        <tbody>
          <!-- <pre>{{carts}}</pre>  -->
          <tr v-for="cart in carts.carts" :key="cart.id">
            <td>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click.prevent="deleteCartItem(cart.id)"
                :disabled="cartChangeLoading === cart.id"
              >
                <span
                  class="spinner-border spinner-border-sm"
                  aria-hidden="true"
                  v-if="cartChangeLoading === cart.id"
                ></span>
                <span v-else>X</span>
              </button>
            </td>
            <td>
              {{ cart.product.title }}
              <!-- <div class="text-success">
                                        已套用優惠券
                                    </div> -->
            </td>
            <td>
              <!-- <div class="input-group input-group-sm">
                                    <div class="input-group mb-3">
                                        <input min="1" type="number" class="form-control" v-model="cart.qty"
                                            @change="changeCartQuantity(cart,cart.qty)"
                                            :disabled="cartChangeLoading === cart.id">
                                        <span class="input-group-text" id="basic-addon2">{{cart.product.unit }}</span>
                                    </div>
                                </div> -->

              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="changeQuantity(cart, cart.qty, 'minus')"
                    :disabled="cartChangeLoading === cart.id || cart.qty === 1"
                  >
                    -
                  </button>

                  <input min="1" type="number" class="form-control" v-model="cart.qty" readonly />
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="changeQuantity(cart, cart.qty, 'plus')"
                    :disabled="cartChangeLoading === cart.id"
                  >
                    +
                  </button>
                </div>
              </div>
            </td>
            <td class="text-end">
              <!-- <small class="text-success">折扣價：{{}}</small> -->
              {{ cart.product.price }}
            </td>
            <td class="text-end">
              {{ cart.final_total }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="text-end">總計</td>
            <td class="text-end">{{ carts.final_total }}</td>
          </tr>
          <tr v-show="carts.final_total != carts.total">            
            <td colspan="4" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">{{}}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="button-area">
      <button type="button" class="btn btn-outline-danger btn-lg" @click="clickPrev">
        回產品介紹
      </button>
      <button type="button" class="btn btn-danger btn-lg" @click="clickNext">下一步</button>
    </div>
  </div>
</template>
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
export default {
  components: {
    Loading
  },
  data() {
    return {
      VITE_URL: import.meta.env.VITE_URL,
      VITE_NAME: import.meta.env.VITE_NAME,
      carts: {},
      isLoading: false,
      cartChangeLoading: ''
    }
  },
  mounted() {
    this.getCarts()
  },
  methods: {
    getCarts() {
      this.$http
        .get(`${this.VITE_URL}/api/${this.VITE_NAME}/cart`)
        .then((res) => {
          this.carts = res.data.data
          this.carts.carts.forEach(item=>{            
            const index = item.product.title.lastIndexOf('-')
            if(index!=-1){
              item.product.title = item.product.title.substring(0,index)
            }
          })
          this.cartChangeLoading = ''
        })
        .catch((error) => {
          console.log('error', error)
        })
    },

    //修改購物車商品數量
    changeQuantity(item, qty = 1, state) {
      this.cartChangeLoading = item.id
      if (state === 'minus') {
        qty > 1 ? qty-- : qty
      } else {
        qty++
      }

      const orderChange = {
        product_id: item.product.id,
        qty
      }

      this.$http
        .put(`${this.VITE_URL}/api/${this.VITE_NAME}/cart/${item.id}`, { data: orderChange })
        .then((res) => {
          console.log('chagne res', res)
          this.getCarts()
        }).catch((e) => {
          console.log('error', e)
        })
    },

    //刪除購物車商品
    deleteCartItem(id) {
      this.cartChangeLoading = id
      console.log('dele', id)
      this.$http.delete(`${this.VITE_URL}/api/${this.VITE_NAME}/cart/${id}`)
      .then(() => {
        this.getCarts()
      }).catch((e) => {
          console.log('error', e)
        })
    },

    //刪除所有購物車商品
    deleteAllCart() {
      this.$http
        .delete(`${this.VITE_URL}/api/${this.VITE_NAME}/carts`)
        .then((res) => {
          this.getCarts()
          alert(res.data.message)
        })
        .catch((e) => {
          console.log('error', e)
        })
    },
    clickPrev() {
      this.$router.push(`/products`)
    },

    clickNext() {
      this.$emit('step', 2)
    }
  }
}
</script>
<style  lang="scss">
@import '../../assets/reset.scss';

#StepFirst {
  h3 {
    font-size: 24px;
    font-weight: 500;
    text-align: center;
  }
  .table-cart {
    padding: 20px;
    @media screen and (max-width: 768px) {
      overflow-x: auto;
    }
  }
  table {
    font-size: 20px;

    th {
      font-size: 20px;
      padding: 14px 14px;
    }

    th:nth-child(1) {
      width: 10%;
    }
    th:nth-child(2) {
      width: 40%;
    }
    th:nth-child(3) {
      width: 20%;
    }
    td:nth-child(3) {
      input {
        border-top: 1px solid blue;
        border-bottom: 1px solid blue;
        text-align: center;
        padding-left: 8px;
        padding-right: 0;
      }
    }
    th:nth-child(4),
    th:nth-child(5) {
      width: 15%;
    }

    tr {
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
      text-align: center;
      vertical-align: middle;
      padding: 10px;
    }
    td {
      padding: 14px 14px;
    }

    @media screen and (max-width: 768px) {
      min-width: 740px;
    }
    button {
      span {
        padding-right: 4px;
        padding-left: 4px;
      }
    }
  }
}
</style>

