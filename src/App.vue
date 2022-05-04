<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import HeaderData from '@/components/HeaderData.vue'
</script>

<template>
  <header>
    <Navbar/>
    <HeaderData/>
  </header>

  <RouterView />
</template>

<style lang="scss">
@import "./assets/var.scss";
@import "./assets/mixin.scss";

* {
  color: $primary_color !important;
  font-size: $font_size_typo;

  @media(min-width: $desktop_breakpoint) {
    font-size: $font_size_typo*1.4;
  }
}
html, body {
  overflow-x: hidden;
}
body {
  background-color: $secondary_color !important;
}
img {
  @include CryptoIconSize();
}

@include FilterStyle();

@include TableStyle();

@include PercentClassStyle();

.symbol {
  margin-left: $rem_pos*1.1;
}
</style>
