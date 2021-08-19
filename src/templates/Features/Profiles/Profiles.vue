<template>
  <div class="uk-container" style="margin-left: 50px">
    <h2 style="color: white">Profiles</h2>
    <!-- <button class="uk-button" @click="getData" style="background:transparent;border-radius:30px;border:4px solid #00FFFF"><img src="https://img.icons8.com/fluency/40/000000/refresh.png"/></button> -->
    <form @submit.prevent="searchDoctor()">
    <input
      class="uk-input"
      list="doctors"
      id="doctor"
      v-model="searchInput"
      style="width: 50%; border-radius: 20px"
      @input="checkEmpty"
    />
    <datalist id="doctors">
      <option v-for="doctor in profiles" :key="doctor" :value="doctor.name"></option>
    </datalist>
    <button class="uk-button" style="margin-left:30px;border-radius:30px;border:2px solid #f000ff;background:transparent;color:#4deeea">Search</button>
    </form>
    <loader v-if="isLoading" style="margin-top:15%"></loader>
    <div class="uk-child-width-1-3@s" style="margin-top: 50px" uk-grid>
      <profileCards
        v-for="item in profiles"
        :key="item.name"
        :name="item.name"
        :phone="item.phoneNumber"
      ></profileCards>
    </div>
  </div>
</template>
 
<script>
import profileCards from "../../../components/Layouts/profileCards";
import { db } from "../../../firebaseConfig.js";
import GetData from "../../../Models/GetData";
import Loader from '../../../components/Layouts/loader.vue';
export default {
  components: {
    profileCards,
    Loader,
  },
  data() {
    return {
      profiles: new Set(),
      searchInput:'',
      isLoading:false
    };
  },
  mounted() {
    this.checkLoading();
    this.getData();
  },
  methods: {
    getData() {
      var profileData = db.collection("Profiles");
      profileData.get().then((mydata) => {
        mydata.forEach((data) => {
          var obj = new GetData();
          obj.name = data.data().name;
          obj.phoneNumber = data.data().phone;
          this.profiles.add(obj);
          this.isLoading = false;
        });
      });
    },
    checkLoading(){
      if(this.profiles.size === 0){
        this.isLoading = true
      }else{
        this.isLoading = false
      }
    },
    checkEmpty(){
      if(this.searchInput == ''){
        this.profiles = new Set();
        this.getData();
      }
    },
    searchDoctor(){
      console.log("Called",this.profiles.size);
      this.profiles.forEach((value)=>{
        if((value.name) == this.searchInput){
            console.log(true)
            this.profiles = new Set();
            this.profiles.add(value)
        }else{
          console.log(false)
        }

      })
    }
  },
};
</script>