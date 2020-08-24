<template>
  <div :class="containerClass">
    <div class="prdt-origin-price">
      <span class="discount-rate">{{ dscntRate * 100 }}%</span>
      <span class="origin-price">
        <del>{{ originPrice | addCommas }}</del>
      </span>
    </div>

    <div class="prdt-sale-price">
      <span class="total-price">
        ₩
        <strong>{{ salePrice | addCommas }}</strong>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "price-tag",
  props: {
    dscntRate: {
      type: Number,
      default: 0,
    },
    originPrice: {
      type: Number,
      default: 0,
    },
    salePrice: {
      type: Number,
      default: 0,
    },
    fontSize: {
      type: Number,
      default: 12,
    },
    containerClass: {
      type: String,
      default: "",
    },
  },
};
</script>
