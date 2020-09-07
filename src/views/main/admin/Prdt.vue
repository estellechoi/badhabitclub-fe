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
                  v-model="regInfo.prdtName"
                />
              </div>
            </label>
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
                  v-model="regInfo.originPrice"
                />
              </div>
            </label>
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
                  v-model="regInfo.dscntRate"
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
              v-model="regInfo.delivery"
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
                <span id="prdt-name">
                  재고수량
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
                  :readonly="hasOpt"
                  v-model="regInfo.inventory"
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
                >{{ item }}</div>

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
        </fieldset>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      fixedBarRight: 40,
      regInfo: {
        prdtName: "",
        originPrice: null,
        dscntRate: null,
        delivery: "DV002",
        inventory: null,
      },
      hasOpt: false,
      optLabel: "",
      optList: [],
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
      selectedMaterials: [],
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
        this.regInfo.prdtName.length &&
        (this.regInfo.originPrice > 0 || this.regInfo.originPrice === 0) &&
        (this.regInfo.dscntRate > 0 || this.regInfo.dscntRate === 0) &&
        this.deliveries
          .map((item) => item.value)
          .indexOf(this.regInfo.delivery) > -1 &&
        (this.regInfo.inventory > 0 || this.regInfo.inventory === 0);

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
    progressValuenow() {
      return this.basicFsDone ? 100 / 3 : 0;
    },
  },
  watch: {
    inventoryCnt(newVal) {
      this.regInfo.inventory = newVal;
    },
  },
  methods: {
    changeDelivery(val) {
      this.regInfo.delivery = val;
    },
    setOption() {
      this.hasOpt = !this.hasOpt;
      this.regInfo.inventory = 0;
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
    selectMaterials(val, item) {
      if (val) return this.selectedMaterials.push(item.value);

      const index = this.selectedMaterials.indexOf(item.value);
      this.selectedMaterials.splice(index, 1);
    },
    selecLaundries(val, item) {
      console.log(val, item);
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