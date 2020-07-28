<template>
  <div>
    <div class="modal-background"></div>
    <div class="modal">
      <div role="dialog" :aria-label="ariaLabel" class="modal__body">
        <button
          type="button"
          aria-label="닫기"
          class="btn btn--primary modal__close-btn"
          @click="close"
        >
          <i class="fas fa-times"></i>
        </button>
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal",
  props: {
    ariaLabel: String,
    default() {
      return "";
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  background-color: rgb(34, 34, 34);
  animation-name: opacify;
  animation-duration: 0.4s;
  animation-iteration-count: 1;
  animation-fill-mode: both;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  padding: 40px;
  box-sizing: border-box;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal__body {
  position: relative;
  max-height: 100%;
  max-width: 568px;
  height: 65vh;
  width: 80vw;
  background-color: #fff;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.28);
  animation-name: pullModal;
  animation-duration: 0.4s;
  animation-iteration-count: 1;
  animation-fill-mode: both;
}

@keyframes opacify {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.6;
  }
}

@keyframes pullModal {
  from {
    opacity: 0;
    transform: translate(0, 100%);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.modal__close-btn.btn {
  position: absolute;
  top: 18px;
  right: 18px;
}

.modal__close-btn.btn .fas {
  font-size: 22px;
}
</style>