<template>
	<div>
		<progress-header :list="progressList"></progress-header>

		<main role="main">
			<section class="section section--delete">
				<div class="container">
					<router-view
						@select-reason="storeReason"
						:storedReason="storedReason"
					></router-view>
				</div>
			</section>
		</main>
	</div>
</template>

<script>
export default {
	data() {
		return {
			progressList: [
				{ label: "이유 선택", path: "reasons" },
				{ label: "확인", path: "confirm" },
				{ label: "완료", path: "complete" },
			],
			storedReason: null,
		};
	},
	methods: {
		storeReason(val) {
			this.storedReason = val;
		},
	},
};
</script>

<style></style>
