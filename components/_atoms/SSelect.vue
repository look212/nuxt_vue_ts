<template>
  <span :style="`${isInline ? 'display: inline-block' : 'display: block; width: 100%;'}`">
    <select ref="selectEl"
            v-bind="$attrs"
            :class="['select__el',
    {'select__el__inline': isInline},
    `select__${size}`,
    {'is__disabled': isDisabled}]"
            :disabled="isDisabled"
            @change="handleInput">
      <option v-for="(item, index) in options"
              :key="`option_${index}`"
              :value="item.value">
        {{ item.label }}
      </option>
    </select>
    <span v-if="isAutoSize"
          class="width-temp-select"
          ref="widthTmpSelect">{{ widthTmpOption }}</span>
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from '@nuxtjs/composition-api';

/**
 * Select
 * @param {array} options - select options
 * @param {boolean} isInline - 기본 display:block, width: 100% 상태이므로 inLine 필요시 추가.
 * @param {boolean} isDisabled
 */

enum sizeType {
  mini = 'mini',
  medium = 'medium',
}

export default defineComponent({
  name: 'SSelect',
  props: {
    options: {
      type: Array,
      required: true,
    },
    isInline: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String as PropType<sizeType>,
      default: sizeType.medium,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isAutoSize: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const selectEl = ref();
    const widthTmpSelect = ref();
    const widthTmpOption = ref();

    const methods = {
      handleInput(e: Event) {
        const value = (e.target as HTMLInputElement).value;
        if (props.isAutoSize) methods.autoSize(e);
        emit('click', value);
      },
      autoSize(val: any) {
        const selected: any = val.target ? props.options.find((option: any) => option.value === val.target.value) : props.options[0];
        widthTmpOption.value = selected.label;
        setTimeout(() => {
          selectEl.value.style.width = `${widthTmpSelect.value.clientWidth}px`;
        })
      }
    }

    onMounted(() => {
      if (props.isAutoSize) methods.autoSize(props.options[0]);
    })

    return {
      selectEl,
      widthTmpSelect,
      widthTmpOption,
      ...methods,
    }
  },
})
</script>

<style lang="scss" scoped>
.select__el {
  display: block;
  width: 100%;
  padding: 13px 15px;
  font-size: 14px;
  border: 1px solid $Gray30;
  border-radius: 4px;
  appearance:none;
  background: $ic-12-common-arrow-bottom calc(100% - 12px) 50%/12px no-repeat;
  outline: none;
  font-family: $fontDefault;

  &.is__disabled {
    opacity: .2;
  }

  &::-ms-expand {
    display: none;
  }
  &.select__el__inline {
    display: inline-block;
    width: fit-content;
    padding: 15px 32px 15px 12px;
    background-position: calc(100% - 10px) 50%;
  }

  &.select__mini {
    text-align: center;
    display: inline-block;
    background-image: none;
    border-radius: 15px;
    box-sizing: border-box;
    height: 32px;
    line-height: 1;
    padding: 0 3px 0 5px;
    font-size: 11px;
    background-color: $Gray00;
  }
}

.width-temp-select {
  position: absolute;
  overflow: hidden;
  visibility: hidden;
  left: -9999px;
  opacity: 0;
  font-size: 11px;
  padding: 0 7px 0 9px;
}
</style>
