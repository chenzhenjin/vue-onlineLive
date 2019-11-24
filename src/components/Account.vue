<template>
	<div class="ceshi">
		<h1>这是account</h1>
		<router-link to="/account/login">登录</router-link>
		<router-link to="/account/register">注册</router-link>
		<router-view></router-view>
	</div>
</template>

<script>
</script>

<style lang="scss" scoped>
	/*普通的style标签只支持普通的样式
	 如果想要启用scss或less lang属性
	 只要咱们的style标签，是在.vue组件中的定义的，那么推荐都为style开启scoped
	 * */
	body{
		.ceshi{
			font-style: italic;
		}
	}
</style>