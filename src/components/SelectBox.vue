<template>
  <!-- if another tag is used to create a button, the onclick event only fires when clicked by the mouse cursor, even if role="button" is used. -->
  <div class="select-box">
    <div
      role="button"
      tabindex="0"
      class="select-box__selected"
      :aria-labelledby="`${id}-box`"
      aria-disabled="false"
      aria-haspopup="true"
      :aria-expanded="isExpanded"
      @click="toggleSelectBox"
      @keydown="toggleSelectBox"
    >
      <label :for="`${id}-box`" class="select-box__label">
        <div :id="`${id}-box`" class="select-box__title" aria-invalid="false" aria-disabled="false">
          <span>{{ selectedOption.label || defaultLabel }}</span>

          <span class="select-box__trigger">
            <i class="fas" :class="isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
          </span>
        </div>
      </label>
    </div>

    <!-- OPTIONS -->
    <div
      class="select-box__options"
      :class="{ 'expanded' : isExpanded }"
      :aria-labelledby="`${id}-options`"
    >
      <ul class="select-box__list" @click="selectOption">
        <li
          role="group"
          v-for="(item, index) in list"
          :key="index"
          :data-value="item.value"
          :data-label="item.label"
        >{{ item.label }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "select-box",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    id: {
      type: String,
    },
    defaultLabel: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isExpanded: false,
      selectedOption: "",
    };
  },
  methods: {
    toggleSelectBox() {
      this.isExpanded = !this.isExpanded;
    },
    selectOption(evt) {
      this.selectedOption = {
        label: evt.target.dataset.label,
        value: evt.target.dataset.value,
      };
      this.isExpanded = false;
      this.$emit("change", this.selectedOption);
    },
  },
};
</script>
