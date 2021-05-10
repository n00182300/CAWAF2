COURSES SHOW
<template>
<div class="lecturers-show">


  <b-card border-variant="primary" header-bg-variant="primary" header-text-variant="white" align="center" >

  <b-card-text>

    <h2>{{ lecturer.name }}</h2>  <br>
    <hr>
    <h5>Address: </h5><p>{{ lecturer.address }}</p>
    <h5>Email: </h5><p>{{ lecturer.email }}</p>
    <h5>Phone: </h5><p>{{ lecturer.phone }}</p>


  </b-card-text>

  <b-button style="margin-right:25px;" variant="warning" @click="directToEdit()"> EDIT Lecturer </b-button>
  <b-button variant="danger" @click="deleteLecturer()"> DELETE Lecturer </b-button>

</b-card>
</div>
</template>
<script>

import axios from 'axios';
export default {
  name: 'LecturersShow',
  components: {

  },
  data() {
    return{
      lecturer: {}
    }
  },
  mounted() {
    this.getLecturers();
},
  methods: {
    getLecturers(){
      let token = localStorage.getItem('token');
      axios.get(`http://college.api:8000/api/lecturers/${this.$route.params.id}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.lecturer = response.data.data;
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        });
    },

    directToEdit(){
      this.$router.push({
        path: `/lecturers${this.$route.params.id}/edit`
      });
    },

    deleteLecturer(){
      let token = localStorage.getItem('token');
      axios.delete(`http://college.api:8000/api/lecturers/${this.$route.params.id}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: 'lecturers_index' });
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        });
    }

  }//end of methods
}
</script>
<style>

</style>
