<script setup>
import { defineProps, ref, defineEmits } from 'vue'
const props = defineProps(['cartSum'])
const remark = ref('')
const emit = defineEmits(['send-order'])
const sendOrder = () => {
  emit('send-order', remark.value)
}
</script>
<template>
  <div class="text-end mb-3">
    <h5>
      總計: <span>{{ props.cartSum }}</span>
    </h5>
  </div>
  <textarea class="form-control mb-3" rows="3" placeholder="備註" v-model="remark"></textarea>
  <div class="text-end">
    <button class="btn btn-primary" type="button" @click="sendOrder">送出</button>
  </div>
</template>
<style scoped></style>
