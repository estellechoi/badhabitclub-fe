<template>
  <table class="table" :class="tableClass">
    <caption class="table-caption" :class="captionClass">
      {{
      caption
      }}
    </caption>

    <colgroup>
      <col
        class="table-col"
        :style="`width: ${100 / cols.length}%`"
        v-for="(col, colIndex) in cols"
        :key="colIndex"
      />
    </colgroup>

    <thead>
      <tr class="table-head-row" :class="headClass">
        <th v-for="(col, colIndex) in cols" :key="colIndex">
          {{ col.title }}
          <div
            class="table-icon-box"
            v-if="hasFilters && !col.cannotReorder"
            @mouseover="col.slideIcon = true"
            @mouseout="col.slideIcon = false"
          >
            <span class="table-icon-container">
              <span
                class="table-icon table-icon--asc"
                :class="{ 'table-icon--active' : col.orderBy === 'asc'}"
                role="button"
                :aria-label="`${col.title} 열을 기준으로 오름차순 정렬하기`"
                tabindex="0"
                @click="reorderData('asc', col)"
              >
                <span class="table-icon__content"></span>
              </span>

              <span
                class="table-icon"
                :class="{ 'table-icon--desc' : col.slideIcon || col.orderBy === 'desc', 'table-icon--active' : col.orderBy === 'desc' }"
                role="button"
                :aria-label="`${col.title} 열을 기준으로 내림차순 정렬하기`"
                tabindex="0"
                @click="reorderData('desc', col)"
              >
                <span class="table-icon__content table-icon__content--desc"></span>
              </span>
            </span>
          </div>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        class="table-body-row"
        v-for="(item, index) in rowData"
        :key="index"
        :class="{ bodyClass, 'table-body-row--hover-st' : hasHoverStyle }"
      >
        <td v-for="(col, colIndex) in cols" :key="colIndex">
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
    hasFilters: {
      type: Boolean,
      default: false,
    },
    hasHoverStyle: {
      type: Boolean,
      default: false,
    },
    tableClass: {
      type: String,
      default: "",
    },
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
  data() {
    return {
      cols: [],
    };
  },
  methods: {
    reorderData(orderBy, col) {
      this.cols = this.cols.map((item) => {
        if (item.data === col.data) item.orderBy = orderBy;
        else item.orderBy = null;
        return item;
      });

      this.$emit("reorder", {
        orderBy,
        col: col.data,
      });
    },
    cellTitle(item, col) {
      return `${col.title} ${this.cellContent(item, col)}`;
    },
    cellContent(item, col) {
      let val = item[Object.keys(item).filter((key) => col.data === key)[0]];
      if (!val) return "";

      if (col.type && col.type === "number")
        val = this.$options.filters.addCommas(val);

      if (col.type && col.type === "image")
        val = `<div class='img-box'><div class='img-box__display' style='width: ${
          col.size
        }px; height: ${col.size}px;'><img src='${val}' alt='${
          item[col.alt]
        }'/></div></div>`;

      return col.formatter ? col.formatter(val, item) : val;
    },
  },
  mounted() {
    if (this.hasFilters) {
      this.cols = this.columns.map((item) => {
        item.slideIcon = false;
        return item;
      });
    } else this.cols = this.columns;
  },
};
</script>
