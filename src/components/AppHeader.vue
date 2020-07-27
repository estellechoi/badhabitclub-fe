<template>
  <!-- BANNER -->
  <!-- <aside class="banner">
				<a href="#"
					><div class="banner__content">
						카카오 친구 추가하고 3,000 절약해요!
						<span class="banner__due">7.31 까지</span>
					</div></a
				>
  </aside>-->

  <!--HEADER-->
  <header class="section">
    <div class="container">
      <div class="menu-group clearfix">
        <div class="logo float--left">
          <a href="#">
            브랜드 로고 이미지, 클릭하면 홈 화면으로 돌아갑니다.
            <!-- Brand logo image, if clicked, which gets you move back to home -->
          </a>
        </div>

        <nav class="sign-box float--right" aria-hidden="false">
          <a href="#" class="sign-box__btn btn btn--primary">
            <i class="fas fa-sign-in-alt"></i>
            <span class="menu-label">JOIN</span>
          </a>
          <a href="#" class="sign-box__btn btn btn--primary">
            <i class="fas fa-user"></i>
            <span class="menu-label">MY PAGE</span>
          </a>
          <a href="#" class="sign-box__btn btn btn--primary">
            <i class="fas fa-shopping-bag"></i>
            <span class="menu-label">BAG</span>
          </a>
        </nav>
      </div>

      <nav class="nav-group">
        <div id="nav-toggle-btn" class="btn btn--primary">
          <i class="fas fa-bars"></i>
        </div>
        <ul class="nav--main">
          <li>
            <a href="#">ALL</a>
          </li>
          <li>
            <a href="#">TOP</a>
          </li>
          <li>
            <a href="#">ACCESSORIES</a>
          </li>
          <li>
            <a href="#">ARCHIVE</a>
          </li>
        </ul>
        <form id="home-search-form" action method="get" role="search">
          <label for="home-search-box__input" class="search-box">
            <button
              type="button"
              aria-label="검색"
              id="home-search-box__btn"
              class="btn btn--primary search-box__btn"
            >
              <i class="fas fa-search"></i>
            </button>
            <div>
              <div id="home-search-box__input" class="search-box__input-box">
                <input
                  type="text"
                  aria-label="검색어 입력"
                  autocomplete="off"
                  autocorrect="off"
                  spellcheck="false"
                  aria-autocomplete="list"
                  aria-expanded="false"
                  role="combobox"
                  placeholder="상품명을 입력하세요."
                  class="search-box__input--text"
                />
              </div>
            </div>
          </label>
        </form>
      </nav>

      <!-- <nav class=""></nav> -->
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style>
</style>