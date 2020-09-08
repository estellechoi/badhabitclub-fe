<template>
  <section class="section section--prdt">
    <div class="container">
      <div>
        <h1 class="blind-box">상품 등록</h1>
      </div>

      <!-- PROGRESS BAR -->
      <div class="reg-progress-box shadow-box" :style="`right: ${fixedBarRight}px`">
        <progress-3d-bar :valuenow="progressValuenow"></progress-3d-bar>
      </div>

      <!-- MAIN SECTION -->
      <section>
        <fieldset class="prdt-fs">
          <legend class="prdt-fs__title">
            <h2 class="title title--min">기본 정보</h2>
          </legend>

          <div class="prdt-input-box">
            <label class="input-field">
              <div class="input-label">
                <span id="prdt-name">
                  상품명
                  <span class="icon--required">*</span>
                </span>
              </div>

              <div class="text-input">
                <input
                  type="text"
                  class="text-input__input"
                  aria-labelledby="prdt-name"
                  aria-required="true"
                  autocomplete="off"
                  autocorrect="off"
                  spellcheck="false"
                  autocapitalize="none"
                  v-model="basicInfo.prdtName"
                />
              </div>
            </label>
          </div>

          <div class="prdt-input-box prdt-input-box--brand">
            <label class="input-field">
              <div class="input-label">
                <span id="prdt-brand-name">
                  브랜드
                  <span class="icon--required">*</span>
                </span>
              </div>

              <div class="text-input">
                <input
                  type="text"
                  class="text-input__input"
                  aria-labelledby="prdt-brand-name"
                  aria-required="true"
                  autocomplete="off"
                  autocorrect="off"
                  spellcheck="false"
                  autocapitalize="none"
                  v-model="basicInfo.brandName"
                  readonly
                />
              </div>

              <button
                type="button"
                class="btn"
                @click="openBrandBox = !openBrandBox"
              >{{ openBrandBox ? '검색창 닫기' : '검색' }}</button>
            </label>
          </div>

          <div class="prdt-input-box prdt-input-box--desc" v-if="openBrandBox">
            <div class="chkout-addr-box">
              <div class="chkout-addr-search-box">
                <div class="text-input">
                  <input
                    type="text"
                    aria-label="브랜드 검색"
                    autocomplete="off"
                    autocorrect="off"
                    spellcheck="false"
                    autocapitalize="none"
                    class="text-input__input"
                    v-model="brandSearchText"
                  />
                  <!-- @input="search" -->
                </div>
                <button type="button" aria-label="검색" class="btn btn--primary" @click="search">
                  <i aria-hidden="true" class="fas fa-search"></i>
                </button>
                <button type="button" class="blind-box" @click="openBrandBox = false">검색창 닫기</button>
              </div>

              <div class="chkout-addr-rslt-box">
                <div class="chkout-addr-no-rslt" v-if="!searchedBrandList.length">
                  검색결과가 없습니다. 검색어로 입력한 브랜드명을 사용하려면
                  <button
                    type="button"
                    class="btn btn--text"
                    @click="selectNewBrand"
                  >여기를 클릭</button>
                  하세요.
                </div>
                <ul class="chkout-addr-rslt-list" @click="(evt) => selectBrand(evt)">
                  <li v-for="(item, index) in searchedBrandList" :key="index">
                    <div>
                      <button
                        type="button"
                        class="chkout-addr-rslt__addr-sel-btn chkout-addr-rslt__addr-sel-btn--text"
                        :data-cd="item.cd"
                        :data-brand-name="item.brandName"
                      >{{ item.cd }} {{ item.brandName }} ({{ item.brandNameEn }})</button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="prdt-input-box">
            <label class="input-field">
              <div class="input-label">
                <span id="prdt-origin-price">
                  가격
                  <span class="icon--required">*</span>
                </span>
              </div>

              <div class="text-input">
                <input
                  type="text"
                  class="text-input__input"
                  aria-labelledby="prdt-origin-price"
                  aria-required="true"
                  autocomplete="off"
                  autocorrect="off"
                  spellcheck="false"
                  autocapitalize="none"
                  v-model="basicInfo.originPrice"
                />
              </div>
            </label>
          </div>

          <div class="prdt-input-box">
            <div class="input-label">
              <span class="blind-box">통화</span>
            </div>

            <select-box
              id="prdt-price-currency"
              :list="[{label: 'KRW (₩)', value: 'KRW'}]"
              default-label="통화를 선택하세요"
              v-model="basicInfo.currency"
              @change="selectCurrency"
            ></select-box>
          </div>

          <div class="prdt-input-box">
            <label class="input-field">
              <div class="input-label">
                <span id="prdt-dscnt-rate">
                  추가 할인 (%)
                  <span class="icon--required">*</span>
                </span>
              </div>

              <div class="text-input">
                <input
                  type="text"
                  class="text-input__input"
                  aria-labelledby="prdt-dscnt-rate"
                  aria-required="true"
                  autocomplete="off"
                  autocorrect="off"
                  spellcheck="false"
                  autocapitalize="none"
                  placeholder="예) 50"
                  v-model="basicInfo.dscntRate"
                />
              </div>
            </label>
          </div>

          <div class="prdt-input-box">
            <div class="input-label">
              <span>
                배송비
                <span class="icon--required">*</span>
              </span>
            </div>

            <radio-group
              :list="deliveries"
              :id-prefix="'prdt-deli-opt'"
              outer-class="radio-group--prdt"
              v-model="basicInfo.delivery"
              @change="changeDelivery"
            ></radio-group>
          </div>

          <div class="prdt-input-box">
            <div class="input-field">
              <div class="input-label">
                <span>옵션</span>
              </div>

              <div>
                <button class="btn" @click="setOption">{{ hasOpt ? '모두 삭제' : '옵션 등록' }}</button>
              </div>
            </div>
          </div>

          <div class="prdt-option-config-box" v-if="hasOpt">
            <div class="prdt-input-box">
              <label class="input-field">
                <div class="input-label">
                  <span id="prdt-opt-label">옵션 이름</span>
                </div>

                <div class="text-input">
                  <input
                    type="text"
                    class="text-input__input"
                    aria-labelledby="prdt-opt-label"
                    aria-required="true"
                    autocomplete="off"
                    autocorrect="off"
                    spellcheck="false"
                    autocapitalize="none"
                    placeholder="예) 사이즈"
                    v-model="optLabel"
                  />
                </div>

                <button class="btn btn--dark" @click="addOption">+</button>
              </label>
            </div>

            <ul @click="(evt) => deleteOpt(evt)">
              <li class="prdt-input-box" v-for="(item, index) in optList" :key="index">
                <label class="input-field">
                  <div class="input-label">
                    <span :id="`prdt-opt-${index + 1}`">옵션 {{ index + 1 }}</span>
                  </div>

                  <div class="text-input">
                    <input
                      type="text"
                      class="text-input__input"
                      :aria-labelledby="`prdt-opt-${index + 1}`"
                      aria-required="true"
                      autocomplete="off"
                      autocorrect="off"
                      spellcheck="false"
                      autocapitalize="none"
                      :placeholder="index ? '' : '예) S'"
                      v-model="item.label"
                    />
                  </div>

                  <div class="text-input prdt-option-config-box__inven">
                    <input
                      type="number"
                      class="text-input__input"
                      min="0"
                      aria-valuemin="0"
                      :aria-valuenow="0"
                      :aria-label="`옵션${index + 1} 재고수량`"
                      :placeholder="index ? '' : '재고수량 / 예) 100'"
                      v-model="item.inventory"
                    />
                  </div>

                  <button class="btn" :data-opt-index="index">-</button>
                </label>
              </li>
            </ul>
          </div>

          <div class="prdt-input-box">
            <label class="input-field">
              <div class="input-label">
                <span id="prdt-inventory">
                  재고수량
                  <span class="icon--required">*</span>
                </span>
              </div>

              <div class="text-input">
                <input
                  type="text"
                  class="text-input__input"
                  aria-labelledby="prdt-inventory"
                  aria-required="true"
                  autocomplete="off"
                  autocorrect="off"
                  spellcheck="false"
                  autocapitalize="none"
                  :readonly="hasOpt"
                  v-model="basicInfo.inventory"
                />
              </div>
            </label>
          </div>
          <div class="prdt-input-box prdt-input-box--desc">옵션 설정시, 옵션별 재고수량이 자동 합산됩니다.</div>
        </fieldset>

        <fieldset class="prdt-fs">
          <legend class="prdt-fs__title">
            <h2 class="title title--min">상세 정보</h2>
          </legend>

          <div class="prdt-input-box">
            <div class="input-label">
              <span>
                상품 상태
                <span class="icon--required">*</span>
              </span>
            </div>

            <radio-group
              :list="conditions"
              :id-prefix="'prdt-condi-opt'"
              outer-class="radio-group--prdt"
              v-model="prdtCondition"
              @change="changePrdtCondition"
            ></radio-group>
          </div>

          <div class="prdt-input-box prdt-input-box--chckbox">
            <div class="input-label">
              <span>
                소재
                <span class="icon--required">*</span>
              </span>
            </div>

            <div class="prdt-chckbox-group">
              <checkbox
                v-for="(item, index) in materials"
                :key="index"
                :label="item.label"
                :id="`prdt-materials-opt-${index + 1}`"
                @change="(val) => selectMaterials(val, item)"
              ></checkbox>
            </div>

            <div class="prdt-chckbox-group--addi">
              <div
                class="prdt-material-info-field"
                v-for="(item, index) in selectedMaterials"
                :key="index"
              >
                <div
                  class="prdt-material-info-field__label"
                  :id="`prdt-material-${index + 1}`"
                >{{ item.material }}</div>

                <div class="text-input">
                  <input
                    type="text"
                    class="text-input__input"
                    :aria-labelledby="`prdt-material-${index + 1}`"
                    aria-required="true"
                    autocomplete="off"
                    autocorrect="off"
                    spellcheck="false"
                    autocapitalize="none"
                    v-model="item.content"
                  />
                </div>
                <div class="prdt-material-info-field__unit">%</div>
              </div>
            </div>
          </div>

          <div class="prdt-input-box prdt-input-box--chckbox">
            <div class="input-label">
              <span>
                세탁방법
                <span class="icon--required">*</span>
              </span>
            </div>

            <div class="prdt-chckbox-group">
              <checkbox
                v-for="(item, index) in laundries"
                :key="index"
                :label="item.label"
                :id="`prdt-laundries-opt-${index + 1}`"
                @change="(val) => selecLaundries(val, item)"
              ></checkbox>
            </div>
          </div>
        </fieldset>

        <fieldset class="prdt-fs">
          <legend class="prdt-fs__title">
            <h2 class="title title--min">검색엔진최적화 정보</h2>
          </legend>

          <div class="prdt-input-box">
            <label class="input-field">
              <div class="input-label">
                <span id="prdt-description">
                  상품 설명
                  <span class="icon--required">*</span>
                </span>
              </div>

              <div class="text-input">
                <input
                  type="text"
                  class="text-input__input"
                  aria-labelledby="prdt-description"
                  aria-required="true"
                  autocomplete="off"
                  autocorrect="off"
                  spellcheck="false"
                  autocapitalize="none"
                  v-model="seoInfo.description"
                />
              </div>
            </label>
          </div>

          <div class="prdt-input-box">
            <label class="input-field">
              <div class="input-label">
                <span id="prdt-seller">
                  판매자
                  <span class="icon--required">*</span>
                </span>
              </div>

              <div class="text-input">
                <input
                  type="text"
                  class="text-input__input"
                  aria-labelledby="prdt-seller"
                  aria-required="true"
                  autocomplete="off"
                  autocorrect="off"
                  spellcheck="false"
                  autocapitalize="none"
                  v-model="seoInfo.seller"
                />
              </div>
            </label>
          </div>
          <div
            class="prdt-input-box prdt-input-box--desc"
          >해당 입력란은 추가적인 정보이며, 상품 등록시 저장한 거의 모든 정보가 검색엔진최적화에 사용됩니다.</div>
        </fieldset>

        <div class="centering-box centering-box--pad-40">
          <button
            type="button"
            class="em-btn em-btn--buy-now"
            :class="{ 'btn--disabled' : !formDone }"
            :disabled="!formDone"
            @click="saveData"
          >상품 등록</button>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      fixedBarRight: 40,
      basicInfo: {
        prdtName: "",
        brandCd: "",
        brandName: "",
        originPrice: null,
        currency: "KRW",
        dscntRate: null,
        delivery: "DV002",
        inventory: null,
      },
      prdtCondition: "CO002",
      selectedMaterials: [],
      selectedLaundries: [],
      hasOpt: false,
      optLabel: "",
      optList: [],
      seoInfo: {
        description: "",
        seller: "배드해빗클럽",
      },
      openBrandBox: false,
      brandSearchText: "",
      fetchedBrandList: [],
      searchedBrandList: [],
      deliveries: [
        {
          label: "무료배송",
          value: "DV001",
        },
        {
          label: "일반배송",
          value: "DV002",
        },
      ],
      conditions: [
        {
          label: "중고",
          value: "CO001",
        },
        {
          label: "새상품",
          value: "CO002",
        },
        {
          label: "환불상품",
          value: "CO003",
        },
      ],
      materials: [
        {
          label: "면",
          value: "MT001",
        },
        {
          label: "마",
          value: "MT002",
        },
        {
          label: "실크",
          value: "MT003",
        },
        {
          label: "아크릴",
          value: "MT004",
        },
      ],
      laundries: [
        {
          label: "첫 세탁 단독세탁",
          value: "LD001",
        },
        {
          label: "손세탁",
          value: "LD002",
        },
        {
          label: "세탁기",
          value: "LD003",
        },
        {
          label: "드라이클리닝",
          value: "LD004",
        },
        {
          label: "건조기 사용 불가",
          value: "LD005",
        },
      ],
    };
  },
  computed: {
    inventoryCnt() {
      return this.optList.reduce(
        (accm, item) => accm + parseInt(item.inventory),
        0
      );
    },
    basicFsDone() {
      const requiredDone =
        this.basicInfo.prdtName.length &&
        this.basicInfo.brandName.length &&
        (this.basicInfo.originPrice > 0 || this.basicInfo.originPrice === 0) &&
        (this.basicInfo.dscntRate > 0 || this.basicInfo.dscntRate === 0) &&
        this.deliveries
          .map((item) => item.value)
          .indexOf(this.basicInfo.delivery) > -1 &&
        (this.basicInfo.inventory > 0 || this.basicInfo.inventory === 0);

      const optionalDone = this.hasOpt
        ? this.optLabel.length &&
          this.optList.length &&
          this.optList.every(
            (item) =>
              item.label.length && (item.inventory > 0 || item.inventory === 0)
          )
        : true;

      return requiredDone && optionalDone;
    },
    detailsFsDone() {
      return (
        this.conditions.map((item) => item.value).indexOf(this.prdtCondition) >
          -1 &&
        this.selectedMaterials.length &&
        this.selectedLaundries.length
      );
    },
    seoFsDone() {
      return this.seoInfo.description.length && this.seoInfo.seller.length;
    },
    progressValuenow() {
      return (
        ([this.basicFsDone, this.detailsFsDone, this.seoFsDone].filter(
          (item) => item
        ).length /
          3) *
        100
      );
    },
    formDone() {
      return this.progressValuenow === 100;
    },
  },
  watch: {
    inventoryCnt(newVal) {
      this.basicInfo.inventory = newVal;
    },
    openBrandBox(newVal) {
      if (!newVal) return;

      // api + this.brandSearchText
      this.fetchedBrandList = [
        {
          brandName: "배드해빗클럽",
          cd: "BR001",
          brandNameEn: "Bad Habit Club",
        },
        {
          brandName: "배드보이",
          cd: "BR002",
          brandNameEn: "Bad Boy",
        },
        {
          brandName: "오아이오아이",
          cd: "BR001",
          brandNameEn: "OiOi",
        },
        {
          brandName: "콤팍트",
          cd: "BR001",
          brandNameEn: "Kompakt",
        },
        {
          brandName: "배비",
          cd: "BR001",
          brandNameEn: "Baby",
        },
      ];
    },
    brandSearchText(newVal) {
      if (!newVal.length) return (this.searchedBrandList = []);
      this.search();
    },
  },
  methods: {
    selectNewBrand() {
      this.basicInfo.brandCd = "";
      this.basicInfo.brandName = this.brandSearchText;
      this.openBrandBox = false;
    },
    selectBrand(evt) {
      const target = evt.target;
      if (target.tagName !== "BUTTON") return;

      this.basicInfo.brandCd = target.dataset.cd;
      this.basicInfo.brandName = target.dataset.brandName;
      this.openBrandBox = false;
    },
    search() {
      this.searchedBrandList = this.fetchedBrandList.filter(
        (item) =>
          `${item.brandName} ${item.brandNameEn} ${item.cd}`.indexOf(
            this.brandSearchText
          ) > -1
      );
    },
    selectCurrency(val) {
      this.basicInfo.currency = val.value;
    },
    changeDelivery(val) {
      this.basicInfo.delivery = val;
    },
    setOption() {
      this.hasOpt = !this.hasOpt;
      this.basicInfo.inventory = 0;
      this.optList = [];
    },
    addOption() {
      this.optList.push({ label: "", inventory: 0 });
    },
    deleteOpt(evt) {
      const target = evt.target;
      if (target.tagName !== "BUTTON") return;
      this.optList.splice(target.dataset.optIndex, 1);
    },
    changePrdtCondition(val) {
      this.prdtCondition = val;
    },
    selectMaterials(val, item) {
      if (val)
        return this.selectedMaterials.push({
          material: item.value,
          content: 0,
        });

      const index = this.selectedMaterials
        .map((item) => item.material)
        .indexOf(item.value);
      this.selectedMaterials.splice(index, 1);
    },
    selecLaundries(val, item) {
      if (val) return this.selectedLaundries.push(item.value);

      const index = this.selectedLaundries.indexOf(item.value);
      this.selectedLaundries.splice(index, 1);
    },
    saveData() {
      // api
      this.$router.push("dash-board");
    },
    getFixedBarRight() {
      if (window.innerWidth > 1240)
        this.fixedBarRight += (window.innerWidth - 1240) / 2;
      else this.fixedBarRight = 40;
    },
  },
  mounted() {
    window.addEventListener("resize", this.getFixedBarRight);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getFixedBarRight);
  },
};
</script>

<style>
</style>