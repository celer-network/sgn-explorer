(this["webpackJsonpsgn-explorer"]=this["webpackJsonpsgn-explorer"]||[]).push([[8],{1028:function(e,t,r){"use strict";r.d(t,"a",(function(){return n})),r.d(t,"b",(function(){return a})),r.d(t,"c",(function(){return o})),r.d(t,"d",(function(){return i}));var n=["Unbonded","Bonded","Unbonding"],a=["ProposalDeposit","GovernVoteTimeout","SlashTimeout","MinValidatorNum","MaxValidatorNum","MinStakeInPool","AdvanceNoticePeriod"],o={Voting:"1",Closed:"2"},i={Yes:1,No:2,Abstain:3}},1130:function(e,t,r){"use strict";r.r(t);var n=r(34),a=r(0),o=r.n(a),i=r(1),l=r.n(i),c=r(53),s=r.n(c),u=r(96),p=r(1021),f=r(3),m=r.n(f),d=r(28),h=r(1043),y=r(112),g=r(1053),v=r(292),b=r(219);function P(e){if(!a.isValidElement(e))return e;for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return a.cloneElement.apply(a,[e].concat(r))}function E(e){return(E="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function S(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function O(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function C(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function x(e,t){return(x=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function w(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=N(e);if(t){var a=N(this).constructor;r=Reflect.construct(n,arguments,a)}else r=n.apply(this,arguments);return j(this,r)}}function j(e,t){return!t||"object"!==E(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function N(e){return(N=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function k(){return(k=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var z=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(n=Object.getOwnPropertySymbols(e);a<n.length;a++)t.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]])}return r};function I(e,t){return e[t]&&Math.floor(24/e[t])}var M=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&x(e,t)}(i,e);var t,r,n,o=w(i);function i(){var e;return O(this,i),(e=o.apply(this,arguments)).renderItem=function(t){var r=t.getPrefixCls,n=e.context,o=n.grid,i=n.itemLayout,l=e.props,c=l.prefixCls,s=l.children,u=l.actions,p=l.extra,f=l.className,d=z(l,["prefixCls","children","actions","extra","className"]),h=r("list",c),y=u&&u.length>0&&a.createElement("ul",{className:"".concat(h,"-item-action"),key:"actions"},u.map((function(e,t){return a.createElement("li",{key:"".concat(h,"-item-action-").concat(t)},e,t!==u.length-1&&a.createElement("em",{className:"".concat(h,"-item-action-split")}))}))),g=o?"div":"li",v=a.createElement(g,k({},d,{className:m()("".concat(h,"-item"),f,S({},"".concat(h,"-item-no-flex"),!e.isFlexMode()))}),"vertical"===i&&p?[a.createElement("div",{className:"".concat(h,"-item-main"),key:"content"},s,y),a.createElement("div",{className:"".concat(h,"-item-extra"),key:"extra"},p)]:[s,y,P(p,{key:"extra"})]);return o?a.createElement(b.a,{span:I(o,"column"),xs:I(o,"xs"),sm:I(o,"sm"),md:I(o,"md"),lg:I(o,"lg"),xl:I(o,"xl"),xxl:I(o,"xxl")},v):v},e}return t=i,(r=[{key:"isItemContainsTextNodeAndNotSingular",value:function(){var e,t=this.props.children;return a.Children.forEach(t,(function(t){"string"===typeof t&&(e=!0)})),e&&a.Children.count(t)>1}},{key:"isFlexMode",value:function(){var e=this.props.extra;return"vertical"===this.context.itemLayout?!!e:!this.isItemContainsTextNodeAndNotSingular()}},{key:"render",value:function(){return a.createElement(y.a,null,this.renderItem)}}])&&C(t.prototype,r),n&&C(t,n),i}(a.Component);function T(e){return(T="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function V(e){return function(e){if(Array.isArray(e))return _(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"===typeof e)return _(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return _(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function D(){return(D=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function A(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function R(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function L(e,t){return(L=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function F(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=U(e);if(t){var a=U(this).constructor;r=Reflect.construct(n,arguments,a)}else r=n.apply(this,arguments);return q(this,r)}}function q(e,t){return!t||"object"!==T(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function U(e){return(U=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}M.Meta=function(e){return a.createElement(y.a,null,(function(t){var r=t.getPrefixCls,n=e.prefixCls,o=e.className,i=e.avatar,l=e.title,c=e.description,s=z(e,["prefixCls","className","avatar","title","description"]),u=r("list",n),p=m()("".concat(u,"-item-meta"),o),f=a.createElement("div",{className:"".concat(u,"-item-meta-content")},l&&a.createElement("h4",{className:"".concat(u,"-item-meta-title")},l),c&&a.createElement("div",{className:"".concat(u,"-item-meta-description")},c));return a.createElement("div",k({},s,{className:p}),i&&a.createElement("div",{className:"".concat(u,"-item-meta-avatar")},i),(l||c)&&f)}))},M.contextTypes={grid:i.any,itemLayout:i.string};var G=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(n=Object.getOwnPropertySymbols(e);a<n.length;a++)t.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]])}return r},J=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&L(e,t)}(i,e);var t,r,n,o=F(i);function i(e){var t;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),(t=o.call(this,e)).defaultPaginationProps={current:1,total:0},t.keys={},t.onPaginationChange=t.triggerPaginationEvent("onChange"),t.onPaginationShowSizeChange=t.triggerPaginationEvent("onShowSizeChange"),t.renderItem=function(e,r){var n,a=t.props,o=a.renderItem,i=a.rowKey;return o?((n="function"===typeof i?i(e):"string"===typeof i?e[i]:e.key)||(n="list-item-".concat(r)),t.keys[r]=n,o(e,r)):null},t.renderEmpty=function(e,r){var n=t.props.locale;return a.createElement("div",{className:"".concat(e,"-empty-text")},n&&n.emptyText||r("List"))},t.renderList=function(e){var r,n=e.getPrefixCls,o=e.renderEmpty,i=t.state,l=i.paginationCurrent,c=i.paginationSize,s=t.props,u=s.prefixCls,p=s.bordered,f=s.split,y=s.className,b=s.children,P=s.itemLayout,E=s.loadMore,S=s.pagination,O=s.grid,C=s.dataSource,x=void 0===C?[]:C,w=s.size,j=s.header,N=s.footer,k=s.loading,z=G(s,["prefixCls","bordered","split","className","children","itemLayout","loadMore","pagination","grid","dataSource","size","header","footer","loading"]),I=n("list",u),M=k;"boolean"===typeof M&&(M={spinning:M});var T=M&&M.spinning,_="";switch(w){case"large":_="lg";break;case"small":_="sm"}var R=m()(I,y,(A(r={},"".concat(I,"-vertical"),"vertical"===P),A(r,"".concat(I,"-").concat(_),_),A(r,"".concat(I,"-split"),f),A(r,"".concat(I,"-bordered"),p),A(r,"".concat(I,"-loading"),T),A(r,"".concat(I,"-grid"),O),A(r,"".concat(I,"-something-after-last-item"),t.isSomethingAfterLastItem()),r)),L=D(D(D({},t.defaultPaginationProps),{total:x.length,current:l,pageSize:c}),S||{}),F=Math.ceil(L.total/L.pageSize);L.current>F&&(L.current=F);var q,U=S?a.createElement("div",{className:"".concat(I,"-pagination")},a.createElement(g.a,D({},L,{onChange:t.onPaginationChange,onShowSizeChange:t.onPaginationShowSizeChange}))):null,J=V(x);if(S&&x.length>(L.current-1)*L.pageSize&&(J=V(x).splice((L.current-1)*L.pageSize,L.pageSize)),q=T&&a.createElement("div",{style:{minHeight:53}}),J.length>0){var K=J.map((function(e,r){return t.renderItem(e,r)})),B=[];a.Children.forEach(K,(function(e,r){B.push(a.cloneElement(e,{key:t.keys[r]}))})),q=O?a.createElement(v.a,{gutter:O.gutter},B):a.createElement("ul",{className:"".concat(I,"-items")},B)}else b||T||(q=t.renderEmpty(I,o));var H=L.position||"bottom";return a.createElement("div",D({className:R},Object(d.a)(z,["rowKey","renderItem","locale"])),("top"===H||"both"===H)&&U,j&&a.createElement("div",{className:"".concat(I,"-header")},j),a.createElement(h.a,M,q,b),N&&a.createElement("div",{className:"".concat(I,"-footer")},N),E||("bottom"===H||"both"===H)&&U)};var r=e.pagination,n=r&&"object"===T(r)?r:{};return t.state={paginationCurrent:n.defaultCurrent||1,paginationSize:n.defaultPageSize||10},t}return t=i,(r=[{key:"getChildContext",value:function(){return{grid:this.props.grid,itemLayout:this.props.itemLayout}}},{key:"triggerPaginationEvent",value:function(e){var t=this;return function(r,n){var a=t.props.pagination;t.setState({paginationCurrent:r,paginationSize:n}),a&&a[e]&&a[e](r,n)}}},{key:"isSomethingAfterLastItem",value:function(){var e=this.props,t=e.loadMore,r=e.pagination,n=e.footer;return!!(t||r||n)}},{key:"render",value:function(){return a.createElement(y.a,null,this.renderList)}}])&&R(t.prototype,r),n&&R(t,n),i}(a.Component);J.Item=M,J.childContextTypes={grid:i.any,itemLayout:i.string},J.defaultProps={dataSource:[],bordered:!1,split:!0,loading:!1,pagination:!1};var K=r(1026),B=r(1054),H=r(83),Y=r(136),$=r(70),Q=r(1024),W=r(293),X=r(436),Z=W.a.Item;class ee extends o.a.PureComponent{constructor(...e){super(...e),this.onChange=e=>{var t=this.props,r=t.name,n=t.onChange;n(r?{[r]:e}:e)}}render(){var e=this.props,t=e.allowClear,r=e.label,a=e.name,i=e.mode,l=e.value,c=Object(n.a)({},s.a.omit(this.props,["label","name","onChange"]));return"multiple"!==i||l||(c.value=[]),i||t||(c.allowClear=!1),o.a.createElement(Z,{className:"dropdown-filter",label:r||s.a.capitalize(a)},o.a.createElement(X.a,Object.assign({},c,{onChange:this.onChange})))}}ee.defaultProps={disabled:!1,label:"",placeholder:"all"};var te=r(1019),re=r(170),ne=r(1028),ae=r(295);class oe extends o.a.Component{constructor(e,t){super(e),this.handleCreateParamProposal=()=>{var e=this.props.onClose;this.form.current.validateFields((t,r)=>{if(t)console.log(t);else{var n=r.value,a=r.record;this.contracts.DPoS.methods.createParamProposal.cacheSend(a,n),e()}})},this.state={},this.form=o.a.createRef(),this.contracts=t.drizzle.contracts}render(){var e=this.props,t=e.visible,r=e.onClose,n=[{name:"record",field:"select",fieldOptions:{options:ne.b.map((e,t)=>[t,e]),placeholder:"The parameter record"},rules:[{message:"Please select a record!",required:!0}]},{name:"value",label:"Value",field:"number",fieldOptions:{placeholder:"The new value"},rules:[Object(ae.c)(0),{message:"Please enter a new value!",required:!0}]}];return o.a.createElement(te.a,{title:"Create Param Proposal",visible:t,onOk:this.handleCreateParamProposal,onCancel:r},o.a.createElement(re.a,{ref:this.form,items:n}))}}oe.contextTypes={drizzle:l.a.object};var ie=oe;class le extends o.a.Component{constructor(e,t){super(e),this.toggleProposalModal=()=>{this.setState(e=>({isProposalModalVisible:!e.isProposalModalVisible}))},this.voteParam=(e,t)=>{this.contracts.DPoS.methods.voteParam.cacheSend(e,t)},this.confirmParamProposal=e=>{this.contracts.DPoS.methods.confirmParamProposal.cacheSend(e)},this.updateFilter=e=>{this.setState(t=>({filter:Object(n.a)(Object(n.a)({},t.filter),e)}))},this.renderFilters=()=>{var e=this.state.filter.status,t=s.a.map(ne.c,(e,t)=>[e,t]);return o.a.createElement(ee,{name:"status",options:t,style:{width:100},onChange:this.updateFilter,value:e,allowClear:!0})},this.renderProposal=e=>{var t=e.args[0],r=e.value,n=r.voteDeadline,a=r.record,i=r.newValue,l=o.a.createElement(p.a,null,s.a.map(ne.d,(e,r)=>o.a.createElement(p.a.Item,{onClick:()=>this.voteParam(t,e)},r)));return o.a.createElement(J.Item,null,o.a.createElement(K.a,{actions:[o.a.createElement(B.a,{overlay:l},o.a.createElement(H.a,{type:"link",title:"Vote",icon:"audit",size:"small"},"Vote")),o.a.createElement(H.a,{type:"link",title:"Vote",icon:"check-square",size:"small",onClick:()=>this.confirmParamProposal(t)},"Confirm Proposal")]},o.a.createElement(Y.a,null,o.a.createElement($.a,{span:12},o.a.createElement(Q.a,{title:"Proposal ID",value:t})),o.a.createElement($.a,{span:12},o.a.createElement(Q.a,{title:"Vote Deadline",value:n})),o.a.createElement($.a,{span:12},o.a.createElement(Q.a,{title:"Record",value:ne.b[a]})),o.a.createElement($.a,{span:12},o.a.createElement(Q.a,{title:"New Value",value:i})))))},this.renderProposals=()=>{var e=this.props.DPoS,t=this.state.filter,r=s.a.values(e.paramProposals);return r=s.a.filter(r,e=>{var r=e.value.status;return console.log(e.value),t.status===r}),o.a.createElement(J,{grid:{gutter:16,column:2},dataSource:r,renderItem:this.renderProposal})},this.state={isProposalModalVisible:!1,filter:{status:"1"}},this.contracts=t.drizzle.contracts}render(){var e=this.state.isProposalModalVisible;return o.a.createElement(K.a,{title:"Govern",extra:o.a.createElement(H.a,{type:"primary",onClick:this.toggleProposalModal},"Create Proposal")},this.renderFilters(),this.renderProposals(),o.a.createElement(ie,{visible:e,onClose:this.toggleProposalModal}))}}le.contextTypes={drizzle:l.a.object};t.default=Object(u.drizzleConnect)(le,(function(e){var t=e.contracts,r=e.DPoS;return{DPoS:Object(n.a)(Object(n.a)({},r),t.DPoS)}}))}}]);
//# sourceMappingURL=8.2be0bf20.chunk.js.map