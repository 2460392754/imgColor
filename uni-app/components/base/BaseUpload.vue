<template>
	<view class="base-upload">
		<view class="bg" @tap="baseUpload"><text class="icon cuIcon-cameraadd lg"></text></view>
	</view>
</template>

<script>
import $uni from '@/utils/uni/api.js';

export default {
	props: {
		count: Number
	},

	methods: {
		async baseUpload() {
			const opts = {
					count: this.count
				},
				uploadRetObj = await $uni.media.img.upload(opts);

			this.$emit('upload', uploadRetObj);
		}
	}
};
</script>

<style>
.base-upload {
	color: #3399ff;
	width: max-content;
	margin: 50px auto;
	outline: none;
	border: none;
	list-style: none;
}

.base-upload > .bg {
	border: none;
	height: 300upx;
	width: 300upx;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #f5f5f5;
	border-radius: 100%;
	transition: background-color 0.5s;
	cursor: pointer;
}

.base-upload .cuIcon-cameraadd {
	font-size: 100upx;
}
</style>
