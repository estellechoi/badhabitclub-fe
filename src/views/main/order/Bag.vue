<template>
  <div>
    <div>
      <h1 class="title">쇼핑백 ({{ bagItemCnt }})</h1>
    </div>

    <div class="bag-container" v-if="bagItemCnt">
      <div class="bag-master-chkbox-container">
        <checkbox
          :id="'check-select-all-prdt'"
          :label="'전체상품 선택'"
          :label-class="'bag-master-chkbox-label'"
          :checked="true"
          @change="(val) => toggleAllChkbox(val)"
        ></checkbox>
      </div>

      <ul>
        <li class="bag-item" v-for="(item, index) in bagList" :key="index">
          <div class="container">
            <h2 class="bag-item__title blind-box">{{ item.prdtInfo.prdtName }}</h2>

            <div class="bag-item-box bag-item__checkbox">
              <checkbox
                :id="`check-select-prdt-${index}`"
                :label="`${item.prdtInfo.prdtName} 상품 선택`"
                :label-class="'blind-box'"
                :checked="item.checked"
                @change="(val) => toggleChkbox(val, item, index)"
              ></checkbox>
            </div>

            <div class="bag-item-container">
              <div class="bag-item-box bag-item__img-box">
                <div class="bag-item__prdt-img">
                  <img :src="item.prdtInfo.img.path" :alt="item.prdtInfo.img.alt" />
                </div>
              </div>

              <div class="bag-item-info-container">
                <div class="bag-item-box bag-item__prdt-info">
                  <div class="bag-item__prdt-name" aria-hidden="true">{{ item.prdtInfo.prdtName }}</div>
                  <div>
                    <price-tag
                      :dscntRate="item.prdtInfo.dscntRate"
                      :originPrice="item.prdtInfo.originPrice"
                      :salePrice="item.prdtInfo.salePrice"
                      :container-class="'bag-item__price-tag'"
                    ></price-tag>
                  </div>
                  <div class="bag-item__selected">
                    <div>{{ item.optionLabel }} : {{ item.label }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bag-item-qty-cntr-container">
              <div class="bag-item-box bag-item__qty-cntr">
                <spinner
                  :label="item.prdtInfo.prdtName"
                  v-model="item.qty"
                  @change="(val) => (item.qty = val)"
                ></spinner>
              </div>

              <div
                class="bag-item-box bag-item__amt"
              >₩ {{ item.qty * item.prdtInfo.salePrice | addCommas }}</div>
            </div>
          </div>
        </li>
      </ul>

      <div class="btn-box">
        <button
          type="button"
          class="btn"
          :class="{ 'btn--disabled' : isNothingChkd }"
          :disabled="isNothingChkd"
          @click="removeItems"
        >선택상품 삭제</button>
      </div>

      <!-- TOTAL PRICE -->
      <div class="bag-total-box-container">
        <div class="bag-total-box">
          <ul>
            <li>
              <span class="total-box__label">총 주문금액</span>
              <span class="bag-total-box__price">
                <span class="bag-total-box__price-unit">₩</span>
                {{ totalAmt | addCommas }}
              </span>
            </li>
            <li>
              <span class="total-box__label">배송비</span>
              <span class="bag-total-box__price">
                <span class="bag-total-box__price-unit">₩</span>
                {{ deliCharge | addCommas }}
              </span>
            </li>
          </ul>

          <div>
            <div class="bag-total-box__total">
              <span class="total-box__label">합계</span>
              <span class="bag-total-box__price">
                <span class="bag-total-box__price-unit">₩</span>
                {{ totalAmt + deliCharge | addCommas }}
              </span>
            </div>
          </div>

          <button
            type="button"
            class="em-btn em-btn--buy-now"
            :class="{ 'btn--disabled' : isNothingChkd }"
            :disabled="isNothingChkd"
            @click="goCheckout"
          >구매하기</button>
        </div>
      </div>
    </div>

    <div class="bag-emtpy-msg" v-else>쇼핑백에 담은 상품이 없습니다.</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bagList: [],
      deliCharge: 3000,
    };
  },
  computed: {
    fetchedBagList() {
      return this.$store.getters.bagList;
    },
    bagItemCnt() {
      return this.bagList.length;
    },
    chkList() {
      return this.bagList.filter((item) => item.checked);
    },
    isNothingChkd() {
      return !this.chkList.length;
    },
    totalAmt() {
      return this.chkList.reduce(
        (accum, item) => accum + item.qty * item.prdtInfo.salePrice,
        0
      );
    },
  },
  methods: {
    toggleAllChkbox(val) {
      this.bagList = this.bagList.map((item) => {
        item.checked = val;
        return item;
      });
    },
    toggleChkbox(val, item, index) {
      item.checked = val;
      // As Vue does not recognize the change inside of the list.
      this.bagList.splice(index, 1, item);
    },
    removeItems() {
      this.bagList = this.bagList.filter((item) => !item.checked);
      // api
    },
    goCheckout() {
      this.$emit("select-list", {
        orderList: this.chkList,
        totalAmt: this.totalAmt,
        deliCharge: this.deliCharge,
      });
      this.$router.push({ path: "checkout" });
    },
  },
  mounted() {
    this.bagList = this.fetchedBagList.map((item) => {
      item.checked = true;
      return item;
    });
  },
};
</script>

<style></style>
