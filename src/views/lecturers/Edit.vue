<template>
  <div>

  <b-card border-variant="primary" header="New Lecturer" header-bg-variant="primary" header-text-variant="white" align="center" >

<b-card-text>To log a new lecturer, please fill out the information below!</b-card-text>

<b-form-group id="input-group-1" label="Name:" label-for="input-1" >
  <b-form-input id="input-1" v-model="form.name" type="text" placeholder="Enter lecturer's name" required > </b-form-input>
</b-form-group>

<b-form-group id="input-group-2" label="Address:" label-for="input-2" >
  <b-form-input id="input-2" v-model="form.address" placeholder="Enter lecturer's address" required > </b-form-input>
</b-form-group>

<b-form-group id="input-group-3" label="Email:" label-for="input-3" >
  <b-form-input id="input-3" v-model="form.email" type="email" placeholder="Enter lecturer's email" required > </b-form-input>
</b-form-group>

<b-form-group id="input-group-4" label="Phone:" label-for="input-4" >
  <b-form-input id="input-4" v-model="form.phone" placeholder="Enter contact number:" required > </b-form-input>
</b-form-group>


<b-button variant="primary" @click="editLecturer()">Submit</b-button>


</b-card>

</div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'LecturerEdit',
  components: {
  },
  data() {
    return {
      form: {
        name: "",
        address: "",
        email: "",
        phone: "",
      },
      errors: {}
    }
  },
  mounted(){
    this.retrieveLecturer();
  },
  methods: {
    retrieveLecturer() {
      let token = localStorage.getItem('token');
      axios.get(`http://college.api:8000/api/lecturers/${this.$route.params.id}`,
      {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.form.name = response.data.data.name;
        this.form.address = response.data.data.address;
        this.form.email = response.data.data.email;
        this.form.phone = response.data.data.phone;
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
        if (error.response.data.errors) {
          this.errors = error.response.data.errors
        }
      })
    },

    editLecturer() {
      let token = localStorage.getItem('token');

      axios.put(`http://college.api:8000/api/lecturers/${this.$route.params.id}`, {
        name: this.form.name,
        address: this.form.address,
        email: this.form.email,
        phone: this.form.phone,
    }, {
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
