<template>
  <transition name="modal-fade">
    <div class="modal modal-overlay" v-show="visible" ref="modal">
      <div class="header-close-btn">
        <div @click="closeModal"></div>
      </div>
      <div :class="['modal-window',
      {'modal-active': visible }]">
        <div class="modal-content">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, watch} from "@nuxtjs/composition-api";
import SButton from "~/components/_atoms/SButton.vue";

/**
 * Drawer
 * @param {boolean} visible - 부모 component에서 true로 변경 시 show
 * @method closeModal - 부모 component에서 close 동작 실행(visible: false 전달)
 * @template - slot 내용 작성
 */

export default defineComponent({
  name: 'SModal',
  components: {SButton},
  props: {
    visible: {
      type: Boolean,
      default: false,
    }
  },

  setup(props, {emit}) {
    let onReady = ref<boolean>(false);
    let bodyEl = ref();
    let modal = ref();
    onMounted(() => {
      onReady.value = props.visible;
      bodyEl.value = document.querySelector<HTMLBodyElement>('body');
    });
    const methods = {
      closeModal(e: Event) {
        emit('close', props.visible);
      },
      handleClick(e: Event) {
        emit('click', e);
      }
    }

    // watch(
    //   () => props.visible,
    //   (value: boolean) => {
    //     const bodyElement = bodyEl.value;
    //     if (value) {
    //       const div = document.createElement('div');
    //       div.appendChild(modal.value);
    //       window.document.body.appendChild(div)
    //       if (bodyElement) {
    //         bodyElement.style.overflow = 'hidden';
    //       }
    //     } else {
    //       if (bodyElement) {
    //         bodyElement.style.removeProperty('overflow');
    //       }
    //     }
    //   },
    // )
    return {
      ...methods,
      onReady,
      bodyEl,
      modal
    }
  }
})
</script>

<style lang="scss" scoped>
.modal {
  &.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $Gray90;
    transition: all 500ms;
    z-index: 23;

    .header-close-btn {
      display: flex;
      justify-content: right;
      padding: 20px;
      position: relative;
      z-index: 23;
      div {
        background: url('/images/icon/dk-ic-30-common-close.svg') center no-repeat rgba(0, 0, 0, 0.3);
        height: 40px;
        width: 40px;
        border-radius: 20px;
      }
    }
    .modal-window {
      width: 100%;
      height: 100%;
      top: 50%;
      left: 50%;
      display: flex;
      @include transform(translate(-50%, -50%));
      .modal-content {
        width: 100%;
      }
    }
  }
}

// animation
.modal-fade-enter-active,
.modal-fade-leave-active {
  @include transition(all 0.25s);
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
