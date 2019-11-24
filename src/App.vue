<template>
  <div class="app-container">
  	<!--顶部header-->
  	<mt-header fixed title='程序员'>
  		 <span slot="left" @click='goBack' v-show="flag">
			    <mt-button icon="back">返回</mt-button>
			 </span>
  	</mt-header>
  	<!--中间router-view-->
  	<!--底部tabbar-->
  	<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-chen" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link >
			<router-link  class="mui-tab-item-chen" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link >
			<router-link  class="mui-tab-item-chen" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link >
			<router-link  class="mui-tab-item-chen" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜素</span>
			</router-link >
		</nav>
		<transition>
			<router-view class="app-center"></router-view>
		</transition>
		<!--<counter></counter>
		<hr />
		<amount></amount>-->
  	<!--mt-butto 全局组件-->
  	<!--<mybtn size="large" type="primary" icon="back" @click='show'>
  		default</mybtn>
  	<mybtn disabled>禁用</mybtn>
  	<mybtn plain>幽灵</mybtn>
  	<button type="button" class="mui-btn mui-btn-royal">
			紫色
		</button>-->
    <!--<router-link to="/account">account</router-link>
    <router-link to="/goodslist">goodslist</router-link>
    <router-view></router-view>-->
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
import counter from './components/counter'
import amount from './components/amount'
export default {
//name: 'App',
  data(){
  	return {
  		flag:false
//		toastInstance:null
  	}
  },
  created(){
//	this.getList()
		this.flag=this.$route.path === '/home' ? false : true
  },
	methods:{
		goBack(){
			this.$router.go(-1)
		}
//		getList(){//模拟获取列表的一个ajax方法
//			//获取数据之前，立即弹出Toast提示用户，正在加载数据
//			this.show()
//			setTimeout(()=>{
//				this.toastInstance.close()
//			},5000)
//		},
//		show(){
//		this.toastInstance=Toast({
//				message:'nihao',
//				position:'top',
//				duration:-1,//-1不消失
//				iconClass:'glyphicon glyphicon-heart',//boostrap4.3不支持字体
//				className:'mytoast'//自定义toast样式
//			})
//		}
	},
	components:{
		counter,
		amount
	},
	watch:{
		'$route.path':function(newval,oldval){
			if(newval === '/home'){
				this.flag = false
			}else{
				this.flag = true
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	/*记得改完要刷新*/
	.app-center{
		overflow: hidden;
		min-height: 90vh;
		background-color: #ccc;
	}
	.mint-header{
		z-index: 99;
	} 
.app-container{
	padding-top: 40px;
	overflow-x: hidden;
	padding-bottom: 50px;
	/*先在控制台查看底部盒子高度*/
}
.v-enter{
	opacity: 0;
	transform: translateX(100%);
}
.v-leave-to{
	opacity: 0;
	transform: translateX(-100%);
	position: absolute;
	/*只能放这里，不然底部会显示与隐藏,而且组件会在底部上升上来*/
}
.v-enter-active,.v-leave-active{
	transition:all 1s ease;
}
.vue-toast{
	position: fixed;
	top: 50%;
	left:50%;
	transform: translate(-50%,-50%);
	display: inline-block;
	font-size: 12px;
	border: 1px solid green;
	color: green;
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	border-radius: 4px;
	padding: 4px 6px;
}
.toast-top{
	top:30px;
}
.toast-bottom{
	top:auto;
	bottom:30px;
}
/*改类名，解决tabbar点击无法切换的问题*/
.mui-bar-tab .mui-tab-item-chen.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-chen {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-chen .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-chen .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
