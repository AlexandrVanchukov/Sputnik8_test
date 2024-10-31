<template>
    <select v-model="selected" @change="onChange" :disabled="disabled">
      <option disabled value="">Выберите город</option>
      <option v-for="city in options" :key="city.id" :value="city.name">{{ city.name }}</option>
    </select>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, defineEmits, ref, watch } from 'vue';
  import type { City } from '~/types/city';
  
  const props = defineProps<{
    options: City[];
    modelValue: string;
    disabled: boolean;
  }>();

  console.log(props.options);
  
  const emit = defineEmits(['update:modelValue']);
  const selected = ref(props.modelValue);
  
  function onChange() {
    emit('update:modelValue', selected.value);
  }
  
  watch(() => props.modelValue, (newValue) => {
    selected.value = newValue;
  });
  </script>

<style lang="scss" scoped>



</style>