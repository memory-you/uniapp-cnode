<template>
	<view class="page-login">
		<view class="page-login-wrapper">
			<view class="page-login-logo"><image src="../../static/images/logo.png" mode=""></image></view>
			<view class="page-login-form">
				<view class="page-login-input">
					<input type="text" v-model="inputValue" placeholder="请输入Access Token" />
					<!-- #ifndef H5 -->
					<view class="saoma" @click="scanCode"><view class="iconfont icon-saoma "></view></view>
					<!-- #endif -->
				</view>
				<button class="page-login-btn" @click="login">登录</button>
			</view>
			<view class="page-login-footer">
				<text>CNode 社区为国内最专业的 Node.js 开源技术社区</text>
				<text>致力于 Node.js 的技术研究</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			inputValue: ''
		};
	},
	methods: {
		login() {
			if (this.inputValue.trim()) {
				this.$store.dispatch('getUserInfo', {
					accessToken: this.inputValue,
					callback: function() {
						uni.navigateBack({
							delta: 1
						});
					}
				});
			} else {
				uni.showToast({
					title: 'access token 不能为空',
					icon: 'none'
				});
			}
		},
		scanCode: function() {
			var self = this;
			uni.scanCode({
				scanType: ['qrCode'],
				success: function(res) {
					self.inputValue = res.result;
					self.login();
				},
				fail(res) {
					uni.showModal({
						content: res.errMsg
					});
				}
			});
		}
	}
};
</script>

<style lang="less">
.page-login {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background: #457bbe;
	
	&-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	&-logo {
		width: 252rpx;
		height: 58rpx;
		margin: 0 auto;

		image {
			width: 100%;
			height: 100%;
		}
	}

	&-form {
		padding-top: 100rpx;
	}

	&-input {
		position: relative;
		width: 500upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 76upx;
		text-align: center;
		background-color: #ffffff;
		margin: 0 auto;

		input {
			height: 76rpx;
			line-height: 76rpx;
			font-size: 34rpx;
			width: 450upx;
			margin: 0 auto;
		}

		.saoma {
			position: absolute;
			right: 0;
			top: 0;
			z-index: 9;
			display: flex;
			align-content: center;
			justify-content: center;
			height: 76upx;
			width: 76upx;
			.iconfont {
				line-height: 76upx;
			}
		}
	}

	&-btn {
		width: 500upx;
		height: 76upx;
		margin-top: 36upx;
		line-height: 76upx;
		border-radius: 76upx;
		color: #fff;
		font-size: 34upx;
		background-color: #15539f;
	}

	&-footer {
		position: absolute;
		left: 30upx;
		bottom: 30upx;
		right: 30upx;
		font-size: 24upx;
		color: rgba(255, 255, 255, 0.8);
		text {
			display: block;
			text-align: center;
		}
	}
}
</style>
