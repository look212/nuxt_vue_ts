<template>
  <transition name="modal-fade-bottom">
    <div class="modal modal-overlay" v-show="visible" ref="modal">
      <div :class="['modal-window',
      {'modal-active': visible },
      {'no-border-radius': noBorderRadius}]"
           :style="{'height': height}">
        <div class="header-area">
          <span class="header-title"
                v-if="title" v-html="title"></span>
          <s-button :is-icon="true"
                    icon-type="close"
                    @click="closeModal"></s-button>
        </div>
        <div class="modal-content">
          <slot/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from '@nuxtjs/composition-api';
import SButton from "~/components/_atoms/SButton.vue";

/**
 * Drawer
 * @param {boolean} visible - 부모 component에서 true로 변경 시 show
 * @param {string} title
 * @param {boolean} noBorderRadius
 * @param {string} height
 * @param {boolean} appendToBody - body 끝에 해당 컴포넌트 생성하기
 * @method closeModal - 부모 component에서 close 동작 실행시 visible: false 전달
 * @template - slot 내용 작성
 */

export default defineComponent({
  name: 'SDrawer',
  components: {SButton},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String || null,
    },
    noBorderRadius: {
      type: Boolean,
      default: true,
    },
    height: {
      type: String,
      default: 'auto',
    },
    appendToBody: {
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
      closeModal(e: Event | undefined) {
        emit('close', e);
      },
    }

    watch(
      () => props.visible,
      (value: boolean) => {
        const bodyElement = bodyEl.value;
        if (value) {
          // body 끝에 해당 컴포넌트 생성할 경우
          if (props.appendToBody) {
            const div = document.createElement('div');
            div.appendChild(modal.value);
            document.body.appendChild(div);
          }
          if (bodyElement) {
            bodyElement.style.overflow = 'hidden';
          }

          // 안드로이드 system back로 SDrawer 닫기
          if (window.location.hash !== '#drawer') window.history.pushState(null, '', location.href + `#drawer`);
          window.onpopstate = () => {
            methods.closeModal(event);
          }
        } else {
          if (bodyElement) {
            bodyElement.style.removeProperty('overflow');
          }

          // 안드로이드 system back로 SDrawer 닫기
          if(window.location.hash === '#drawer') {
            window.onpopstate = null;
            window.history.back();
          }
        }
      },
    )

    return {
      modal,
      onReady,
      bodyEl,
      ...methods,
    }
  }
})
</script>

<style lang="scss" scoped>
.modal {
  &.modal-overlay {
    position: fixed;
    overflow: auto;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    transition: all 500ms;
    z-index: 30;
  }

  &-window {
    border-radius: 20px 20px 0 0;
    width: 100%;
    bottom: 0;
    overflow: hidden;

    &.no-border-radius {
      border-radius: 0;
      .modal-content {
        padding: 0;
        background: $Gray00;
      }
    }

    .modal-content {
      margin-top: 50px;
      overflow-y: auto;
      height: calc(100% - 50px);
    }

    .header-area {
      height: 50px;
      padding: 10px 16px;
      text-align: center;
      box-sizing: border-box;
      background: $Gray00;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;

      .header-title {
        display: inline-block;
        line-height: 30px;
        font-size: 15px;
        font-weight: bold;
      }

      .button__wrap {
        position: absolute;
        top: 10px;
        right: 16px;
      }
    }
  }
}

// animation
.modal-fade-bottom-enter-active,
.modal-fade-bottom-leave-active {
  @include transition(all 0.25s);

  .modal-window {
    @include transition(all 0.25s);
    @include transform(none);
  }
}

.modal-fade-bottom-enter,
.modal-fade-bottom-leave-to {
  opacity: 0;

  .modal-window {
    @include transform(translateY(100%));
  }
}
</style>
