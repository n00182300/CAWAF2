COURSES SHOW
<template>
<div class="enrolments-show">


  <b-card border-variant="primary" header-bg-variant="primary" header-text-variant="white" align="center">

  <b-card-text>

    <h1>{{enrolment.course.title}}</h1>
    <h5>Points: {{ enrolment.course.points }}</h5>  <br>
    <h5>Code: {{ enrolment.course.code }}</h5>  <br>
    <hr>
    <h2>{{ enrolment.lecturer.name }}</h2>  <br>
    <h2>{{ enrolment.status }}</h2>  <br>
    <h2>{{ enrolment.time }}</h2>  <br>

    <hr>

    <h4>Contact Details:</h4>
    <h5>Address: </h5><p>{{ enrolment.lecturer.address }}</p>
    <h5>Email: </h5><p>{{ enrolment.lecturer.email }}</p>
    <h5>Phone: </h5><p>{{ enrolment.lecturer.phone }}</p>

  </b-card-text>

    <b-button style="margin-right: 20px;" variant="warning" @click="directToEdit()"> EDIT Enrolment </b-button>
    <b-button variant="danger" @click="deleteEnrolments()"> DELETE Enrolment </b-button>

</b-card>

</div>
</template>
<script>

import axios from 'axios';
export default {
  name: 'EnrolmentsShow',
  components: {

  },
  data() {
    return {
      enrolment: {}
    }
  },
  mounted() {
    this.getEnrollments();

},
  methods: {
    getEnrollments(){
      let token = localStorage.getItem('token');
      axios.get(`http://college.api:8000/api/enrolments/${this.$route.params.id}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.enrolment = response.data.data;
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        });
    },

    directToEdit(){
      this.$router.push({
        path: `/enrolments${this.$route.params.id}/edit`
      });
    },

    deleteEnrolments(){
      let token = localStorage.getItem('token');
      axios.delete(`http://college.api:8000/api/enrolments/${this.$route.params.id}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: 'enrollments_index' });
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        });
    },

  }//end of methods

}
</script>
<style>
/* .buttons{
  margin-left: 20px;
  margin-right: 20px;
} */
</style>
