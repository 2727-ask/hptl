<template>
    <div class="uk-alert-success" uk-alert :style="{display:show}">
        <a class="uk-alert-close" uk-close></a>
        <p>{{message}}</p>
    </div>
</template>
<script>
export default {
    props:{
        message:String,
        show:String,
    }
}
</script>