<script setup>
import { ref } from 'vue'
import DrinkMenu from './DrinkMenu.vue'
import OrderCartSum from './OrderCartSum.vue'
import OrderCartDetail from './OrderCartDetail.vue'
import ConfirmedOrder from './ConfirmedOrder.vue'
const drinkMenu = ref([
  { id: 1, name: '珍珠奶茶', description: '香濃奶茶搭配QQ珍珠', price: 50 },
  { id: 2, name: '冬瓜檸檬', description: '清新冬瓜配上新鮮檸檬', price: 45 },
  { id: 3, name: '翡翠檸檬', description: '綠茶與檸檬的完美結合', price: 55 },
  { id: 4, name: '四季春茶', description: '香醇四季春茶，回甘無比', price: 45 },
  { id: 5, name: '阿薩姆奶茶', description: '阿薩姆紅茶搭配香醇鮮奶', price: 50 },
  { id: 6, name: '檸檬冰茶', description: '檸檬與冰茶的清新組合', price: 45 },
  { id: 7, name: '芒果綠茶', description: '芒果與綠茶的獨特風味', price: 55 },
  { id: 8, name: '抹茶拿鐵', description: '抹茶與鮮奶的絕配', price: 60 }
])
const orderCart = ref([])
const confirmedOrder = ref([])

const addToCart = (drink) => {
  orderCart.value.push(drink)
}
</script>
<template>
  <div id="root">
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-4">
          <div class="list-group">
            <DrinkMenu
              v-for="drink in drinkMenu"
              :key="drink.id"
              :name="drink.name"
              :price="drink.price"
              :description="drink.description"
              @add-to-cart="addToCart(drink)"
            />
          </div>
        </div>
        <div class="col-md-8">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" width="50">操作</th>
                <th scope="col">品項</th>
                <th scope="col">描述</th>
                <th scope="col" width="90">數量</th>
                <th scope="col">單價</th>
                <th scope="col">小計</th>
              </tr>
            </thead>
            <tbody>
              <OrderCartDetail
                v-for="order in orderCart"
                :key="order.id"
                :name="order.name"
                :description="order.description"
                :price="order.price"
              />

              <tr v-if="orderCart.length === 0">
                <td colspan="6">
                  <div style="width: 100%; text-align: center">請選擇商品</div>
                </td>
              </tr>
            </tbody>
          </table>
          <OrderCartSum v-if="orderCart.length !== 0" />
        </div>
      </div>
      <hr />
      <div class="row justify-content-center">
        <div class="col-8">
          <div v-if="confirmedOrder.length !== 0" class="card">
            <div class="card-body">
              <div class="card-title">
                <h5>訂單</h5>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">品項</th>
                      <th scope="col">數量</th>
                      <th scope="col">小計</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ConfirmedOrder />
                  </tbody>
                </table>
                <div class="text-end">備註: <span>都不要香菜</span></div>
                <div class="text-end">
                  <h5>總計: <span>$145</span></h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
