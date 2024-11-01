<template>
  <div class="input-container">
    <input type="text" :value="modelValue" @input="onInput" :placeholder="placeholder" class="input" />
    <span class="clear-icon" v-if="modelValue" @click="clearInput">✖</span>
  </div>
</template>
  
<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const searchQuery = ref('');
const props = defineProps<{
  modelValue: string;
  placeholder: string;
}>();

const emit = defineEmits(['update:modelValue']);

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  searchQuery.value = target.value;
  emit('update:modelValue', target.value);
}

function clearInput() {
  searchQuery.value = '';
  emit("update:modelValue", searchQuery.value);
}
</script>

<style lang="scss" scoped>
.input-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 300px;
}

.input {
  font-family: "PT Sans Caption", sans-serif;
  display: block;
  width: 269px;
  padding: 15px 14.5px;
  font-size: 1rem;
  border: 1px solid #00000015;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
  color: #aaa;
}

.input:focus {
  border-color: #ffdd00; /* Цвет выделения */
  box-shadow: 0 4px 12px rgba(255, 247, 0, 0.2);
  color: #444444
}

.input::placeholder {
  color: #aaa;
  font-family: "PT Sans Caption", sans-serif;
}

.clear-icon {
  position: absolute;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #ddd;
  cursor: pointer;
  outline: none;
  padding: 0;
}

.clear-icon:hover {
  color: #ff0000; /* Цвет крестика при наведении */
}
</style>