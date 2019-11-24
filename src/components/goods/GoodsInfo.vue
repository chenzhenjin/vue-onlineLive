<template>
	<div class="goodsinfo-container">
		<transition
			@before-enter="beforeEnter"
			@enter="enter"
			@after-enter="afterEnter"
			>
			<div class="ball" v-show="ballFlag" ref="ball"></div>
		</transition>
		<!--商品轮播图-->
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<swiper :lunbotuList="lunbotu" :isfull="false"></swiper>				
				</div>
			</div>
		</div>
		<!--商品购买-->
		<div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
							市场价: <del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价: 
							<span class="now_price">￥{{goodsinfo.sell_price}}</span>
						</p>
						<p>购买数量: <numbox @getcount="getSelectedCount" 
							:max="goodsinfo.stock_quantity"></numbox> </p>
						<p>
							<mt-button type="primary" size="small">立即购买</mt-button>
							<mt-button type="danger" size="small" @click="addToShopcar">加入购物车</mt-button>
						</p>
					</div>
				</div>
			</div>
		<!--商品参数-->
		<div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号:{{goodsinfo.goods_no}}</p>
						<p>库存情况:{{goodsinfo.stock_quantity}}件</p>
						<p>上架时间:{{goodsinfo.add_time | dataFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
					<mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
					<mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
				</div>
			</div>
	</div>
</template>

<script>
	import swiper from '../subcomponents/swiper'
	import numbox from '../subcomponents/goodsinfo_numbox'
	export default{
		data(){
			return {
				id:this.$route.params.id,
				lunbotu:[],
				goodsinfo:{},
				ballFlag:false,
				selectedCount:1
			}
		},
		created(){
			this.getLunbotu()
			this.getGoodsInfo()
		},
		methods:{
			getLunbotu(){
				this.$http.get('api/getthumimages/'+this.id).then(result=>{
					if(result.body.status === 0){
						result.body.message.forEach(item=>{
							item.img=item.src
						})
						this.lunbotu=result.body.message
					}
				})
			},
			getGoodsInfo(){
				this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
					if(result.body.status === 0){
						this.goodsinfo=result.body.message[0]
					}
				})
			},
			goDesc(id){
				this.$router.push({name:'goodsdesc',params:{id}})
			},
			goComment(id){
				this.$router.push({name:'goodscomment',params:{id}})
			},
			addToShopcar(){
				this.ballFlag=true
				var goodsinfo={
					id:this.id,
					count:this.selectedCount,
					price:this.goodsinfo.sell_price,
					selected:true
				}
				this.$store.commit('addToCar',goodsinfo)
			},
			beforeEnter(el){
				el.style.transform="translate(0,0)"
			},
			enter(el,done){
				el.offsetWidth
				//导致动画不准确的本质原因我们把小球最终位移到的位置
				//已经局限在某一分辨率下的，滚动条未滚动的情况下
				//只有分辨率和测试的时候不一样或者滚动条有一定的滚动距离之后,问题就出现了
				//不能把位置的横纵坐标写死,动态计算这个坐标值
				//先得到徽标的横纵坐标再得到小球的横纵坐标，然后让yx值求差
				//得到的结果就是横纵坐标位移的距离
				//获取小球的页面位置
				const ballPosition=this.$refs.ball.getBoundingClientRect()
				const badgePosition=document.getElementById('badge')
				.getBoundingClientRect()
				const xDist=badgePosition.left-ballPosition.left
				const yDist=badgePosition.top-ballPosition.top
				el.style.transform=`translate(${xDist}px,${yDist}px)`
				el.style.transition="all 0.5s cubic-bezier(.24,-0.33,1,.38)"
				done()
			},
			afterEnter(el){
				this.ballFlag=!this.ballFlag
			},
			getSelectedCount(count){
					this.selectedCount=count
					console.log(this.selectedCount)
			}
		},
		components:{
			swiper,numbox
		}
	}
</script>

<style lang="scss" scoped>
.goodsinfo-container{
	background-color: #ccc;
	overflow: hidden;
	.now_price{
		color: red;
		font-size: 16px;
		font-weight: bold;
	}
	.mui-card-footer{
	display: block;
	button{
		margin: 10px 0;
	}
	}
	.ball{
		width: 15px;
		height: 15px;
		background-color: red;
		position: absolute;
		border-radius: 50%;
		z-index:99;
		top:407px;
		left:142px;
		/*transform: translate(10px,10px);*/
	}
}

</style>