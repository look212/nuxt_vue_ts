<template>
  <div>
    <div>login</div>
    <a href="/admin">Go admin</a>
  </div>
</template>

<script lang="ts">
import {
  defineComponent
} from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'Login',
  layout: 'empty',
})
</script>
