import {createRouter, createWebHistory} from 'vue-router';
import home from './templates/home/home.vue';
import AddDoctor from './templates/Features/AddDoctor/AddDoctor.vue';
import Profiles from './templates/Features/Profiles/Profiles.vue';
import DetailedProfile from './templates/Features/Profiles/DetailedProfile.vue';
import NewRecord from './templates/Forms/NewRecord.vue';
import allpayment from './templates/Features/Payments/allpayment';
import Facilities from './templates/Features/Diagnostics/Facilities.vue';
import AddFacility from './templates/Features/Diagnostics/AddFacility.vue';
import detailed_payment from './templates/Features/Payments/detailed_payment'
import demo from './templates/Trials/demo.vue'
const router = createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home', component:home},
        {path:'/newdoctor',component:AddDoctor},
        {path:'/profiles',component:Profiles},
        {path:'/detailedprofiles/:id',component:DetailedProfile},
        {path:'/newrecord',component:NewRecord},
        {path:'/payments',component:allpayment},
        {path:'/detailspayments/:name',component:detailed_payment},
        {path:'/demo',component:demo},
        {path:'/diagnostic',component:Facilities},
        {path:'/addfacility',component:AddFacility},
    ]
});


export default router; 