import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

// importing every view used by the router
import CoursesIndex from './views/courses/Index'
import CoursesShow from './views/courses/Show'
import CoursesCreate from './views/courses/Create'
import CoursesEdit from './views/courses/Edit'

import LecturersIndex from './views/lecturers/Index'
import LecturersShow from './views/lecturers/Show'
import LecturersCreate from './views/lecturers/Create'
import LecturersEdit from './views/lecturers/Edit'

import EnrollmentsIndex from './views/enrollments/Index'
import EnrollmentsShow from './views/enrollments/Show'
import EnrollmentsCreate from './views/enrollments/Create'
import EnrollmentsEdit from './views/enrollments/Edit'



Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/courses',
      name: 'courses_index',
      component: CoursesIndex
    },
    {
      path: '/courses:id',
      name: 'courses_show',
      component: CoursesShow
    },
    {
    path: '/courses/create',
    name: 'courses_create',
    component: CoursesCreate
  },
    {
      path: '/courses:id/edit',
      name: 'courses_edit',
      component: CoursesEdit
    },
    {
      path: '/lecturers/index',
      name: 'lecturers_index',
      component: LecturersIndex
    },
    {
      path: '/lecturers/create',
      name: 'lecturers_create',
      component: LecturersCreate
    },
    {
      path: '/lecturers:id',
      name: 'lecturers_show',
      component: LecturersShow
    },
    {
      path: '/lecturers:id/edit',
      name: 'lecturers_edit',
      component: LecturersEdit
    },
    {
      path: '/enrollments/index',
      name: 'enrollments_index',
      component: EnrollmentsIndex
    },
    {
      path: '/enrollments/create',
      name: 'enrollments_create',
      component: EnrollmentsCreate
    },
    {
      path: '/enrollments:id',
      name: 'enrollments_show',
      component: EnrollmentsShow
    },
    {
      path: '/enrolments:id/edit',
      name: 'enrolments_edit',
      component: EnrollmentsEdit
    },
  ]
});
