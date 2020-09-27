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
      this.$emit("close", false);
    },
  },
};
</script>
