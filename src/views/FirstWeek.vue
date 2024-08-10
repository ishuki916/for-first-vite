<script setup>
import { ref, onMounted } from 'vue'
const drinkArr = ref([
  {
    id: 1,
    name: '珍珠奶茶',
    description: '香濃奶茶搭配QQ珍珠',
    price: 50,
    amount: 20
  },
  {
    id: 2,
    name: '冬瓜檸檬',
    description: '清新冬瓜配上新鮮檸檬',
    price: 45,
    amount: 18
  },
  {
    id: 3,
    name: '翡翠檸檬',
    description: '綠茶與檸檬的完美結合',
    price: 55,
    amount: 34
  },
  {
    id: 4,
    name: '四季春茶',
    description: '香醇四季春茶，回甘無比',
    price: 45,
    amount: 10
  },
  {
    id: 5,
    name: '阿薩姆奶茶',
    description: '阿薩姆紅茶搭配香醇鮮奶',
    price: 50,
    amount: 25
  },
  {
    id: 6,
    name: '檸檬冰茶',
    description: '檸檬與冰茶的清新組合',
    price: 45,
    amount: 20
  },
  {
    id: 7,
    name: '芒果綠茶',
    description: '芒果與綠茶的獨特風味',
    price: 55,
    amount: 18
  },
  {
    id: 8,
    name: '抹茶拿鐵',
    description: '抹茶與鮮奶的絕配',
    price: 60,
    amount: 20
  }
])

const addAmount = (index) => {
  drinkArr.value[index].amount++
}

const minusAmount = (index) => {
  // const index = drinkArr.value.findIndex((obj) => obj.id === id)
  if (drinkArr.value[index].amount !== 0) {
    drinkArr.value[index].amount--
  }
}

const showModal = ref(false)
const tempDrink = ref({
  index: null,
  id: null,
  name: '',
  description: '',
  price: null,
  amount: null
})

const editModal = (item, index) => {
  showModal.value = true
  tempDrink.value.index = index
  tempDrink.value.id = item.id
  tempDrink.value.name = item.name
  tempDrink.value.description = item.description
  tempDrink.value.price = item.price
  tempDrink.value.amount = item.amount
}

const confirmEdit = () => {
  drinkArr.value[tempDrink.value.index].name = tempDrink.value.name
  drinkArr.value[tempDrink.value.index].description = tempDrink.value.description
  drinkArr.value[tempDrink.value.index].price = tempDrink.value.price
  showModal.value = false
}
</script>

<template>
 
    <table class="table">
      <thead>
        <tr>
          <th scope="col">品項</th>
          <th scope="col">描述</th>
          <th scope="col">價格</th>
          <th scope="col">庫存</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody v-for="(item, index) in drinkArr" :key="item.id">
        <tr>
          <td>{{ item.name }}</td>
          <td>
            <small>{{ item.description }}</small>
          </td>
          <td>{{ item.price }}</td>
          <td>
            <button type="button" class="btn btn-outline-info" @click="minusAmount(index)">
              -
            </button>
            {{ item.amount }}
            <button type="button" class="btn btn-outline-info" @click="addAmount(index)">+</button>
          </td>
          <td>
            <button type="button" class="btn btn-primary" @click="editModal(item, index)">
              編輯
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="showModal"
      class="modal fade show d-block"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">編輯</h5>
            <button
              type="button"
              class="btn-close"
              @click="showModal = false"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="col-sm-2 col-form-label">品項：</label>
              <input type="text" v-model="tempDrink.name" />
            </div>
            <div class="mb-3">
              <label class="col-sm-2 col-form-label">描述：</label>
              <input type="text" v-model="tempDrink.description" />
            </div>
            <div class="mb-3">
              <label class="col-sm-2 col-form-label">價格：</label>
              <input type="text" v-model="tempDrink.price" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showModal = false">關閉</button>
            <button type="button" class="btn btn-primary" @click="confirmEdit">確定</button>
          </div>
        </div>
      </div>
    </div>

</template>

<style>
.modal.fade.show.d-block {
  display: block;
}
</style>
