<template>
	<div class="cmt-container">
		<h3>发表评论</h3>
		<hr />
		<textarea placeholder="请输入要评论的内容（120字）" maxlength="120" v-model="msg"></textarea>
		<mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
		<div class="cmt-list">
			<div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
				<div class="cmt-title">
					<!--不要i++ i++会重新赋值给i-->
					第{{i+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;
					发表时间:{{item.add_time | dataFormat}}
				</div>
				<div class="cmt-body">
					{{ item.content === 'undefined' ? '此用户很懒，嘛都没说' : item.content}}
				</div>
			</div>
		</div>
		<mt-button type="danger" size="large" plain @click='getMore'>加载更多</mt-button>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	export default{
		data(){
			return {
				pageIndex:1,//默认展示第一页数据
				comments:[],
				msg:''
			}
		},
		created(){
			this.getComments()
		},
		methods:{
			getComments(){
				this.$http.get("api/getcomments/"+this.id+"?pageindex="+
				this.pageIndex).then(result=>{
					if(result.body.status === 0 ){
						//每当获取新评论数据，不要把老数据覆盖，而是 应该以老叔数据拼接上新数据
						this.comments=this.comments.concat(result.body.message)
//						console.log(this.comments)
					}else{
						Toast('获取评论失败')
					}
				})
			},
			getMore(){
				this.pageIndex++
				this.getComments()
			},
			postComment(){
				if(this.msg.trim().length===0){
					return Toast("评论内部不能为空")
				}
				this.$http.post('api/postcomment/'+this.id,
				{content:this.msg.trim()}).then(result=>{
					if(result.body.status === 0){
						var cmt={
							user_name:'匿名用户',
							add_time:Date.now(),
							content:this.msg.trim()
							}
						this.comments.unshift(cmt)//头部追加
						this.msg=""
					}else{
						Toast("评论提交失败")
					}
				})
			},
			
		},
		props:['id']
	}
</script>

<style lang="scss" scoped>
	.cmt-container{
		h3{
			font-size: 18px;
		}
		textarea{
			font-size: 14px;
			height: 85px;
			margin: 0;
			/*控制台箭标查看*/
		}
		.cmt-list{
			margin: 5px 0;
			.cmt-item{
				font-size:13px;
				.cmt-title{
					line-height: 30px;
					background-color: #ccc;
				}
				.cmt-body{
					line-height: 35px;
					text-indent: 2em;
				}
			}
		}
	}
</style>