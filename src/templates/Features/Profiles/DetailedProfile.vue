<template>
  <h2 style="color: white">Detailed Profile of <b style="color:magenta">{{detailedData.name}}</b></h2>
      <notification message="Updated Profile of Doctor" :show="show"></notification>
      <form class="uk-grid-small" uk-grid @submit.prevent='myMethod' style="margin-top:70px">
      <div class="uk-width-1-1">
        <input class="uk-input" type="text" name="name" v-model="name"  placeholder="Doctor Full Name" required />
      </div>
      <div class="uk-width-1-1@s">
        <input class="uk-input" type="text" name="address" v-model="address" placeholder="Address" required />
      </div>
      <div class="uk-width-1-2@s">
        <input class="uk-input" type="text" name="phonenumber" v-model="phno" placeholder="Phone Number" required/>
      </div>
      <div class="uk-width-1-2@s">
        <input class="uk-input" type="text" name="wtnumber" v-model="wtno"  placeholder="WhatsApp Number" required />
      </div>
     
      <div class="uk-width-1-1@s">
        <button
          class="uk-button uk-align-left"
          @click="updateData"
          style="
            background: #cc00ff;
            color: white;
            font-size: 20px;
            border-radius: 30px;
          "
        >
          Update
        </button>
      </div>
    </form>
</template>
<script>
import { db } from "../../../firebaseConfig";
import notification from "../../../components/Layouts/notification.vue"
export default {
  components:{
    notification
  },
  data() {
    return {
      param: String,
      detailedData: Object,
      show:'none'
    };
  },
    async created() {
      this.param = this.$route.params.id;
      this.getDetailedData();
      
    },
  mounted() {
      this.name = this.detailedData.name
  },
  methods: {
    getDetailedData() {
      var gotdata = db.collection("Profiles").doc(this.param);
      gotdata.get().then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          this.detailedData = doc.data();
          this.name = doc.data().name;
          this.address = doc.data().address;
          this.phno = doc.data().phone;
          this.wtno = doc.data().whatsappno;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
    },

    updateData(){
      var updatedata = db.collection("Profiles").doc(this.param);
      updatedata.update({
        name:this.name,
        address:this.address,
        phone:this.phno,
        whatsappno:this.wtno
      }).then(()=>{
        this.show = 'block';
      })
    }
  },
};
</script>
