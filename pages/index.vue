<template>
  <div>
    <SimpleHeader/>
  </div>
</template>

<script lang="ts">
import {
  defineComponent
} from '@nuxtjs/composition-api';
import SimpleHeader from '~/components/SimpleHeader.vue';

export default defineComponent({
  name: 'Main',
  components: {SimpleHeader},

})
</script>
