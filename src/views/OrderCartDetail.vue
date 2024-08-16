<script setup>
import { defineProps } from 'vue'
const props = defineProps(['name', 'description', 'price'])
</script>

<template>
  <tr>
    <td><button type="button" class="btn btn-sm">x</button></td>
    <td>{{ props.name }}</td>
    <td>
      <small>{{ props.description }}</small>
    </td>
    <td>
      <select class="form-select">
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
    <td>45</td>
    <td>{{ props.price }}</td>
  </tr>
</template>
<style scoped></style>
