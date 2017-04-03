<template>
    <div>
        <div v-if="user.name">

        <div class="row">
            <form class="col s12" @submit.prevent="addBoard">

                <div class="input-field col s4">
                    <input required="true" type="text" placeholder="name" v-model="newBoard.name">
                </div>
                <button class="waves-effect waves-light btn">add</button>
            </form>
        </div>

        <ul>
            <li v-for="board in boards" class="board">
                <router-link :to="'boards/'+board._id">{{board.name}} </router-link>
                  <a class="btn-floating btn-small waves-effect waves-light" @click="removeBoard(board)"><i class="material-icons">remove</i></a>
                
            </li>

        </ul>
        </div>
        <div v-else >
            <h3 class="center">Please login or register</h3>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'user',
        data() {
            return {
                newBoard: {
                    name: '',
                    description: ''
                }

            }
        },
        mounted() {
            this.$root.$data.store.actions.getBoards()
        },
        computed: {
            boards() {
                return this.$root.$data.store.state.boards
            },
            user() {
                return this.$root.$data.store.state.activeUser
            }
        },
        methods: {
            addBoard() {
                this.$root.$data.store.actions.addBoard(this.newBoard)
            },
            removeBoard(board) {
                this.$root.$data.store.actions.removeBoard(board)
            }

        }
    }

</script>
<style lang="scss">
.board{
      width: 20vw;
        height: 100%;
        background: #A3C6C4;
        margin: 35px;
        border-radius: 10px;
        font-size: 36px;
        font-weight: bold;
        color: #354649;
        a{
            color: #354649;
        }
        
}
.btn{
    background:#354649;
}
.btn:hover{
    background:#6C7A89;
}
.btn:focus{
    background:#354649;
}

.btn-floating{
    background:#354649;
}
.btn-floating:hover{
    background:#6C7A89;
}
.btn-floating:focus{
    background:#354649;
}
.center{
    text-align: center;
}

</style>