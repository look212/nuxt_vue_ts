<template>
  <div class="loading-spinner-wrap" v-if="isShowLoading">
    <svg class="loading-spinner" viewBox="0 0 50 50">
      <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@nuxtjs/composition-api"
import { useAppStore } from '~/store';

/**
 * @param {boolean} isLoading
 */
export default defineComponent({
  name: "SSpinner",
  setup() {
    const app = useAppStore()
    const isShowLoading = computed(() => app.isShowLoading);
    return {
      isShowLoading,
    }
  }
});
</script>

<style lang="scss" scoped>
.loading-spinner-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 100;
  background: rgba(0,0,0,.3);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}


.loading-spinner {
  animation: rotate 2s linear infinite;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;

  & .path {
    stroke: $Gray00;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

</style>
