<template>
  <div>

    <br>
    <H4>Lecturers Index</H4>

    <br>
    <button style="margin-right:25px;" @click="getLecturers()"> Get Lecturers </button>
    <button>
      <router-link :to="{ name: 'lecturers_create'}">Create Lecturer</router-link>
    </button>

    <b-table striped hover :items="lecturers" :fields="fields">
      <template #cell(name)="data">
        <router-link :to="{ name: 'lecturers_show', params: { id: data.item.id }}"> {{ data.item.name }} </router-link>
      </template>
    </b-table>


  </div>
</template>

<script>
import axios from 'axios';

export default{
  name: 'LecturersIndex',
  components: {
  },
  data(){
    return {
      fields: [
        {
          key: 'name',
          sortable: true,
        },
        'address',
        'email',
        'phone'
        ],
      lecturers: []
    }
  },
  mounted(){
  },
  methods: {
    getLecturers(){
      let token = localStorage.getItem('token');


      axios.get('http://college.api:8000/api/lecturers', {
        headers: {Authorization: "Bearer "+token}
      })
      .then(response => {
        console.log(response.data);
        this.lecturers = response.data.data;
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    },

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
  }, //end of methods
}
</script>
<style>
.home{
  text-align: center;
}
</style>

<!-- Custom object for form as some input data might not be related to the form -->
