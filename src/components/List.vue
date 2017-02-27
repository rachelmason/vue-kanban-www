<template>
    <div >
        <div>

        <p>{{list.name}}</p>

        <Card v-for="card in cards" :card = "card"></Card>
        <form class="col s12" @submit.prevent="addCard">
            <div class="input-field col s2">
                <input required="true" type="text" placeholder="name" v-model="newCard.name">
            </div>
            <button class="waves-effect waves-light btn">add</button>
        </form>
            <a class="btn-floating btn-small waves-effect waves-light" @click="removeList"><i class="material-icons">remove</i></a>
        </div>
          
    
     
    </div>
</template>
<script>
    import Card from './Card'
    export default {
        name: 'list',
        props:['list','index'],
        data(){
            return{
                newCard:{
                    name: '',
                    listId: this.list._id,
                    boardId: this.$route.params.id
                }
            }
        },
        components: { Card },
     
        mounted(){
            
            this.$root.$data.store.actions.getListCards(this.list._id, this.index)
        },
        computed: {

            cards() {
                this.list;

                return this.list.cards || []
            }
        },
        methods: {
            addCard(){
                 this.$root.$data.store.actions.addCard(this.newCard, this.newCard.listId,this.index)
            },
            removeList() {
                this.$root.$data.store.actions.removeList(this.list, this.index)
            }
        }
    }

</script>
<style>
 
</style>