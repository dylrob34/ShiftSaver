(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{23:function(e,t,n){e.exports=n(51)},28:function(e,t,n){},29:function(e,t,n){},49:function(e,t,n){},50:function(e,t,n){},51:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(14),i=n.n(r),s=(n(28),n(4)),c=n(5),l=n(7),u=n(6),m=n(9),d=n(8),h=(n(29),n(22)),g=n.n(h),f=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).onChange=function(e){return n.setState({date:e})},n.state={date:new Date},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(g.a,{onChange:this.onChange,value:this.state.date}))}}]),t}(o.a.Component),p=(n(49),function(e){function t(e){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).call(this,e))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"mainDiv"},o.a.createElement("div",{className:"calendarDiv"},o.a.createElement(f,null)),o.a.createElement("div",{className:"upcomingShiftsDiv"},o.a.createElement("h1",null,"Upcoming Shifts"),o.a.createElement("ul",null,o.a.createElement("li",null,"list for the next 2? weeks of upcoming shifts"))))}}]),t}(o.a.Component)),v=(n(50),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={username:"",password:"",loggedIn:!1},n.onUsername=n.onUsername.bind(Object(m.a)(n)),n.onPassword=n.onPassword.bind(Object(m.a)(n)),n.login=n.login.bind(Object(m.a)(n)),n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"login",value:function(){var e=this;return console.log("well the function ran..."),fetch("/login",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({username:this.state.username,password:this.state.password})}).then((function(e){return e.json()})).then((function(t){if(1==t.error)throw"error";e.setState({loggedIn:t.login}),e.props.onLoggedIn(e.state.loggedIn)})).catch((function(e){console.log("unable to login at this time")}))}},{key:"onUsername",value:function(e){e.preventDefault(),this.setState({username:e.target.value})}},{key:"onPassword",value:function(e){e.preventDefault(),this.setState({password:e.target.value})}},{key:"render",value:function(){return o.a.createElement("div",{className:"loginDiv"},o.a.createElement("h1",{id:"welcomeText"},"Welcome!"),o.a.createElement("form",{className:"loginForm"},o.a.createElement("div",{className:"usernameDiv"},o.a.createElement("input",{type:"text",id:"username",placeholder:"Enter Username",onChange:this.onUsername})),o.a.createElement("div",{className:"passwordDiv"},o.a.createElement("input",{type:"password",id:"password",placeholder:"Enter Password",onChange:this.onPassword})),o.a.createElement("button",{type:"button",onClick:this.login},"Login")))}}]),t}(o.a.Component)),b=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={loggedIn:!1},n.onLogin=n.onLogin.bind(Object(m.a)(n)),n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"onLogin",value:function(e){this.setState({loggedIn:e})}},{key:"render",value:function(){var e=this.state.loggedIn?o.a.createElement(p,null):o.a.createElement(v,{onLoggedIn:this.onLogin});return o.a.createElement("div",null,e)}}]),t}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[23,1,2]]]);
//# sourceMappingURL=main.c7daec15.chunk.js.map