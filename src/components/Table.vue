<template>
  <table class="table">
    <caption class="table-caption" :class="captionClass">{{ caption }}</caption>

    <colgroup>
      <col
        class="table-col"
        :style="`width: ${100 / 6}%`"
        v-for="(col, colIndex) in columns"
        :key="colIndex"
      />
    </colgroup>

    <thead>
      <tr class="table-head-row">
        <th v-for="(col, colIndex) in columns" :key="colIndex">{{ col.title }}</th>
      </tr>
    </thead>

    <tbody>
      <tr class="table-body-row" v-for="(item, index) in rowData" :key="index">
        <td v-for="(col, colIndex) in columns" :key="colIndex">
          <span :title="cellTitle(item, col)">{{ cellText(item, col) }}</span>
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
      return `${col.title} ${this.cellText(item, col)}`;
    },
    cellText(item, col) {
      const targetKey = Object.keys(item).filter((key) => col.data === key);
      return targetKey.length ? item[targetKey[0]] : "";
    },
  },
};
</script>