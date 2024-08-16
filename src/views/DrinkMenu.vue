<script setup>
import { defineProps } from 'vue'
const props = defineProps(['name', 'price', 'description'])
import { defineEmits } from 'vue'
const emits = defineEmits(['add-to-cart'])
</script>

<template>
  <a href="#" @click.prevent="emits('add-to-cart')" class="list-group-item list-group-item-action"
    ><div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{{ name }}</h5>
      <small>${{ price }}</small>
    </div>
    <p class="mb-1">{{ description }}</p></a
  >
</template>
<style scoped></style>
