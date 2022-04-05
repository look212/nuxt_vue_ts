/**
 * 데이터 formData 변환
 * @param payload
 */
export const makeFormData = (payload: any) => {
  const formData = new FormData()
  for (let key in payload) {
    formData.append(key, payload[key])
  }

  return formData
}

/**
 * 연속 호출 방지
 */
export const saveGuard = (() => {
  let busy = false;
  let timeout = null;
  return {
    setGuard: () => {
      busy = true;
      timeout = setTimeout(() => {
        busy = false;
      }, 1000);
    },
    isBusy: () => {
      return busy;
    }
  }
})();
