import App from '~/store/app';
import { InjectionKey, useStore as baseUseStore } from '@nuxtjs/composition-api'
import { getModule, VuexModule } from 'vuex-module-decorators'

interface State {
  app: App,
}

export const key: InjectionKey<State> = Symbol()

function useStore() {
  return baseUseStore<State>(key)
}

declare type ConstructorOf<C> = {
  new (...args: any[]): C
}

export const useModule = <M extends VuexModule>(moduleClass: ConstructorOf<M>): M =>
  getModule(moduleClass, useStore())
export const useAppStore = () => useModule(App)
