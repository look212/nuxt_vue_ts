<template>
  <div :class="['go-top-btn-wrap',
  {'is-show': isStartScroll}]"
       :style="`bottom: ${footerHeight}px`">
    <s-button :is-icon="true" icon-type="image" @click="scrollToTop"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from '@nuxtjs/composition-api';
import SButton from '~/components/_atoms/SButton.vue';

/**
 * @param {number} footerHeight - 버튼 위치 지정. default: 158(SFooter: 61px, 페이지 내 하단 버튼: 81px, padding: 16px)
 *
 */

export default defineComponent({
  name: 'SGoTop',
  components: {
    SButton,
  },
  props: {
    footerHeight: {
      type: Number,
      default: 158  // SFooter: 61px, 페이지 내 하단 버튼: 81px, padding: 16px
    },
    isModal: {
      type: Boolean,
      default: false,
    }
  },
  setup(props, { parent, emit }) {
    const isStartScroll = ref<boolean>(false);
    const modal: any = ref();

    const methods = {
      scrollToTop() {
        if (props.isModal) {
          modal.value.scroll(0, 0);
        } else {
          window.scroll(0, 0);
        }
      },
      handleScroll() {
        isStartScroll.value = 10 < (props.isModal ? modal.value.scrollTop : document.documentElement.scrollTop);
        emit('isStartScroll', isStartScroll);
      },
    }

    onMounted(() => {
      modal.value = parent?.$el.parentElement;
      if (props.isModal) {
        modal.value.addEventListener('scroll', methods.handleScroll);
      } else {
        window.addEventListener('scroll', methods.handleScroll);
      }
    });

    onUnmounted(() => {
      if (props.isModal) {
        modal.value.removeEventListener('scroll', methods.handleScroll);
      } else {
        window.removeEventListener('scroll', methods.handleScroll);
      }
    })

    return {
      isStartScroll,
      modal,
      ...methods
    }
  }
})
</script>

<style lang="scss" scoped>
.go-top-btn-wrap {
  position: fixed;
  right: 16px;
  display: none;
  z-index: 20;

  &.is-show {
    display: inline-block;
  }

  /deep/ .button__wrap .button__icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid $Gray30;
    background: $ic-20-common-arrow-top center / 20px no-repeat $Gray00;
  }
}
</style>
