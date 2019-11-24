<template>
	<div class="mui-numbox" data-numbox-min='1' data-numbox-step='1'>
		<button class="mui-btn mui-btn-numbox-minus" type="button" >-</button>
		<input id="test" class="mui-input-numbox" type="number" value="1" 
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
		},
		methods:{
			countChanged(){
//				console.log(this.$refs.numbox.value)
				var num=parseInt(this.$refs.numbox.value)
				if(num>this.max){
					num=this.max
				}
				this.$emit('getcount',num)
			}
		},
		props:['max'],
		watch:{
			'max':function(newval,oldval){
				mui('.mui-numbox').numbox().setOption('max',newval)
			}
		},
	}
</script>

<style lang="scss" scoped>
</style>