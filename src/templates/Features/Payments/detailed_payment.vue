<template>
  <h3 style="color: white">
    Details for <b style="color: #f2ea02">{{ DoctorName }}</b> | 
    <span style="margin-left:30px">Month : <b style="color:#FF3300">August</b> ( <b style="color:#00FFFF">2021</b> )</span>
     | <span style="margin-left:30px">Total : <b style="color:#00FF66">{{tillNow}}</b> Rs</span>  
  </h3>
  <input
    type="date"
    class="uk-input"
    v-model="filteredDate"
    @input="serveData"
  />
  <loader v-if="isLoading" style="margin-top: 50px"></loader>
  <table class="uk-table uk-table-responsive uk-table-divider">
    <thead>
      <tr v-if="!isLoading">
        <th>Date</th>
        <th>Patient Name</th>
        <th>Pay Cut</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="pay in paylist" :key="pay">
        <td style="color: white">{{ pay.date }}</td>
        <td style="color: white">{{ pay.pname }}</td>
        <td style="color: white">{{ pay.cut }} /-</td>
      </tr>
    </tbody>
  </table>
  <h1></h1>
</template>
<script>
import Loader from "../../../components/Layouts/loader.vue";

import { db } from "../../../firebaseConfig";
import FetchPayments from "../../../Models/fetchPayments";
export default {
  components: { Loader },
  data() {
    return {
      paylist: new Set(),
      DoctorName: "",
      year: "",
      month: "",
      date: "",
      tillNow:0
    };
  },
  created() {
    this.checkLoading();
    this.DoctorName = this.$route.params.name;
  },
  mounted() {
    this.fetchData("2021", "08");
    // this.prevData("2021", "08", "16");
    console.log('TimeStamp',Date.now());
    this.getTillNow("2021","08");
  },
  methods: {
    fetchData(year, month) {
      this.paylist = new Set();
      var slug = this.$route.params.name;
      console.log("Called Data");

      var fetchedData = db
        .collection("Payments")
        .doc(slug)
        .collection(year)
        .doc(month).collection('data')
      fetchedData.orderBy("timeStamp","desc").get().then((mydata) => {
        mydata.forEach((doc) => {
          var obj = new FetchPayments();
          obj.pname = doc.data().patientName;
          obj.purpose = doc.data().purpose;
          obj.applicable = doc.data().applicable;
          obj.total = doc.data().amount;
          obj.cutPercent = doc.data().cutPercent;
          obj.cut = doc.data().cut;
          obj.date = doc.data().date;
          obj.tillnow = doc.data().tillNow;
          this.paylist.add(obj);
          this.getTillNow('2021',month);
        });
        this.isLoading = false;
      });
    },
    getTillNow(year,month){
      var slug = this.$route.params.name;
      var fetchedData = db
        .collection("Payments")
        .doc(slug)
        .collection(year)
        .doc(month).collection('data')
      fetchedData.orderBy("timeStamp","desc").limit(1).get().then((mydata) => {
        mydata.forEach((doc)=>{
            this.tillNow=(doc.data().tillNow);
        })
      })
    },

    prevData(year,month,date) {
         var slug = this.$route.params.name;
         var fetchedData = db
        .collection("Payments")
        .doc(slug)
        .collection(year)
        .doc(month)
        .collection(date);
        fetchedData.orderBy("timeStamp","desc").limit(1).get().then((doc)=>{
          doc.forEach((data)=>{
            console.log(data.data().cut)
          })
        })

    },

    serveData() {
      console.log("called");
      var year = this.filteredDate.toString().substring(0, 4);
      var month = this.filteredDate.toString().substring(5, 7);
      var day = this.filteredDate.toString().substring(8, 10);
      this.fetchData(year, month, day);
    },

    checkLoading() {
      if (this.paylist.size === 0) {
        this.isLoading = true;
      } else {
        this.isLoading = false;
      }
    },
  },
};
</script>