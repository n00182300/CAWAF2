<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item :to="{name: 'courses_index'}">Courses</b-nav-item>
        <b-nav-item :to="{name: 'lecturers_index'}">Lecturers</b-nav-item>
        <b-nav-item :to="{name: 'enrollments_index'}">Enrollments</b-nav-item>
        </b-navbar-nav>
            <b-button variant="outline-danger" style="align-right" class="ml-auto" @click="logout()">Logout </b-button>
      </b-navbar>


    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> | -->

    <!-- <router-link :to="{ name: 'testing', params: { id: 421 } }">Testing</router-link> -->
  </div>
</template>

<script>
import axios from 'axios';
export default{
  name: 'MyNavBar',
  methods: {
    logout(){
      let token = localStorage.getItem('token');


      axios.get('http://college.api:8000/api/logout', {
        headers: {Authorization: "Bearer "+token}
      })
      .then(response => {
        console.log(response.data);
        console.log("LOGGED OUT");
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
      localStorage.removeItem('token');
    }
  }
}

</script>

<style>
/* #nav{
  padding: 30px;
  text-align: center;
}

#nav a{
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active{
  color: #42b983;
} */

</style>
