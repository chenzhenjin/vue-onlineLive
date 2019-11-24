import Vue from 'vue'
import Router from 'vue-router'
import HomeContainer from '@/components/tabbar/HomeContainer'
import MemberContainer from '@/components/tabbar/MemberContainer'
import ShopContainer from '@/components/tabbar/ShopContainer'
import SearchContainer from '@/components/tabbar/SearchContainer'
import NewsList from '@/components/news/NewsList'
import NewsInfo from '@/components/news/NewsInfo'
import PhotoList from '@/components/photos/PhotoList'
import PhotoInfo from '@/components/photos/PhotoInfo'
import GoodsList from '@/components/goods/GoodsList'
import GoodsInfo from '@/components/goods/GoodsInfo'
import GoodsDesc from '@/components/goods/GoodsDesc'
import GoodsComment from '@/components/goods/GoodsComment'
//import HelloWorld from '@/components/HelloWorld'//@根目录
//import account from '@/components/Account'
//import goodslist from '@/components/GoodsList'
//import login from '@/components/login'
//import register from '@/components/register'
Vue.use(Router)

export default new Router({
  routes: [
  	{ path:'/',redirect:'/home'},
  	{ path:'/home',component:HomeContainer},
  	{ path:'/member',component:MemberContainer},
  	{ path:'/shopcar',component:ShopContainer},
  	{ path:'/search',component:SearchContainer},
  	{ path:'/home/newslist',component:NewsList},
  	{ path:'/home/newsinfo/:id',component:NewsInfo},
  	{ path:'/home/photolist',component:PhotoList},
  	{ path:'/home/photoinfo/:id',component:PhotoInfo},
  	{ path:'/home/goodslist/',component:GoodsList},
  	{ path:'/home/goodsinfo/:id',component:GoodsInfo,name:'goodsinfo'},
  	{ path:'/home/goodsdesc/:id',component:GoodsDesc,name:'goodsdesc'},
  	{ path:'/home/goodscomment/:id',component:GoodsComment,name:'goodscomment'},
//  {
//    path: '/',
//    name: 'HelloWorld',
//    component: HelloWorld
//  },
//  {
//  	path:'/account',
//  	component:account,
//  	children:[
//  		{path:'login',component:login},
//  		{path:'register',component:register}
//  	]
//  },
//  {
//  	path:'/goodslist',component:goodslist
//  }
  ],
  linkActiveClass:'mui-active'//替换router-link-active
})
