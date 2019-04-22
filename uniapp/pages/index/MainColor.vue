<template>
	<view class="mainColor">
		<!-- nav导航 -->
		<base-nav title="图片主色调" back="返回"></base-nav>

		<!-- 上传 -->
		<base-upload @upload="upload" :count="1"></base-upload>

		<!-- 隐藏的cav 用于填充上传文件-->
		<view class="canvas-img"><canvas :canvas-id="cav.id" :style="{ width: cav.width + 'px', height: cav.height + 'px' }"></canvas></view>

		<!-- charts 图表 -->
		<view class="qiun-charts">
			<!--#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO-->
			<canvas
				:canvas-id="charts.id"
				id="canvasPie"
				class="charts"
				:style="{
					width: charts.width * charts.pixelRatio + 'px',
					height: charts.height * charts.pixelRatio + 'px',
					transform: 'scale(' + 1 / charts.pixelRatio + ')',
					'margin-left': (-charts.width * (charts.pixelRatio - 1)) / 2 + 'px',
					'margin-top': (-charts.height * (charts.pixelRatio - 1)) / 2 + 'px'
				}"
			></canvas>
			<!--#endif-->

			<!--#ifdef MP-WEIXIN || APP-PLUS -->
			<canvas :canvas-id="charts.id" id="canvasPie" class="charts"></canvas>
			<!--#endif-->
		</view>

		<!-- 加载动画 -->
		<base-loading :isShow="isShow"></base-loading>
	</view>
</template>

<script>
import $uni from '@/utils/uni/api.js';
import BaseNav from '@/components/base/BaseNav.vue';
import BaseUpload from '@/components/base/BaseUpload.vue';
import BaseLoading from '@/components/base/BaseLoading.vue';
import computed from '@/js/computed.js';
import charts from '@/js/charts.js';
import rgbHex from 'rgb-hex';
import wxCharts from '@/wxcomponents/wx-charts/wxcharts.js';

export default {
	data() {
		return {
			isShow: false,
			cav: {
				width: 0,
				height: 0,
				id: 'img'
			},
			charts: {
				width: uni.upx2px(750),
				height: uni.upx2px(500),
				pixelRatio: 1,
				id: 'cavPie',
				exampleObj: null,
				data: {
					series: []
				}
			}
		};
	},

	methods: {
		// 上传
		upload(files) {
			const path = files.tempFilePaths[0];

			this._chartsLoad(path);
		},

		// 加载 charts
		async _chartsLoad(imgPath) {
			this.isShow = true;

			const colorArr = await this.computed(imgPath),
				series = this._colorArrFormat(colorArr);

			this.charts.data.series = series;

			if (this.exampleObj) {
				charts.updateData(this.exampleObj, series);
			} else {
				this.exampleObj = charts.load.call(this);
			}

			this.isShow = false;
		},

		// 计算颜色和设置cav参数
		async computed(imgPath) {
			const { width, height } = await $uni.media.img.getInfo(imgPath);
			this.cav.width = width;
			this.cav.height = height;

			return await computed.mainColor(this.cav.id, imgPath);
		},

		// 数据格式化
		_colorArrFormat(arr) {
			// console.log(arr)
			let tempArr = [];

			for (let item of arr) {
				let rgbaArr = item[0].split(',');

				rgbaArr.length = 3;
				rgbaArr.join(',');

				const Hex = this._rgbToHex(rgbaArr);
				const count = item[1];

				tempArr.push({
					name: Hex,
					color: Hex,
					data: count
				});
			}

			return tempArr;
		},

		// rgb to 16进制
		_rgbToHex(rgba) {
			return '#' + rgbHex(`rgba(${rgba})`);
		}
	},

	created() {
		charts.init.call(this);
	},

	components: {
		BaseNav,
		BaseUpload,
		BaseLoading
	}
};
</script>

<style>
.mainColor {
	height: 100%;
}

.mainColor .charts {
	width: 750upx;
	height: 500upx;
}

.mainColor .canvas-img {
/* 	height: 0;
	overflow-y: hidden; */
}

.mainColor .qiun-charts {
	position: absolute;
	bottom: 100upx;
}
</style>
