<template>
  <div>
    <MyNavBar />
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import MyNavBar from './components/MyNavBar.vue'

export default {
  name: 'App',
  components: {
    MyNavBar
  }
}
</script>

<style>

</style>
