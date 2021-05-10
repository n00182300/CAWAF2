<template>
  <!-- similar to courses and lecturers index -->
  <div>

    <br>
    <h4>Enrolments Index</h4>

    <br>
    <button style="margin-right:25px;" @click="getEnrollments()"> Get Enrolments </button>
    <button>
      <router-link :to="{ name: 'enrollments_create'}">Create Enrolment</router-link>
    </button>

    <!-- <b-button style="margin-bottom:25px;" variant="primary" href="{ name: 'lecturers_create'}">
      Add Enrolment
    </b-button> -->

    <b-table striped hover :items="enrolments" :fields="fields">
      <template #cell(id)="data">
        <router-link :to="{ name: 'enrollments_show', params: { id: data.item.id }}">{{data.item.id }}</router-link>
      </template>
    </b-table>

  </div>
</template>

<script>
import axios from 'axios';

export default{
  name: 'EnrollmentsIndex',
  components: {
  },
  data(){
    return {
      fields: [
        {
          key: 'id',
          sortable: true,
        },
        {
          key: 'date',
          sortable: true,
        },
        {
          key: 'time',
          sortable: true,
        },
        {
          key: 'status',
          sortable: true,
        },
        {
          key: 'course.title',
          sortable: true,
        },
        {
          key: 'lecturer.name',
          sortable: true,
        },
        ],
      course: [],
      enrolments: [],
      lecturers: []
    }
  },
  computed: {
    rows(){
      return this.enrollments.length;
    }
  },
  mounted(){
    this.getEnrollments();
  },
  methods: {
    getEnrollments(){
      let token = localStorage.getItem('token');


      axios.get('http://college.api:8000/api/enrolments', {
        headers: {Authorization: "Bearer "+token}
      })
      .then(response => {
        console.log(response.data);
        this.enrolments = response.data.data;
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
