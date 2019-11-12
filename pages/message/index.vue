<template>
	<view class="message">
		<view class="notread-message-list" v-for="item in notreadmessages" :key="item.id"><message-item :message="item"></message-item></view>
		<view class="read-message-list" v-for="item in readmessages" :key="item.id"><message-item :message="item"></message-item></view>
	</view>
</template>

<script>
import messageItem from '@/components/information/message-item.vue';
import { mapState, mapActions } from 'vuex';
export default {
	data() {
		return {
			notreadmessages: this.notreadMessages,
			readmessages: this.readMessages
		};
	},
	watch: {
		readMessages() {
			this.notreadmessages = this.notreadMessages;
			this.readmessages = this.readMessages;
		}
	},
	onShow() {
		this.notreadmessages = this.notreadMessages;
		this.readmessages = this.readMessages;
	},
	components: {
		messageItem
	},
	computed: {
		...mapState(['readMessages', 'notreadMessages', 'accessToken'])
	},
	methods: {
		...mapActions(['getMessages'])
	}
};
</script>

<style lang="less"></style>
