<template>
  <div
    class="modal fade modal-lg"
    id="openModal"
    tabindex="-1"
    aria-labelledby="openModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fs-2" id="openModalLabel">{{ tempProduct.title }}</h5>
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
              <div class="mb-2">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label fs-5">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                  />
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl" alt="" />
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label fs-5">產品名稱</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入品名"
                  v-model="tempProduct.title"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-4">
                  <p class="mb-2 fs-5">分類</p>
                  <select class="form-select" aria-label="Select category" v-model="selected">
                    <option value="1">飲品</option>
                    <option value="2">食材</option>
                  </select>
                </div>

                <div class="mb-3 col-md-4">
                  <p class="mb-2 fs-5">次分類</p>
                  <select
                    class="form-select"
                    aria-label="Select sub-categoty"
                    v-model="selectedItem"
                  >
                    <option
                      :value="item.value"
                      v-for="(item, index) in filterOption"
                      :key="`${'option' + index}`"
                    >
                      {{ item.text }}
                    </option>
                  </select>
                </div>

                <div class="mb-3 col-md-4">
                  <p class="mb-2 fs-5">單位</p>
                  <select class="form-select" aria-label="Select unit" v-model="selectedUnit">
                    <option
                      :value="item.value"
                      v-for="(item, index) in filterUnitOption"
                      :key="`${'unit' + index}`"
                    >
                      {{ item.text }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price " class="form-label fs-5">原價</label>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                    v-model.number="tempProduct.origin_price"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price " class="form-label fs-5">售價</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model.number="tempProduct.price"
                  />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="tag" class="form-label fs-5">標籤</label>
                  <input
                    id="tag"
                    type="text"
                    class="form-control"
                    placeholder="請輸入標籤"
                    v-model="tag"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="sell" class="form-label fs-5">銷售量</label>
                  <input
                    id="sell"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model.number="sell"
                  />
                </div>
              </div>
            </div>

            <div class="mb-5 mt-5">
              <h6 class="mb-4 fs-4">產品描述</h6>
              <div v-for="(item, index) in des" :key="`des-${index}`" class="row mb-2">
                <div class="col-11">
                  <input
                    id="des"
                    type="text"
                    class="form-control"
                    placeholder="請輸入描述"
                    v-model="item.value"
                  />
                </div>

                <div class="col-1">
                  <button
                    type="button"
                    class="btn btn-danger text-end"
                    @click="remove('des', index)"
                  >
                    -
                  </button>
                </div>
              </div>
              <div>
                <button type="button" class="btn btn-outline-primary w-100 fs-5" @click="addDes">
                  +
                </button>
              </div>
            </div>

            <div v-if="selected == 1">
              <div class="row mb-2">
                <h6 class="fs-4 mb-3">內容</h6>
                <div class="col-1 fs-5"></div>
                <div class="col-3 fs-5">成分</div>
                <div class="col-3 fs-5">分類</div>
                <div class="col-2 fs-5">單位</div>
                <div class="col-2 fs-5">數量</div>
              </div>
              <div class="row mb-2" v-for="(item, index) in contents" :key="`content-${index}`">
                <div class="col-1 fs-5 text-center pt-2">{{ index + 1 }}</div>
                <div class="col-3">
                  <input
                    id="goods"
                    type="text"
                    class="form-control col-2"
                    placeholder="請輸入成分"
                    v-model="item.goods"
                  />
                </div>
                <div class="col-3">
                  <select class="form-select" aria-label="Select sub-categoty" v-model="item.type">
                    <option
                      :value="typeItem.value"
                      v-for="(typeItem, index) in contentTypeOption"
                      :key="`${'contentType' + index}`"
                    >
                      {{ typeItem.text }}
                    </option>
                  </select>
                </div>
                <div class="col-2">
                  <select class="form-select" aria-label="Select unit" v-model="item.unit">
                    <option
                      :value="unitItem.value"
                      v-for="(unitItem, unitIndex) in contentUnitOption"
                      :key="`${'contentUnit' + unitIndex}`"
                    >
                      {{ unitItem.value }}
                    </option>
                  </select>
                </div>
                <div class="col-2">
                  <input
                    id="goods"
                    type="text"
                    class="form-control col-2"
                    placeholder="請輸入數量"
                    v-model="item.count"
                  />
                </div>
                <div class="col-1">
                  <button
                    type="button"
                    class="btn btn-danger text-end"
                    @click="remove('contents', index)"
                  >
                    -
                  </button>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-outline-primary w-100 fs-5 mb-4"
                  @click="addContent"
                >
                  +
                </button>
              </div>
            </div>

            <div class="mb-3 mt-4">
              <h6 class="fs-4 mb-3">是否要上架</h6>
              <div class="form-check">
                <input
                  id="is_enabled"
                  class="form-check-input fs-6"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempProduct.is_enabled"
                />
                <label class="form-check-label fs-4" for="is_enabled">上架</label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="submitProduct">確定</button>
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
    product: {
      type: Object,
      default() {
        return {}
      }
    },
    isCreate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      modal: {},
      VITE_URL: import.meta.env.VITE_URL,
      VITE_NAME: import.meta.env.VITE_NAME,
      tempProduct: {},
      selected: 1,
      selectedItem: this.selected == 1 ? 0 : 2,
      selectedUnit: 1,
      des: [{ value: '' }],
      tag: '',
      sell: 0,
      contents: [{ goods: '', count: 0, unit: '', type: '' }],

      categoryOption: [
        { value: 0, text: '熱門飲品', type: 'drink', typeValue: 1 },
        { value: 1, text: '創意飲品', type: 'drink', typeValue: 1 },
        { value: 2, text: '茶類', type: 'ingredient', typeValue: 2 },
        { value: 3, text: '果汁', type: 'ingredient', typeValue: 2 },
        { value: 4, text: '其他基底', type: 'ingredient', typeValue: 2 },
        { value: 5, text: '口感配料', type: 'ingredient', typeValue: 2 },
        { value: 6, text: '水果類', type: 'ingredient', typeValue: 2 },
        { value: 7, text: '香料與草本', type: 'ingredient', typeValue: 2 },
        { value: 8, text: '其他配料', type: 'ingredient', typeValue: 2 },
        { value: 9, text: '糖類', type: 'ingredient', typeValue: 2 }
      ],

      unitOption: [
        { value: 0, text: '杯', type: 'drink' },
        { value: 1, text: '%', type: 'basic' },
        { value: 2, text: '份', type: 'ingredient' },
        { value: 3, text: '甜度', type: 'sugar' }
      ],

      contentUnitOption: [
        { value: '杯', type: 'drink' },
        { value: '%', type: 'basic' },
        { value: '份', type: 'ingredient' },
        { value: '甜度', type: 'sugar' }
      ]
    }
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal)
  },

  watch: {
    product() {
      this.tempProduct = this.product
      const propSelect = this.categoryOption.find((item) => item.text === this.tempProduct.category)
      if (propSelect) {
        this.selected = propSelect.typeValue
        this.selectedItem = propSelect.value
      } else {
        this.selected = 1
        this.selectedItem = 0
      }
      if (!this.isCreate) {
        let originDes = this.tempProduct.description[0].des
        this.des = originDes.map((item) => ({ value: item }))
        this.tag = this.tempProduct.description[1].tag
        this.sell = this.tempProduct.description[2].sell

        this.contents = this.tempProduct.content
      }
    }
  },

  methods: {
    showModal() {
      this.modal.show()
    },

    hideModal() {
      this.modal.hide()
    },

    addDes() {
      const check = this.des.some((item) => item.value === '')
      if (!check) {
        this.des.push({ value: '' })
      } else {
        Swal.fire({
          title: '還有空的欄位可以填寫，寫完才可以新增喔!!.',
          width: 500,
          padding: '3em',
          color: '#716add'
        })
      }
    },
    addContent() {
      const checkContent = this.contents.some((item) => item.goods === '')
      if (!checkContent) {
        this.contents.push({ goods: '', count: 0, unit: '', type: '' })
        console.log('this.content', this.contents)
      } else {
        Swal.fire({
          title: '還有空的欄位可以填寫，寫完才可以新增喔!!.',
          width: 500,
          padding: '3em',
          color: '#716add'
        })
      }
    },
    remove(item, index) {
      this[item].splice(index, 1)
    },

    submitProduct() {
      const desArray = this.des.map((item) => item.value)
      const datas = {
        ...this.tempProduct,
        category: this.categoryOption[this.selectedItem].text,
        unit: this.unitOption[this.selectedUnit].text,
        content: this.contents,
        description: [{ des: desArray }, { tag: this.tag }, { sell: this.sell }]
      }
      let api = `${this.VITE_URL}/api/${this.VITE_NAME}/admin/product`

      if (this.isCreate) {
        //新增
        this.$http
          .post(api, { data: datas })
          .then((res) => {
            this.$emit('product-change')
            this.resetData()
            this.modal.hide()
            Swal.fire({
              icon: 'success',
              title: '已成功新增'
            })
          })
          .catch((error) => {
            console.log('carate error', error)
          })
      } else {
        //更新
        api = `${this.VITE_URL}/api/${this.VITE_NAME}/admin/product/${this.tempProduct?.id}`
        this.$http
          .put(api, { data: datas })
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
    },

    resetData() {
      this.tempProduct = {}
      this.selected = 1
      this.selectedItem = 0
      this.selectedUnit = 0
      this.tag = ''
      this.sell = 0
      this.des = [{ value: '' }]
      this.contents = [{ goods: '', count: 0, unit: '', type: '' }]
    }
  },
  computed: {
    filterOption() {
      if (this.selected == 1) {
        if (this.selectedItem >= 1) {
          this.selectedItem = 0
        }
        return this.categoryOption.filter((item) => item.type === 'drink')
      } else {
        if (this.selectedItem <= 1) {
          this.selectedItem = 2
        }
        return this.categoryOption.filter((item) => item.type === 'ingredient')
      }
    },

    filterUnitOption() {
      if (this.selectedItem < 2) {
        this.selectedUnit = 0
        return this.unitOption.filter((item) => item.type === 'drink')
      } else if (this.selectedItem >= 2 && this.selectedItem < 5) {
        this.selectedUnit = 1
        return this.unitOption.filter((item) => item.type === 'basic')
      } else if (this.selectedItem >= 5 && this.selectedItem < 9) {
        this.selectedUnit = 2
        return this.unitOption.filter((item) => item.type === 'ingredient')
      } else {
        this.selectedUnit = 3
        return this.unitOption.filter((item) => item.type == 'sugar')
      }
    },
    contentTypeOption() {
      return this.categoryOption.filter((item) => item.type === 'ingredient')
    }
  }
}
</script>

<style lang="scss">
#openModal {
  .btn-danger {
    --bs-btn-color: white;
    --bs-btn-hover-color: white;
    --bs-btn-active-color: white;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  }
}
</style>
