<script setup>
import Products from './components/Products.vue';
</script>

<template>

  <header class="headerr">
    <h1>Vue Cart</h1>
  </header>
  <main>
    <div>
      <Products />
    </div>
  </main>

  <footer class="footerr">
  </footer>

</template>

<style scoped>

  .headerr h1{
    margin: 20px 0;
    font-size: 40px;
    text-align: center;
  }

  .footerr{
    max-width: 1200px;
    width: 100%;
  }

  .logo {
    display: block;
    margin: 0 auto 2rem;
  }

  @media (max-width: 768px) {
    header {
      display: flex;
      place-items: center;
      padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
      margin: 0 2rem 0 0;
    }

    header .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }
  }
</style>
