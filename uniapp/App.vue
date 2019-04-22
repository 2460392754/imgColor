<script>
import Vue from 'vue';
import $uniComponents from 'utils/uni/components.js';


export default {
	onLaunch: function() {
		$uniComponents.nav();
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
@import '/wxcomponents/colorui/main.css';
@import '/wxcomponents/colorui/icon.css';
@import '/wxcomponents/colorui/animation.css';
@import '/css/global.css';
</style>
