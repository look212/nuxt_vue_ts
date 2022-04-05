<template>
  <div>
    <p>Simple button design.</p>
    <h2>default</h2>
    <p>width: 100%, size: medium</p>
    <div>
      <s-button>default</s-button>
    </div>
    <pre><code>&lt;s-button&gt;default&lt;/s-button&gt;</code></pre>
    <h2>display: inline-block</h2>
    <div>
      <s-button :is-inline="true">inline</s-button>
    </div>
    <pre><code>&lt;s-button :is-inline="true"&gt;inline&lt;/s-button&gt;</code></pre>
    <h2>size</h2>
    <div>
      <s-button :is-inline="true">medium</s-button>
      <s-button :is-inline="true" size="large">large</s-button>
    </div>
    <pre><code>&lt;s-button :is-inline="true"&gt;medium&lt;/s-button&gt;
  &lt;s-button :is-inline="true" size="large"&gt;large&lt;/s-button&gt;</code></pre>
    <h2>icon</h2>
    <div>
      <s-button :is-inline="true" :is-icon="true" icon-type="back"/>
      <s-button :is-inline="true" :is-icon="true" icon-type="close"/>
      <s-button :is-inline="true" :is-icon="true" icon-type="logout"/>
    </div>
    <pre><code>&lt;s-button :is-inline="true" :is-icon="true" icon-type="back"/&gt;
  &lt;s-button :is-inline="true" :is-icon="true" icon-type="close"/&gt;
  &lt;s-button :is-inline="true" :is-icon="true" icon-type="logout"/&gt;</code></pre>
    <p>iconType 이외의 다른 이미지를 넣은 button이 필요할 경우 button background로 지정</p>
    <div>
      <s-button :is-inline="true" :is-icon="true" icon-type="image"/>
    </div>
    <pre><code>&lt;s-button :is-inline="true" :is-icon="true" icon-type="image"/&gt;</code></pre>
    <h2>disabled</h2>
    <div>
      <s-button :is-disabled="true">disabled</s-button>
    </div>
    <pre><code>&lt;s-button :is-disabled="true"&gt;disabled&lt;/s-button&gt;</code></pre>
    <h2>action</h2>
    <div>
      <s-button @click="test('haha')">haha</s-button>
    </div>
    <pre><code>&lt;s-button @click="test('haha')"&gt;haha&lt;/s-button&gt;

  &lt;script type="ts"&gt;
      test(value: string) {
        console.log(value);
      }
  &lt;/script&gt;</code></pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import SButton from '~/components/_atoms/SButton.vue';

export default defineComponent({
  name: "Button",
  components: {
    SButton,
  },
  layout: 'sideMenu',
  setup() {
    const methods = {
      test(value: string) {
        console.log(value);
      }
    }

    return {
      ...methods
    }
  }
})
</script>

<style lang="scss" scoped>
/deep/ .button__wrap {
  .button__icon {
    &.button__image {
      background: $ic-20-common-arrow-top center / 20px no-repeat;
    }
  }

  &.type2 {
    border: 1px solid $Gray50;
    .button__image {
      padding-top: 20px;
      background-position: center top;
    }
  }
}
</style>
