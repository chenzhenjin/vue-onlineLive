<template>
	<div>
		<input type="button" value="减少" @click="remove"/>
		<input type="button" value="增加" @click="add"/>
		<hr />
		<input type="text" v-model="$store.state.count" />
	</div>
</template>

<script>
	export default{
		data(){
			return {
//				count:0
			}
		},
		methods:{
			add(){
				//不符合vuex的设计理念
//				this.$store.state.count++
					this.$store.commit('increment')
			},
			remove(){
					this.$store.commit('substract',{c:3,d:1})
			}
		}
	}
</script>

<style>
</style>