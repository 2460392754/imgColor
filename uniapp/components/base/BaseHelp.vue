<template>
	<view class='base-help'>
		<button class="cu-btn help" @click="click">
			<text>?</text>
		</button>
	</view>
</template>

<script>
	export default {
		methods:{
			click(){
				this.$emit('click')
			}
		}
	}
</script>

<style>
	@keyframes baseHelpAnime {
	    0% {
	        transform: rotate(0deg);
	    }
	    50% {
	        transform: rotate(180deg);
	    }
	    100% {
	        transform: rotate(360deg);
	    }
	}
	
	.base-help .help{
		border-radius:100%;
		width:60upx;
		height:60upx;
		background: #f1f14f;
		color: #cecece;
		animation: 2s baseHelpAnime infinite;
	}
</style>
