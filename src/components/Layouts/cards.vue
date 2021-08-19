<template>
    <div class="uk-card uk-card-default uk-card-body" style="border-radius:10px" :style="bg">
        <img class="uk-img uk-align-center" :src="img">
          <h3 style="color:white;text-align:center">{{title}}</h3>
          <p></p>
    </div>
</template>

<script>


export default {
    props:{
        title:String,
        bg:String,
        img:String
    },
    
    data(){
        
    }
}
</script>
