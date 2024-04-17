// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'

export default defineStore ('DIYStore' ,{
  state: ()=>({
    diyProducts:[],
    diyBasic:[],
    diyIngredient:[],
    diySweet:[],

  }),
  
  actions:{
    addToDIY(product){     
      if(product.category ==='茶類' || product.category ==='果汁' || product.category ==='其他基底'){
        this.pushProduct('diyBasic',product)
      }else if(product.category ==='口感配料' || product.category ==='水果類' || product.category ==='香料與草本'|| product.category ==='其他配料'){
        this.pushProduct('diyIngredient',product)
      }else if(product.category ==='糖類'){
        this.pushProduct('diySweet',product)
      }     
   
    },

    pushProduct(name,product){
      const check = this[name].some((item) => item.id === product.id)     
      if(!check) {
        this[name].push(product)
        Swal.fire({        
          icon: 'success',
          title: '已成功加入',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        Swal.fire({                   
          title: '調飲室已經有囉!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }
})
