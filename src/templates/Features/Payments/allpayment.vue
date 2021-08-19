<template>
  <loader v-if="isLoading" style="margin-top: 150px"></loader>
  <table
    class="uk-table uk-table-responsive uk-table-divider"
    style="margin-top: 50px"
  >
    <thead>
      <tr v-if="!isLoading">
        <th>Doctor Name</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="payments in paymentData" :key="payments">
        <td>
          <router-link :to="/detailspayments/ + payments.name">{{
            payments.name
          }}</router-link>
        </td>
        <td>0</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { db } from "../../../firebaseConfig";
import GetData from "../../../Models/GetData";
import loader from "../../../components/Layouts/loader.vue";
// import FetchPayments from "../../../Models/fetchPayments"
export default {
  components: { loader },
  data() {
    return {
      paymentData: [],
      isLoading: false,
    };
  },
  created(){
      this.checkLoading();
  },
  mounted() {
    this.checkLoading();
    this.fetchDetails();
  },
  methods: {
    fetchDetails() {
      var fetchedProfiles = db.collection("Profiles");
      this.paymentData = []
      this.isLoading = true
      fetchedProfiles.get().then((mydata) => {
        mydata.forEach((data) => {
          var obj = new GetData();
          obj.name = data.data().name;
          obj.phoneNumber = data.data().phone;
          this.paymentData.push(obj);
          this.isLoading = false
        });
      });
    },
    checkLoading(){
      if(this.paymentData.size === 0){
        this.isLoading = true
      }else{
        this.isLoading = false
      }
    },
  },
};
</script>