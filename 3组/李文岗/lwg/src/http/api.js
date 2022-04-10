import request from '@/http/request.js'
import request_url from '@/http/request_url.js'
// 登录
export function login(arg){
    return request({
        url:request_url.login,
        data:arg,
        method:'post',
    })
}
// 左侧菜单
export function menus(arg){
    return request({
        url:request_url.menus,
        data:arg,
        method:'get',
    })
}
// 用户数据列表
export function usersData(params){//传params
    return request({
        url:request_url.usersData,
        params:params,
        method:'get',
    })
}
// 添加用户
export function addusers(arg){//
    return request({
        url:request_url.addusers,
        data:arg,
        method:'post',
    })
}
// 用户删除
export function delusers(arg){//
    return request({
        url:request_url.delusers+'/'+arg,
        data:arg,
        method:'delete',
    })
}
// 用户修改 id
export function put1users(arg){//
    return request({
        url:request_url.put1users+'/'+arg,
        data:arg,
        method:'get',
    })
}
// 用户修改 确定修改
export function put2users(arg){//arg.id
    return request({
        url:request_url.put1users+'/'+arg.id,
        data:arg,
        method:'put',
    })
}
// 修改状态
export function swituses(url,arg){//arg.id
    return request({
        url:request_url.swituses+url,//拼接url
        data:arg,
        method:'put',
    })
}
//1 角色列表
export function rolelist(arg){//arg.id
    return request({
        url:request_url.rolelist,//拼接url
        data:arg,
        method:'get',
    })
}
//2 分配用户角色
export function rolelist2(params){//arg.id
    return request({
        url:request_url.rolelist2+`${params.id}/role/`,//拼接url
        data:params,
        method:'put',
    })
}

//          权限模块

//添加角色
export function add_roles(data){//arg.id
    return request({
        url:request_url.add_roles,//拼接url
        data:data,
        method:'post',
    })
}

//角色列表
export function list_roles(data){//arg.id
    return request({
        url:request_url.list_roles,//拼接url
        data:data,
        method:'get',
    })
}
//删除角色
export function del_roles(arg){//arg
    return request({
        url:request_url.del_roles+'/'+arg,//arg为id
        data:arg,
        method:'delete',
    })
}
//编辑角色id
export function put1_roles(arg){//arg
    return request({
        url:request_url.put1_roles+'/'+arg,//arg为id
        data:arg,
        method:'get',
    })
}
//编辑角色
export function put2_roles(arg){//arg
    return request({
        url:request_url.put2_roles+'/'+arg.id,//arg的id 当前每一条
        data:arg,
        method:'put',
    })
}
// 删除角色指定权限
export function xdel_roles(arg){//arg
    return request({
        url:request_url.xdel_roles+'/'+arg.id+'/rights/'+arg.cid,//arg的id 当前每一条
        data:arg,
        method:'delete',
    })
}
//1：分配权限 获取权限列表
export function right_list(arg){//arg 
    return request({
        url:request_url.right_list+'/tree',//arg为id
        data:arg,
        method:'get',
    })
}
// 2 角色授权roles_rights
export function roles_rights(arg){//arg 
    return request({
        url:request_url.roles_rights+'/'+arg.id+'/rights',//arg为id
        data:arg,
        method:'post',
    })
}

//权限列表
export function right_Lists(arg){//arg 
    return request({
        url:request_url.right_Lists+'/list',//arg为id
        data:arg,
        method:'get',
    })
}

//       商品管理模块

//商品分类列表
export function goodcate_list(params){//arg 
    return request({
        url:request_url.goodcate_list,//arg为id
        params:params,
        method:'get',
    })
}
//添加 获取2级节点
export function addcate2(arg){//arg 
    return request({
        url:request_url.addcate,//
        data:arg,
        method:'get',
    })
}
//添加分类
export function addcate(arg){//arg 
    return request({
        url:request_url.addcate,//
        data:arg,
        method:'post',
    })
}
//删除分类
export function delcate(arg){//arg 
    return request({
        url:request_url.delcate+'/'+arg,//arg.id 删除
        data:arg,
        method:'delete',
    })
}
//修改分类 id
export function xiucate(arg){//arg 
    return request({
        url:request_url.xiucate+'/'+arg,//arg 修改
        data:arg,
        method:'get',
    })
}
//确定修改分类
export function xiucate2(arg){//arg 
    return request({
        url:request_url.xiucate+'/'+arg.id,//arg.id 每一条
        data:arg,
        method:'put',
    })
}
//商品列表 
export function goodlist(arg){//arg 
    return request({
        url:request_url.goodlist,//arg 
        params:arg,//data 改params
        method:'get',
    })
}
//add 参数列表
export function cateparams(arg){//arg 
    return request({
        url:request_url.cateparams+'/'+arg.id+'/attributes',//arg 
        params:arg,//data 改params
        method:'get',
    })
}
//添加商品
export function addgood(arg){//arg 
    return request({
        url:request_url.addgood,//arg 
         data:arg,//data 改params
        method:'post',
    })
}
//删除商品 
export function delgood(arg){//arg 
    return request({
        url:request_url.addgood+'/'+arg,//arg 
         data:arg,//data 改params
        method:'delete',
    })
}
//参数列表
export function paramsList(arg){//arg 
    return request({
        url:request_url.cateparams+'/'+arg.id+'/attributes',//arg 
         params:arg,//data 改params
        method:'get',
    })
}
//添加参数
export function postparamsList(arg){//arg 
    return request({
        url:request_url.cateparams+'/'+arg.id+'/attributes',//arg 
         data:arg,//data 改params
        method:'post',
    })
}
//删除参数
export function delparams(arg){//arg 
    return request({
        url:request_url.cateparams+'/'+arg.id+'/attributes/'+arg.cid,//arg 
         data:arg,//data 改params
        method:'delete',
    })
}
//编辑参数id
export function xiuparams(arg){//arg 
    return request({
        url:request_url.cateparams+'/'+arg.id+'/attributes/'+arg.cid,//arg 
         params:arg,//data 改params
        method:'get',
    })
}
//确定修改参数   11
export function xiuparams2(arg){//arg 
    return request({
        url:request_url.cateparams+'/'+arg.id+'/attributes/'+arg.cid,//arg 
         data:arg,//data 改params  11
        method:'put',
    })
}
//tag标签 
export function xiuStage(arg){//arg 
    return request({
        url:request_url.xiuStage+'/'+arg.cid+'/attributes/'+arg.id,//arg 
         data:arg,//data 改params
        method:'put',
    })
}


//图标 
export function tuData(arg){//arg 
    return request({
        url:request_url.tuData,//arg 
         data:arg,//data 改params
        method:'get',
    })
}

//订单 
export function  orders(arg){//arg 
    return request({
        url:request_url.orders,//arg 
        params:arg,//data 改params
        method:'get',
    })
}
//看物流信息 kanxx
export function  kanxx(arg){//arg 
    return request({
        url:request_url.kanxx+'/'+arg.id,//arg 
        data:arg,//data 改params
        method:'get',
    })
}
