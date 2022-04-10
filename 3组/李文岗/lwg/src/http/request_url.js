module.exports={
   login:'/login',
   menus:'/menus',
   usersData:'/users',//用户数据
   addusers:'/users',//添加用户
   delusers:'/users',//删除
   put1users:'/users',//修改 获取id
   swituses:'/users/',//修改用户状态
   rolelist:'/roles', //角色列表
   rolelist2:'/users/', //分配角色
   
   // 权限模块
   add_roles:'/roles',//添加角色 角色列表
   list_roles:'/roles',//角色列表
   del_roles:'/roles',//删除角色
   put1_roles:'/roles',//编辑角色 id
   put2_roles:'/roles',//编辑角色
    xdel_roles:'/roles',//删除指定角色

    right_list:'/rights',//所有权限列表
    roles_rights:'/roles',//角色授权/:roleId/rights
    right_Lists:'/rights',//权限列表

    // 分类模块
    goodcate_list:'/categories',//   商品分类   
    
    addcate:'/categories',//添加分类
    delcate:'/categories',//删除分类
    xiucate:'/categories',//修改获取id
    goodlist:'/goods',//商品列表
    cateparams:'/categories',//分类参数 
    
    xiuStage:'/categories',// 编辑提交参数


    addgood:'/goods',//添加商品

    tuData:'/reports/type/1',//图

    orders:'/orders',//订单
     kanxx:'/kuaidi',//查看物流信息
}