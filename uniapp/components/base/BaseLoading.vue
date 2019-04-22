<template>
	<view class="cu-load load-modal" v-if="isShow">
		<view class="cuIcon-emojifill text-orange"></view>
		<!-- <image src="/static/logo.png" class="png" mode="aspectFit"></image> -->
		<view class="gray-text">{{content}}</view>
	</view>
</template>

<script>
export default {
	props: {
		isShow: Boolean,
		content: {
			type: String,
			default: '加载中...'
		}
	}
};
</script>

<style></style>
