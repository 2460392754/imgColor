<template>
	<view :class="['cu-modal', modalName === 'Modal' ? 'show' : '']">
		<view class="cu-dialog">
			<view class="cu-bar bg-white justify-end">
				<view class="content">
					<slot name='title'></slot>
				</view>
				<view class="action" bindtap="hideModal"><text class="cuIcon-close text-red" @click="cancel"></text></view>
			</view>
			<view class="padding-xl">
				<slot name='content'></slot>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		modalName: String
	},

	methods: {
		cancel() {
			this.$emit('update:modalName', '');
		}
	}
};
</script>

<style></style>
