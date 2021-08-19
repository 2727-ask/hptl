<template>
  <div class="uk-container">
    <h2 style="color: #ffffff; text-align: left; margin-top: 30px">
      <b>New Record</b>
    </h2>
    <notification
      message="Successfully Stored Data"
      :show="show"
    ></notification>
    <form class="uk-grid-small" @submit.prevent="storeData"  uk-grid>
      <div class="uk-width-1-2@s">
        <input
          class="uk-input"
          style="color: white"
          type="text"
          v-model="fname"
          placeholder="First Name"
        />
      </div>
      <div class="uk-width-1-2@s">
        <input
          class="uk-input"
          style="color: white"
          type="text"
          v-model="lname"
          placeholder="Last Name"
        />
      </div>
      <div class="uk-width-1-2@s">
        <input
          class="uk-input"
          style="color: white"
          type="text"
          v-model="purpose"
          placeholder="Purpose"
        />
      </div>
      <div class="uk-width-1-2@s">
        <select class="uk-select" v-model="docName" @change="getTillNow">
          <option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option>
        </select>
      </div>
      <div class="uk-width-1-2@s">
        <input
          class="uk-input"
          v-model="date"
          style="color: white"
          type="date"
        />
      </div>
      <div class="uk-width-1-1@s">
        <h4 for="price" style="color: white; text-align: left">
          Applicable Price
        </h4>
        <input
          class="uk-input"
          name="price"
          v-model="applicablePrice"
          style="color: white"
          type="number"
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
import notification from "../../components/Layouts/notification.vue";
import { db } from "../../firebaseConfig";
export default {
  components: { notification },
  data() {
    return {
      options: new Set(),
      cut: 0,
      amount: 0,
      show: "none",
      tillNow: 0,
      doctorName:'',
    };
  },

  created() {
    this.getOptions();
  },

  
  methods: {
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
      var monthe= date.getMonth();
      if(monthe.toString().length === 1){
        monthe = '0'+ (monthe+1).toString()
      }else{
        monthe = (monthe+1).toString()
      }
      console.log(this.docName)
      console.log(monthe)


      var fetchedData = db
        .collection("Payments")
        .doc(this.docName)
        .collection('2021')
        .doc(monthe)
        .collection('data');
      fetchedData
        .orderBy("timeStamp", "desc")
        .limit(1)
        .get()
        .then((doc) => {
          console.log('Doc is',doc);
          if (!doc.empty) {
            console.log('Data Exists Here')
            doc.forEach((data)=>{
              this.tillNow = data.data().tillNow
              console.log(this.tillNow);
            })
          }else{
            console.log('Data Donot Exist')
            this.tillNow = 0
          }
        });
    },
    storeData() {
      var year = this.date.toString().substring(0, 4);
      var month = this.date.toString().substring(5, 7);
      // var day = this.date.toString().substring(8, 10);
      var timeStamp = Date.now();

      var paymentData = db
        .collection("Payments")
        .doc(this.docName)
        .collection(year)
        .doc(month).collection('data')
      paymentData
        .add({
          applicable: this.applicablePrice,
          cutPercent: this.cutPercent,
          amount: this.amount,
          cut: this.cut,
          patientName: this.fname + " " + this.lname,
          purpose: this.purpose,
          date: this.date,
          doctor: this.docName,
          timeStamp: timeStamp,
          tillNow:this.tillNow+this.cut
        })
        .then(() => {
          this.show = "block";
          this.docName = '';
        });
    },
    calculateCut() {
      var aP = this.applicablePrice;
      var cP = this.cutPercent;
      this.cut = (cP / 100) * aP;
      var apmcp = aP - this.cut;
      this.amount = apmcp;
    },
  },
};
</script>

<style scoped>
.uk-input {
  background: transparent;
}
</style>