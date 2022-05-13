import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import OutList from '../views/OutList.vue'
import OldManList from '../views/OldManList.vue'
import Complaint from '../views//Complaint.vue'
import Fall from '../views/Fall.vue'
import Healthy from '../views/Healthy.vue'
import Mechanism from '../views/Mechanism.vue'
import Position from '../views/Position.vue'
import Volunteer from '../views/Volunteer.vue'
import VisitList from '../views/VisitList.vue'
import Nurse from '../views/Nurse.vue'
import NurseDuty from '../views/NurseDuty.vue'
import Doctor from '../views/app/Doctor.vue'
import Older from '../views/app/Older.vue'
import AddHealthy from '../views/app/AddHealthy.vue'





Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function push(location) {
  return originalReplace.call(this, location).catch(err => err)
}

const routes = [
  {
    path:'/',
    name:'Login',
    component:Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/oldManList',
        name: 'OldManList',
        component: OldManList
      },
      {
      
        path: '/outList',
        name: 'OutList',
        component: OutList
      },
      {
        path:'/complaint',
        name:'Complaint',
        component:Complaint
      },
      {
        path:'/fall',
        name:'Fall',
        component:Fall
      },
      {
        path:'/healthy',
        name:'Healthy',
        component:Healthy
      },
      {
        path:'/mechanism',
        name:'Mechanism',
        component:Mechanism
      },
      {
        path:'/position',
        name:'Position',
        component:Position
      },
      {
        path:'/volunteer',
        name:'Volunteer',
        component:Volunteer
      },
      {
        path:'/visitList',
        name:'VisitList',
        component:VisitList
      },
      {
        path:'/nurse',
        name:'Nurse',
        component:Nurse
      },
      {
        path:'/nurseDuty',
        name:'NurseDuty',
        component:NurseDuty
      },
      
  ]
  },
  {
    path:'/doctor',
    name:'Doctor',
    component:Doctor
  },
  {
    path:'/older',
    name:'Older',
    component:Older
  },
  {
    path:'/addHealthy',
    name:'AddHealthy',
    component:AddHealthy
  }

]

const router = new VueRouter({
  routes
})

export default router
