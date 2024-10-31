<template>
  <div class="dropdown-container" @click="toggleDropdown">
    <div :class="['selected-option', { 'open': isOpen }]">{{ selectedOption || 'Выбрать город' }}</div>

    <ul class="options" v-show="isOpen">
      <li
        v-for="option in options"
        :key="option.id"
        class="option"
        @click.stop="selectOption(option)"
      >
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { defineProps, defineEmits } from 'vue';
import type { City } from '~/types/city';

const props = defineProps<{
  options: City[];
  modelValue: string;
}>();

const emits = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const selectedOption = computed(() => {
  const selected = props.options.find(option => option.name === props.modelValue);
  return selected ? selected.name : '';
});


function toggleDropdown() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    document.addEventListener('click', handleClickOutside);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
}

function selectOption(option: City) {
  closeDropdown();
  emits("update:modelValue", option.name);
}

function handleClickOutside(event: MouseEvent) {
  const dropdown = document.querySelector('.dropdown-container');
  if (dropdown && !dropdown.contains(event.target as Node)) {
    closeDropdown();
  }
}

function closeDropdown() {
  isOpen.value = false;
  document.removeEventListener('click', handleClickOutside);
}

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style lang='scss' scoped>
.dropdown-container {
  display: block;
  position: relative;
  width: 300px;
  cursor: pointer;
  user-select: none;
}

.selected-option {
  padding: 15px 14.5px;
  font-size: 1rem;
  color: #999999;
  background-color: #fff;
  border: 1px solid #00000015;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.selected-option.open {
  border-color: #ffdd00; /* Цвет выделения */
}

.selected-option::after {
  content: url(/public/Arrow_Down.svg);
  font-size: 0.8rem;
  position: absolute;
  right: 15px;
  top: 60%;
  transform: translateY(-60%);
  transition: transform 0.3s;
}

.selected-option.open::after {
  transform: translateY(-75%) rotate(180deg);
  border-color: #ffdd00; /* Цвет выделения */
  box-shadow: 0 4px 12px rgba(195, 255, 0, 0.2);
}

.options {
  position: absolute;
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 5px 0 0;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
}

.option {
  padding: 15px 14.5px;
  font-size: 1rem;
  color: #444444;
  background-color: #fff;
  border-top: 1px solid #00000015;
}

.option:first-of-type{
  border:0;
}

.option:hover {
  background-color: #f0f8ff;
}
</style>