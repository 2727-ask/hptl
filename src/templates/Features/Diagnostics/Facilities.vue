<template>
    <div style="margin-top:30px">
        <h2 style="color:white;display: inline-block;margin-top:10px">Diagnostic Facilities</h2>
        <router-link to="/addfacility" class="uk-button" style="display: inline-block;margin-left:30px;border-radius:30px;color:#39FF14
;border:2px solid #39FF14
">Add Facility</router-link>
    </div>
    <hr />
    <loader v-if="isLoading" style="margin-top: 150px"></loader>
  <div v-if="!isLoading" class="uk-grid-match uk-child-width-expand@s uk-text-center" uk-grid>
    <div v-for="facility in facilities" :key="facility">
      <div class="uk-card uk-card-default uk-card-body">{{facility.name}}<br><b style="color:#ff4f00">Total Price :</b> <b>{{facility.totalPrice}}</b> | <b style="color:#ff4f00">Applicable Cut :</b> <b>{{facility.cutPrice}}</b></div>
    </div>
  </div>
</template>
<script>
import {db} from "../../../firebaseConfig.js";
import loader from "../../../components/Layouts/loader"
export default{
  components: { loader },
    data(){
        return{
          facilities:[],
          isLoading:true
        }
    },
    mounted(){
      this.getFacilities();
    },
    methods:{
        getFacilities(){
          this.isLoading = true
          this.facilities = []
            db.collection('Facilities').get().then((data)=>{
                data.forEach((data)=>{
                  this.facilities.push(data.data())
                  this.isLoading = false
                })
            })
        }
    }

}
</script>
