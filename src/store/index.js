import axios from 'axios'
let api = axios.create({
    baseURL: 'https://ar-ganize.herokuapp.com/api',
    timeout: 200000,
    withCredentials: true
})


//REGISTER ALL DATA HERE
let state = {
    boards: [],
    lists: [],
    cards: [],
    // activeLists:[{}],
    activeBoard: {},
    error: {},
    activeUser: {}
}

let handleError = (err) => {
    state.error = err
}


export default {
    //ALL DATA LIVES IN THE STATE
    state,
    //ACTIONS ARE RESPONSIBLE FOR MANAGING ALL ASYNC REQUESTS
    actions: {
        login(e, p) {
            debugger
            api.post('https://ar-ganize.herokuapp.com/login',{
                email: e,
                password: p
            }) 
            .then(res => {
                state.activeUser = res.data.data
                console.log(state.activeUser)
                this.getBoards()
            }).catch(handleError)
        },
        register(n,e,p){  api.post('https://ar-ganize.herokuapp.com/register',{
                name: n,
                email: e,
                password: p
            }) 
            .then(res=>{
                this.login(e, p)
            }).catch(handleError)
        },
        authenticate(){
            api.get('https://ar-ganize.herokuapp.com/authenticate')
            .then(res =>{
                if(res.data.data){
                    state.activeUser=res.data.data
                     this.getBoards()
                }
            })

        },
        logout(){
            api.delete('https://ar-ganize.herokuapp.com/logout').then(res =>{
                state.activeUser= {}
            })
        },
        getBoards() {
            api.get('userboards').then(res => {
                state.boards = res.data.data
            }).catch(handleError)
        },

        getBoard(id) {
            console.log('getting board')
            api.get('boards/' + id)
                .then(res => {
                    state.activeBoard = res.data.data
                    this.getBoardLists(id)

                })
                .catch(handleError)
        },

        getBoardLists(id) {
            api.get('board/' + id + '/lists')
                .then(res => {
                    state.lists = res.data.data
                    state.lists.forEach((list, index) => {
                        this.getListCards(list._id, index)
                    })
                    // console.log(state.lists)
                })
                .catch(handleError)
        },
        getListCards(listId, index) {
            api.get('list/' + listId + '/cards')
                .then(res => {
                    let list = state.lists[index]
                    list.cards = res.data.data
                    Vue.set(state.lists, index, list)

                    console.log(state.lists.cards)
                })
                .catch(handleError)

        },

        addBoard(board) {
            api.post('boards/', board)
                .then(res => {

                    this.getBoards()
                })
                .catch(handleError)
        },

        removeBoard(board) {
            api.delete('boards/' + board._id)
                .then(res => {
                    this.getBoards()
                })
                .catch(handleError)
        },
        removeList(list, index) {
            api.delete('lists/' + list._id)
                .then(res => {
                    state.lists.splice(index, 1)
                    this.getBoardLists(board._id)
                })
                .catch(handleError)
        },
        // getList(listId) {
        //     api('lists/' + id)
        //         .then(res => {
        //             state.activeList = res.data.data
        //         }).catch(handleError)
        // },
        addList(newList, id) {
            api.post('lists/', newList)
                .then(res => {
                    this.getBoard(id)
                })
                .catch(handleError)
        },

        addCard(newCard, listId, index) {
            api.post('cards/', newCard)
                .then(res => {
                    this.getListCards(listId, index)
                })
        }

        // removeList(list) {
        //     api.delete('lists/'+list._id)
        //         .then(res => {
        //             this.getLists()
        //         })
        //         .catch(handleError)
        // },

    }
}




