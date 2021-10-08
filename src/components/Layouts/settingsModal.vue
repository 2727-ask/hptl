<template>


<div id="modal-overflow" uk-modal>
    <div class="uk-modal-dialog">

        <button class="uk-modal-close-default" type="button" uk-close></button>

        <div class="uk-modal-header">
            <h2 class="uk-modal-title">Report Settings</h2>
        </div>

        <div class="uk-modal-body" uk-overflow-auto>
        <form @submit.prevent="saveLocation">
            <label>Saving Location</label>
            <input class="uk-input" type="text" :placeholder="savingLocation" v-model="savingLocation"><br><br>
            <button class="uk-button uk-button-primary" type="submit" style="border-radius:30px">Save</button>
        </form>
            

        </div>

        <div class="uk-modal-footer uk-text-right">
            <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
            <button class="uk-button uk-button-primary" type="button">Save</button>
        </div>

    </div>
</div>
</template>

<script>
import {db} from '../../firebaseConfig.js'
export default{
    data(){
        return{
            savingLocation:''
        }
    },
    methods:{
        saveLocation(){
            console.log(this.savingLocation)
            console.log(db)
            db.collection('Locations').doc('reports').set(
                {
                    loc:`${this.savingLocation}`
                }
            ).then(()=>{
                console.log('Saved')
            })
        }
    }
}

</script>

