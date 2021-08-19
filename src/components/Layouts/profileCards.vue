<template>

    <div>
      <div class="uk-card uk-card-default uk-card-small uk-card-body" style="border-radius:10px;background-color: #f9c5d1;
background-image: linear-gradient(315deg, #f9c5d1 0%, #9795ef 74%);">
        <h3 class="uk-card-title"><b style="color:blue">Dr.</b> {{name}}</h3>
        <p>
          Phone : <b>{{phone}}</b>
        </p>
         <router-link style="text-decoration: none" :to="/detailedprofiles/+ name"><span class="uk-badge" style="padding:15px;font-size:15px">Edit</span></router-link>
      </div>
    </div>

</template>

<script>

export default {
    props:{
        name:String,
        phone:String
    },
    methods:{

    }
}
</script>

<style scoped>
.uk-badge :hover{
    background-color:pink
}
</style>