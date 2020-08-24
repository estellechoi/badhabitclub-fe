<template>
  <!-- if another tag is used to create a button, the onclick event only fires when clicked by the mouse cursor, even if role="button" is used. -->
  <div class="select-box" :class="outerClass">
    <div
      role="button"
      tabindex="0"
      class="select-box__selected"
      :class="{ 'btn--disabled' : disabled }"
      :aria-labelledby="`${id}-box`"
      :aria-disabled="disabled"
      aria-haspopup="true"
      :aria-expanded="isExpanded"
      @click="toggleSelectBox"
      @keydown="toggleSelectBox"
    >
      <label :for="`${id}-box`" class="select-box__label">
        <div :id="`${id}-box`" class="select-box__title" aria-invalid="false" aria-disabled="false">
          <span>{{ selectedOption.label || defaultLabel }}</span>

          <span class="select-box__trigger" :class="{ 'select-box__trigger--down' : isExpanded }">
            <i class="fas fa-chevron-down"></i>
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
          :data-option-data="JSON.stringify(item)"
        >{{ item.label }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "select-box",
  props: {
    outerClass: {
      type: String,
      default: "",
    },
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isExpanded: false,
      selectedOption: {},
    };
  },
  methods: {
    toggleSelectBox() {
      if (this.disabled) return;
      this.isExpanded = !this.isExpanded;
    },
    selectOption(evt) {
      console.log(evt);
      this.selectedOption = JSON.parse(evt.target.dataset.optionData);
      this.isExpanded = false;
      this.$emit("change", this.selectedOption);
    },
  },
};
</script>
