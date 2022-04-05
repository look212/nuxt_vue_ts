<template>
  <div>
    Main Page
  </div>
</template>

<script lang="ts">
import {
  defineComponent
} from '@nuxtjs/composition-api';
import SButton from '~/components/_atoms/SButton.vue';

export default defineComponent({
  name: 'Main',
  layout: 'empty',
  components: {
    SButton,
  }
})
</script>
