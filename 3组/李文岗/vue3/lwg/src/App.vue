<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>|
    <router-link to="/todo">todo</router-link>
   <!-- 占位符 -->
      <!-- 这里component是vue中的特殊组件，:is是用来绑定指定组件，这里是与路由对应的页面绑定。 -->
        <router-view v-slot="{Component}">
           <keep-alive include="About">
                <component :is="Component" />
           </keep-alive>
        </router-view>
    
  </div>
   
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
