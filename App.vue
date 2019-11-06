<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("static/css/uni.css");
	@import url("static/css/ui.less");
	
	page {
		background-color: #F4F5F6;
	}
</style>
