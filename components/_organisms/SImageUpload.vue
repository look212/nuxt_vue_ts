<template>
  <div class="image-upload-wrap" :class="{'is__inline' : !isMultiple}">
    <input ref="uploadInput"
           class="input__file"
           type="file"
           accept="image/*"
           :multiple="isMultiple"
           :disabled="isDisabled"
           @click="resetImageUploader"
           @change="getImages">
    <s-button :is-icon="true"
              icon-type="image"
              :class="[{'button__absolute': isUploadedNextLine}, {'is__disabled': isDisabled}]"
              @click="triggerUpload">
      <img src="/images/icon/ic-20-common-camera.svg" alt="">
      <div class="btn__text" v-if="isMultiple">
        {{ savedImageList.length }} <span>/ {{ maxLength }}</span>
      </div>
    </s-button>
    <div v-if="isUploadedNextLine" class="uploaded__next_line"/>
    <span :class="isMultiple ? 'uploaded__inline_block' : 'uploaded_absolute'"
          v-for="(img, idx) in savedImageList"
          :key="`uploaded_image_list_${idx}`">
      <img :src="img.image_path ? img.image_path : img.src ? img.src : img"
           :key="`img_${idx}`"
           height="58"
           width="58"
           alt="">
      <s-button v-if="isMultiple && !isDisabled"
                :is-icon="true"
                class="button__delete"
                icon-type="image"
                @click="deleteUploadedImage(idx)">
        <img src="/images/icon/ic-16-common-delete.svg" alt="">
      </s-button>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';
import SButton from '~/components/_atoms/SButton.vue';
import { useAppStore } from '~/store';

/**
 * @param {boolean} isMultiple
 * @param {number} maxLength - 업로드 제한 갯수
 * @param {boolean} isUploadedNextLine - 업로드 버튼과 업로드 이미지가 줄바꿈으로 표시되어야 하는 경우 'true'로 할당
 */
export default defineComponent({
  name: 'SImageUpload',
  components: {
    SButton,
  },
  props: {
    isMultiple: {
      type: Boolean,
      default: true,
    },
    maxLength: {
      type: Number,
      default: 50,
    },
    isUploadedNextLine: {
      type: Boolean,
      default: false,
    },
    savedImageList: {
      type: Array,
      default: () => [],
    },
    isDisabled: {
      type: Boolean,
      default: false,
    }
  },
  setup(props, { emit, root }) {
    const uploadInput = ref();
    const totalImageLength = ref(0);
    const app = useAppStore()
    const methods = {
      triggerUpload() {
        totalImageLength.value >= props.maxLength
          ? root.$swal(`최대 등록 가능한 이미지 개수는\n${props.maxLength}장 입니다.`)
          : uploadInput.value.click();
      },
      resetImageUploader() {
        uploadInput.value.value = '';
      },
      calculateSize(img: any, maxWidth: number, maxHeight: number) {
        let width = img.width;
        let height = img.height;

        // calculate the width and height, constraining the proportions
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        return [ width, height ];
      },
      async getImages(settings: any) {
        const inputElement = settings.currentTarget as HTMLInputElement;
        let fileList = Array.prototype.slice.call(inputElement.files);
        if (props.isMultiple && fileList.length + totalImageLength.value > props.maxLength) {
          root.$swal(`최대 등록 가능한 이미지 개수는\n${props.maxLength}장 입니다.`);
          return;
        }
        if (fileList.length > 0) {
          app.showLoading();
          fileList.forEach((file: any) => {
            const reader = new FileReader();
            const image = new Image();
            const $canvas = document.createElement('canvas');

            const dataURItoBlob = (dataURI: any) => {
              const bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
                atob(dataURI.split(',')[1]) :
                unescape(dataURI.split(',')[1]);
              const max = bytes.length;
              const ia = new Uint8Array(max);
              for (let i = 0; i < max; i++)
                ia[i] = bytes.charCodeAt(i);

              return [
                {
                  file: new File([ ia ], file.name, { type: 'image/jpeg', lastModified: file.lastModified }),
                  src: dataURI
                }
              ]
            };

            const resize = () => {
              const ctx = $canvas.getContext('2d');
              const MAX_WIDTH = 1024;
              const MAX_HEIGHT = 1024;
              const MIME_TYPE = 'image/jpeg';
              const QUALITY = file.size > 10000000 ? 0.7 : 1;
              const [ newWidth, newHeight ] = methods.calculateSize(image, MAX_WIDTH, MAX_HEIGHT);
              $canvas.width = newWidth;
              $canvas.height = newHeight;

              ctx?.drawImage(image, 0, 0, newWidth, newHeight);
              const dataUrl = $canvas.toDataURL(MIME_TYPE, QUALITY);
              return dataURItoBlob(dataUrl);
            };
            return new Promise((ok, no) => {
              reader.onload = (readerEvent: any) => {
                image.onload = () => {
                  return ok(methods.handleUpload(resize()));
                };
                image.src = readerEvent.target.result;
              };
              reader.readAsDataURL(file);
              totalImageLength.value++;
            }).then(() => {
              app.hideLoading();
            });
          })
        }
      },
      deleteUploadedImage(idx: number) {
        totalImageLength.value--;
        emit('delete', idx);
      },
      handleUpload(fileList: any) {
        emit('upload', fileList);
      },
    }

    return {
      uploadInput,
      ...methods,
      totalImageLength,
    }
  }
})
</script>

<style lang="scss" scoped>
.image-upload-wrap {
  position: relative;

  &.is__inline {
    display: inline-block;
  }

  /deep/ .button__wrap {
    button {
      padding-left: 0;
      padding-right: 0;
    }
  }

  .input__file {
    width: 0;
    height: 0;
    position: absolute;
    outline: none;
    appearance: none;
  }

  .uploaded_absolute {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 4px;
    overflow: hidden;
    vertical-align: top;
  }

  .uploaded__inline_block {
    display: inline-block;
    vertical-align: top;
    margin: 0 4px 4px 0;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(221, 221, 221, 0.2);

    .button__delete {
      width: inherit;
      height: inherit;
      position: absolute;
      top: 2px;
      right: 2px;
      border: 0;
    }
  }

  .uploaded__next_line {
    margin-top: 12px;
  }

  /deep/ .button__wrap {
    width: 60px;
    height: 60px;
    border-radius: 4px;
    border: 1px solid $Gray30;

    &.is__disabled {
      background: $Gray20;
      border: 0;

      .btn__text {
        opacity: .2;
      }
    }

    &.button__absolute {
      position: absolute;
      top: -72px;
      right: 0;
    }

    .btn__text {
      color: $Gray90;
      font-size: 10px;
      font-weight: 700;
      padding-top: 2px;
      line-height: 1;

      span {
        color: $Gray40;
      }
    }
  }
}
</style>
