import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import OutList from '../views/OutList.vue'
import OldManList from '../views/OldManList.vue'
import Accidentrecord from '../views/Accidentrecord.vue'
import Complaint from '../views//Complaint.vue'
import Doctor from '../views/Doctor.vue'
import Fall from '../views/Fall.vue'
import Healthy from '../views/Healthy.vue'
import HealthyCheck from '../views/HealthyCheck.vue'
import Mechanism from '../views/Mechanism.vue'
import Physical from '../views/Physical.vue'
import Position from '../views/Position.vue'
import StayBack from '../views/StayBack.vue'
import Volunteer from '../views/Volunteer.vue'
import VisitList from '../views/VisitList.vue'
import OldManInfo from '../views/OldManInfo.vue'



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
        path:'/accidentrecord',
        name:'Accidentrecord',
        component:Accidentrecord
      },
      {
        path:'/complaint',
        name:'Complaint',
        component:Complaint
      },
      {
        path:'/doctor',
        name:'Doctor',
        component:Doctor
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
        path:'/healthyCheck',
        name:'HealthyCheck',
        component:HealthyCheck
      },
      {
        path:'/mechanism',
        name:'Mechanism',
        component:Mechanism
      },
      {
        path:'/physical',
        name:'Physical',
        component:Physical
      },
      {
        path:'/position',
        name:'Position',
        component:Position
      },
      {
        path:'/stayBack',
        name:'StayBack',
        component:StayBack
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
        path:'/oldManInfo',
        name:'OldManInfo',
        component:OldManInfo

      }
      
  ]
  },

]

const router = new VueRouter({
  routes
})

export default router
