<template>
    <div class="dialog-component">
        <div class="dialog">
            <div class="dialog_background" @click="closeDialog"></div>
            <div class="dialog-container">
                <div class="dialog_close">
                    <img 
                        src="@/assets/close.svg" 
                        alt="close"
                        @click="closeDialog">
                </div>
                <div class="dialog-content">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import "./dialog.scss"
export default {
    data(){
        return{
            body: document.getElementsByTagName('body')[0],
        }
    },
    mounted(){
        this.body.className = "modal-open";
    },
    beforeDestroy(){
       this.body.className = ""; 
    },
    methods: {
        closeDialog(){
            this.$emit('close');
        }
    }
}
</script>