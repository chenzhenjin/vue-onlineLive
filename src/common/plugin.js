let Toast={}
Toast.install=function(Vue,options){
	let opt ={
		defaultType:'center',//默认显示的位置
		duration:'1500',//默认持续的时间
	}
	for(let property in options){
		opt[property]=options[property]
	}
	//原型链,能被外部调用
	Vue.prototype.$toast=(tips,type)=>{
		if(type){
			opt.defaultType=type
		}
		if(document.getElementsByClassName('vue-toast').length){
			return 
		}
		//扩展extend
		let toastTpl=Vue.extend({
			template:`<div class="vue-toast toast-${opt.defaultType}">${tips}</div>`,			
		})
		//挂载($mount)到vue el
		let tpl=new toastTpl().$mount().$el
		document.body.appendChild(tpl)
		setTimeout(()=>{
			document.body.removeChild(tpl)
		},opt.duration)
	}
	['bottom','center','top'].forEach(type=>{
		Vue.prototype.$toast[type]=(tips)=>{
			return Vue.prototype.$toast(tips,type)
		}
	})
}
export {
	Toast
}
