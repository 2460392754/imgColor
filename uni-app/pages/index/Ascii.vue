<template>
	<view class="ascii">
		<!-- nav导航 -->
		<base-nav title="字符图" back="返回"></base-nav>

		<!-- 步骤条 -->
		<base-steps :numList="steps.list" :num="steps.num"></base-steps>

<!-- 		<view>
			<web-view :webview-styles="webviewStyles" src="https://uniapp.dcloud.io/static/web-view.html"></web-view>
		</view> -->

		<view class="tabs">
			<view v-if="steps.num === 0" class="upload"><base-upload @upload="upload" :count="1"></base-upload></view>

			<view v-if="steps.num === 1" class="confirm">
				<view><image :src="img.before.path" mode="widthFix"></image></view>
				<view class="content">
					<view class="before">
						<text>修改之前的数据</text>
						<view>大小: {{ img.before.size }}</view>
						<view>分辨率: {{ img.before.resolution.width }}x{{ img.before.resolution.height }}</view>
					</view>
					<view class="after">
						<text>修改之后的数据</text>
						<view class="select">
							<text>缩放比例:</text>
							<base-select :list="select" @change="confirmScaleChange" class="self-base-select"></base-select>
						</view>
						<view class="action">
							<text>填充方案:</text>
							<base-select :list="action" :initIndex="img.after.action - 1" @change="confirmActionChange" class="self-base-select"></base-select>
						</view>
						<view>分辨率: {{ img.after.resolution.width }}x{{ img.after.resolution.height }}</view>
					</view>
				</view>
				<view class="btns">
					<button class="cu-btn bg-orange shadow" @click="confirmCancel">取消</button>
					<button class="cu-btn bg-blue shadow" @click="confirmOk">下一步</button>
				</view>
			</view>

			<view v-if="steps.num === 2" class="transform">
				<view class="imgs">
					<image :src="img.before.path" mode="widthFix"></image>
					<image :src="img.after.path" mode="widthFix"></image>
				</view>

				<view class="content">
					<view>缩放比例: {{ img.after.scale }}</view>
					<view>填充方案: {{ img.after.action }}</view>
					<view>大小: {{ img.after.size }}</view>
					<view>分辨率: {{ img.after.resolution.width }}x{{ img.after.resolution.height }}</view>
				</view>

				<view class="btns">
					<button class="cu-btn bg-orange shadow" @click="transformCancel">取消</button>
					<button class="cu-btn bg-blue shadow" @click="transformOk">下一步</button>
				</view>
			</view>

			<view v-if="steps.num === 3">
				<button class="cu-btn bg-blue shadow" @click="downloadReset">重新开始</button>
				<button class="cu-btn bg-blue shadow" @click="downloadOk">下载</button>
			</view>
		</view>

		<!-- 帮助按钮 -->
		<base-help @click="clickHelp"></base-help>

		<!-- 帮助弹窗 -->
		<base-modal :modalName.sync="modalName">
			<view slot="title">帮助</view>
			<view slot="content"><view>123</view></view>
		</base-modal>

		<!-- 加载动画 -->
		<base-loading :isShow="isShow" content="转换中"></base-loading>

		<!-- 隐藏的cav 用于填充上传文件的数据-->
		<view class="cavHide">
			<canvas :canvas-id="cav.id" :id="cav.id" :style="{ width: cav.width + 'px', height: cav.height + 'px' }"></canvas>
			<canvas canvas-id="cavHtml" id="cavHtml" :style="{ width: cav.width * 15 + 'px', height: cav.height * 15 + 'px' }"></canvas>
		</view>
	</view>
</template>

<script>
import BaseNav from '@/components/base/BaseNav.vue';
import BaseUpload from '@/components/base/BaseUpload.vue';
import BaseLoading from '@/components/base/BaseLoading.vue';
import BaseModal from '@/components/base/BaseModal.vue';
import BaseSteps from '@/components/base/BaseSteps.vue';
import BaseSelect from '@/components/base/BaseSelect.vue';
import BaseHelp from '@/components/base/BaseHelp.vue';
import BaseTabs from '@/components/base/BaseTabs.vue';
import $uni from '@/utils/uni/api.js';
import $h5 from '@/utils/h5/api.js';
import computed from '@/js/computed.js';

export default {
	data() {
		return {
			isShow: false,
			TabCur: 0,
			modalName: null,
			steps: {
				num: 0,
				list: [{ name: '上传' }, { name: '确认' }, { name: '转换' }, { name: '下载' }]
			},
			cav: {
				id: 'cavImg',
				width: 0,
				height: 0
			},
			img: {
				before: {
					path: null,
					size: null,
					resolution: {
						width: null,
						height: null
					}
				},
				after: {
					path: null,
					size: null,
					scale: 1,
					action: 3,
					resolution: {
						width: null,
						height: null
					}
				}
			},
			select: [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1],
			action: [1, 2, 3, 4, 5, 6]
		};
	},

	methods: {
		// 上传
		upload(files) {
			const { path, size } = files.tempFiles[0];

			this.img.before.path = path;
			this.img.before.size = this._sizeFormat(size);

			this._stepsNext();
			this._confirmPage();
		},

		// 确认
		async _confirmPage() {
			const { width, height } = await $uni.media.img.getInfo(this.img.before.path);

			this.cav.width = width;
			this.cav.height = height;
			this.img.before.resolution = {
				width,
				height
			};
			this.img.after.resolution.width = width * 15;
			this.img.after.resolution.height = height * 15;
		},

		// 分辨率缩放 选择器, 更新参数
		confirmScaleChange(val) {
			this.img.after.scale = val;
			this.img.after.resolution.width = this.cav.width * val * 15;
			this.img.after.resolution.height = this.cav.height * val * 15;
		},

		// 填充方案 选择器, 更新参数
		confirmActionChange(val) {
			this.img.after.action = val;
		},

		confirmCancel() {
			this._stepsReset();
		},

		confirmOk() {
			this._transformPage();
			this._stepsNext();
		},

		// 转换
		async _transformPage() {
			this.isShow = true;
			const opts = {
				cavId: this.cav.id,
				path: this.img.before.path,
				cavHtmlTempId: 'cavHtml',
				scale: this.img.after.scale,
				action: this.img.after.action - 1
			};
			let { path, size, width, height } = await computed.ascii(opts);
			let tempPath;

			// #ifdef H5
			const blob = $h5.base64ToBlob(path);
			size = blob.size;
			tempPath = URL.createObjectURL(blob);
			// #endif

			// #ifndef H5
			const { savedFilePath } = await $uni.file.save(path);
			tempPath = savedFilePath;
			// #endif

			this.img.after.path = tempPath;
			this.img.after.size = this._sizeFormat(size);
			this.isShow = false;
		},

		transformCancel() {
			this._stepsReset();
		},

		
		transformOk() {
			this._stepsNext();
		},

		_downloadPage() {},

		async downloadOk() {
			// #ifdef H5
			const nowTime = new Date().getTime();
			$h5.download({
				href: this.img.after.path,
				download: `img_${nowTime}.png`
			});
			// #endif

			// #ifndef H5
			await $uni.media.img.save(this.img.after.path);
			// #endif

			console.log('is save success');
			$uni.ui.showToast({
				title: '下载成功'
			});
		},

		// 下载页面 重置
		downloadReset() {
			this._stepsReset();
		},

		// 图片占用大小格式转换
		_sizeFormat(size) {
			const arr = ['B', 'KB', 'MB'];

			if (size >= 10e5) {
				size = parseInt(size / 10e5) + arr[2];
			} else if (size >= 10e2) {
				size = parseInt(size / 10e2) + arr[1];
			} else {
				size += arr[0];
			}

			return size;
		},

		// 下一步 步骤条
		_stepsNext() {
			this.steps.num++;
		},

		// 重置 步骤条
		_stepsReset() {
			this.steps.num = 0;
		},

		// 帮助
		clickHelp() {
			this.modalName = 'Modal';
		}
	},

	components: {
		BaseNav,
		BaseUpload,
		BaseLoading,
		BaseModal,
		BaseSteps,
		BaseSelect,
		BaseHelp,
		BaseTabs
	}
};
</script>

<style scoped>
.ascii {
	background: #fff;
}

.ascii .tabs {
	width: 80%;
	margin: auto;
}

.ascii .btns {
	text-align: center;
	margin: 50upx 0;
}

.ascii .btns > button {
	margin: 0 30upx;
}

.ascii .confirm image {
	width: 100%;
	box-shadow: 0 0 3px 0px #e8e8e8;
}

.ascii .confirm .content > view,
.ascii .transform .content > view {
	margin-top: 40upx;
}

.ascii .content > view > view {
	padding-top: 14upx;
}

.ascii .content .select,
.ascii .content .action {
	display: flex;
	justify-content: space-between;
}

.ascii .content .select > .self-base-select {
	flex: 1;
}

.ascii .cavHide {
	position: fixed;
	z-index: -1;
	transform: translate(-100%, -100%);
}

.ascii #cavHtml {
	/* transform:scale(0.363,0.363) */
	font-family: Courier, monospace;
}
</style>
