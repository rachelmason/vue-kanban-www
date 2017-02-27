<template>
    <div>
        {{board.name}} {{board.description}}
        <form class="col s12" @submit.prevent="addList">
            <div class="input-field col s2">
                <input required="true" type="text" placeholder="name" v-model="newList.name">
            </div>
            <button class="waves-effect waves-light btn">add</button>
        </form>
        <div class="flex-container" >
        <List v-for="(list,index) in lists" :list="list" :index="index" class="list"> 
             
        </List>

        </div>
    </div>
</template>
<script>
    import List from './List'
    export default {
        name: 'board',
        components: { List },
        data() {
            return {
                newList: {
                    name: '',
                    description: '',
                    boardId: this.$route.params.id


                }
            }
        },
        mounted() {
            this.$root.$data.store.actions.getBoard(this.$route.params.id)

        },
        computed: {
            board() {
                return this.$root.$data.store.state.activeBoard
            },
            lists() {
                return this.$root.$data.store.state.lists
            }
        },
        methods: {
            addList() {
                this.$root.$data.store.actions.addList(this.newList, this.newList.boardId)
            }
        }

    }

</script>

<style>
.flex-container{
    width:100%;
    display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;

}
   .list {
        width: 20vw;
        height: 100%;
        background: #A3C6C4;
        margin: 35px;
        border-radius: 10px;
        
        
    }

</style>