<template>
	<div class="shopcar-container">
		<div class="goods-list">
			<!--商品列表-->
			<div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<myswitch :selected="$store.getters.getGoodsSelected[item.id]"
							:goodsid='item.id'></myswitch>
						<!--<mt-switch 
							v-model="$store.getters.getGoodsSelected[item.id]"
							@change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])">
						</mt-switch>-->
						<img :src="item.thumb_path" alt="" />
						<div class="info">
							<h1>{{item.title}}</h1>
							<p>
								<span class="price">￥{{item.sell_price}}</span>
								<!-- 如何从购物车获取商品的数量 先创建一个空对象，然后循环购物车中
									所有商品的数据，把当前循环这条商品的id，作为对象的属性名，count作为属性
									值，这样当所有的商品循环一遍，就会得到一个对象:{88:1,89:2}
								-->
								<numbox :initcount='$store.getters.getGoodsCount[item.id]'
									:goodsid='item.id'></numbox>
								<a href="#" @click.prevent="remove(item.id,i)">删除</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner jiesuan">
					<div class="left">
						<p>总计(不含运费)</p>
						<p>已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>
							件,总价 ￥<span class="red">{{$store.getters.getGoodsCountAndAmount.amount}}</span>
						</p>	
					</div>
					<mt-button type="danger">去结算</mt-button>
				</div>
			</div>
		</div>
		<p>{{$store.getters.getGoodsSelected}}</p>
	</div>
</template>

<script>
	import numbox from '../subcomponents/shopcar_numbox'
	import myswitch from '../subcomponents/switch'
	export default{
		data(){
			return {
				goodslist:[],//购物车中所有的商品的数据
			}
		},
		created(){
			this.getGoodsList()
		},
		methods:{
			getGoodsList(){
				var idArr=[]
				this.$store.state.car.forEach(item=>idArr.push(item.id))
				if(idArr.length <=0){
					return ;
				}
				this.$http.get('api/goods/getshopcarlist/'+idArr.join(',')).then(result=>{
					if(result.body.status === 0){
						this.goodslist=result.body.message
					}
				})
			},
			remove(id,index){
				//把商品从store中根据传递的id删除，同时把当前组件中的goodslist中，
				//对应要删除的那个商品使用index删除
				this.goodslist.splice(index,1)
				this.$store.commit('removeFormCar',id)
			},
			selectedChanged(id,val){
				this.$store.commit('updateGoodsSelected',{id,selected:val})
				console.log([id,val])
			}
		},
		components:{
			numbox,myswitch
		}
	}
</script>

<style lang="scss" scoped>
	.shopcar-container{
		background-color: #eee;
		overflow: hidden;
		.goods-list{
			.mui-card-content-inner{
				display: flex;
				align-items: center;
			}
			img{
				width: 60px;
				height: 60px;
			}
			h1{
				font-size: 13px;
			}
			.info{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.price{
					color: red;
				}
			}
		}
		.jiesuan{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.red{
				color:red;
				font-weight: bold;
				font-size: 16px;
			}
		}
	}
</style>