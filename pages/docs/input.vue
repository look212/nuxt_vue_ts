<template>
  <div>
    <p>Simple design input component.</p>
    <h2>default</h2>
    <p>type: text, width: 100%</p>
    <div>
      <s-input v-model="inputText" placeholder="텍스트를 입력해주세요." :val="inputText"/>
    </div>
    <pre><code>&lt;s-input v-model="inputText" placeholder="텍스트를 입력해주세요."/&gt;</code></pre>
    <h3>components가 겹겹이 쌓여있는 경우? val로 v-model 값을 전달해야함.</h3>
    <pre><code>&lt;s-input v-model="inputText" placeholder="텍스트를 입력해주세요." :val="inputText"/&gt;</code></pre>
    <h2>password</h2>
    <p>type: password</p>
    <div>
      <s-input v-model="password" type="password" placeholder="패스워드를 입력해주세요."/>
    </div>
    <pre><code>&lt;s-input v-model="password" type="password" placeholder="패스워드를 입력해주세요."/&gt;</code></pre>
    <h2>action</h2>
    <h3>keyup.enter</h3>
    <p>enter키 누르면 동작</p>
    <h3>focus</h3>
    <p>focus동작 유도</p>
    <h3>input</h3>
    <p>v-model 값 변경 시 target값 받아오기</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api';
import SInput from '~/components/_atoms/SInput.vue';

export default defineComponent({
  name: 'Input',
  components: {
    SInput,
  },
  layout: 'sideMenu',
  setup() {
    const data = reactive({
      inputText: '',
      password: ''
    })

    return {
      ...toRefs(data),
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
