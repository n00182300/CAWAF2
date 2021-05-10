<template>
  <div>

    <b-card border-variant="primary" header="Edit Enrolment" header-bg-variant="primary" header-text-variant="white" align="center" style="margin-top: 20px;" >

    <b-card-text>To create a new enrolment, please fill out the information below!</b-card-text>

      <b-form-group id="input-group-1" label="Enrolment:" label-for="input-1" >
            <b-form-input
              id="input-1"
              v-model="form.date"
              type="date"
              placeholder="Select a date"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Time:" label-for="input-2">
            <b-form-input id="input-2" v-model="form.time" type="time" placeholder="Select a time" required > </b-form-input>
          </b-form-group>

      <b-form-group id="input-group-3" label="Status:" label-for="input-3">

    <!-- this is the form group for the status of an erolment, there are four options to select using radio buttons -->

        <b-form-radio v-model="form.status" value="career_break" class="radio">career_break</b-form-radio>
        <b-form-radio v-model="form.status" value="assigned" class="radio">assigned</b-form-radio>
        <b-form-radio v-model="form.status" value="interested" class="radio">interested</b-form-radio>
        <b-form-radio v-model="form.status" value="associate" class="radio">associate</b-form-radio>
      </b-form-group>

  <b-form-group id="input-group-4" label="Course ID:" label-for="input-4">

    <!-- this is the form options to select the course id. the v-for loop will go through and display all the lecturers for the dropdown menu -->

    <b-form-select id="input-4" v-model="form.lecturer_id">
      <b-form-select-option id="input-4" v-for="lecturer in lecturers" :value="lecturer.id" :key="lecturer.id"> {{ lecturer.name }}</b-form-select-option>
    </b-form-select>
  </b-form-group>

  <b-form-group id="input-group-5" label="Lecturer ID:" label-for="input-5">

    <!-- this is the same as above but it will loop through all the courses for the dropdown menu -->

    <b-form-select id="input-1" v-model="form.course_id">
      <b-form-select-option id="input-1" v-for="course in courses" :value="course.id" :key="course.id"> {{ course.title }}</b-form-select-option>
    </b-form-select>
  </b-form-group>


  <b-button variant="primary" @click="createEnrolment()">Submit</b-button>


</b-card>

  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'EnrolmentCreate',
  components: {},
  data() {
    return {
      form: {
        date: "",
        time: "",
        status: "",
        course_id: "",
        lecturer_id: "",
      },
      courses: [],  //returns courses array
      lecturers: [],  //returns lecturers array
      errors: {},
    }
  },
  mounted() {   //these methods run as the page loads
    this.getCourses();
    this.getLecturers();
  },
  methods: {

    getCourses() {
      let token = localStorage.getItem('token');

      axios.get('http://college.api:8000/api/courses', {
          headers: {
            Authorization: "Bearer " + token
          }
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
    //getting the list of lecturers from the lecturer index
    getLecturers() {
      let token = localStorage.getItem('token');
      //  console.log(token);
      axios.get('http://college.api:8000/api/lecturers', {
          headers: {
            Authorization: "Bearer " + token
          }
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

    createEnrolment() {
      let token = localStorage.getItem('token');
      axios.post('http://college.api:8000/api/enrolments/', {
          date: this.form.date,
          time: this.form.time,
          status: this.form.status,
          course_id: this.form.course_id,
          lecturer_id: this.form.lecturer_id,
        }, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.$router.push({
            name: 'enrollments_index' //redirects to enrollments_index
          });
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

</style>
