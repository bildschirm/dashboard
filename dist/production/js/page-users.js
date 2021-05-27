(self.webpackChunkmission_control_dashboard=self.webpackChunkmission_control_dashboard||[]).push([[29],{4571:function(t,e,r){"use strict";r.d(e,{r:function(){return u}});var s=r(7757),n=r.n(s);function a(t,e,r,s,n,a,i){try{var o=t[a](i),l=o.value}catch(t){return void r(t)}o.done?e(l):Promise.resolve(l).then(s,n)}function i(t){return function(){var e=this,r=arguments;return new Promise((function(s,n){var i=t.apply(e,r);function o(t){a(i,s,n,o,l,"next",t)}function l(t){a(i,s,n,o,l,"throw",t)}o(void 0)}))}}var o="/users";function l(t,e){return c.apply(this,arguments)}function c(){return(c=i(n().mark((function t(e,r){var s;return n().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch(e,r);case 2:return s=t.sent,t.next=5,s.json();case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var u={all:function(){return i(n().mark((function t(){var e;return n().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l(o,{method:"GET",headers:{"Content-Type":"application/json;charset=utf-8"}});case 2:if(!(e=t.sent).error){t.next=6;break}throw console.error("USERS API GET /users",e.error),new Error(e.error.message);case 6:return t.abrupt("return",e);case 7:case"end":return t.stop()}}),t)})))()},update:function(t){return i(n().mark((function e(){var r;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l("".concat(o,"/").concat(t.username),{method:"PATCH",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify({user:t})});case 2:if(!(r=e.sent).error){e.next=6;break}throw console.error("USERS API PATCH /users/:username",r.error),new Error(r.error.message);case 6:case"end":return e.stop()}}),e)})))()}}},2458:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return m}});var s=r(7757),n=r.n(s),a=r(4571),i={props:{users:{type:Array,default:[]}},methods:{roleBgColorClass:function(t){switch(t){case"user":return"bg-purple-600 text-purple-200";case"admin":return"bg-pink-600 text-pink-200";default:case"guest":return"bg-gray-400 text-gray-600"}},deleteUser:function(t){this.$emit("delete",t)}}},o=r(1900),l=(0,o.Z)(i,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"flex flex-col"},[r("div",{staticClass:"-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"},[r("div",{staticClass:"py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"},[r("div",{staticClass:"shadow overflow-hidden rounded-md sm:rounded-lg"},[r("table",{staticClass:"min-w-full divide-y divide-purple-900"},[t._m(0),t._v(" "),r("tbody",{staticClass:"bg-purple-800 divide-y divide-purple-700"},t._l(t.users,(function(e){return r("tr",{key:e.id},[r("td",{staticClass:"px-6 py-4 whitespace-nowrap"},[r("div",{staticClass:"flex items-center"},[r("div",{staticClass:"flex-shrink-0 h-10 w-10"},[r("img",{staticClass:"h-10 w-10 rounded-full",attrs:{src:e.avatarUrl,alt:"user avatar"}})]),t._v(" "),r("div",{staticClass:"ml-4"},[r("div",{staticClass:"text-sm font-semibold text-purple-200"},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t"+t._s(e.displayName)+"\n\t\t\t\t\t\t\t\t\t\t")]),t._v(" "),r("div",{staticClass:"text-sm font-mono text-purple-300"},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t@"+t._s(e.username)+"\n\t\t\t\t\t\t\t\t\t\t\t"),r("span",{staticClass:"md:hidden"},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t–\n\t\t\t\t\t\t\t\t\t\t\t\t"),r("span",{staticClass:"px-2 text-xs inline-flex leading-5 font-semibold rounded-full",class:t.roleBgColorClass(e.role)},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t"+t._s(e.role)+"\n\t\t\t\t\t\t\t\t\t\t\t\t")])])])])])]),t._v(" "),r("td",{staticClass:"px-6 py-4 whitespace-nowrap align-middle hidden md:table-cell"},[r("span",{staticClass:"px-2 text-xs inline-flex leading-5 font-semibold rounded-full ",class:t.roleBgColorClass(e.role)},[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(e.role)+"\n\t\t\t\t\t\t\t\t")])]),t._v(" "),r("td",{staticClass:"px-6 py-4 whitespace-nowrap text-right text-sm font-medium align-middle"},[r("nav",{staticClass:"flex items-center justify-end"},[r("router-link",{staticClass:"block text-purple-400 hover:text-purple-300 mr-5",attrs:{to:"/users/"+e.username}},[t._v("\n\t\t\t\t\t\t\t\t\t\tEdit\n\t\t\t\t\t\t\t\t\t")]),t._v(" "),r("button",{staticClass:"block text-pink-600 hover:text-pink-500",on:{click:function(r){return t.deleteUser(e)}}},[t._v("\n\t\t\t\t\t\t\t\t\t\tDelete\n\t\t\t\t\t\t\t\t\t")])],1)])])})),0)])])])])])}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("thead",{staticClass:"bg-purple-600 text-purple-200"},[r("tr",[r("th",{staticClass:"px-6 py-3 text-left text-xs font-medium uppercase tracking-wider",attrs:{scope:"col"}},[t._v("\n\t\t\t\t\t\t\t\tName\n\t\t\t\t\t\t\t")]),t._v(" "),r("th",{staticClass:"px-6 py-3 text-left text-xs font-medium uppercase tracking-wider hidden md:table-cell",attrs:{scope:"col"}},[t._v("\n\t\t\t\t\t\t\t\tRole\n\t\t\t\t\t\t\t")]),t._v(" "),r("th",{staticClass:"relative px-6 py-3",attrs:{scope:"col"}},[r("span",{staticClass:"sr-only"},[t._v("Edit")])])])])}],!1,null,null,null).exports,c=r(685),u=r(4963),p=r(2776);function d(t,e,r,s,n,a,i){try{var o=t[a](i),l=o.value}catch(t){return void r(t)}o.done?e(l):Promise.resolve(l).then(s,n)}function f(t){return function(){var e=this,r=arguments;return new Promise((function(s,n){var a=t.apply(e,r);function i(t){d(a,s,n,i,o,"next",t)}function o(t){d(a,s,n,i,o,"throw",t)}i(void 0)}))}}var v={data:function(t){return{users:[],loading:!0,error:null}},mounted:function(){this.fetchUsers()},methods:{fetchUsers:function(){var t=this;return f(n().mark((function e(){return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.error=null,t.loading=!0,e.next=5,a.r.all();case 5:t.users=e.sent,e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),console.error("error during fetch users.all",e.t0),t.error=e.t0.message;case 12:t.loading=!1;case 13:case"end":return e.stop()}}),e,null,[[0,8]])})))()},save:function(){var t=this;return f(n().mark((function e(){return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.error=null,t.loading=!0,e.next=5,a.r.update(t.editedUser);case 5:t.loading=!1,t.fetchUsers(),e.next=14;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0),t.loading=!1,t.error=e.t0.message;case 14:case"end":return e.stop()}}),e,null,[[0,9]])})))()},deleteUser:function(t){var e=this;return f(n().mark((function r(){return n().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,e.error=null,e.loading=!0,r.next=5,a.r.delete(t);case 5:e.loading=!1,e.fetchUsers(),r.next=14;break;case 9:r.prev=9,r.t0=r.catch(0),console.error(r.t0),e.loading=!1,e.error=r.t0.message;case 14:case"end":return r.stop()}}),r,null,[[0,9]])})))()}},computed:{serverLayout:function(){return this.$mcState("layout",[])},layout:function(){return this.editLayout||this.serverLayout},user:function(){return this.$store.state.user}},watch:{user:function(){this.editedUser=this.user}},components:{spinnerIcon:c.Z,userList:l,topBarActions:u.Z,topBarButton:p.Z}},m=(0,o.Z)(v,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("main",{staticClass:"dashboard-page p-5 md:p-12"},[r("div",{staticClass:"max-w-4xl"},[r("div",{staticClass:"lg:grid lg:grid-cols-3 lg:gap-6"},[t._m(0),t._v(" "),r("div",{staticClass:"mt-5 lg:mt-0 lg:col-span-2"},[t.error?r("section",{staticClass:"font-semibold text-purple-400 text-center"},[t._v("\n\t\t\t\t\t"+t._s(t.error)+"\n\t\t\t\t")]):t._e(),t._v(" "),t.loading?r("section",{staticClass:"w-full flex justify-center items-center"},[r("spinner-icon",{staticClass:"text-purple-600 fill-current w-16 animate-spin mb-10"})],1):r("section",[r("user-list",{attrs:{users:t.users}})],1)])])]),t._v(" "),r("top-bar-actions",[r("top-bar-button",{attrs:{"router-link":"/users/create"}},[t._v("Create new User")]),t._v(" "),r("top-bar-button",{attrs:{"router-link":"/users/create"}},[t._v("Create new User")]),t._v(" "),r("top-bar-button",{attrs:{"router-link":"/users/create"}},[t._v("Create new User")]),t._v(" "),r("top-bar-button",{attrs:{"router-link":"/users/create"}},[t._v("Create new User")])],1)],1)}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"lg:col-span-1"},[r("div",{staticClass:"px-4 sm:px-0"},[r("h3",{staticClass:"text-lg leading-6 text-purple-100 font-semibold"},[t._v("\n\t\t\t\t\t\tUser Management\n\t\t\t\t\t")]),t._v(" "),r("p",{staticClass:"mt-1 text-sm text-purple-400"},[t._v("\n\t\t\t\t\t\tCreate, update and delete users from Mission Control.\n\t\t\t\t\t")])])])}],!1,null,null,null).exports}}]);