<template>
    <app-layout>
      <Title/>
      
      <div class='search-bar'>
        <DropDownList
        :options="cities"
        v-model="selectedCity"
        :disabled="loadingCities"
        @update:modelValue="fetchTours"
        />

        <Input v-model="searchQuery" placeholder="Поиск экскурсии" />
      </div>
       
      <div class="tour-grid">
        <TourCard v-for="tour in filteredTours" :key="tour.id" :tour="tour" />
      </div>

      <a href='/api/cities?api_key=873fa71c061b0c36d9ad7e47ec3635d9&username=frontend@sputnik8.com'>
        To endpoint
      </a>
    </app-layout>
</template>

<script lang="ts" setup>
import AppLayout from '~/layouts/AppLayout.vue';
import Title from '~/components/Title.vue';
import DropDownList from '~/components/DropDownList.vue';
import { ref, computed, onMounted } from 'vue';
import type { City } from '~/types/city';
import { ActivityTypes, type Product } from '~/types/product';
import Input from '~/components/Input.vue';

const cities = ref<City[]>([]);
const tours = ref<Product[]>([]);
const selectedCity = ref<number>(0);
const searchQuery = ref<string>('');
const loadingCities = ref<boolean>(false);

const filteredTours = computed(() => {
  return tours.value.filter(tour =>
    tour.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

async function fetchCities() {
  loadingCities.value = true;
  try {
    const response = await fetch('/api/cities?api_key=873fa71c061b0c36d9ad7e47ec3635d9&username=frontend@sputnik8.com');
    const data = await response.json();
    cities.value = data;
  } catch (error) {
    console.error('Ошибка при загрузке городов:', error);
  } finally {
    loadingCities.value = false;
  }
}

// Загрузка экскурсий по выбранному городу
async function fetchTours() {
console.log(selectedCity.value);
  if (selectedCity.value) {
    try {
      const response = await fetch(`/api/products?city_id=${selectedCity.value}&api_key=873fa71c061b0c36d9ad7e47ec3635d9&username=frontend@sputnik8.com`);
      const data = await response.json();
      tours.value = data;
      console.log(selectedCity.value);
    } catch (error) {
      console.error('Ошибка при загрузке экскурсий:', error);
    }
  }
}

onMounted(fetchCities);
</script>

<style lang="scss" scoped>
    .tour-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(350px, 100%), 1fr));
        gap: 16px;
        justify-content: center;
        padding-top: 5.625rem;
        max-width: max(1400px, 70%);
        margin: auto;
    }

    .search-bar {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
        gap: 16px;
        justify-content: center;
        justify-items: center;
        padding-top: 3.125rem;
        margin: auto;
        max-width: min(900px, 70%);
    }
</style>