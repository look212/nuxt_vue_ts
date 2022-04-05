<template>
  <div :class="['collapse__wrap',
              {'is__open': openCollapse}]">
    <div class="collapse__header" :class="{'use-effect': addEffect }" @click="headerCollapse">
      {{ title }}
    </div>
    <div class="collapse__body" ref="collapseBody">
      <slot :update="openCollapse"/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, toRefs, watch} from "@nuxtjs/composition-api"

/**
 * Collapse
 * @param {boolean} isOpened - false(default)이므로 초기 열린상태로 세팅하려면 true 할당.
 * @param {number} title - 헤더 타이틀
 * @template - 부모 component 에서<template v-slot:body></tempalte>
 */

export default defineComponent({
  name: 'SCollapse',
  props: {
    isOpened: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
    addEffect: {
      type: Boolean,
      default: false,
    }
  },
  setup(props, { emit }) {
    const { isOpened } = toRefs(props);
    let openCollapse = ref<boolean>(false);

    onMounted(() => {
      openCollapse.value = isOpened.value;
    });

    const methods = {
      headerCollapse() {
        openCollapse.value = !openCollapse.value;
        emit('activeCollapse', openCollapse);
      },
    }
    watch(() => props.isOpened, (newValue) => {
      console.log(newValue);
    });

    return {
      openCollapse,
      ...methods,
    }
  }
})
</script>

<style lang="scss" scoped>
.collapse__wrap {
  border-bottom: 10px solid $Gray10;
  background: $Gray00;

  > .collapse__header {
    padding: 0 20px;
    height: 60px;
    line-height: 60px;
    position: relative;

    &::after {
      content: '';
      width: 20px;
      height: 20px;
      position: absolute;
      right: 20px;
      top: 50%;
      margin-top: -10px;
      background: $ic-20-arrow-close right center/20px no-repeat;
      @include transform(rotate(180deg));
    }
  }
  > .use-effect {
    font-weight: bold;
    font-size: 18px;
  }
  > .collapse__body {
    overflow: hidden;
    padding: 0 20px 20px;
    display: none;
  }

  &.is__open {
    > .collapse__header {
      &::after {
        @include transform(rotate(0deg));
      }
    }
    > .collapse__body {
      display: block;
    }
  }
}
</style>
