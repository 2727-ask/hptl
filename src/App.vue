<template>
  <navbar></navbar>
  <div class="uk-container">
    <SidePane pillcolor="grey"></SidePane>
    <!-- <div class="uk-text-center" uk-grid> -->
      <router-view style="margin-top:30px"></router-view>
    <!-- </div> -->
  </div>
  <VFooter style="margin-top:20vh;float:bottom"></VFooter>
</template>
<script>
// import Cards from './components/Layouts/cards';
import navbar from "./components/Layouts/navbar";
import VFooter from "./components/Layouts/VFooter";
import SidePane from "./components/Layouts/SidePane";



export default {
  components: {
    navbar,
    VFooter,
    SidePane,
  },
};
</script>

<style>
@import "~uikit/dist/css/uikit.min.css";
#app {
  background: black;
}
</style>