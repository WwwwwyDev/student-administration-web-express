<template>
  <div id="app">
    <el-backtop :bottom="60"></el-backtop>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
