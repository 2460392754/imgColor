<template>
	<!-- pages.json 设置"navigationStyle": "custom"-->
	<cu-custom bgColor="bg-gradual-blue" :isBack="back !== null">
		<block slot="backText">{{ back }}</block>
		<block slot="content">{{ title }}</block>
	</cu-custom>
</template>

<script>
import CuCustom from '@/wxcomponents/colorui/components/cu-custom.vue';

export default {
	props: {
		back: {
			type: String,
			default: null
		},
		title: {
			type: String,
			default: 'title'
		}
	},

	components: {
		CuCustom
	}
};
</script>

<style></style>
