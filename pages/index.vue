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
      <div class="tours-container">
        <div v-if="filteredTours.length === 0 && selectedCity && !loadingTours" class="no-tours">
          <p class='no-tours-text'>Поиск не дал результатов</p>
          <button @click="resetFilters" class='no-tours-button'>Сбросить фильтры</button>
        </div>
        <div v-else class="tour-grid">
          <TourCard v-for="tour in filteredTours" :key="tour.id" :tour="tour" />
        </div>
      </div>
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
const loadingTours = ref<boolean>(false);

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
    loadingTours.value = true;
    try {
      const response = await fetch(`/api/products?city_id=${selectedCity.value}&api_key=873fa71c061b0c36d9ad7e47ec3635d9&username=frontend@sputnik8.com`);
      const data = await response.json();
      tours.value = data;
      console.log(selectedCity.value);
    } catch (error) {
      console.error('Ошибка при загрузке экскурсий:', error);
    }
    finally{
      loadingTours.value = false;
    }
  }
}

// Функция для сброса фильтров
function resetFilters() {
  searchQuery.value = '';
  selectedCity.value = 0;
  tours.value = [];
}

onMounted(fetchCities);
</script>

<style lang="scss" scoped>

    .no-tours {
        width:50%;
        padding-top: 5.625rem;
        margin: auto;
    }

    .no-tours-text{
      text-align: center;
      font-family: "PT Sans Caption", sans-serif;
      font-size: 1.5rem;
      line-height: 2.125rem;
      color: #000;
    }

    .no-tours-button{
      display: block;
      color: #FFF;
      background: #00A7FF;
      font-size: 0.875rem;
      line-height: 2.5rem;
      padding: 0rem 2.125rem;
      border-radius: 3px;
      border: 0;
      margin: auto;
    }

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