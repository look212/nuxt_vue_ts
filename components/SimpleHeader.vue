<template>
  <header>
    <b-link to="about">About</b-link>
    <b-link to="work">Work</b-link>
    <b-link to="history">History</b-link>
  </header>
</template>

<script>
import {defineComponent} from '@nuxtjs/composition-api';

export default defineComponent({
  name: "SimpleHeader",
});
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: flex-end;
  padding: 20px;

  a {
    font-family: #{$antonFont};
    font-size: 2em;

    & + a {
      padding-left: 20px;
    }
  }
}
</style>
