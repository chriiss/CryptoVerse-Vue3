<script>
import dataNav from "../data.json";
export default {
  data() {
    return {
      getDatas: dataNav.navbarComponent
    }
  }
}
</script>

<template>
     <nav class="d-flex justify-content-center fixed-bottom bg-dark text-center">
      <div v-for="data in getDatas" :key="data.id" >
        <i :class="data.icon"></i>
        <RouterLink active-class="active-link" exact-active-class="exact-active-link" class="nav-link" :to="data.link">{{data.name}}</RouterLink>
      </div>
    </nav>
</template>

<style lang="scss">
@use "../assets/var.scss" as *;

nav {
  padding: $rem_pos*1;
}

.active {
  background: #000000;
}

.exact-active-link {
  background: #000000;
  font-weight: bold;
}

</style>
