<template>
	<div class="photoinfo-container">
		<h3>{{photoinfo.title}}</h3>
		<p class="subtitle">
			<span>发表时间:{{photoinfo.add_time | dataFormat}}</span>
			<span>点击:{{photoinfo.click}}次</span>
		</p>
		<hr />
		<vue-preview :slides="list" class="thumbs"></vue-preview>
		
		<div class="content" v-html="photoinfo.content"></div>
		<cmt-box :id="id"></cmt-box>
	</div>
</template>

<script>
	import comment from '../subcomponents/comment'
	export default{
		data(){
			return{
				id:this.$route.params.id,//获取路由中的图片id
				photoinfo:{},
//				slide1:[
//        {
//          src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
//          msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
//          w: 600,
//          h: 400
//        }
//      ],
        list:[]
			}
		},
		created(){
			this.getPhotoInfo()
			this.getThumbs()
		},
		methods:{
			getPhotoInfo(){
				this.$http.get('api/getimageInfo/'+this.id).then(result=>{
					if(result.body.status === 0 ){
						this.photoinfo=result.body.message[0]
					}
				})
			},
			getThumbs(){
				this.$http.get('api/getthumimages/'+this.id).then(result=>{
					if(result.body.status === 0 ){
						result.body.message.forEach(item=>{
							item.msrc=item.src
							item.w=600
							item.h=400
							//设置预览时宽高比例（超过设备的宽）或者宽高 
						})
						this.list=result.body.message
//						console.log(this.list)
					}
				})
			}
		},
		components:{
			'cmt-box':comment
		},
	}
</script>

<style lang="scss"  slot-scope=”scope”>
.photoinfo-container{
	padding: 3px;
	h3{
		color: #226AFF;
		font-size: 15px;
		text-align: center;
		margin: 15px 0;
	}
	.subtitle{
		display: flex;
		justify-content: space-between;
		font-size: 13px;
	}
	.content{
		font-size: 14px;
		line-height: 30px;
	}
	.thumbs{
		figure {
			display:inline-block;
			margin: 10px;
			box-shadow: 0 0 8px #999;
			img{
				width:100px ;
				height:100px ;
				/*由于访问大张的图片，要进行设置*/
				vertical-align: middle;
			}
		}
	}	
}
</style>