<template>
    <input type="text" :value="modelValue" @input="onInput" :placeholder="placeholder" />
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

</style>