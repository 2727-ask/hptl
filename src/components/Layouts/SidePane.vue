<template>
 <router-link style="text-decoration: none" to="/" @click="isActive='home'"><span class="uk-badge" :class="{active:isActive==='home'}" style="padding:20px;font-size:20px;margin-left:20px;margin-top:30px">Home</span></router-link>
 <router-link style="text-decoration: none" to="/profiles" @click="isActive='profiles'"><span class="uk-badge" :class="{active:isActive==='profiles'}" style="padding:20px;font-size:20px;margin-left:20px;margin-top:30px">Profiles</span></router-link>
 <router-link style="text-decoration: none" to="/newrecord" @click="isActive='newrecord'"><span class="uk-badge" :class="{active:isActive==='newrecord'}" style="padding:20px;font-size:20px;margin-left:20px;margin-top:30px">New Record</span></router-link>
 <router-link style="text-decoration: none" to="/newdoctor" @click="isActive='newdoctor'"><span class="uk-badge" :class="{active:isActive==='newdoctor'}" style="padding:20px;font-size:20px;margin-left:20px;margin-top:30px">Add Doctor</span></router-link>
 <router-link style="text-decoration: none" to="/payments" @click="isActive='payments'"><span class="uk-badge" :class="{active:isActive==='payments'}" style="padding:20px;font-size:20px;margin-left:20px;margin-top:30px">Payments</span></router-link>
 <router-link style="text-decoration: none" to="/diagnostic" @click="isActive='diagnostic'"><span class="uk-badge" :class="{active:isActive==='diagnostic'}" style="padding:20px;font-size:20px;margin-left:20px;margin-top:30px">Diagnostic</span></router-link>
</template>

<script>
export default {
  props:{
    pillcolor:String,
  },

  data(){
    return{
      isActive:''
    }
  },

  methods:{
    
  }

};
</script>

<style scoped>
.active{
  background:#FF3300;
}
a{
  text-decoration:none;
}
</style>