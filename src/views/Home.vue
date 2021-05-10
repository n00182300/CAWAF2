<template>
  <div class="home">

    <br>

    <b-card border-variant="primary" header="Welcome!" header-bg-variant="primary" header-text-variant="white" align="center" >

      <b-card-text>Please sign in to continue</b-card-text>

    <b-form-group id="input-group-1" label="Email" label-for="input-1">
      <b-form-input id="input-1" v-model="form.email" type="email" placeholder="Email" required ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-2" label="Password" label-for="input-2">
      <b-form-input id="input-2" v-model="form.password" type="password" placeholder="Password" required ></b-form-input>
    </b-form-group>

  <!-- runs the edit course function seen below -->
  <b-button variant="primary" @click="login()">Submit</b-button>


    </b-card>

  </div>
</template>

<script>
import axios from 'axios';

export default{
  name: 'home',
  components: {
  },
  data(){
    return{
      form: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    login() {
      axios.post('http://college.api:8000/api/login', {
        email: this.form.email,
        password: this.form.password
      })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        this.$router.replace({name: 'courses_index'});
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    }
  },
}
</script>
<style>
.home{
  text-align: center;
}
</style>

<!-- Custom object for form as some input data might not be related to the form -->
