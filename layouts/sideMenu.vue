<template>
  <div id="side">
    <s-side-menu></s-side-menu>
    <div class="container">
      <h1>{{ $route.name !== 'docs' ? $route.path.split('/')[2] : 'document' }}</h1>
      <nuxt>
        <s-spinner/>
      </nuxt>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import SSpinner from '~/components/_atoms/SSpinner.vue';
import SSideMenu from '~/components/_molecules/SSideMenu.vue';

export default defineComponent({
  components: {
    SSpinner,
    SSideMenu,
  },
})
</script>
<style lang="scss">
#side {
  display: grid;
  grid-template-columns: 200px auto;

  .side-menu-wrap {
    border-right: 1px solid $Gray30;
    position: sticky;
    top: 0;
    left: 0;
    padding: 20px;
    height: 100vh;
    box-sizing: border-box;
  }

  .container {
    padding: 20px;

    h1 {
      margin-bottom: 20px;
      text-transform: capitalize;
    }

    p {
      margin-bottom: 10px;
      line-height: 1.3em;
    }

    h2 {
      margin: 50px 0 20px;
    }
  }
}
</style>
