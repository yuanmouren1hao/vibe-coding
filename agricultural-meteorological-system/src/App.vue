<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  width: 100%;
  height: 100%;
  font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
}

body {
  background-color: #F9FAFB;
}
</style>
