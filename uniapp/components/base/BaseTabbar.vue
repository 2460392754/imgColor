<template>
	<view class="cu-bar tabbar bg-white shadow foot">
		<view class="action" @click="redirect" data-cur="index">
			<view class="cuIcon-cu-image"><image :src="imgSrc('index')"></image></view>
			<view :class="PageCur == 'index' ? 'text-green' : 'text-gray'">首页</view>
		</view>
		<view class="action" @click="redirect" data-cur="about">
			<view class="cuIcon-cu-image"><image :src="imgSrc('about')"></image></view>
			<view :class="PageCur == 'about' ? 'text-green' : 'text-gray'">关于</view>
		</view>
	</view>
</template>

<script>
import $uni from '../../utils/uni/api.js';

export default {
	props: {
		PageCur: {
			type: String,
			default: 'index'
		}
	},
	
	computed: {
		// 图片路径
		imgSrc() {
			return type => {
				const pageCur = this.PageCur,
					str = pageCur == type ? '_cur' : '';

				return `/static/tabbar/${type + str}.png`;
			};
		}
	},

	methods: {
		// 切换页面
		redirect(e) {
			const PageCur = e.currentTarget.dataset.cur;

			$uni.route.redirectTo(`/pages/${PageCur}/Index`);
		}
	}
};
</script>

<style></style>
