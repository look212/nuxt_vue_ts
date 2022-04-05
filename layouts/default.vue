<template>
  <div id="app">
    <s-header></s-header>
    <div class="container">
      <nuxt>
        <s-spinner/>
      </nuxt>
    </div>
  </div>
</template>

<script lang="ts">
import SSpinner from '~/components/_atoms/SSpinner.vue';
import SHeader from '~/components/_molecules/SHeader.vue';

export default {
  components: {
    SSpinner,
    SHeader,
  }
}
</script>
