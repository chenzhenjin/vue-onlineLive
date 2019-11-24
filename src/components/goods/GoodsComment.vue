<template>
	<div>
		<cmtbox :id="$route.params.id"></cmtbox>
	</div>
</template>

<script>
	import cmtbox from '../subcomponents/comment'
	export default{
		components:{
			cmtbox
		}
	}
</script>

<style>
</style>