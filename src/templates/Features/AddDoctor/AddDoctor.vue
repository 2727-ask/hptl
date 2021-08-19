<template>
  <div class="uk-container" style="margin-left:30px">
    <notification message="Successfully Added Doctor" :show="show"></notification>
    <h2 style="color: #ffffff; text-align: left; margin-top: 50px">
      <b>Add New Doctor</b>
    </h2>
    <form class="uk-grid-small" uk-grid @submit.prevent='myMethod'>
      <div class="uk-width-1-1">
        <input class="uk-input" type="text" name="name" v-model="name" placeholder="Doctor Full Name" required />
      </div>
      <div class="uk-width-1-1@s">
        <input class="uk-input" type="text" name="address" v-model="address" placeholder="Address" required />
      </div>
      <div class="uk-width-1-2@s">
        <input class="uk-input" type="text" name="phonenumber" v-model="phno" placeholder="Phone Number" required/>
      </div>
      <div class="uk-width-1-2@s">
        <input class="uk-input" type="text" name="wtnumber" v-model="wtno" placeholder="WhatsApp Number" required />
      </div>
      <div class="uk-width-1-1@s">
        <h4 for="price" style="color: white; text-align: left">Price</h4>
        <input
          class="uk-input"
          name="price"
          style="color: white"
          type="number"
        />
      </div>
      <div class="uk-width-1-1@s">
        <button
          class="uk-button uk-align-left"
          style="
            background: #cc00ff;
            color: white;
            font-size: 20px;
            border-radius: 30px;
          "
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import notification from '../../../components/Layouts/notification.vue';
import {db} from "/Users/ashutoshkumbhar/projects/hptl/src/firebaseConfig.js";
export default{
  components: { notification },
  data(){
    return{
      show:'none'
    }
  },
  methods:{
    myMethod(){
      var d = new Date();
      console.log(this.name,this.address,this.phno,this.wtno);
      db.collection('Profiles').doc(this.name).set({
        name:this.name,
        address:this.address,
        phone:this.phno,
        whatsappno:this.wtno,
        date:d
      }).then(()=>{
        this.show="block"
      })
    }
  }

}
</script>


<style scoped>
input {
  background: transparent;
}
</style>