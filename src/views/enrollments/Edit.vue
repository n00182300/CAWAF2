<template>
  <div>
    <b-card border-variant="primary" header="Edit Enrolment" header-bg-variant="primary" header-text-variant="white" align="center" >

    <b-card-text>To create a new course, please fill out the information below!</b-card-text>

    <b-form-group id="input-group-1" label="Enrolment:" label-for="input-1" >
            <b-form-input id="input-1" v-model="form.date" type="date" placeholder="Select a date" required ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-2" label="Time:" label-for="input-2">
      <b-form-input id="input-2" v-model="form.time" type="time" placeholder="Select a time" required ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-3" label="Status:" label-for="input-3">
        <b-form-radio v-model="form.status" value="career_break" class="radio">career_break</b-form-radio>
        <b-form-radio v-model="form.status" value="assigned" class="radio">assigned</b-form-radio>
        <b-form-radio v-model="form.status" value="interested" class="radio">interested</b-form-radio>
        <b-form-radio v-model="form.status" value="associate" class="radio">associate</b-form-radio>
      </b-form-group>

      <b-form-group id="input-group-4" label="Course ID:" label-for="input-4">
        <b-form-select id="input-1" v-model="form.lecturer_id">
          <b-form-select-option id="input-1" v-for="lecturer in lecturers" :value="lecturer.id" :key="lecturer.id"> {{ lecturer.name }}</b-form-select-option>
        </b-form-select>
      </b-form-group>

      <b-form-group id="input-group-5" label="Lecturer ID:" label-for="input-5">
        <b-form-select id="input-1" v-model="form.course_id">
          <b-form-select-option id="input-1" v-for="course in courses" :value="course.id" :key="course.id"> {{ course.title }}</b-form-select-option>
        </b-form-select>
      </b-form-group>


  <button @click="editEnrollment()">Submit</button>


</b-card>

  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'EnrollmentsEdit',
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
      courses: [],
      lecturers: [],
      errors: {},
    }
  },
  mounted() {
    this.retrieveEnrollments();
    this.getCourses();
    this.getLecturers();
  },
  methods: {
    retrieveEnrollments(){ //similar to the other retrieve functions
      let token = localStorage.getItem('token');


      axios.get(`http://college.api:8000/api/enrolments/${this.$route.params.id}`, {
        headers: {Authorization: "Bearer "+token}
      })
      .then(response => {
        console.log(response.data);
        this.form.date = response.data.data.date;
        this.form.time = response.data.data.time;
        this.form.status = response.data.data.status;
        this.form.course_id = response.data.data.course_id;
        this.form.lecturer_id = response.data.data.lecturer_id;
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    },


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
          this.filteredCourses = this.courses;
          this.isBusy = false;
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
    },

    getLecturers() {
      let token = localStorage.getItem('token');

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

    editEnrollment() {
      let token = localStorage.getItem('token');

      axios.put(`http://college.api:8000/api/enrolments/${this.$route.params.id}`, {
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
        this.$router.push({ name: 'enrollments_index' });
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
