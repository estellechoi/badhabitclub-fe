<template>
  <table class="table">
    <caption class="table-caption" :class="captionClass">
      {{
      caption
      }}
    </caption>

    <colgroup>
      <col
        class="table-col"
        :style="`width: ${100 / columns.length}%`"
        v-for="(col, colIndex) in columns"
        :key="colIndex"
      />
    </colgroup>

    <thead>
      <tr class="table-head-row" :class="headClass">
        <th v-for="(col, colIndex) in columns" :key="colIndex">{{ col.title }}</th>
      </tr>
    </thead>

    <tbody>
      <tr class="table-body-row" :class="bodyClass" v-for="(item, index) in rowData" :key="index">
        <td v-for="(col, colIndex) in columns" :key="colIndex">
          <span :title="cellTitle(item, col)" v-html="cellContent(item, col)"></span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "custom-table",
  props: {
    caption: {
      type: String,
      default: "",
    },
    captionClass: {
      type: String,
      default: "",
    },
    headClass: {
      type: String,
      default: "",
    },
    bodyClass: {
      type: String,
      default: "",
    },
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    rowData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    cellTitle(item, col) {
      return `${col.title} ${this.cellContent(item, col)}`;
    },
    cellContent(item, col) {
      let val = item[Object.keys(item).filter((key) => col.data === key)[0]];
      if (!val) return "";

      if (col.type && col.type === "number")
        val = this.$options.filters.addCommas(val);

      return col.formatter ? col.formatter(val, item) : val;
    },
  },
};
</script>
