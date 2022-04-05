<template>
  <div class="side-menu-wrap">
    <ul>
      <li v-for="menu in menus"><a :href="`docs/${menu.link}`">{{ menu.label }}</a></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api';
export default defineComponent({
  name: 'SSideMenu',
  setup() {
    const data = reactive({
      menus: [
        { label: 'document', link: '' },
        { label: 'button', link: 'button' }
      ]
    })

    return {
      ...toRefs(data),
    }
  }
})
</script>

<style lang="scss" scoped>
.side-menu-wrap li {
  text-transform: capitalize;
  & + li {
    padding-top: 10px;
  }

  a:hover {

  }
}
</style>
