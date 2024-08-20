<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  confirmedOrder: {
    type: Array,
    required: true
  }
})
</script>
<template>
  <tbody>
    <tr v-for="order in confirmedOrder" :key="order.id">
      <td>{{ order.name }}</td>
      <td>{{ order.count }}</td>
      <td>{{ order.amount }}</td>
    </tr>
  </tbody>
</template>
<style scoped></style>
