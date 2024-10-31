<template>
    <input type="text" :value="modelValue" @input="onInput" :placeholder="placeholder" class="input" />
  </template>
  
  <script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps<{
    modelValue: string;
    placeholder: string;
  }>();
  
  const emit = defineEmits(['update:modelValue']);
  
  function onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
  }
  </script>

<style lang="scss" scoped>
.input {
  font-family: "PT Sans Caption", sans-serif;
  display: block;
  width: 269px;
  padding: 15px 14.5px;
  font-size: 1rem;
  border: 1px solid #ddd;
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
</style>