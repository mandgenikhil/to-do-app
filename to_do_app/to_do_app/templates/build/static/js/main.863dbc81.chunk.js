(this.webpackJsonpcounter=this.webpackJsonpcounter||[]).push([[0],{30:function(e,t,a){e.exports=a(44)},35:function(e,t,a){},41:function(e,t,a){},42:function(e,t,a){},44:function(e,t,a){"use strict";a.r(t);var n=a(10),o=a(11),l=a(13),r=a(12),s=a(14),c=a(0),i=a.n(c),d=a(17),m=a.n(d);a(35),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var u=a(29),h=a(16),p=Object(h.c)(Object(h.b)({})),v=a(27),g=a(9),E=(a(40),a(21)),f=a(8);a(41);function y(e){return i.a.createElement("div",null,i.a.createElement("div",{class:"notification is-primary"},i.a.createElement("button",{class:"delete",onClick:function(){return e.onClickFunction(e.todo.todo_id)}}),e.todo.todo_data,i.a.createElement("p",{class:"level-item"}," ",e.todo.created_at)))}var b={V1:{gettodos:"http://localhost:8000/api/v1/to_do",savetodos:"http://localhost:8000/api/v1/save_to_do",deletetodo:"http://localhost:8000/api/v1/delete_to_do",validateUser:"http://localhost:8000/rest-auth/login/"}},k=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(l.a)(this,Object(r.a)(t).call(this,e))).clearAll=function(){localStorage.clear(),a.props.history.push("/")},a.handleChange=function(e){var t;a.setState((t={},Object(E.a)(t,e.target.name,e.target.value),Object(E.a)(t,"text_data",e.target.value),t))},a.clearData=function(){a.setState({text_data:" ",answer:"",responseList:[]})},a.state={toggleModal:!1,todo_id:"",text_data:"",answer:"",responseList:[]},a.handleModalDisplay=a.handleModalDisplay.bind(Object(f.a)(a)),a.onClickFunction=a.onClickFunction.bind(Object(f.a)(a)),a.handleModalDisplay=a.handleModalDisplay.bind(Object(f.a)(a)),a}return Object(s.a)(t,e),Object(o.a)(t,[{key:"handleModalDisplay",value:function(e){this.setState((function(t){return{toggleModal:!t.toggleModal,todo_id:e}}))}},{key:"componentDidMount",value:function(){var e=this;null===localStorage.getItem("key")?(this.props.history.push("/"),localStorage.clear()):fetch(b.V1.gettodos,{method:"GET",mode:"cors",headers:{"Content-Type":"application/json",Authorization:"Token "+localStorage.getItem("key")}}).then((function(e){return e.json()})).then((function(t){e.setState({key:t.key}),void 0!==t.response?e.setState({responseList:t.response}):e.setState({isError:!0,errorMsg:"Please enter valid credentials"})}))}},{key:"onClearClickAction",value:function(){this.setState({text_data:" "})}},{key:"onEnterClickAction",value:function(){var e=this;fetch(b.V1.savetodos,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json",Authorization:"Token "+localStorage.getItem("key")},body:JSON.stringify({todo_title:"Test To Do",todo_data:this.state.text_data})}).then((function(e){return e.json()})).then((function(t){void 0!==t.response&&fetch(b.V1.gettodos,{method:"GET",mode:"cors",headers:{"Content-Type":"application/json",Authorization:"Token "+localStorage.getItem("key")}}).then((function(e){return e.json()})).then((function(t){e.setState({key:t.key}),void 0!==t.response?e.setState({responseList:t.response}):e.setState({isError:!0,errorMsg:"Please enter valid credentials"})}))}))}},{key:"onClickFunction",value:function(e){var t=this;void 0!==e&&fetch(b.V1.deletetodo,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json",Authorization:"Token "+localStorage.getItem("key")},body:JSON.stringify({todo_id:e})}).then((function(e){return e.json()})).then((function(e){void 0!==e.response&&(console.log("Mandge",e),fetch(b.V1.gettodos,{method:"GET",mode:"cors",headers:{"Content-Type":"application/json",Authorization:"Token "+localStorage.getItem("key")}}).then((function(e){return e.json()})).then((function(e){t.setState({key:e.key}),void 0!==e.response?t.setState({responseList:e.response}):t.setState({isError:!0,errorMsg:"Please enter valid credentials"})})))}))}},{key:"render",value:function(){var e=this;return i.a.createElement("div",null,i.a.createElement((function(e){return!0===e.toggleModal?i.a.createElement("div",{class:"modal"},i.a.createElement("div",{class:"modal-background"}),i.a.createElement("div",{class:"modal-card"},i.a.createElement("header",{class:"modal-card-head"},i.a.createElement("p",{class:"modal-card-title"},"Do You Wanted To Delete This ToDo?"),i.a.createElement("button",{class:"delete","aria-label":"close"})),i.a.createElement("section",{class:"modal-card-body"},i.a.createElement("button",{class:"button is-success"},"Yes"),i.a.createElement("button",{class:"button"},"Cancel")))):null}),{toggleModal:this.state.toggleModal}),i.a.createElement("header",null,i.a.createElement("nav",{class:"navbar",role:"navigation","aria-label":"main navigation"},i.a.createElement("div",{class:"navbar-brand"},i.a.createElement("a",{class:"navbar-item",href:"/ToDo"},i.a.createElement("img",{alt:"",src:"https://img.icons8.com/fluent/48/000000/todo-list.png"})),i.a.createElement("text",{class:"navbar-item"},"To-Do")),i.a.createElement("div",{id:"navbarBasicExample",class:"navbar-menu"},i.a.createElement("div",{class:"navbar-start"})),i.a.createElement("div",{class:"navbar-end"},i.a.createElement("div",{class:"navbar-item "},i.a.createElement("a",{href:!0},"Hi"," ",null==localStorage.getItem("user_name")?"User":localStorage.getItem("user_name").toUpperCase())),i.a.createElement("div",{class:"navbar-item"},i.a.createElement("div",{class:"buttons"},i.a.createElement("button",{onClick:this.clearAll,class:"button is-light"},"Log Out")))))),i.a.createElement("article",{class:"box"},this.state.responseList.map((function(t){return i.a.createElement(y,{todo:t,onClickFunction:e.onClickFunction,handleModalDisplay:e.handleModalDisplay})})),i.a.createElement("div",null,i.a.createElement("textarea",{class:"textarea",placeholder:"e.g. Hello world",onChange:this.handleChange})),i.a.createElement("div",{class:"level-right"},i.a.createElement("span",null,i.a.createElement("button",{className:"button info",onClick:function(){return e.onEnterClickAction()}},"Save")))))}}]),t}(c.Component),S=(a(42),function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(l.a)(this,Object(r.a)(t).call(this,e))).getUserDetailsData=function(){console.log("--\x3e");var e=document.getElementById("username").value,t=document.getElementById("password").value;null!==e&&null!==t&&""!==e.trim()&&""!==t.trim()&&(document.getElementById("myInput").addEventListener("keyup",(function(e){13===e.keyCode&&(e.preventDefault(),document.getElementById("myBtn").click())})),fetch(b.V1.validateUser,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:t})}).then((function(e){return e.json()})).then((function(e){console.log("--\x3e",e),void 0!==e.key?(localStorage.setItem("key",e.key),localStorage.setItem("user_name",e.user.username),a.props.history.push("/ToDo")):a.setState({isError:!0,errorMsg:"Please enter valid credentials"})})))},a.state={isauth:!1,chart:null,userName:null,isError:!1,errorMsg:""},a.handleKeyDown=a.handleKeyDown.bind(Object(f.a)(a)),a}return Object(s.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){localStorage.clear()}},{key:"handleKeyDown",value:function(e){var t=this;if("Enter"===e.key){var a=document.getElementById("username").value,n=document.getElementById("password").value;if(null!==a&&null!==n&&""!==a.trim()&&""!==n.trim())document.getElementById("myInput").addEventListener("keyup",(function(e){13===e.keyCode&&(e.preventDefault(),document.getElementById("myBtn").click())})),fetch(b.V1.validateUser,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:a,password:n})}).then((function(e){return e.json()})).then((function(e){console.log("--\x3e",e),t.setState({key:e.key}),console.log("Aya 1"),void 0!==e.key?(console.log("Aya 2"),localStorage.setItem("key",e.key),localStorage.setItem("user_name",e.user.username),t.props.history.push("/ToDo")):t.setState({isError:!0,errorMsg:"Please enter valid credentials"})}))}}},{key:"render",value:function(){var e=this;return!1===this.state.isauth?i.a.createElement("div",{className:"container-fluid home"},i.a.createElement("nav",{className:"navbar navbar-align nav-home",role:"navigation","aria-label":"main navigation"},i.a.createElement("div",{className:"navbar-brand"})),i.a.createElement((function(){return i.a.createElement("div",null,i.a.createElement("div",{className:"sufficiency-of-input "},i.a.createElement("p",{className:"heading-font"},"To Do Application")),i.a.createElement("div",null," ",i.a.createElement("div",{className:"card-box-margin"},i.a.createElement("div",null,i.a.createElement("form",{action:"",className:"box bg-color-box"},i.a.createElement("div",{className:"field"},i.a.createElement("label",{for:"",className:"label"},"UserName"),i.a.createElement("div",{className:"control has-icons-left bg-color-box"},i.a.createElement("input",{id:"username",type:"email",placeholder:"e.g. username@test.com",className:"input"}),i.a.createElement("span",{className:"icon is-small is-left"},i.a.createElement("i",{className:"fa fa-envelope"})))),i.a.createElement("div",{className:"field"},i.a.createElement("label",{for:"",className:"label"},"Password"),i.a.createElement("div",{className:"control has-icons-left bg-color-box"},i.a.createElement("input",{id:"password",type:"password",placeholder:"*******",className:"input",required:!0,onKeyDown:e.handleKeyDown}),i.a.createElement("span",{className:"icon is-small is-left"},i.a.createElement("i",{className:"fa fa-lock"})))),i.a.createElement("div",{className:"field"},i.a.createElement("a",{href:!0,id:"myInput",className:"button is-info",onClick:function(){return e.getUserDetailsData()}},"Login")),e.state.isError?i.a.createElement("div",{className:"error-msg"},e.state.errorMsg):null)))),i.a.createElement("div",null))}),{showDetails:this.state.showModal,closeModal:this.toggleAnalyzerModal})):"test"}}]),t}(c.Component)),j=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(l.a)(this,Object(r.a)(t).call(this,e))).state={hasError:!1},a}return Object(s.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return this.state.hasError?i.a.createElement("section",{className:"hero"},i.a.createElement("div",{className:"hero-body"},i.a.createElement("div",{className:"container "},i.a.createElement("h1",{className:"title"},"Oops! Something went wrong!"),i.a.createElement("h5",null,"Please ",i.a.createElement("a",{href:"Dashboard/Home"},"Click")," on this link to go back to the home page and Please reach out to ",i.a.createElement("a",{href:"mailto:nikhil.mandge@test.com"},"Nikhil Mandge")," if the problem persists after a retry.")))):this.props.children}}],[{key:"getDerivedStateFromError",value:function(e){return{hasError:!0}}}]),t}(i.a.Component),D=i.a.createElement(v.a,null,i.a.createElement(j,null,i.a.createElement(g.a,{exact:!0,path:"/",component:S}),i.a.createElement(g.a,{exact:!0,path:"/ToDo",component:k})));m.a.render(i.a.createElement(u.a,{store:p},D),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[30,1,2]]]);
//# sourceMappingURL=main.863dbc81.chunk.js.map