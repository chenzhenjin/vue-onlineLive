<template>
	<div class="newsinfo-container">
		<h3 class="title">{{newsinfo.title}}</h3>
		<p class="subtitle">
			<span>发表时间:{{newsinfo.add_time | dataFormat}}</span>
			<span>点击:{{newsinfo.click}}次</span>
		</p>
		<hr />
		<div class="content" v-html="newsinfo.content"></div>
		<!--引入组件,传id-->
		<comment-box :id="id"></comment-box>
	</div>
</template>

<script>
	import comment from '../subcomponents/comment'
	import {Toast} from 'mint-ui'
	export default{
		data(){
			return {
				id:this.$route.params.id,//将url地址中传递过来的id值，挂载到data上
				newsinfo:{}
			}
		},
		created(){
			this.getNewsInfo()
		},
		methods:{
			getNewsInfo(){
				//api/getnew/:id :id指的是替换参数
//				console.log(this.$route)
				this.$http.get('api/getnew/' + this.id).then(result=>{
					if(result.body.status === 0){
//						console.log(result.body)
						this.newsinfo=result.body.message[0]
					}else{
						Toast("获取新闻详情失败")
					}
				})
			}
		},
		components:{//注册子组件
			'comment-box':comment
		}
	}
</script>

<style lang="scss">
	/*scoped图片原因*/
.newsinfo-container{
	padding: 0 4px;
	.title{
		font-size: 16px;
		text-align: center;
		margin:15px 0;
		color: red;
	}
	.subtitle{
		font-size: 13px;
		color: blue;
		display: flex;
		justify-content: space-between;
	}
	.content{
		img{
			width: 100%;
		}
	}
}
</style>