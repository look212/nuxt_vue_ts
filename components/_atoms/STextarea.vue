<template>
  <textarea ref="textArea"
            :class="['textarea__el',
            {'auto-height' : isAdjustHeight}]"
            v-bind="$attrs"
            :maxlength="maxLength"
            :placeholder="placeholder"
            :style="`height: ${height + 20}px;`"
            :disabled="isDisabled"
            @keyup="handleKeyup"
            @keydown="handleKeydown"
            @change="handleInput"
            @focus="handleFocus">
  </textarea>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api';

/**
 * Textarea
 * @param {string} placeholder -
 * @param {number} maxHeight - 원하는 textarea 높이
 * @param {number} maxLength - 글자수 제한
 * @param {boolean} isAdjustHeight - height 자동 조절 필요한 경우
 */

export default defineComponent({
  name: 'STextarea',
  props: {
    placeholder: {
      type: String,
    },
    maxLength: {
      type: Number,
      default: 1000,
    },
    height: {
      type: Number,
      default: 40,
    },
    isAdjustHeight: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    storeChange: {
      type: Boolean,
      default: false,
    }
  },
  setup(props, { emit }) {
    const textArea = ref();

    const methods = {
      adjustHeight() {
        if (props.isAdjustHeight) {
          const textAreaEl = textArea.value as HTMLDivElement;
          textAreaEl.style.height = 'auto';
          textAreaEl.style.height = `${props.height}px`;
          textAreaEl.style.height = (4 + textAreaEl.scrollHeight) + 'px';
        }
      },
      handleInput(e: Event) {
        const value = (e.target as HTMLInputElement).value;
        if (props.storeChange) {
          emit('change', value);
        } else {
          emit('input', value);
        }
      },
      handleKeyup(e: Event) {
        emit('keyup', e);
        if (props.isAdjustHeight) methods.adjustHeight()
      },
      handleKeydown(e: Event) {
        emit('keydown', e);
      },
      handleFocus(e: Event) {
        emit('focus', e);
      }
    }

    return {
      textArea,
      ...methods
    }
  }
})
</script>

<style lang="scss" scoped>
.textarea__el {
  width: 100%;
  padding: 14px 16px;
  font-size: 14px;
  line-height: 1.3em;
  font-family: $fontDefault;
  box-sizing: border-box;
  border: 1px solid $Gray30;
  border-radius: 4px;
  overflow-y: visible;
  resize: none;
  outline: none;
  vertical-align: top;

  &::placeholder {
    color: $Gray50;
  }
}
</style>
