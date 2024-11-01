<template>
    <div class="app_layout">
      <app-layout-header />
      <main>
        <slot />
      </main>
      <footer>
        <p>created by Vanchukov Alexandr</p>
      </footer>
    </div>
  </template>
  
  <script setup>
  import AppLayoutHeader from "./AppLayoutHeader.vue";
  </script>
  
  <style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=PT+Sans+Caption:wght@400;700&display=swap');
    *{
        font-family: "PT Sans Caption", sans-serif;
    }
    main{
        max-width: 70%;
        margin: auto;
    }
    footer{
      position: relative;
      top: 10px;
        p {
          display: block;
          text-align: center;
        }
    }
  </style>