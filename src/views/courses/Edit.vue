<template>
  <div>

    <!-- card for the form and the form inputs -->
    <b-card border-variant="primary" header="Create Course" header-bg-variant="primary" header-text-variant="white" align="center" >

      <b-card-text>To edit an existing course, please fill out the information below!</b-card-text>

    <b-form-group id="input-group-1" label="Course Title:" label-for="input-1">
      <b-form-input id="input-1" v-model="form.title" type="text" placeholder="Enter course title" required ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-2" label="Code:" label-for="input-2">
      <b-form-input id="input-2" v-model="form.code" placeholder="Enter course code" required ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-3" label="Description:" label-for="input-3">
      <b-form-input id="input-3" v-model="form.description" placeholder="Enter course description" required ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-4" label="Points:" label-for="input-4">
      <b-form-input id="input-4" v-model="form.points" placeholder="Enter points required for the course:" required ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-5" label="Level:" label-for="input-5">
      <b-form-input id="input-5" v-model="form.level" placeholder="Enter required points for the course" required ></b-form-input>
    </b-form-group>

  <!-- runs the edit course function seen below -->
  <b-button variant="primary" @click="editCourse()">Submit</b-button>


    </b-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CourseEdit',
  components: {
  },
  data() {
    return {
      form: {
        title: "",
        code: "",
        description: "",
        points: "",
        level: "",
      },
      errors: {}
    }
  },
  mounted(){
    this.retrieveCourse(); //as this is mounted it will immediately run once the page is loaded
  },
  methods: {
    // the retrieve course method uses the get method to retrieve the courses.
    // the data that will fill the form is gotten from the response which is then replaced by edit course
    retrieveCourse() {
      let token = localStorage.getItem('token');
      axios.get(`http://college.api:8000/api/courses/${this.$route.params.id}`,
      {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.form.title = response.data.data.title;
        this.form.code = response.data.data.code;
        this.form.description = response.data.data.description;
        this.form.points = response.data.data.points;
        this.form.level = response.data.data.level;
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
        if (error.response.data.errors) {
          this.errors = error.response.data.errors
        }
      })
    },

    // the edit course function takes the retrieved data from above and replaces it using the put method
    //${this.$route.params.id} is used to get the id number for the course

    editCourse() {
      let token = localStorage.getItem('token');

      axios.put(`http://college.api:8000/api/courses/${this.$route.params.id}`, {
        title: this.form.title,
        code: this.form.code,
        description: this.form.description,
        points: this.form.points,
        level: this.form.level,
    }, {
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
      if (error.response.data.errors) {
        this.errors = error.response.data.errors
      }
    })
  }
 }, //end of methods
}
</script>
<style>
.home {
  text-align: center;
}
</style>
