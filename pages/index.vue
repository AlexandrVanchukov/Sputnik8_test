<template>
    <app-layout>
      <Title/>
      
      <select v-model="selectedCity" @change="fetchTours" :disabled="loadingCities">
        <option disabled value="">Выберите город</option>
        <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
      </select>
      
      
      <input type="text" v-model="searchQuery" placeholder="Поиск экскурсии" />
      
      
      <ul>
        <li v-for="tour in filteredTours" :key="tour.id">{{ tour.title }}</li>
      </ul>

      <a href='/api/cities'>
        To endpoint
      </a>
    </app-layout>
</template>

<script lang="ts" setup>
import AppLayout from '~/layouts/AppLayout.vue';
import Title from '~/components/Title.vue';
import { ref, computed, onMounted } from 'vue';
import type { City } from '~/types/city';
import { ActivityTypes, type Product } from '~/types/product';

// Состояние и переменные
const cities = ref<City[]>([]);
const tours = ref<Product[]>([]);
const selectedCity = ref<string>('');
const searchQuery = ref<string>('');
const loadingCities = ref<boolean>(false);

// Фильтр экскурсий по запросу
const filteredTours = computed(() => {
  return tours.value.filter(tour =>
    tour.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Загрузка городов
async function fetchCities() {
  loadingCities.value = true;
  try {
    const { data: cities } = await useFetch('/api/cities?api_key=873fa71c061b0c36d9ad7e47ec3635d9&username=frontend@sputnik8.com', {server: false});

    cities.value = [
        {
            "id" : 1,
            "country_id" : 1,
            "name" : "Санкт-Петербург",
            "region_id" : 1
        },
        {
            "id" : 2,
            "country_id" : 1,
            "name" : "Москва",
            "region_id" : 2
        },
        {
            "id" : 3,
            "country_id" : 2,
            "name" : "Киев",
            "region_id" : 3
        }
    ];
  } catch (error) {
    console.error('Ошибка при загрузке городов:', error);
  } finally {
    loadingCities.value = false;
  }
}

// Загрузка экскурсий по выбранному городу
async function fetchTours() {
  if (selectedCity.value) {
    try {
        const { data: tours } = await useFetch(`/api/products?city_slug=${selectedCity.value}&api_key=873fa71c061b0c36d9ad7e47ec3635d9&username=frontend@sputnik8.com`, {server: false});
      tours.value = [
            {
                "id" : 1,
                "title" : "Экскурсия",
                "activity_type" : ActivityTypes.tour,
                "main_photo" : "https://7d9e88a8-f178-4098-bea5-48d960920605.selcdn.net/21472675-1a5d-4742-bebc-1ec487128b62/-/scale_crop/150x100/center/-/quality/best/",
                "customers_review_rating" : 4.7,
                "netto_price" : "828.00 ₽",
            },
            {
                "id" : 2,
                "title" : "Билеты",
                "activity_type" : ActivityTypes.entry_ticket,
                "main_photo" : "https://7d9e88a8-f178-4098-bea5-48d960920605.selcdn.net/21472675-1a5d-4742-bebc-1ec487128b62/-/scale_crop/150x100/center/-/quality/best/",
                "customers_review_rating" : 5.0,
                "netto_price" : "10000.00 ₽",
            },
            {
                "id" : 3,
                "title" : "Трансфер",
                "activity_type" : ActivityTypes.transfer,
                "main_photo" : "https://7d9e88a8-f178-4098-bea5-48d960920605.selcdn.net/21472675-1a5d-4742-bebc-1ec487128b62/-/scale_crop/150x100/center/-/quality/best/",
                "customers_review_rating" : 4.7,
                "netto_price" : "300.00 ₽",
            },
        ];
    } catch (error) {
      console.error('Ошибка при загрузке экскурсий:', error);
    }
  }
}

onMounted(fetchCities);
</script>

<style lang="scss">

</style>