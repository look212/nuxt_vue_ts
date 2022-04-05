<template>
  <div ref="radioGroup"
       class="radio__group">
    <p class="radio__title" v-if="title">{{ title }}</p>
    <div ref="radioDiv"
         :class="['radio__div',
         `columns__${options.length}`]">
      <label :class="['radio',
      `radio__${size}`,
      option.value === value ? 'radio__checked' : '',
      {'is-disabled': isDisabled || option.disabled}]"
             v-for="(option, index) in options" :for="`${name}_${index}`">
        <span class="radio__ui">
          {{ option.label }}
          <input type="radio"
                 class="radio__el"
                 :name="name"
                 :id="`${name}_${index}`"
                 :checked="option.value === value"
                 :value="option.value"
                 :disabled="isDisabled || option.disabled"
                 @change="handleInput"/>
        </span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';

enum sizeType {
  large = 'large',
  medium = 'medium',
}

/**
 * Radio group
 * @param {array} option - radio options
 * @param {string} title - 타이틀
 * @param {string} size - large, medium(default)
 * @param {boolean} isDisabled
 * @parma
 */

export default defineComponent({
  name: 'SRadioGroup',
  props: {
    options: {
      type: Array,
    },
    title: {
      type: String,
    },
    name: {
      type: String,
    },
    size: {
      type: String as PropType<sizeType>,
      default: sizeType.medium,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
    },
  },
  setup(props, { emit }) {
    const methods = {
      handleInput(e: Event) {
        const value = (e.target as HTMLInputElement).value;
        emit('click', value)
      }
    }

    return {
      ...methods,
    }
  }
})
</script>

<style lang="scss" scoped>
.radio__group {
  padding: 20px;
  & + & {
    border-top: 1px solid $Gray25;
  }
}
.radio__title {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -.02em;
  line-height: 18px;
  margin-bottom: 12px;
}
.radio__div {
  display: grid;
  text-align: center;
  gap: 8px;

  .radio,
  /deep/ .radio{
    background: $Gray20;
    border-radius: 4px;
    box-sizing: border-box;
    position: relative;

    &.is-disabled {
      .radio__ui {
        opacity: .2;
      }
      &.radio__checked {
        .radio__ui {
          opacity: 1;
        }
      }
    }

    &.radio__large {
      line-height: 44px;
      font-size: 16px;

      &:first-child.radio__checked {
        background: $C_Blue;
        color: $Gray00;
        font-weight: 700;
      }

      &:nth-child(2).radio__checked {
        background: $C_Yellow;
        color: $Gray00;
        font-weight: 700;
      }

      &:last-child.radio__checked {
        background: $C_Red;
        color: $Gray00;
        font-weight: 700;
      }
    }

    &.radio__medium {
      line-height: 34px;
      font-size: 14px;
      border: 1px solid $Gray00;

      &:first-child.radio__checked {
        background: $C_Blue_OP_06;
        border: 1px solid $C_Blue;
        color: $C_Blue;
        font-weight: 700;
      }

      &:nth-child(2).radio__checked {
        background: $C_Yellow_OP_06;
        border: 1px solid $C_Yellow;
        color: $C_Yellow;
        font-weight: 700;
      }

      &:last-child.radio__checked {
        background: $C_Red_OP_06;
        border: 1px solid $C_Red;
        color: $C_Red;
        font-weight: 700;
      }
    }
  }

  input[type='radio'] {
    position: absolute;
    top: 0;
    left: 0;
    outline: none;
    appearance: none;
  }

  &.columns__2 {
    grid-template-columns: repeat(2, 1fr);
  }

  &.columns__3 {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
