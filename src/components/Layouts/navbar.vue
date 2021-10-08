<template>
<nav class="uk-navbar-container" uk-navbar style="background:black">
    <div class="uk-navbar-left">

        <ul class="uk-navbar-nav">
            <li class="uk-active"><a href="#" style="color:white;font-size:20px">Account Portal</a></li>
            <li>
                <a href="#">Settings</a>
                <div class="uk-navbar-dropdown">
                    <ul class="uk-nav uk-navbar-dropdown-nav">
                        <li class="uk-active"><a href="#">Report Settings</a></li>
                        <li><a href="#modal-overflow" uk-toggle>Save At</a></li>
                        <li class="uk-nav-header">Header</li>
                        <li><a href="#">Item</a></li>
                        <li><a href="#">Item</a></li>
                        <li class="uk-nav-divider"></li>
                        <li><a href="#">Item</a></li>
                    </ul>
                </div>
            </li>
            <li><a href="#">Item</a></li>
        </ul>

    </div>
    <div class="uk-navbar-right">

        <ul class="uk-navbar-nav">
            <li>
                <a href="#">Parent</a>
                <div class="uk-navbar-dropdown">
                    <ul class="uk-nav uk-navbar-dropdown-nav">
                        <li class="uk-active"><a href="#">Active</a></li>
                        <li><a href="#">Item</a></li>
                        <li class="uk-nav-header">Header</li>
                        <li><a href="#">Item</a></li>
                        <li><a href="#">Item</a></li>
                        <li class="uk-nav-divider"></li>
                        <li><a href="#">Item</a></li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</nav>

<settingsModal></settingsModal>
</template>

<style scoped>

</style>

<script>
import settingsModal from '../Layouts/settingsModal';
export default{

    components:{
        settingsModal,
    }
}
</script>
