<template>
	<view class="base-tabs">
		<!-- <scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view v-for="(item, index) in 4" :key="index" @tap="tabSelect" :data-id="index">
					<view class="cu-item flex-sub" :class="index == TabCur ? 'text-orange cur' : ''">tab{{ index }}</view>
					<view v-if="TabCur == index" class="content">
						{{ index }}<br />
						{{ index }}<br />
						{{ index }}<br />
						{{ index }}<br />
						{{ index }}<br />
						{{ index }}<br />
					</view>
				</view>
			</view>
		</scroll-view> -->

		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center"><slot class="content"></slot></view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			TabCur: 0,
			scrollLeft: 0
		};
	},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		}
	}
};
</script>

<style>
.base-tabs .flex > * {
	position: absolute;
	width: 100%;
	left: 0;
}
</style>
