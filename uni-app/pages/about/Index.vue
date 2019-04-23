<template>
	<view class="about">
		<scroll-view scroll-y class="scrollPage">
			<view class="UCenter-bg">
				<image src="/static/logo.png" class="png" mode="widthFix"></image>
				<view class="text-xl">
					图片处理
					<text class="text-df">v1.0</text>
				</view>
				<view class="margin-top-sm"><text>By:Pocky</text></view>
				<image src="https://image.weilanwl.com/gif/wave.gif" mode="scaleToFill" class="gif-wave"></image>
			</view>
			<view class="padding flex text-center text-grey bg-white shadow-warp">
				<view class="flex flex-sub flex-direction solid-right">
					<view class="text-xxl text-orange">{{ visitTotal }}</view>
					<view class="margin-top-sm">
						<text class="cuIcon-attentionfill"></text>
						View
					</view>
				</view>
				<view class="flex flex-sub flex-direction solid-right">
					<view class="text-xxl text-blue">{{ starCount }}</view>
					<view class="margin-top-sm">
						<text class="cuIcon-favorfill"></text>
						Star
					</view>
				</view>
				<view class="flex flex-sub flex-direction">
					<view class="text-xxl text-green">{{ forksCount }}</view>
					<view class="margin-top-sm">
						<text class="cuIcon-fork"></text>
						Fork
					</view>
				</view>
			</view>
			<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
				<view class="cu-item arrow">
					<view class="content copy" @click="copy">
						<text class="cuIcon-github text-grey"></text>
						<text class="text-grey">GitHub</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<navigator class="content" url="/pages/about/log/log" hover-class="none">
						<text class="cuIcon-formfill text-green"></text>
						<text class="text-grey">日志</text>
					</navigator>
				</view>
				<view class="cu-item arrow">
					<button class="cu-btn content" open-type="feedback">
						<text class="cuIcon-writefill text-cyan"></text>
						<text class="text-grey">意见反馈</text>
					</button>
				</view>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>

		<base-modal :modalName.sync="modalName">
			<text slot="title">消息</text>
			<text slot="content">复制成功</text>
		</base-modal>

		<base-tabbar PageCur="about"></base-tabbar>
	</view>
</template>

<script>
import BaseTabbar from '@/components/base/BaseTabbar.vue';
import BaseModal from '@/components/base/BaseModal.vue';
import $uni from '@/utils/uni/api.js';
import $h5 from '@/utils/h5/api.js';

export default {
	data() {
		return {
			starCount: 0,
			forksCount: 0,
			visitTotal: 0,
			modalName: null
		};
	},

	methods: {
		copy(e) {
			const url = 'https://github.com/2460392754/imgColor';

			// #ifdef H5
			$h5.copy.set('.about .copy', url);
			this.modalName = 'Modal';
			// #endif

			// #ifndef H5
			$uni.system.copy.set(url);
			// #endif
		}
	},

	components: {
		BaseTabbar,
		BaseModal
	}
};
</script>

<style>
.about .UCenter-bg {
	background-image: url(https://image.weilanwl.com/color2.0/index.jpg);
	background-size: cover;
	height: 550rpx;
	display: flex;
	justify-content: center;
	padding-top: 40rpx;
	overflow: hidden;
	position: relative;
	flex-direction: column;
	align-items: center;
	color: #fff;
	font-weight: 300;
	text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.about .UCenter-bg text {
	opacity: 0.8;
}

.about .UCenter-bg image {
	width: 200rpx;
	height: 200rpx;
}

.about .UCenter-bg .gif-wave {
	position: absolute;
	width: 100%;
	bottom: 0;
	left: 0;
	z-index: 99;
	mix-blend-mode: screen;
	height: 100rpx;
}

.about map,
.about .mapBox {
	left: 0;
	z-index: 99;
	mix-blend-mode: screen;
	height: 100rpx;
}

.about map,
.about .mapBox {
	width: 750rpx;
	height: 300rpx;
}
</style>
