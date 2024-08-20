<script setup>
import { defineProps, ref, defineEmits, watch, onMounted } from 'vue'
const props = defineProps(['id', 'name', 'description', 'price'])
const count = ref(1)
const amount = ref(0)
const emit = defineEmits(['change-count'])
const changeCount = () => {
  amount.value = props.price * count.value
}
watch(amount, (newAmount) => {
  emit('change-count', props.id, count.value, amount.value)
})
onMounted(() => {
  amount.value = props.price * 1
})
</script>

<template>
  <tr>
    <td><button type="button" class="btn btn-sm">x</button></td>
    <td>{{ props.name }}</td>
    <td>
      <small>{{ props.description }}</small>
    </td>
    <td>
      <select class="form-select" v-model="count" @change="changeCount">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </td>
    <td>{{ props.price }}</td>
    <td>{{ amount }}</td>
  </tr>
</template>
<style scoped></style>
