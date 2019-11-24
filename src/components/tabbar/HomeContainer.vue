<template>
	<div>
		<swiper :lunbotuList='lunbotuList' :isfull='true'></swiper>
		<!--<mt-swipe :auto=3000>
			<mt-swipe-item v-for="item in lunbotuList" :key="item.img">
				<img :src="item.img" alt="" />
			</mt-swipe-item>
		</mt-swipe>-->
		<ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
      	<router-link to="/home/newslist">
        <img src="../../images/menu1.png" alt="" />
        <div class="mui-media-body">新闻</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
      	<router-link to="/home/photolist">
        <img src="../../images/menu2.png" alt="" />
        <div class="mui-media-body">图片</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
      	<router-link to="/home/goodslist">
        <img src="../../images/menu3.png" alt="" />
        <div class="mui-media-body">商品</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="../../images/menu4.png" alt="" />
        <div class="mui-media-body">留言</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="../../images/menu5.png" alt="" />
        <div class="mui-media-body">视频</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="../../images/menu6.png" alt="" />
        <div class="mui-media-body">联系</div></a></li>
    </ul> 
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	import swiper from '../subcomponents/swiper'
	export default{
		data(){
			return {
				lunbotuList:[]
			}
		},
		created(){
			this.getLunbotu()
		},
		methods:{
			getLunbotu(){//获取轮播图数据的方法,不要带/，/就会定到了localhost:8080
				this.$http.get('api/getlunbo').then(result=>{
//					console.log(result.body)
					if(result.body.status === 0){
						this.lunbotuList=result.body.message
//						Toast('获取加载轮播图成功')
					}else{
						Toast('获取加载轮播图失败')
					}
				})
			}
		},
		components:{
			swiper
		}
	}
</script>

<style lang="scss" scoped>
	$color:(red)(green)(white);
	$num:3;
	.mint-swipe{
		height: 200px;
		@for $i from 1 through $num{
			.mint-swipe-item{
				&:nth-child(#{$i}){
					background-color: nth($color,$i);
				}				
				img{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.mui-grid-view.mui-grid-9{
		background-color: #fff;
		border: 0;
		img{
			width: 60px;
			height: 60px;
		}
		.mui-media-body{
			font-size: 13px;
		}
	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell{
		border: 0;
	}
</style>