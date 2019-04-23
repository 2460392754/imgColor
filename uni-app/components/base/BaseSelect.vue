<template>
	<view class="base-select">
		<picker @change="change" :value="index" :range="list">
			<view class="picker">{{ list[index] }}</view>
		</picker>
		<text class="cuIcon-right lg text-gray"></text>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: () => ['请选择']
		},
		initIndex: {
			type: Number,
			default: 0
		}
	},

	data() {
		return {
			index: this.initIndex
		};
	},

	methods: {
		change(e) {
			const { value: index } = e.detail;

			this.index = index;
			this.$emit('change', this.list[index], index);
		}
	}
};
</script>

<style>
.base-select {
	display: flex;
	align-items: center;
}

.base-select picker {
	width: 100%;
	text-align: right;
	padding-right: 20px;
}
</style>
