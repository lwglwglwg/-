import api from './index'
// axios
import service from '@/utils/request'
/* 登录 */
export function loging(arg) {
  return service({
    url: api.login,
    method: 'post',
    data:arg
  })
}
/* 左侧列表 */
export function right(params) {
  return service({
    url: api.rights,
    method: 'get',
    params:params
  })
}
/* 用户列表 */
export function users(params) {
  return service({
    url: api.user,
    method: 'get',
    params:params
  })
}
/* 修改状态 */
export function types(params) {
  return service({
    url: api.user+`/${params.id}/state/${params.type}`,
    method: 'put',
    params:params
  })
}
/* 添加用户 */
export function adduser(arg) {
  return service({
    url: api.user,
    method: 'post',
    data:arg
  })
}
/* 编辑用户 */
export function edituse(arg) {
  return service({
    url: api.user+`/${arg.id}`,
    method: 'put',
    data:arg
  })
}
/* 删除用户 */
export function deluse(arg) {
  return service({
    url: api.user+`/${arg.id}`,
    method: 'delete',
    data:arg
  })
}
/* 分配角色 */
export function cole(arg) {
  return service({
    url: api.user+`/${arg.id}/role`,
    method: 'put',
    data:arg
  })
}
/* 角色列表 */
export function roles(params) {
  return service({
    url: api.roles,
    method: 'get',
    params:params
  })
}
/* 删除角色权限 */
export function delrole(arg) {
  return service({
    url: api.roles+`/${arg.roleId}/rights/${arg.rightId}`,
    method: 'delete',
    data:arg
  })
}
/* 添加角色 */
export function addrole(arg) {
  return service({
    url: api.roles,
    method: 'post',
    data:arg
  })
}
/* 删除角色 */
export function delro(arg) {
  return service({
    url: api.roles+'/'+arg.id,
    method: 'delete',
    data:arg
  })
}
/* 编辑角色 */
export function editore(arg) {
  return service({
    url: api.roles+'/'+arg.id,
    method: 'put',
    data:arg
  })
}
/* 列表/树状权限列表 */
export function treequan(arg) {
  return service({
    url: api.quanlist+'/'+arg.type,
    method: 'get',
    data:arg
  })
}
/* 角色授权 */
export function addq(arg) {
  return service({
    url: api.roles+`/${arg.id}/rights`,
    method: 'post',
    data:arg
  })
}
/* 商品列表 */
export function goodlist(params) {
  return service({
    url: api.goods,
    method: 'get',
    params:params
  })
}
/* 删除商品*/
export function delgood(arg) {
  return service({
    url: api.goods+`/${arg.id}`,
    method: 'delete',
    data:arg
  })
}
/* 添加商品*/
export function addgoods(arg) {
  return service({
    url: api.goods,
    method: 'post',
    data:arg
  })
}
/* 分类列表*/
export function categories(params) {
  return service({
    url: api.categories,
    method: 'get',
    params:params
  })
}
/* 获取分类参数*/
export function getcan(params) {
  return service({
    url: api.categories+`/${params.id}/attributes`,
    method: 'get',
    params:params
  })
}
/* 修改分类参数*/
export function delcan(params) {
  return service({
    url: api.categories+`/${params.id}/attributes/${params.attrid}`,
    method: 'put',
    data:params
  })
}
/* 删除动态/静态资源*/
export function shancan(params) {
  return service({
    url: api.categories+`/${params.id}/attributes/${params.attrid}`,
    method: 'delete',
    data:params
  })
}
/* 添加动态/静态资源*/
export function addcans(params) {
  return service({
    url: api.categories+`/${params.id}/attributes`,
    method: 'post',
    data:params
  })
}
/* 添加分类 */
export function addfen(params) {
  return service({
    url: api.categories,
    method: 'post',
    data:params
  })
}
/* 删除分类 */
export function delfen(params) {
  return service({
    url: api.categories+`/${params.id}`,
    method: 'delete',
    data:params
  })
}
/* 编辑分类 */
export function editfen(params) {
  return service({
    url: api.categories+`/${params.id}`,
    method: 'put',
    data:params
  })
}
/* 订单列表 */
export function orders(params) {
  return service({
    url: api.orders,
    method: 'get',
    params:params
  })
}
/* 地址信息 */
export function dizhi(params) {
  return service({
    url: api.dizhi+`${params.id}`,
    method: 'get',
    params:params
  })
}
