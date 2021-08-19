<template>
  <div class="uk-width-expand@m">
    <div class="uk-child-width-expand@s" uk-grid>
      <div>
        <cards
          title="New Record"
          img="https://img.icons8.com/ios-glyphs/90/000000/add--v1.png"
          bg="background-color: #4158D0;background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);"
        >
        </cards>
      </div>
      <div>
        <cards
          title="Add Doctor"
          img="https://img.icons8.com/ios-glyphs/90/000000/user--v1.png"
          bg="background-color: #FA8BFF;background-image: linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%);"
        >
        </cards>
      </div>
      <br />
      <div>
        <h3 style="color: white">Recent Refferals</h3>
        <referalcards></referalcards>
        <referalcards></referalcards>
        <referalcards></referalcards>
      </div>
    </div>
    <div></div>
    <br>
    <payments-card></payments-card>
  </div>
</template>

<script>
import cards from "../../components/Layouts/cards";
import referalcards from "../../components/Layouts/referalcards";
import paymentsCard from "../../components/Layouts/paymentsCard";
export default {
  components: { cards, referalcards, paymentsCard },
  setup() {},
};
</script>



<style scoped>
</style>


