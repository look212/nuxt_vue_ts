<template>
  <input class="input__el"
         :type="type"
         :placeholder="placeholder"
         :disabled="disabled"
         :maxlength="maxLength"
         :value="val"
         @keyup.enter="handleKeyup"
         @focusin="handleFocus"
         @input="handleInput">
</template>

<script lang="ts">
import {defineComponent, PropType, ref, watch} from "@nuxtjs/composition-api";

enum typeType {
  text = 'text',
  password = 'password',
}

/**
 * Input[type="text, password"]
 * @param {string} type - text(default), password
 * @param {string} placeholder -
 */

export default defineComponent({
  name: "SInput",
  props: {
    type: {
      type: String as PropType<typeType>,
      default: typeType.text,
    },
    placeholder: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: Number,
      default: 524288,
    },
    val: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    let current = ref<string>('');
    const methods = {
      handleInput(e: Event){
        emit('input', (e.target as HTMLInputElement).value)
      },
      handleFocus(e: Event){
        emit('focus', (e.target as HTMLInputElement).value)
      },
      handleKeyup(e: Event){
        emit('enter', (e.target as HTMLInputElement).value)
      },
    }
    watch(() => props.val, (newValue: string) => {
      // console.log(searchInput.value.target);
      console.log(newValue);
      current.value = newValue;
      // console.log(currentValue.value);
    })

    return {
      ...methods,
      current
    }
  }
})
</script>

<style lang="scss" scoped>
.input__el {
  width: 100%;
  padding: 17px 16px;
  border-radius: 5px;
  font-size: 14px;
  color: #000;
  border: 1px solid $Gray30;

  &::placeholder {
    color: $Gray40;
  }

  &:focus {
    border-color: $Gray90;
    outline: 0;
  }

  &[type="password"] {
    font-family: $fontPassword;
  }
}
</style>
