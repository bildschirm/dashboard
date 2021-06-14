(self.webpackChunkmission_control_dashboard=self.webpackChunkmission_control_dashboard||[]).push([[539],{4571:function(e,t,r){"use strict";r.d(t,{r:function(){return d}});var s=r(7757),n=r.n(s);function a(e,t,r,s,n,a,o){try{var i=e[a](o),u=i.value}catch(e){return void r(e)}i.done?t(u):Promise.resolve(u).then(s,n)}function o(e){return function(){var t=this,r=arguments;return new Promise((function(s,n){var o=e.apply(t,r);function i(e){a(o,s,n,i,u,"next",e)}function u(e){a(o,s,n,i,u,"throw",e)}i(void 0)}))}}var i="/users";function u(e,t){return l.apply(this,arguments)}function l(){return(l=o(n().mark((function e(t,r){var s;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t,r);case 2:return s=e.sent,e.next=5,s.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var d={all:function(){return o(n().mark((function e(){var t;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u(i,{method:"GET",headers:{"Content-Type":"application/json;charset=utf-8"}});case 2:if(!(t=e.sent).error){e.next=6;break}throw console.error("USERS API GET /users",t.error),new Error(t.error.message);case 6:return e.abrupt("return",t);case 7:case"end":return e.stop()}}),e)})))()},update:function(e){return o(n().mark((function t(){var r;return n().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u("".concat(i,"/").concat(e.username),{method:"PATCH",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify({user:e})});case 2:if(!(r=t.sent).error){t.next=6;break}throw console.error("USERS API PATCH /users/:username",r.error),new Error(r.error.message);case 6:case"end":return t.stop()}}),t)})))()}}},5494:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return m}});var s=r(7757),n=r.n(s),a=r(4571),o={props:["value"],data:function(e){return{editedUser:e.value}},watch:{user:function(){this.editedUser=this.user},editedUser:function(){this.$emit("input",this.editedUser)}},methods:{save:function(){this.$emit("save")}}},i=r(1900),u=(0,i.Z)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"shadow sm:rounded-2xl sm:overflow-hidden"},[r("div",{staticClass:"px-4 py-5 bg-purple-900 space-y-8 sm:p-6"},[r("div",{staticClass:"grid grid-cols-3 gap-6"},[r("div",{staticClass:"col-span-3 lg:col-span-2"},[r("label",{staticClass:"block text-sm font-medium text-purple-300 mb-2",attrs:{for:"name"}},[e._v("\n\t\t\t\t\tDisplay Name\n\t\t\t\t")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.editedUser.displayName,expression:"editedUser.displayName"}],staticClass:"text-sm outline-none bg-purple-800 w-full rounded-lg border-2 border-transparent hover:shadow-lg focus:shadow-lg focus:border-purple-500 px-4 py-2 text-purple-200 placeholder-purple-400 font-semibold",attrs:{type:"text",name:"name",id:"name",placeholder:"Display Name"},domProps:{value:e.editedUser.displayName},on:{input:function(t){t.target.composing||e.$set(e.editedUser,"displayName",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"col-span-3 lg:col-span-2"},[r("label",{staticClass:"block text-sm font-medium text-purple-300 mb-2",attrs:{for:"username"}},[e._v("\n\t\t\t\t\tUsername\n\t\t\t\t")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.editedUser.username,expression:"editedUser.username"}],staticClass:"text-sm outline-none bg-purple-800 w-full rounded-lg border-2 border-transparent hover:shadow-lg focus:shadow-lg focus:border-purple-500 px-4 py-2 text-purple-200 placeholder-purple-400 font-semibold",attrs:{type:"text",name:"username",id:"username",placeholder:"Username"},domProps:{value:e.editedUser.username},on:{input:function(t){t.target.composing||e.$set(e.editedUser,"username",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"col-span-3 lg:col-span-2"},[r("label",{staticClass:"block text-sm font-medium text-purple-300 mb-2",attrs:{for:"password"}},[e._v("\n\t\t\t\t\tPassword\n\t\t\t\t")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.editedUser.password,expression:"editedUser.password"}],staticClass:"text-sm outline-none bg-purple-800 w-full rounded-lg border-2 border-transparent hover:shadow-lg focus:shadow-lg focus:border-purple-500 px-4 py-2 text-purple-200 placeholder-purple-400 font-semibold",attrs:{type:"password",name:"password",id:"password",placeholder:"Leave empty to keep current password"},domProps:{value:e.editedUser.password},on:{input:function(t){t.target.composing||e.$set(e.editedUser,"password",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"col-span-3 lg:col-span-2"},[r("label",{staticClass:"block text-sm font-medium text-purple-300 mb-2",attrs:{for:"avatarUrl"}},[e._v("\n\t\t\t\t\tAvatar URL\n\t\t\t\t")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.editedUser.avatarUrl,expression:"editedUser.avatarUrl"}],staticClass:"text-sm outline-none bg-purple-800 w-full rounded-lg border-2 border-transparent hover:shadow-lg focus:shadow-lg focus:border-purple-500 px-4 py-2 text-purple-200 placeholder-purple-400 font-semibold",attrs:{type:"url",name:"avatarUrl",id:"avatarUrl"},domProps:{value:e.editedUser.avatarUrl},on:{input:function(t){t.target.composing||e.$set(e.editedUser,"avatarUrl",t.target.value)}}})])])]),e._v(" "),r("div",{staticClass:"px-4 py-3 bg-purple-800 text-right sm:px-6"},[r("button",{staticClass:"inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",on:{click:function(t){return t.preventDefault(),e.save(t)}}},[e._v("\n\t\t\tSave\n\t\t")])])])}),[],!1,null,null,null).exports,l=r(8927),d=r(2776);function c(e,t,r,s,n,a,o){try{var i=e[a](o),u=i.value}catch(e){return void r(e)}i.done?t(u):Promise.resolve(u).then(s,n)}var p={data:function(e){return{editedUser:e.$store.state.user}},methods:{save:function(){var e,t=this;return(e=n().mark((function e(){return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,a.r.update(t.editedUser);case 3:e.next=9;break;case 5:e.prev=5,e.t0=e.catch(0),alert(e.t0.message),console.error(e.t0);case 9:console.log("wat");case 10:case"end":return e.stop()}}),e,null,[[0,5]])})),function(){var t=this,r=arguments;return new Promise((function(s,n){var a=e.apply(t,r);function o(e){c(a,s,n,o,i,"next",e)}function i(e){c(a,s,n,o,i,"throw",e)}o(void 0)}))})()}},computed:{serverLayout:function(){return this.$mcState("layout",[])},layout:function(){return this.editLayout||this.serverLayout},user:function(){return this.$store.state.user}},watch:{user:function(){this.editedUser=this.user}},components:{profileForm:u,topBarActions:l.Z,topBarButton:d.Z}},m=(0,i.Z)(p,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("main",{staticClass:"dashboard-page p-5 md:p-12"},[r("div",{staticClass:"max-w-4xl"},[r("div",{staticClass:"md:grid md:grid-cols-3 md:gap-6"},[e._m(0),e._v(" "),r("div",{staticClass:"mt-5 md:mt-0 md:col-span-2"},[r("profile-form",{on:{save:e.save},model:{value:e.editedUser,callback:function(t){e.editedUser=t},expression:"editedUser"}})],1)])]),e._v(" "),r("top-bar-actions",[r("top-bar-button",{on:{click:function(t){return t.preventDefault(),e.save(t)}}},[e._v("Save Changes")])],1)],1)}),[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"md:col-span-1"},[r("div",{staticClass:"px-4 sm:px-0"},[r("h3",{staticClass:"text-lg leading-6 text-purple-100 font-semibold"},[e._v("\n\t\t\t\t\t\tProfile\n\t\t\t\t\t")]),e._v(" "),r("p",{staticClass:"mt-1 text-sm text-purple-400"},[e._v("\n\t\t\t\t\t\tSettings regarding your Mission Control account.\n\t\t\t\t\t")])])])}],!1,null,null,null).exports}}]);