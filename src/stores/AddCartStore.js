// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

export default defineStore ('AddCartStore' ,{
  state: ()=>({   
    VITE_URL: import.meta.env.VITE_URL,
    VITE_NAME: import.meta.env.VITE_NAME,
  }),
  
  actions:{
    addToCart(product_id,qty){     
      const cartData = {
      product_id,
      qty,
    };    
      axios
      .post(`${this.VITE_URL}/api/${this.VITE_NAME}/cart`,{data:cartData})
      .then(() => {    
       Swal.fire({         
          icon: 'success',
          title: '已成功加入購物車',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((error) => {
        console.log('error', error)
      })
  },

    
  }
})
