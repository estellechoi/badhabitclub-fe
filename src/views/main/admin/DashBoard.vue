<template>
  <section class="section section--admin-dash">
    <div class="container">
      <h1 class="blind-box">Overview</h1>

      <div class="admin-overview-box">
        <div>
          <h2 class="title title--min">주요 지표</h2>
        </div>

        <div>
          <ul class="admin-overview-list">
            <li
              class="admin-overview-item shadow-box"
              v-for="(item, index) in overviewList"
              :key="index"
            >
              <div class="admin-overview-item__label">{{ item.cd }}</div>
              <div class="admin-overview-item__value">
                <span class="admin-overview-item__unit" v-if="item.unit">{{ item.unit }}</span>
                <span class="blind-box">{{ item.value }}</span>
                <span ref="counter" :data-target="item.value" aria-hidden="true">0</span>
              </div>
              <div class="admin-overview-item__desc">{{ item.desc }}</div>
            </li>
          </ul>
        </div>
      </div>

      <div class="admin-status-box">
        <div class="admin-status-box__revenue shadow-box">
          <h2 class="title title--min">손익</h2>
          <!-- line-chart -->
          <div class="content">
            <line-chart :income="income" :outcome="outcome"></line-chart>
          </div>
        </div>

        <div class="admin-status-box__status shadow-box">
          <h2 class="title title--min">주문 처리상태</h2>
          <div class="content">
            <div class="admin-status-summary">
              <donut-chart label="배송완료" :prop-ratio="receivedRatio"></donut-chart>
            </div>

            <div class="admin-status-details">
              <div
                class="admin-status-details__item"
                v-for="(item, index) in progressList"
                :key="index"
              >
                <div class="admin-status-details__val">{{ item.value }}</div>
                <div class="admin-status-details__label">{{ item.cd }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="admin-status-box">
        <div class="admin-status-box__table admin-status-box__table--recent shadow-box">
          <h2 class="title title--min">새로운 주문</h2>
          <custom-table
            table-class="table--light-line"
            caption="최근 주문 5건"
            caption-class="blind-box"
            :columns="[
            {
                title: '주문번호',
                data: 'orderId'
            },
            {
                title: '고객명',
                data: 'userName'
            },
            {
                title: '주문날짜',
                data: 'orderDt'
            },
            {
                title: '결제금액',
                data: 'totalAmount',
                type: 'number'
            },
             {
                title: '상태',
                data: 'status',
                formatter: (val) => `<span class='${getStatusClass(val)}'>${val}</span>`
            },
            {
                title: '운송장번호',
                data: 'waybillNo'
            },
          ]"
            :row-data="orderList"
          ></custom-table>
        </div>

        <div class="admin-status-box__table admin-status-box__table--tracking shadow-box">
          <h2 class="title title--min">도시 순위</h2>
          <custom-table
            table-class="table--light-line"
            caption="누적 주문금액이 큰 도시 5곳"
            caption-class="blind-box"
            :columns="[
            {
                title: '도시',
                data: 'city'
            },
            {
                title: '금액',
                data: 'totalAmount',
                type: 'number'
            },
          ]"
            :row-data="cityList"
          ></custom-table>
        </div>
      </div>

      <div class="admin-status-box">
        <div class="admin-status-box__prdt shadow-box">
          <h2 class="title title--min">이번주 인기 상품</h2>
          <div class="content">
            <ul class="popular-prdt-list">
              <li class="popular-prdt-item" v-for="(item, index) in prdtList" :key="index">
                <div class="popular-prdt-item__name">
                  <span>{{ item.prdtName }}</span>
                </div>

                <div class="img-box">
                  <div class="img-box__display">
                    <img :src="item.imgPath" :alt="`${item.prdtName} 상품 사진`" />
                  </div>
                </div>

                <div class="popular-prdt-item__details">
                  <div class="popular-prdt-item__cate">{{ item.category }}</div>
                  <!-- :class="{ 'marker--visible' : item.scrolled }" -->
                  <div class="marker" ref="animatedItem">
                    {{ item.buyRatio }}
                    <span class="marker__sub-text">%</span>
                  </div>

                  <div>
                    <span class="popular-prdt-item__unit">{{ item.unit}}</span>
                    {{ item.salePrice | addCommas }}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      scrolled: false,
      overviewList: [
        {
          cd: "OV001", // 방문자수
          value: 100,
          desc: "전주대비 10% 증가",
        },
        {
          cd: "OV002", // 회원수
          value: 100,
          desc: "전주대비 10% 증가",
        },
        {
          cd: "OV003", // 주문
          value: 50,
          desc: "전주대비 10% 증가",
        },
        {
          cd: "OV004", // 매출
          value: 1000000,
          unit: "₩",
          desc: "전주대비 10% 증가",
        },
      ],
      income: {
        "1월": 10,
        "2월": 39.9,
        "3월": 17,
        "4월": 30.0,
        "5월": 5.3,
        "6월": 38.4,
        "7월": 15.7,
        "8월": 9.0,
        "9월": 9.0,
        "10월": 9.0,
        "11월": 9.0,
        "12월": 9.0,
      },
      outcome: {
        1: 20,
        2: 15.9,
        3: 10,
        4: 16.0,
        5: 9.3,
        6: 10.4,
        7: 6.7,
        8: 16.0,
        9: 8.0,
        10: 6.0,
        11: 6.0,
        12: 6.0,
      },
      progressList: [
        {
          cd: "OP001", // 주문
          value: 100,
        },
        {
          cd: "OP002", // 배송중
          value: 40,
        },
        {
          cd: "OP003", // 취소
          value: 10,
        },
      ],
      orderList: [
        {
          orderId: "20200909US0011",
          orderDt: "09.09",
          userName: "최유진",
          totalAmount: 200000,
          status: "DV001", // 배송완료
          waybillNo: "SH00248TRC",
        },
        {
          orderId: "20200909US0011",
          orderDt: "09.09",
          userName: "최유진",
          totalAmount: 200000,
          status: "DV002", // 배송중
          waybillNo: "SH00248TRC",
        },
        {
          orderId: "20200909US0011",
          orderDt: "09.09",
          userName: "최유진",
          totalAmount: 200000,
          status: "DV003", // 결제대기
          waybillNo: "SH00248TRC",
        },
        {
          orderId: "20200909US0011",
          orderDt: "09.09",
          userName: "최유진",
          totalAmount: 200000,
          status: "DV001",
          waybillNo: "SH00248TRC",
        },
        {
          orderId: "20200909US0011",
          orderDt: "09.09",
          userName: "최유진",
          totalAmount: 200000,
          status: "DV001",
          waybillNo: "SH00248TRC",
        },
      ],
      cityList: [
        {
          city: "RG001",
          totalAmount: 960000,
        },
        {
          city: "RG002",
          totalAmount: 100000,
        },
        {
          city: "RG003",
          totalAmount: 50000,
        },
        {
          city: "RG004",
          totalAmount: 33000,
        },
        {
          city: "RG005",
          totalAmount: 10000,
        },
      ],
      prdtList: [
        {
          prdtId: "PR001",
          prdtName: "Day Cap",
          imgPath: "/img/prdt1.png",
          salePrice: 16000,
          unit: "KRW",
          category: "CT001",
          buyRatio: 66,
        },
        {
          prdtId: "PR001",
          prdtName: "Day Cap",
          imgPath: "/img/prdt1.png",
          salePrice: 16000,
          unit: "KRW",
          category: "CT001",
          buyRatio: 46,
        },
        {
          prdtId: "PR001",
          prdtName: "Day Cap",
          imgPath: "/img/prdt1.png",
          salePrice: 16000,
          unit: "KRW",
          category: "CT001",
          buyRatio: 32,
        },
        {
          prdtId: "PR001",
          prdtName: "Day Cap",
          imgPath: "/img/prdt1.png",
          salePrice: 16000,
          unit: "KRW",
          category: "CT001",
          buyRatio: 10,
        },
        {
          prdtId: "PR001",
          prdtName: "Day Cap",
          imgPath: "/img/prdt1.png",
          salePrice: 16000,
          unit: "KRW",
          category: "CT001",
          buyRatio: 9,
        },
      ],
    };
  },
  computed: {
    receivedRatio() {
      return (
        ((this.progressList[0].value - this.progressList[1].value) /
          this.progressList[0].value) *
        100
      );
    },
  },
  methods: {
    animateNumbers() {
      const counters = this.$refs.counter;
      counters.forEach((item) => {
        const updateCount = () => {
          const targetVal = +item.getAttribute("data-target");
          const count = +item.innerText.replace(",", "");
          const speed = targetVal > 10000 ? 200 : 100;
          const inc = targetVal / speed;

          if (count < targetVal) {
            item.innerText = this.$options.filters.addCommas(count + inc);
            window.setTimeout(updateCount, 2);
          } else item.innerText = this.$options.filters.addCommas(targetVal);
        };

        updateCount();
      });
    },
    getStatusClass(val) {
      let className = "";
      switch (val) {
        case "DV001":
          className = "admin-status";
          break;
        case "DV002":
          className = "admin-status--on";
          break;
        case "DV003":
          className = "admin-status--before";
          break;
      }
      return className;
    },
    animateMarkers() {
      const windowHeight = window.innerHeight;
      this.$refs.animatedItem.forEach((item) => {
        const top = item.getBoundingClientRect().top;
        if (windowHeight > top) item.classList.add("marker--visible");
        else item.classList.remove("marker--visible");
      });
    },
  },
  mounted() {
    this.animateNumbers();
    window.addEventListener("scroll", this.animateMarkers);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.animateMarkers);
  },
};
</script>

<style>
</style>