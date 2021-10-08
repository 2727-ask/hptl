<template>
  <h2 style="color:white;margin-top:157px">Add Facility</h2>
  <hr />
  <div class="uk-alert-success" :style="{display:this.show}" uk-alert>
    <a class="uk-alert-close" uk-close></a>
    <p>Data Saved Successfully</p>
</div>
  <form class="uk-grid" uk-grid style="margin-top:40px" @submit.prevent='addFacility'>

  <div class="uk-width-1-1@s">
    <input
      class="uk-input uk-form-success uk-form-width-medium"
      type="text"
      v-model="fname"
      placeholder="Facility Name Here eg- Doppler"
      style="width:100%;background:transparent"
    />
    </div>
    <div class="uk-width-1-2@s" style="margin-top:20px">
        <input class="uk-input uk-form-success" v-model="totalPrice" type="number" style="width:100%;background:transparent" placeholder="Total Price">
    </div>
    <div class="uk-width-1-2@s" style="margin-top:20px">
        <input class="uk-input uk-form-success" v-model="cutPrice" type="number" style="width:100%;background:transparent" placeholder="Cut Price">
    </div>
    <div class="uk-width-1-2@s" style="margin-top:20px">
        <button type="submit" style="border-radius:30px;background-color:transparent;color:magenta;border:1px solid magenta" class="uk-button">Save</button>
    </div>
  </form>
</template>
<script>
import { db } from "../../../firebaseConfig.js";
export default{
    data(){
        return{
            show:'none',
        }
    },
    

    methods:{
        addFacility(){
            var date = new Date()
            db.collection('Facilities').doc(this.fname).set({
                name:this.fname,
                dateAdded:date,
                totalPrice:this.totalPrice,
                cutPrice:this.cutPrice
            }).then(()=>{
                this.show = "block"
            })
        }
    }
}
</script>