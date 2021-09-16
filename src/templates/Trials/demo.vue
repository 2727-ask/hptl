<template>
  <h1 style="color: white">Hello World Demo</h1>
  <div class="hello">
    <button class="btn" @click="hello">DOWNLOAD DOCUMENT</button>
  </div>
  <document>Hello</document>
</template>
<script>
import htmlDocx from "html-docx-js";
export default{
  data(){
    return{

    }
  },
  methods:{
    hello(){
      var content = "<h1>Hello World</h1>"
      var converted = htmlDocx.asBlob(content);
      console.log(converted);
    }
  }
  
}
</script>