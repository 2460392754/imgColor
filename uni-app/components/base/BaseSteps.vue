<template>
	<view class="bg-white padding">
		<view class="cu-steps">
			<view v-for="(item, index) of numList" :key="index" :class="['cu-item', index > num ? '' : 'text-blue']">
				{{ item.name }}
				<text class="num" :data-index="index + 1"></text>
				<!-- {{ item.name }} -->
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		num: Number,
		numList: {
			type: Array,
			default: () => [
				{
					name: '开始'
				},
				{
					name: '等待'
				},
				{
					name: '错误'
				},
				{
					name: '完成'
				}
			]
		}
	},

	methods: {
		numSteps() {
			const len = this.numList.length;

			this.num = len - 1 ? 0 : this.num + 1;
		}
	}
};
</script>

<style></style>
