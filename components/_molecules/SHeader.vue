<template>
  <header>
    <a href="/about">About</a>
    <a href="/work">Work</a>
    <a href="/history">History</a>
  </header>
</template>

<script>
import {defineComponent} from '@nuxtjs/composition-api';

export default defineComponent({
  name: "SHeader",
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
