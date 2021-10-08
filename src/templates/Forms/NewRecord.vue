<template>
  <div class="uk-container">
    <h2 style="color: #ffffff; text-align: left; margin-top: 30px">
      <b>New Record</b>
    </h2>
    <notification
      message="Successfully Stored Data"
      :show="show"
    ></notification>
    <form class="uk-grid-small" @submit.prevent="gen" uk-grid>
      <div class="uk-width-1-2@s">
        <label style="color:white" for="fname">First Name</label><br />
        <input
          class="uk-input"
          id="fname"
          style="color: white"
          type="text"
          v-model="fname"
          placeholder="First Name"
        />
      </div>
      <div class="uk-width-1-2@s">
        <label style="color:white" for="lname">Last Name</label><br />
        <input
          id="lname"
          class="uk-input"
          style="color: white"
          type="text"
          v-model="lname"
          placeholder="Last Name"
        />
      </div>
      <div class="uk-width-1-2@s">
        <label style="color:white" for="lname">Age</label><br />
        <input
          id="age"
          class="uk-input"
          style="color: white"
          type="number"
          v-model="age"
          placeholder="Age"
        />
      </div>
      <div class="uk-width-1-2@s">
        <label style="color:white" for="lname">Gender</label><br />
        <select id="gender" class="uk-select" type="text" v-model="gender">
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>
      <div class="uk-width-1-2@s">
        <label style="color:white" for="purpose">Purpose</label><br />
        <select class="uk-select" id="purpose" v-model="purpose">
          <option v-for="x in facilities" :key="x">{{ x.name }}</option>
        </select>
      </div>
      <div class="uk-width-1-2@s">
        <label style="color:white" for="refBy">Refered By</label><br />
        <select
          class="uk-select"
          id="refBy"
          v-model="docName"
          @change="getTillNow"
        >
          <option v-for="opt in options" :key="opt" :value="opt">{{
            opt
          }}</option>
        </select>
      </div>
      <div class="uk-width-1-2@s">
        <label style="color:white" for="dod">Date of diagnosis</label><br />
        <input
          id="dod"
          class="uk-input"
          v-model="date"
          style="color: black;background:#fff"
          type="date"
        />
      </div>
      <!-- <div class="uk-width-1-1@s">
        <h4 for="price" style="color: white; text-align: left">
          Applicable Price
        </h4>
        <input
          class="uk-input"
          name="price"
          v-model="applicablePrice"
          style="color: white"
          type="number"
          @input="calCut"
        />
      </div>
      <div class="uk-width-1-1@s">
        <h4 for="cutprice" style="color: white; text-align: left">Cut in %</h4>
        <input
          class="uk-input"
          name="cutprice"
          style="color: white"
          type="number"
          v-model="cutPercent"
          @input="calculateCut"
        />
      </div>
      <div class="uk-width-1-1@s">
        <h4 style="color: white">
          Total Price (Applicable) - Cut% =
          <b style="color: green; border: 1px solid #74ee15; padding: 5px"
            >{{ amount }} <b style="color: white">₹</b></b
          >
        </h4>
      </div>
      <div class="uk-width-1-1@s">
        <h4 style="color: white">
          Cut For Doctor =
          <b style="color: green; border: 1px solid #74ee15; padding: 5px"
            >{{ cut }} <b style="color: white">₹</b></b
          >
        </h4>
      </div> -->
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
        <div style="display:inline-block">
          <looping-rhombuses-spinner
            :style="{ 'margin-top': '12px', display: isSending }"
            :animation-duration="2500"
            :rhombus-size="15"
            color="#ff1d5e"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import notification from "../../components/Layouts/notification.vue";
import { db } from "../../firebaseConfig";
import { LoopingRhombusesSpinner } from "epic-spinners";
import GenerateReport from "../../Report/GenerateReports/GenerateReport.js";
export default {
  components: { notification, LoopingRhombusesSpinner },
  data() {
    return {
      isSending: "none",
      options: new Set(),
      cut: 0,
      amount: 0,
      show: "none",
      tillNow: 0,
      doctorName: "",
      facilities: [],
      applicableAmount: 0,
      cutAmount: 0,
      floc: "",
    };
  },

  created() {
    this.getOptions();
    this.getfacilities();
  },

  methods: {
    gen() {
      db.collection("Locations")
        .doc("reports")
        .get()
        .then((loc) => {
          console.log("data", loc.data().loc); 
          var r = new GenerateReport();
          r.generator(this.fname, this.age, this.date, this.docName, loc.data().loc);
        });
      this.storeData();
    },
    getfacilities() {
      this.facilities = [];
      db.collection("Facilities")
        .get()
        .then((data) => {
          data.forEach((data) => {
            this.facilities.push(data.data());
          });
        });
    },
    calCut() {
      for (var x in this.facilities) {
        console.log(this.facilities[x].name);
        if (this.docName == "Other") {
          this.cut = 0;
          this.amount = this.facilities[x].totalPrice;
        } else {
          if (this.purpose == this.facilities[x].name) {
            this.cut = this.facilities[x].cutPrice;
            this.amount = this.facilities[x].totalPrice - this.cut;
          }
        }
      }
    },
    getOptions() {
      var profileData = db.collection("Profiles");
      profileData.get().then((mydata) => {
        mydata.forEach((data) => {
          var option = data.data().name;
          this.options.add(option);
        });
      });
    },
    getTillNow() {
      var date = new Date();
      var monthe = date.getMonth();
      if (monthe + 1 < 10) {
        monthe = "0" + (monthe + 1).toString();
      } else {
        monthe = (monthe + 1).toString();
      }
      console.log(this.docName);
      console.log(monthe);

      var fetchedData = db
        .collection("Payments")
        .doc(this.docName)
        .collection("2021")
        .doc(monthe)
        .collection("data");
      fetchedData
        .orderBy("timeStamp", "desc")
        .limit(1)
        .get()
        .then((doc) => {
          console.log("Doc is", doc);
          if (!doc.empty) {
            console.log("Data Exists Here");
            doc.forEach((data) => {
              this.tillNow = data.data().tillNow;
              console.log(this.tillNow);
            });
          } else {
            console.log("Data Donot Exist");
            this.tillNow = 0;
          }
        });
    },
    storeData() {
      this.isSending = "block";
      this.calCut();
      var year = this.date.toString().substring(0, 4);
      var month = this.date.toString().substring(5, 7);
      // var day = this.date.toString().substring(8, 10);
      var timeStamp = Date.now();

      var paymentData = db
        .collection("Payments")
        .doc(this.docName)
        .collection(year)
        .doc(month)
        .collection("data");
      paymentData
        .add({
          amount: this.amount,
          cut: this.cut,
          patientName: this.fname + " " + this.lname,
          purpose: this.purpose,
          date: this.date,
          doctor: this.docName,
          timeStamp: timeStamp,
          tillNow: this.tillNow + this.cut,
        })
        .then(() => {
          this.show = "block";
          this.docName = "";
          this.isSending = "none";
        });
    },
  },
};
</script>

<style scoped>
.uk-input {
  background: transparent;
}
</style>
