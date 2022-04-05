import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

@Module ({
  name: 'app',
  stateFactory: true,
  namespaced: true,
})

export default class App extends VuexModule {
  isShowLoading: boolean = false;

  @Mutation
  setIsShowLoading(value: boolean) {
    this.isShowLoading = value
  }

  @Action
  showLoading() {
    this.setIsShowLoading(true)
  }

  @Action
  hideLoading() {
    this.setIsShowLoading(false)
  }
}
