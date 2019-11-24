//node中向外暴露成员的形式
//module.exports={}
//在es6中，通过规范的形式，规定了es6导入 import 模块名称 from '模块标识符'
//improt '标识路劲'//css
//es6,使用export default和export向外暴露成员
var info={
	name:'zs',
	age:20,
	sex:'男'
}
var title={value:'小星星'}

export default info
//在node中，使用var 名称=requier('模块标识符')
//module.exports和exports来暴露成员

//注意：export default向外暴露的成员，可以使用任意的变量来接收 
//在一个模块中export default 只允许向外暴露一次
//在一个模块中，可以同时使用export export default
export {title}
export var content='hahaha'
//使用export向外暴露的成员，只能使用{}的形式接收，叫做按需导入
//export 可以向外暴露多个成员，同时，如果某些成员，我们在import的时候
//不需要，则可以不在{}中定义
//使用export导出的成员必须严格按照导出时候的名称，来使用{}接收
//使用export导出的成员，如果就想换个名称，可以使用as取别名