<template>
  <section class="section section--prdt">
    <div class="container">
      <h1 class="blind-box">주문 목록 조회</h1>

      <div class="shadow-box admin-prdt-search-box">
        <h2 class="title title--min">주문 검색</h2>

        <label class="input-field">
          <div class="input-label blind-box">
            <span id="admin-prdt-search-text">검색어</span>
          </div>

          <div class="text-input">
            <input
              type="text"
              class="text-input__input"
              aria-labelledby="admin-prdt-search-text"
              aria-required="true"
              autocomplete="off"
              autocorrect="off"
              spellcheck="false"
              autocapitalize="none"
              placeholder="주문 번호 / 고객명 / 이메일 / 상품 ID / 상품명"
            />
          </div>

          <button type="button" class="btn btn--primary" aria-label="검색">
            <i class="fas fa-search"></i>
          </button>
        </label>
      </div>

      <div class="shadow-box">
        <custom-table
          :has-filters="true"
          :has-hover-style="true"
          table-class="table--light-line"
          caption="전체 주문 목록"
          caption-class="blind-box"
          :columns="[
        {
            title: '주문번호',
            data: 'orderNo'
        },
        {
            title: '상품명',
            data: 'prdtName'
        },
        {
            title: '고객명',
            data: 'userName',
        },
        {
            title: '주문금액',
            data: 'totalAmt',
            type: 'number'
        },
        {
            title: '주문일',
            data: 'orderDt'
        },
           {
            title: '',
            data: 'pastDays',
            cannotReorder: true,
            formatter: (val, originVal, item) => isOrderDone(item['status']) ? '' : `<strong class='text-badge text-badge--late'>+ ${val}일</strong>`
        },
        {
          title: '도착예정일',
          data: 'arrivalDt'
        },
        {
          title: '상태',
          data: 'status',
          type: 'code',
            formatter: (val, originVal) => `<strong class='text-badge text-badge--blue ${badgeClass(originVal)}'>${val}</strong>`
        }
      ]"
          :row-data="orderList"
          @reorder="reorderTable"
          @click-row="goOrderDetails"
        ></custom-table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      orderList: [
        {
          orderId: "OD001",
          orderNo: "200916PR001US001",
          orderDt: "2020-09-16",
          pastDays: this.pastDays("2020-09-16"),
          prdtId: 1,
          prdtName: "Day Cap",
          prdtPrice: "37000",
          qty: 1,
          imgPath: "/img/prdt1.png",
          status: "ST001",
          arrivalDt: "9/18",
          userName: "김보민",
          totalAmt: 200000,
        },
        {
          orderId: "OD002",
          orderNo: "200916PR001US001",
          orderDt: "2020-09-15",
          pastDays: this.pastDays("2020-09-15"),
          prdtId: 1,
          prdtName: "Original Logo T-shirts White/Red",
          prdtPrice: "50000",
          qty: 1,
          imgPath: "/img/prdt2.png",
          status: "ST002",
          arrivalDt: "9/18",
          userName: "김보민",
          totalAmt: 200000,
        },
        {
          orderId: "OD003",
          orderNo: "200916PR001US001",
          orderDt: "2020-09-14",
          pastDays: this.pastDays("2020-09-14"),
          prdtId: 1,
          prdtName: "Yes! Cap - Pink",
          prdtPrice: "37000",
          qty: 1,
          imgPath: "/img/prdt3.png",
          status: "ST003",
          arrivalDt: "9/18",
          userName: "김보민",
          totalAmt: 200000,
        },
        {
          orderId: "OD004",
          orderNo: "200916PR001US001",
          orderDt: "2020-09-10",
          pastDays: this.pastDays("2020-09-10"),
          prdtId: 1,
          prdtName: "Day Cap",
          prdtPrice: "10000",
          qty: 1,
          imgPath: "/img/prdt1.png",
          status: "ST004",
          arrivalDt: "9/11",
          userName: "김보민",
          totalAmt: 200000,
        },
        {
          orderId: "OD005",
          orderNo: "200916PR001US001",
          orderDt: "2020-09-10",
          pastDays: this.pastDays("2020-09-10"),
          prdtId: 1,
          prdtName: "Day Cap",
          prdtPrice: "10000",
          qty: 1,
          imgPath: "/img/prdt1.png",
          status: "ST005",
          arrivalDt: "9/11",
          userName: "김보민",
          totalAmt: 200000,
        },
        {
          orderId: "OD005",
          orderNo: "200916PR001US001",
          orderDt: "2020-09-10",
          pastDays: this.pastDays("2020-09-10"),
          prdtId: 1,
          prdtName: "Day Cap",
          prdtPrice: "10000",
          qty: 1,
          imgPath: "/img/prdt1.png",
          status: "ST006",
          arrivalDt: "9/11",
          userName: "김보민",
          totalAmt: 200000,
        },
      ],
    };
  },
  methods: {
    badgeClass(val) {
      let color = "";
      switch (val) {
        case "ST004":
          color = "text-badge--black";
          break;
        case "ST005":
          color = "text-badge--red";
          break;
        case "ST006":
          color = "text-badge--black";
          break;
        default:
          color = "";
      }

      return color;
    },
    isOrderDone(val) {
      return val === "ST004" || val === "ST006";
    },
    reorderTable(val) {
      console.log("reorderTable", val);
      // api + val.orderBy val.col
    },
    goOrderDetails(item) {
      this.$router.push({ path: `order-details/${item.orderId}` });
    },
  },
};
</script>

<style>
</style>