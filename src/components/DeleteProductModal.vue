<template>
  <div
    id="delProductModal"
    ref="delProductModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <!-- <pre>{{tempProduct}}</pre> -->
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body pt-5 pb-5">
          是否刪除
          <strong class="text-danger">{{ title }}</strong> (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click.prevent="deleProduct(id)">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
import Swal from 'sweetalert2'

export default {
  props: ['deleProduct', 'id' ,'title'],

  data() {
    return {
      deleModal: {},
      VITE_URL: import.meta.env.VITE_URL,
      VITE_NAME: import.meta.env.VITE_NAME
    }
  },
  mounted() {
    this.deleModal = new Modal(this.$refs.delProductModal)
  },

  methods: {
    showModal() {
      this.deleModal.show()
    },

    hideModal() {
      this.deleModal.hide()
    },

    deleProduct() {     
      this.$http
        .delete(`${this.VITE_URL}/api/${this.VITE_NAME}/admin/product/${this.id}`)
        .then((res) => {
          console.log('res',res)
          this.deleModal.hide()         
          this.$emit('delete')
         
          Swal.fire({
            icon: 'success',
            title: '已成功刪除'
          })
        })
        .catch((error) => {
          console.log('error', error)
          Swal.fire({
            icon: 'error',
            title: '無法刪除'
          })
        })
    },

  },
 
 
}
</script>

<style lang="scss" >
    .btn-danger {
        --bs-btn-color: white;
        --bs-btn-hover-color: white;
        --bs-btn-active-color: white;
        --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    }
</style>
