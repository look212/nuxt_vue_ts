<template>
  <div>
    <h1>Login</h1>
    <b-link to="admin">Go admin!!</b-link>
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
