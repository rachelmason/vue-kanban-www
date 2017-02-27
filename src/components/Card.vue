<template>
<div class="card">
    {{card.name}}
   
</div>
</template>
<script>
    export default {
        name:'card',
        props:['card']
    }
</script>

<style>
    .card{
        background: #E0E7E9;
        height: 10vh;
        width: 18vw;
        border-radius: 10px;
       
    }
</style>