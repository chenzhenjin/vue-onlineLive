// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'//访问到router目录下的index.js
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root='http://www.liulongbin.top:3005'//全局配置域名和端口号放在注册后面
Vue.http.options.emulateJSON=true
//import {Toast} from '@/common/plugin'
//import m1,{title as t,content} from './test.js'
//console.log([m1,t,content])
//安装install
//Vue.use(Toast)
//导入boostrap样式
//import 'bootstrap/dist/css/bootstrap.min.css'
//import './css/app.css'
//导入mui样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
//导入所有的Mintui组件，把所有的组件导入进行
import MintUI from 'mint-ui'
//这里可以省略node_module这一层目录
Vue.use(MintUI)//把所有的组件注册为全局组件
import 'mint-ui/lib/style.css'

import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import Vuex from 'vuex'
Vue.use(Vuex)//注册
//main.js在刚调用的时候，先从本地存储中，把购物车的数据读出来，放到store中
var car=JSON.parse(localStorage.getItem('car') || '[]')
var store=new Vuex.Store({
	state:{
		//status想象组件中的data，专门用来存储数据的
		//如果在组件中，想要访问，store中的数据，只能通过this.$store.state
		car:car,//将购物车商品的数据，用一个数组存储起来，
		//存储商品的对象，设计成{id:商品id,count：要购买的数量,price：商品的单价,selected:false}
		count:0
	},
	mutations:{
		//如果要操作store中的state值，只能通过调用mutations提供的方法，才能
		//才能操作对应的数据，不推荐直接操作state中的数据，万一导致了数据的紊乱
		//不能快速定位到错误的原因，因为每个组件都可能有操作数据的方法
		increment(state){
			state.count++
		},
		substract(state,obj){
			//最多支持两个参数,第一个是state，第二个commit提交过来的参数
			state.count-=(obj.c+obj.d)
		},
		//如果组件想要调用mutations的方法，只能使用this.$store.commit('方法名')
		addToCar(state,goodsinfo){
			//点击加入购物车，把商品信息保存到store的car上
			//如果购物车中，之前就已经有这个对应的商品，只需要更新数量
			//如果没有，则直接把商品数据push到car
			//在购物车中没有对应的商品
			var flag=false
			state.car.some(item=>{
				if(item.id == goodsinfo.id){
					item.count +=parseInt(goodsinfo.count)
					flag=true
					return true
				}
			})
			//循环完毕，得到的flag还是false，将商品数据push到购物车数组中
			if(!flag){
				state.car.push(goodsinfo)
			}
			
			//当更新car之后，把car数组，存储到本地的localStorage中
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		updateGoodsInfo(state,goodsinfo){
			state.car.some(item=>{
				if(item.id == goodsinfo.id){
					item.count = parseInt(goodsinfo.count)
					return true
				}
			})
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		removeFormCar(state,id){
			state.car.some((item,i)=>{
				if(item.id == id){
					state.car.splice(i,1)
					return true
				}
			})
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		updateGoodsSelected(state,info){
			state.car.some(item=>{
				if(item.id == info.id){
					item.selected = info.selected
				}
			})
			localStorage.setItem('car',JSON.stringify(state.car))
		}
	},
	getters:{
		//这里的getters只负责对外提供数据，不负责修改数据，如果想要修改status
		//中的数据，去找mutations
		optCount:function(state){
			return '当前最新的count值是:'+state.count
		},//return的角度 getters中的方法，和组件中过滤器比较类似，因为过滤器和getters都没有
		//修改数据，都是把原数据做了一层包装，提供给了调用者
		//数据变化，会调用这个的角度 getters和computed比较像，只要state中数据发生变化，
		//如果getters也正好引用这个数据，那么就会立即出发getters的重新求值
		//徽标
		getAllCount(state){
			var c=0
			state.car.forEach(item=>{
				c+=item.count
			})
			return c
		},	
		//购物车里每一项的商品数量、选中状态
		getGoodsCount(state){
			var o={}
			state.car.forEach(item=>{
				o[item.id]=item.count
			})
			return o
		},
		getGoodsSelected(state){
			var o={}
			state.car.forEach(item=>{
				o[item.id]=item.selected
			})
			return o
		},
		//所有的商品数量和总价
		getGoodsCountAndAmount(state){
			var o={
				count:0,//勾选数量
				amount:0//勾选的总价
			}
			state.car.forEach(item=>{
				if(item.selected){
					o.count +=item.count
					o.amount +=item.price * item.count
				}
			})
			return o
		}
	}
})//new Vuex.Store实例，得到一个数据仓储对象
Vue.config.productionTip = false
//import {Button} from 'mint-ui'
//Vue.component('mybtn',Button)
//import {Header,Swipe,SwipeItem,Button,Lazyload} from 'mint-ui'
//Vue.component(Header.name,Header)
//Vue.component(Swipe.name,Swipe)
//Vue.component(SwipeItem.name,SwipeItem)
//Vue.component(Button.name,Button)
//Vue.use(Lazyload)
//console.log(Button.name)
/* eslint-disable no-new */
//定义全局过滤器
Vue.filter('dataFormat',function(datastr,pattern="YYYY-MM-DD HH:mm:ss"){
	var dt=new Date(datastr)
	var y=dt.getFullYear()
	var m=(dt.getMonth()+1).toString().padStart(2,'0')
	var d=dt.getDate().toString().padStart(2,'0')
//			return y+'-'+m+'-'+d
	if(pattern.toLowerCase()==='yyyy-mm-dd'){
		return `${y}-${m}-${d}`
	}else{
		var hh=dt.getHours().toString().padStart(2,'0')
		var mm=dt.getMinutes().toString().padStart(2,'0')
		var ss=dt.getSeconds().toString().padStart(2,'0')
		return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
	}
})

new Vue({
  el: '#app',
  router,//将路由对象挂载到vm上
	render:c=>c(App),
	store,//vuex创建的store挂载到vm上,只要挂载到vm上，任何组件都能使用store来存取数据
//  components: { App },
//  template: '<App/>'
  //app这个组件是通过vm实例的render渲染出来的，render函数如果要渲染组件
  //渲染出来的组件只能放到el:"#app"所指定的元素中
  //account和goodslist组件，是通过路由匹配监听到的，所以，这两个组件，只能展示
  //到属于路由的router-view中的去
})
