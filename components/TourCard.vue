<template>
    <div class="tour-card">
      <img :src="tour.main_photo.big" alt="Tour Image" class="tour-image" />
      <p class="tour-rating">
         {{ tour.customers_review_rating }}
         <span class="tour-rating-count">({{tour.reviews}})</span>
      </p>
      <h2 class="tour-title">{{ tour.title }}</h2>
      <p class="tour-price">от {{ tour.netto_price }}</p>
      <p class="tour-type">за {{activity_type_str_rus}}</p>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { defineProps } from 'vue';
import { ActivityTypes } from '~/types/product';
  
  const props = defineProps<{
    tour: {
        id: number;
        title: string;
        activity_type: ActivityTypes;
        reviews: number;
        main_photo: {
          big: string;
        };
        customers_review_rating: number;
        netto_price: string;
    };
  }>();
  
  const activity_type_str_rus = ActivityTypes[props.tour.activity_type];

  </script>
  
  <style lang="scss" scoped>

  $primary-black: #23262F;
  $light-gray: #999999;
  $dark-gray: #444444;

  .tour-card {
    border-radius: 5px;
    max-width: 100%;
    text-align: left;
  }
  
  .tour-image {
    width: 100%;
    height: auto;
    border-radius: 5px;
    padding-bottom: 10px;
  }
  
  .tour-price, .tour-rating, .tour-type, .tour-title {
    margin: 0;
  }

  .tour-rating {
    color: $dark-gray;
    padding-left: 8px;
    font-size: 0.875rem;
    line-height: 1.375rem;
  }

  .tour-title {
    color: $primary-black;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.5rem;
    padding-bottom: 10px;
  }

  .tour-price {
    color: $dark-gray;
    font-size: 1.375rem;
    font-weight: 700;
    line-height: 2rem;
  }

  .tour-type, .tour-rating-count{
    color: $light-gray;
    font-size: 0.75rem;
    line-height: 1.375rem;
  }
  
  .tour-rating::before{
    content: url(/public/star.svg);
    position: relative;
    right: 6px;
    top: 2px;
  }
  </style>