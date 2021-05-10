<template>
  <div>

    <!-- card for create course form -->
    <b-card style="margin-top: 25px;" border-variant="primary" header="Create Course" header-bg-variant="primary" header-text-variant="white" align="center" >

    <b-card-text>To create a new course, please fill out the information below!</b-card-text>

    <b-form-group id="input-group-1" label="Course Title:" label-for="input-1" >
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

  <!-- //when button is clicked it will run the createCourse() function that is seen below -->
    <b-button variant="primary" @click="createCourse()">Submit</b-button>


</b-card>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CourseCreate',
  components: {
  },
  data() {
    return { //data is empty because we wil be filling it
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
  },
  methods: {
    // createCourse uses the post method to send the created course to the /courses in api
    createCourse() {
      let token = localStorage.getItem('token');

      axios.post('http://college.api:8000/api/courses', {
        title: this.form.title,
        code: this.form.code,
        description: this.form.description,
        points: this.form.points,
        level: this.form.level,
      },
      {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.$router.push({ name: 'courses_index' }); //redirects to the courses index
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
