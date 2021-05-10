<template>
  <div>

    <br>
    <h4> Courses Index </h4>

    <br>
    <!-- <button @click="getCourses()"> Get Courses </button> -->

    <button>
      <router-link :to="{ name: 'courses_create'}">Create Course</router-link>
    </button>

    <!-- this is a bootstrap table that retrieves all the courses information. the link is created using the info from the data and it's relevant id. the title related to the id will be the hyperlink-->
    <b-table striped hover :items="courses" :fields="fields">
      <template #cell(title)="data">
        <router-link :to="{ name: 'courses_show', params: { id: data.item.id }}">{{ data.item.title }}</router-link>
      </template>
    </b-table>

  </div>
</template>

<script>
import axios from 'axios';

export default{
  name: 'CoursesIndex',
  components: {
  },
  data(){
    return {
      fields: [ //these are the fields that will be displayed in the bootstrap box above
        {
          key: 'title',
          sortable: true,
        },
        'code',
        'points',
        {
          key: 'level',
          sortable: true,
        }
        ],
      courses: []
    }
  },
  mounted(){
    this.getCourses();
  },
  methods: {
    getCourses(){ //getCourses method will run when the button above is pressed. it uses the get method to retrieve all of the courses from API
      let token = localStorage.getItem('token');


      axios.get('http://college.api:8000/api/courses', {
        headers: {Authorization: "Bearer "+token}
      })
      .then(response => {
        console.log(response.data);
        this.courses = response.data.data;
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
