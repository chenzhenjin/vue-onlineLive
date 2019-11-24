<template>
	<div>
		<div :class="['mui-switch',{'mui-active':selected}]" @click="swicth">
		  <div class="mui-switch-handle"></div>
		</div>
	</div>
</template>

<script>
	import mui from '../../lib/mui/js/mui.min.js'
	export default{
		data(){
			return {
				
			}
		},
		mounted(){
			mui('.mui-switch')['switch']()
		},
		methods:{
			swicth(){
				this.$store.commit('updateGoodsSelected',{
					id:this.goodsid,
					selected:!this.selected
				})
			}
		},
		props:['selected','goodsid']
	}
</script>

<style lang="scss" scoped>
	.mui-switch{
		width:66px;
		height: 30px;
	}
	.mui-switch.mui-active .mui-switch-handle{
		transform: translate(35px, 0);
	}
</style>