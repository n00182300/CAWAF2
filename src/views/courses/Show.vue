COURSES SHOW
<template>
<div class="courses-show">


  <b-card border-variant="primary" header-bg-variant="primary" header-text-variant="white" align="center" >

  <b-card-text>

    <h2>{{ course.title }}</h2>  <br>
    <hr>
    <h5>Level: {{ course.level }}</h5>
    <h5>Points: {{ course.points }}</h5>
    <h5>Code: {{ course.code }}</h5>
    <hr>
    <p>{{ course.description }} </p>

  </b-card-text>

  <!-- bootstrap buttons that will run the relevant functions to edit / delete the course -->
  <b-button style="margin-right:25px;" variant="warning" @click="directToEdit()"> EDIT Course </b-button>
  <b-button variant="danger" @click="deleteCourse()"> DELETE Course </b-button>

</b-card>

<!-- this is another bootstrap table to show all the enrolments for a specific course -->
<b-table striped hover :items="course.enrolments" :fields="fields">
  <template #cell(id)="data">
    <router-link :to="{ name: 'enrollments_show', params: { id: data.item.id }}">{{ data.item.title }}</router-link>
  </template>
</b-table>


</div>
</template>
<script>

import axios from 'axios';
export default {
  name: 'CoursesShow',
  components: {

  },
  data() {
    return{
      fields: [ //fields for the bootstrap table

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
          key: 'lecturer.name',
          sortable: true,
        },
        ],
      course: {}
    }
  },
  mounted() {
    this.getCourses();
},
  methods: {
    getCourses(){
      let token = localStorage.getItem('token');
      axios.get(`http://college.api:8000/api/courses/${this.$route.params.id}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.course = response.data.data;
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        });
    },

    directToEdit(){ //used for the button to direct to the edit page for the relevant course with the selected id.
      this.$router.push({
        path: `/courses${this.$route.params.id}/edit`
      });
    },

    deleteCourse(){ //this function uses the delete method to remove the course with the specified id of the page shown then in the response it will redirect to the courses index page
      let token = localStorage.getItem('token');

      axios.delete(`http://college.api:8000/api/courses/${this.$route.params.id}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: 'courses_index' });
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
/* .courses-show-card-blue {
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 8px rgba(0, 0, 0, .15), 0 0 6px rgba(0, 0, 0, .05);
  transition: .3s transform cubic-bezier(.155, 1.105, .295, 1.12), .3s -webkit-transform cubic-bezier(.155, 1.105, .295, 1.12);
  padding: 14px 36px 18px 36px;
}
.courses-show-card-blue:hover {
  transform: scale(1.10);
  box-shadow: 0 10px 20px rgba(0, 0, 0, .10), 0 4px 8px rgba(0, 0, 0, .06);
  border-color: #0275d8;
}
.courses-show-card {
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 8px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .05);
  transition: .3s transform cubic-bezier(.155, 1.105, .295, 1.12), .3s -webkit-transform cubic-bezier(.155, 1.105, .295, 1.12);
  padding: 14px 36px 18px 36px;
} */
</style>
