<template>
  <span :class="['button__wrap',
  !isIcon ? `button__${size}` : '',
  {'button__inline' : (isInline || isIcon)}]">
    <template v-if="isIcon">
      <button type="button"
              :class="['button__icon',
              `button__${iconType}`]"
              @click="handleClick">
        {{ iconText }}
        <slot/>
      </button>
    </template>
    <template v-else>
      <button type="button"
              :class="{'active': !isDisabled}"
              :disabled="isDisabled"
              @click="handleClick">
        {{ buttonText }}
      </button>
    </template>
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api"

enum sizeType {
  large = 'large',
  medium = 'medium',
}

enum iconType {
  back = 'back',
  close = 'close',
  logout = 'logout',
  footer = 'footer',
  image = 'image',
}

/**
 * Button
 * @param {string} size - large, medium(default)
 * @param {string} buttonText - 버튼 텍스트
 * @param {boolean} isDisabled - 비활성 상태
 * @param {boolean} isInline - 텍스트 버튼일 경우. 기본 display:block, width: 100% 상태이므로 inLine 필요시 추가.
 * @param {boolean} isIcon - 텍스트 없이 아이콘일 경우.
 * @param {string} iconType - back, close(default), logout, footer, image
 * @param {string} iconText - 아이콘일 경우 아이콘 하단 텍스트
 * @method handleClick - 부모 component에서 click event 실행
 */

export default defineComponent({
  name: "SButton",
  props: {
    size: {
      type: String as PropType<sizeType>,
      default: sizeType.medium,
    },
    buttonText: {
      type: String
    },
    isDisabled: {
      type: Boolean,
    },
    isInline: {
      type: Boolean,
      default: false,
    },
    isIcon: {
      type: Boolean,
      default: false,
    },
    iconType: {
      type: String as PropType<iconType>,
      default: iconType.close,
      require: true,
    },
    iconText: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const handleClick = (e: Event) => {
      emit('click', e)
    }
    return {
      handleClick,
    }
  }
});
</script>

<style lang="scss" scoped>
.button__wrap {
  display: block;

  &.button__large {
    height: 56px;
    line-height: 56px;
  }

  &.button__medium {
    height: 44px;
    line-height: 44px;
  }

  &.button__inline {
    display: inline-block;
    width: fit-content;
    button {
      padding-left: 20px;
      padding-right: 20px;
    }

    .button__icon {
      padding-left: 0;
      padding-right: 0;
    }
  }
}

button {
  background: $Gray30;
  color: $Gray00;
  font-weight: bold;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  font-size: 16px;
  vertical-align: top;

  &.active {
    background: $Gray90;
  }

  &.button__icon {
    min-width: 30px;
    padding-top: 30px;
    background-color: transparent;
    text-align: center;

    &.button__close {
      background: $ic-30-common-close center / 30px no-repeat;
    }

    &.button__back {
      background: $ic-30-common-arrow-left center / 30px no-repeat;
    }

    &.button__logout {
      background: $ic-30-common-logout center / 30px no-repeat;
    }
  }
  &.button__image {
    min-width: inherit;
    padding-top: inherit;
  }
}
</style>
