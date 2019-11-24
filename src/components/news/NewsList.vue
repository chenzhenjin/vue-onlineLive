<template>
	<div>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
				<router-link :to="'/home/newsinfo/'+item.id">
					<!--:to表达式 to只能接字符串-->
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
						<h1>{{item.title}}</h1>
						<p class='mui-ellipsis'>
							<!--全局注册过滤器-->
							<span>发表时间:{{item.add_time | dataFormat("YYYY-MM-DD")}}</span>
							<span>点击:{{item.click}}次</span>
							<!--不要出现中文：不然 结尾会带;-->
						</p>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	export default{
		data(){
			return {
				newslist:[]
			}
		},
		created(){
			this.getNewList()
		},
		methods:{
			getNewList(){
				this.$http.get('api/getnewslist').then(result=>{
					if(result.body.status === 0){
						this.newslist=result.body.message
//						console.log(this.newslist)
					}else{
						Toast('获取新闻列表失败')
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mui-table-view{
		li{
			h1{font-size: 14px;}
			.mui-ellipsis{
				font-size: 12px;
				color: #226aff;
				display: flex;
				justify-content: space-between;
			}
		}
	}
</style>