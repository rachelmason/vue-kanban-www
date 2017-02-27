webpackJsonp([0,2],[,,,,,,,,,function(t,e,a){a(49);var s=a(1)(a(34),a(69),null,null);t.exports=s.exports},function(t,e,a){"use strict";var s=a(3),n=a.n(s),r=a(72),i=a.n(r),o=a(53),d=a.n(o),l=a(52),c=a.n(l),u=a(58),v=(a.n(u),a(59)),m=a.n(v),p=a(60),f=a.n(p);n.a.use(i.a),e.a=new i.a({routes:[{path:"/",name:"Boards",component:d.a},{path:"/boards/:id",name:"Board",component:c.a},{path:"/login",name:"Login",component:m.a},{path:"/register",name:"Register",component:f.a}]})},function(t,e,a){"use strict";var s=a(13),n=a.n(s),r=n.a.create({baseURL:"https://ar-ganize.herokuapp.com/api",timeout:2e5,withCredentials:!0}),i={boards:[],lists:[],cards:[],activeBoard:{},error:{},activeUser:{}},o=function(t){i.error=t};e.a={state:i,actions:{login:function(t,e){var a=this;r.post("https://ar-ganize.herokuapp.com/login",{email:t,password:e}).then(function(t){i.activeUser=t.data.data,console.log(i.activeUser),a.getBoards()}).catch(o)},register:function(t,e,a){var s=this;r.post("https://ar-ganize.herokuapp.com/register",{name:t,email:e,password:a}).then(function(t){s.login(e,a)}).catch(o)},authenticate:function(){var t=this;r.get("https://ar-ganize.herokuapp.com/authenticate").then(function(e){e.data.data&&(i.activeUser=e.data.data,t.getBoards())})},logout:function(){r.delete("https://ar-ganize.herokuapp.com/logout").then(function(t){i.activeUser={}})},getBoards:function(){r.get("userboards").then(function(t){i.boards=t.data.data}).catch(o)},getBoard:function(t){var e=this;console.log("getting board"),r.get("boards/"+t).then(function(a){i.activeBoard=a.data.data,e.getBoardLists(t)}).catch(o)},getBoardLists:function(t){var e=this;r.get("board/"+t+"/lists").then(function(t){i.lists=t.data.data,i.lists.forEach(function(t,a){e.getListCards(t._id,a)})}).catch(o)},getListCards:function(t,e){r.get("list/"+t+"/cards").then(function(t){var a=i.lists[e];a.cards=t.data.data,Vue.set(i.lists,e,a),console.log(i.lists.cards)}).catch(o)},addBoard:function(t){var e=this;r.post("boards/",t).then(function(t){e.getBoards()}).catch(o)},removeBoard:function(t){var e=this;r.delete("boards/"+t._id).then(function(t){e.getBoards()}).catch(o)},removeList:function(t,e){var a=this;r.delete("lists/"+t._id).then(function(t){i.lists.splice(e,1),a.getBoardLists(board._id)}).catch(o)},addList:function(t,e){var a=this;r.post("lists/",t).then(function(t){a.getBoard(e)}).catch(o)},addCard:function(t,e,a){var s=this;r.post("cards/",t).then(function(t){s.getListCards(e,a)})}}}},function(t,e,a){a(43);var s=a(1)(a(31),a(62),null,null);t.exports=s.exports},,,,,,,,,,,,,,,,,,,function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(56),n=a.n(s),r=a(54),i=a.n(r);e.default={name:"app",components:{Navbar:n.a,Error:i.a}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(55),n=a.n(s);e.default={name:"board",components:{List:n.a},data:function(){return{newList:{name:"",description:"",boardId:this.$route.params.id}}},mounted:function(){this.$root.$data.store.actions.getBoard(this.$route.params.id)},computed:{board:function(){return this.$root.$data.store.state.activeBoard},lists:function(){return this.$root.$data.store.state.lists}},methods:{addList:function(){this.$root.$data.store.actions.addList(this.newList,this.newList.boardId)}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"user",data:function(){return{newBoard:{name:"",description:""}}},mounted:function(){this.$root.$data.store.actions.getBoards()},computed:{boards:function(){return this.$root.$data.store.state.boards},user:function(){return this.$root.$data.store.state.activeUser}},methods:{addBoard:function(){this.$root.$data.store.actions.addBoard(this.newBoard)},removeBoard:function(t){this.$root.$data.store.actions.removeBoard(t)}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"card",props:["card"]}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"error",computed:{error:function(){return this.$root.$data.store.state.error}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(9),n=a.n(s);e.default={name:"list",props:["list","index"],data:function(){return{newCard:{name:"",listId:this.list._id,boardId:this.$route.params.id}}},components:{Card:n.a},mounted:function(){this.$root.$data.store.actions.getListCards(this.list._id,this.index)},computed:{cards:function(){return this.list,this.list.cards||[]}},methods:{addCard:function(){this.$root.$data.store.actions.addCard(this.newCard,this.newCard.listId,this.index)},removeList:function(){this.$root.$data.store.actions.removeList(this.list,this.index)}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(57),n=a.n(s);e.default={name:"navbar",components:{Register:n.a},mounted:function(){this.$root.$data.store.actions.authenticate()},computed:{user:function(){return this.$root.$data.store.state.activeUser}},methods:{logout:function(){this.$root.$data.store.actions.logout()}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"register",data:function(){return{name:"",email:"",password:""}},methods:{register:function(){this.$root.$data.store.actions.register(this.name,this.email,this.password),this.$router.push("/")}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(9),n=a.n(s);e.default={name:"list",props:["list","index"],data:function(){return{newCard:{name:"",listId:this.list._id,boardId:this.$route.params.id}}},components:{Card:n.a},mounted:function(){this.$root.$data.store.actions.getListCards(this.list._id,this.index)},computed:{cards:function(){return this.list,this.list.cards||[]}},methods:{addCard:function(){this.$root.$data.store.actions.addCard(this.newCard,this.newCard.listId,this.index)},removeList:function(){this.$root.$data.store.actions.removeList(this.list,this.index)}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"login",data:function(){return{email:"",password:""}},methods:{login:function(){this.$root.$data.store.actions.login(this.email,this.password),this.$router.push("/")}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"register",data:function(){return{name:"",email:"",password:""}},methods:{register:function(){this.$root.$data.store.actions.register(this.name,this.email,this.password),this.$router.push("/")}}}},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,function(t,e,a){a(47);var s=a(1)(a(32),a(66),null,null);t.exports=s.exports},function(t,e,a){a(42);var s=a(1)(a(33),a(61),null,null);t.exports=s.exports},function(t,e,a){a(46);var s=a(1)(a(35),a(65),"data-v-49c58c80",null);t.exports=s.exports},function(t,e,a){a(44);var s=a(1)(a(36),a(63),null,null);t.exports=s.exports},function(t,e,a){a(50);var s=a(1)(a(37),a(70),null,null);t.exports=s.exports},function(t,e,a){var s=a(1)(a(38),a(71),null,null);t.exports=s.exports},function(t,e,a){a(45);var s=a(1)(a(39),a(64),null,null);t.exports=s.exports},function(t,e,a){a(48);var s=a(1)(a(40),a(67),null,null);t.exports=s.exports},function(t,e,a){var s=a(1)(a(41),a(68),null,null);t.exports=s.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.user.name?a("div",[a("div",{staticClass:"row"},[a("form",{staticClass:"col s12",on:{submit:function(e){e.preventDefault(),t.addBoard(e)}}},[a("div",{staticClass:"input-field col s4"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.newBoard.name,expression:"newBoard.name"}],attrs:{required:"true",type:"text",placeholder:"name"},domProps:{value:t._s(t.newBoard.name)},on:{input:function(e){e.target.composing||(t.newBoard.name=e.target.value)}}})]),t._v(" "),a("button",{staticClass:"waves-effect waves-light btn"},[t._v("add")])])]),t._v(" "),a("ul",t._l(t.boards,function(e){return a("li",{staticClass:"board"},[a("router-link",{attrs:{to:"boards/"+e._id}},[t._v(t._s(e.name)+" ")]),t._v(" "),a("a",{staticClass:"btn-floating btn-small waves-effect waves-light",on:{click:function(a){t.removeBoard(e)}}},[a("i",{staticClass:"material-icons"},[t._v("remove")])])],1)}))]):a("div",[a("h2",[t._v("Please Login or register")])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("navbar"),t._v(" "),a("error"),t._v(" "),a("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",[a("p",[t._v(t._s(t.list.name))]),t._v(" "),t._l(t.cards,function(t){return a("Card",{attrs:{card:t}})}),t._v(" "),a("form",{staticClass:"col s12",on:{submit:function(e){e.preventDefault(),t.addCard(e)}}},[a("div",{staticClass:"input-field col s2"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.newCard.name,expression:"newCard.name"}],attrs:{required:"true",type:"text",placeholder:"name"},domProps:{value:t._s(t.newCard.name)},on:{input:function(e){e.target.composing||(t.newCard.name=e.target.value)}}})]),t._v(" "),a("button",{staticClass:"waves-effect waves-light btn"},[t._v("add")])]),t._v(" "),a("a",{staticClass:"btn-floating btn-small waves-effect waves-light",on:{click:t.removeList}},[a("i",{staticClass:"material-icons"},[t._v("remove")])])],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",[a("p",[t._v(t._s(t.list.name))]),t._v(" "),t._l(t.cards,function(t){return a("Card",{attrs:{card:t}})}),t._v(" "),a("form",{staticClass:"col s12",on:{submit:function(e){e.preventDefault(),t.addCard(e)}}},[a("div",{staticClass:"input-field col s2"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.newCard.name,expression:"newCard.name"}],attrs:{required:"true",type:"text",placeholder:"name"},domProps:{value:t._s(t.newCard.name)},on:{input:function(e){e.target.composing||(t.newCard.name=e.target.value)}}})]),t._v(" "),a("button",{staticClass:"waves-effect waves-light btn"},[t._v("add")])]),t._v(" "),a("a",{staticClass:"btn-floating btn-small waves-effect waves-light",on:{click:t.removeList}},[a("i",{staticClass:"material-icons"},[t._v("remove")])])],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._v("\n    Error: "+t._s(t.error)+"\n")])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._v("\n    "+t._s(t.board.name)+" "+t._s(t.board.description)+"\n    "),a("form",{staticClass:"col s12",on:{submit:function(e){e.preventDefault(),t.addList(e)}}},[a("div",{staticClass:"input-field col s2"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.newList.name,expression:"newList.name"}],attrs:{required:"true",type:"text",placeholder:"name"},domProps:{value:t._s(t.newList.name)},on:{input:function(e){e.target.composing||(t.newList.name=e.target.value)}}})]),t._v(" "),a("button",{staticClass:"waves-effect waves-light btn"},[t._v("add")])]),t._v(" "),a("div",{staticClass:"flex-container"},t._l(t.lists,function(t,e){return a("List",{staticClass:"list",attrs:{list:t,index:e}})}))])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("form",{staticClass:"col s12",on:{submit:function(e){e.preventDefault(),t.login(e)}}},[a("div",{staticClass:"input-field col s12"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{required:"true",type:"text",placeholder:"Email",id:"email"},domProps:{value:t._s(t.email)},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),t._v(" "),a("label",{attrs:{for:"email"}},[t._v("Email")])]),t._v(" "),a("div",{staticClass:"input-field col s12"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{required:"true",type:"password",placeholder:"Password",id:"password"},domProps:{value:t._s(t.password)},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._v(" "),a("label",{attrs:{for:"password"}},[t._v("Password")])]),t._v(" "),a("button",{staticClass:"waves-effect waves-light btn"},[t._v("Login")])])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("form",{staticClass:"col s12",on:{submit:function(e){e.preventDefault(),t.register(e)}}},[a("div",{staticClass:"input-field col s12"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],attrs:{required:"true",type:"text",placeholder:"Name",id:"name"},domProps:{value:t._s(t.name)},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}}),t._v(" "),a("label",{attrs:{for:"name"}},[t._v("Name")])]),t._v(" "),a("div",{staticClass:"input-field col s12"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{required:"true",type:"text",placeholder:"Email",id:"email"},domProps:{value:t._s(t.email)},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),t._v(" "),a("label",{attrs:{for:"email"}},[t._v("Email")])]),t._v(" "),a("div",{staticClass:"input-field col s12"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{required:"true",type:"text",placeholder:"Password",id:"password"},domProps:{value:t._s(t.password)},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._v(" "),a("label",{attrs:{for:"password"}},[t._v("Password")])]),t._v(" "),a("button",{staticClass:"waves-effect waves-light btn"},[t._v("Register")])])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card"},[t._v("\n    "+t._s(t.card.name)+"\n   \n")])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"navbar-fixed"},[a("nav",[t.user.name?a("div",[a("a",{staticClass:"brand-logo",attrs:{href:"#"}},[t._v("AR-ganize")]),t._v(" "),a("ul",{staticClass:"right hide-on-med-and-down",attrs:{id:"nav-mobile"}},[a("li",[t._v("Welcome, "+t._s(t.user.name)+"!")]),t._v(" "),a("li",[a("a",{attrs:{href:"#"},on:{click:t.logout}},[t._v(" Logout")])])])]):a("div",{staticClass:"nav-wrapper"},[a("a",{staticClass:"brand-logo",attrs:{href:"#"}},[t._v("AR-ganize")]),t._v(" "),a("ul",{staticClass:"right hide-on-med-and-down",attrs:{id:"nav-mobile"}},[a("li",[a("a",{attrs:{href:"#"}},[a("router-link",{attrs:{to:"/login"}},[t._v("Login")])],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"#"}},[a("router-link",{attrs:{to:"/register"}},[t._v("Register")])],1)])])])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("form",{staticClass:"col s12",on:{submit:function(e){e.preventDefault(),t.register(e)}}},[a("div",{staticClass:"input-field col s12"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],attrs:{required:"true",type:"text",placeholder:"Name",id:"name"},domProps:{value:t._s(t.name)},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}}),t._v(" "),a("label",{attrs:{for:"name"}},[t._v("Name")])]),t._v(" "),a("div",{staticClass:"input-field col s12"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{required:"true",type:"text",placeholder:"Email",id:"email"},domProps:{value:t._s(t.email)},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),t._v(" "),a("label",{attrs:{for:"email"}},[t._v("Email")])]),t._v(" "),a("div",{staticClass:"input-field col s12"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{required:"true",type:"text",placeholder:"Password",id:"password"},domProps:{value:t._s(t.password)},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._v(" "),a("label",{attrs:{for:"password"}},[t._v("Password")])]),t._v(" "),a("button",{staticClass:"waves-effect waves-light btn"},[t._v("Register")])])])])},staticRenderFns:[]}},,,,function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(3),n=a.n(s),r=a(12),i=a.n(r),o=a(10),d=a(11);new n.a({el:"#app",data:{store:d.a},router:o.a,template:"<App/>",components:{App:i.a}})}],[75]);
//# sourceMappingURL=app.80012357f6e2b6d09308.js.map