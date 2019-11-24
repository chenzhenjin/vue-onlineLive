<template>
	<div class="mui-numbox" data-numbox-min='1' data-numbox-step='1' style="height:25px">
		<button class="mui-btn mui-btn-numbox-minus" type="button" >-</button>
		<input id="test" class="mui-input-numbox" type="number" :value="initcount" 
			@change.stop="countChanged"  ref="numbox"/>
		<button class="mui-btn mui-btn-numbox-plus" type="button" >+</button>
	</div>
</template>

<script>
	import mui from '../../lib/mui/js/mui.js'
	export default{
		data(){
			return{
			}
		},
		mounted(){
			mui('.mui-numbox').numbox()
//			console.log(this.max)
		},
		methods:{
			countChanged(){
//				console.log(this.$refs.numbox.value)
//每当数量值改变，则立即把最新的数量同步到购物车的store中，覆盖之前的数量值
				this.$store.commit('updateGoodsInfo',{
					id:this.goodsid,
					count:this.$refs.numbox.value})
			},			
		},
		props:['initcount','goodsid']
	}
</script>

<style lang="scss" scoped>
	.mui-numbox{
		width: 100px;
		padding: 0 30px 0 30px;
	}
	.mui-numbox [class*=btn-numbox] {
		width: 30px;
	}
</style>