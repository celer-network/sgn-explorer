(this["webpackJsonpsgn-explorer"]=this["webpackJsonpsgn-explorer"]||[]).push([[6],{1028:function(e,t,a){"use strict";a.d(t,"a",(function(){return r})),a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return o})),a.d(t,"d",(function(){return i}));var r=["Unbonded","Bonded","Unbonding"],n=["ProposalDeposit","GovernVoteTimeout","SlashTimeout","MinValidatorNum","MaxValidatorNum","MinStakeInPool","AdvanceNoticePeriod"],o={Voting:"1",Closed:"2"},i={Yes:1,No:2,Abstain:3}},1110:function(e,t,a){"use strict";for(var r="qpzry9x8gf2tvdw0s3jn54khce6mua7l",n={},o=0;o<r.length;o++){var i=r.charAt(o);if(void 0!==n[i])throw new TypeError(i+" is ambiguous");n[i]=o}function s(e){var t=e>>25;return(33554431&e)<<5^996825010&-(t>>0&1)^642813549&-(t>>1&1)^513874426&-(t>>2&1)^1027748829&-(t>>3&1)^705979059&-(t>>4&1)}function l(e){for(var t=1,a=0;a<e.length;++a){var r=e.charCodeAt(a);if(r<33||r>126)return"Invalid prefix ("+e+")";t=s(t)^r>>5}for(t=s(t),a=0;a<e.length;++a){var n=e.charCodeAt(a);t=s(t)^31&n}return t}function c(e,t){if(t=t||90,e.length<8)return e+" too short";if(e.length>t)return"Exceeds length limit";var a=e.toLowerCase(),r=e.toUpperCase();if(e!==a&&e!==r)return"Mixed-case string "+e;var o=(e=a).lastIndexOf("1");if(-1===o)return"No separator character for "+e;if(0===o)return"Missing prefix for "+e;var i=e.slice(0,o),c=e.slice(o+1);if(c.length<6)return"Data too short";var d=l(i);if("string"===typeof d)return d;for(var m=[],h=0;h<c.length;++h){var u=c.charAt(h),f=n[u];if(void 0===f)return"Unknown character "+u;d=s(d)^f,h+6>=c.length||m.push(f)}return 1!==d?"Invalid checksum for "+e:{prefix:i,words:m}}function d(e,t,a,r){for(var n=0,o=0,i=(1<<a)-1,s=[],l=0;l<e.length;++l)for(n=n<<t|e[l],o+=t;o>=a;)o-=a,s.push(n>>o&i);if(r)o>0&&s.push(n<<a-o&i);else{if(o>=t)return"Excess padding";if(n<<a-o&i)return"Non-zero padding"}return s}e.exports={decodeUnsafe:function(){var e=c.apply(null,arguments);if("object"===typeof e)return e},decode:function(e){var t=c.apply(null,arguments);if("object"===typeof t)return t;throw new Error(t)},encode:function(e,t,a){if(a=a||90,e.length+7+t.length>a)throw new TypeError("Exceeds length limit");var n=l(e=e.toLowerCase());if("string"===typeof n)throw new Error(n);for(var o=e+"1",i=0;i<t.length;++i){var c=t[i];if(c>>5!==0)throw new Error("Non 5-bit word");n=s(n)^c,o+=r.charAt(c)}for(i=0;i<6;++i)n=s(n);for(n^=1,i=0;i<6;++i){o+=r.charAt(n>>5*(5-i)&31)}return o},toWordsUnsafe:function(e){var t=d(e,8,5,!0);if(Array.isArray(t))return t},toWords:function(e){var t=d(e,8,5,!0);if(Array.isArray(t))return t;throw new Error(t)},fromWordsUnsafe:function(e){var t=d(e,5,8,!1);if(Array.isArray(t))return t},fromWords:function(e){var t=d(e,5,8,!1);if(Array.isArray(t))return t;throw new Error(t)}}},1129:function(e,t,a){"use strict";a.r(t);var r=a(34),n=a(0),o=a.n(n),i=a(1),s=a.n(i),l=a(53),c=a.n(l),d=a(96),m=a(1110),h=a.n(m),u=a(139),f=a.n(u),g=a(1021),v=a(1054),p=a(14),b=a(136),E=a(70),C=a(1024),S=a(290),w=a(1131),k=a(1026),y=a(1019),I=a(170),x=a(295);class D extends o.a.Component{constructor(e,t){super(e),this.onSubmit=()=>{var e=this.props,t=e.onClose,a=e.candidateId;this.form.current.validateFields((e,r)=>{if(!e){var n=r.value;this.contracts.DPoS.methods.delegate.cacheSend(a,f.a.utils.toWei(n.toString(),"ether")),t()}})},this.form=o.a.createRef(),this.contracts=t.drizzle.contracts}render(){var e=this.props,t=e.visible,a=e.onClose,n=[{name:"value",field:"number",fieldOptions:Object(r.a)(Object(r.a)({},x.a),{},{placeholder:"The amount of CELR to delegate"}),rules:[{message:"Please enter a value!",required:!0}]}];return o.a.createElement(y.a,{title:"Delegate Stake",visible:t,onOk:this.onSubmit,onCancel:a},o.a.createElement(I.a,{ref:this.form,items:n}))}}D.contextTypes={drizzle:s.a.object};var A=D;class M extends o.a.Component{constructor(e,t){super(e),this.onSubmit=()=>{var e=this.props,t=e.onClose,a=e.candidate,r=a.args[0];this.form.current.validateFields((e,n)=>{if(!e){var o=n.value;"0"===a.value.status?this.contracts.DPoS.methods.withdrawFromUnbondedCandidate.cacheSend(r,f.a.utils.toWei(o.toString(),"ether")):this.contracts.DPoS.methods.intendWithdraw.cacheSend(r,f.a.utils.toWei(o.toString(),"ether")),t()}})},this.form=o.a.createRef(),this.contracts=t.drizzle.contracts}render(){var e=this.props,t=e.visible,a=e.onClose,n=[{name:"value",field:"number",fieldOptions:Object(r.a)(Object(r.a)({},x.a),{},{placeholder:"The amount of CELR to withdraw"}),rules:[{message:"Please enter a value!",required:!0}]}];return o.a.createElement(y.a,{title:"Withdraw Stake",visible:t,onOk:this.onSubmit,onCancel:a},o.a.createElement(I.a,{ref:this.form,items:n}))}}M.contextTypes={drizzle:s.a.object};var j=M,z=a(222);class O extends o.a.Component{constructor(e,t){super(e),this.handleIncreaseCommission=()=>{var e=this.props,t=e.onClose,a=e.network,r=e.candidate;this.form.current.validateFields((e,n)=>{if(e)console.log(e);else{var o=n.commissionRate,i=n.rateLockEndTime;o*=z.a,i=c.a.toNumber(i)+a.block.number,o>r.value.commissionRate?this.contracts.DPoS.methods.announceIncreaseCommissionRate.cacheSend(o,i):this.contracts.DPoS.methods.nonIncreaseCommissionRate.cacheSend(o,i),t()}})},this.state={},this.form=o.a.createRef(),this.contracts=t.drizzle.contracts}render(){var e=this.props,t=e.visible,a=e.onClose,r=[x.b,x.d];return o.a.createElement(y.a,{title:"Increase Commission Rate",visible:t,onOk:this.handleIncreaseCommission,onCancel:a},o.a.createElement(I.a,{ref:this.form,items:r}))}}O.contextTypes={drizzle:s.a.object};var P=Object(d.drizzleConnect)(O,(function(e){return{network:e.network}})),W=a(1025),R=a(1128),V=a(1044),N=a.n(V),T=a(294),U=[{title:"Delegator",dataIndex:"delegatorAddr"},{title:"Delegated Stake",dataIndex:"delegatedStake",sorter:(e,t)=>f.a.utils.toBN(e.delegatedStake).cmp(f.a.utils.toBN(t.delegatedStake)),sortOrder:"descend",render:e=>Object(T.a)(e)}];class L extends o.a.Component{constructor(e,t){super(e);var a=e.candidateId,n=e.network.setting;this.state={},N.a.get("".concat(n.gateway,"/validator/candidate/").concat(a)).then(e=>{var t=e.data.result;this.setState(Object(r.a)(Object(r.a)({},t),{},{commissionRate:t.commission_rate,stakingPool:t.staking_pool}))}).catch(e=>{console.error(e),e.response?W.a.error(e.response.data.error):W.a.warning("Please config gateway url in setting to load sidechain info correctly")}),N.a.get("".concat(n.gateway,"/validator/candidate-delegators/").concat(a)).then(e=>{var t=e.data.result.map(e=>({candidateAddr:e.candidate_addr,delegatedStake:e.delegated_stake,delegatorAddr:e.delegator_addr}));this.setState({delegators:t})}).catch(e=>{console.error(e),e.response?W.a.error(e.response.data.error):W.a.warning("Please config gateway url in setting to load sidechain info correctly")})}render(){var e=this.state,t=e.commissionRate,a=e.stakingPool,r=e.delegators,n=e.description,i=void 0===n?{}:n;return o.a.createElement(b.a,null,o.a.createElement(E.a,{span:12},o.a.createElement(C.a,{title:"Commission Rate",value:"".concat(100*t," %")})),o.a.createElement(E.a,{span:12},o.a.createElement(C.a,{title:"Staking Pool",value:Object(T.a)(a)})),o.a.createElement(E.a,{span:12},o.a.createElement(C.a,{title:"Website",value:i.website||"N/A"})),o.a.createElement(E.a,{span:12},o.a.createElement(C.a,{title:"Contact",value:i.security_contact||"N/A"})),o.a.createElement(E.a,{span:24},o.a.createElement(R.a,{dataSource:r,columns:U,pagination:!1})))}}L.contextTypes={drizzle:s.a.object};var G=Object(d.drizzleConnect)(L,(function(e){return{network:e.network}})),_=[{title:"Delegator",dataIndex:"delegator"},{title:"Amount",dataIndex:"amount"}];class B extends o.a.Component{render(){var e=this.props.slashes,t=e.sort((e,t)=>e.validator>t.validator).map(e=>Object(r.a)(Object(r.a)({},e),{},{amount:Object(T.a)(e.amount)}));return console.log(e),o.a.createElement(R.a,{dataSource:t,columns:_,pagination:!1})}}var F=Object(d.drizzleConnect)(B,(function(e){return{}})),q=a(1028);class J extends o.a.Component{constructor(e,t){super(e),this.toggleDelegateModal=()=>{this.setState(e=>({isDelegateModalVisible:!e.isDelegateModalVisible}))},this.toggleWithdrawModal=()=>{this.setState(e=>({isWithdrawModalVisible:!e.isWithdrawModalVisible}))},this.toggleCommissionModal=()=>{this.setState(e=>({isCommissionModalVisible:!e.isCommissionModalVisible}))},this.confirmWithdraw=()=>{var e=this.state.candidateId;this.contracts.DPoS.methods.confirmWithdraw.cacheSend(e)},this.confirmIncreaseCommissionRate=()=>{this.contracts.DPoS.methods.confirmIncreaseCommissionRate.cacheSend()},this.claimValidator=()=>{this.contracts.DPoS.methods.claimValidator.cacheSend()},this.renderAction=()=>{var e=this.props.accounts,t=this.state.candidate,a=t.value.status,r=e[0]===t.args[0],n=o.a.createElement(g.a,null,o.a.createElement(g.a.Item,{onClick:this.toggleDelegateModal},"Delegate"),"0"===a?o.a.createElement(g.a.Item,{onClick:this.toggleWithdrawModal},"Withdraw"):[o.a.createElement(g.a.Item,{onClick:this.toggleWithdrawModal},"Initialize Withdraw"),o.a.createElement(g.a.Item,{onClick:this.confirmWithdraw},"Confirm Withdraw")],r&&o.a.createElement(g.a.Item,{onClick:this.toggleCommissionModal},"Announce Increase Commission Rate"),r&&o.a.createElement(g.a.Item,{onClick:this.confirmIncreaseCommissionRate},"Confirm Increase Commission Rate"),r&&o.a.createElement(g.a.Item,{onClick:this.claimValidator},"Claim Validator"));return o.a.createElement(v.a,{overlay:n},o.a.createElement("a",{className:"ant-dropdown-link"},"Actions ",o.a.createElement(p.a,{type:"down"})))},this.renderCandidateDetail=()=>{var e=this.props.SGN,t=this.state,a=t.candidate,r=t.slashes,n=a.args[0],i=a.value,s=i.minSelfStake,l=i.stakingPool,d=i.status,m=i.commissionRate,u=i.rateLockEndTime,g=c.a.chain(e.sidechainAddrMap).find(e=>e.args[0]===n).get("value","").value(),v=g&&h.a.encode("sgn",h.a.toWords(f.a.utils.hexToBytes(g)));return o.a.createElement(b.a,{style:{marginTop:"10px"}},o.a.createElement(E.a,{span:12},o.a.createElement(C.a,{title:"Address",value:n})),o.a.createElement(E.a,{span:12},o.a.createElement(C.a,{title:"Status",value:q.a[d]})),o.a.createElement(E.a,{span:12},o.a.createElement(C.a,{title:"Min Self Stake",value:Object(T.a)(s)})),o.a.createElement(E.a,{span:12},o.a.createElement(C.a,{title:"Staking Pool",value:Object(T.a)(l)})),o.a.createElement(E.a,{span:12},o.a.createElement(C.a,{title:"Commission Rate",value:"".concat(m/z.a," %")})),o.a.createElement(E.a,{span:12},o.a.createElement(C.a,{title:"Rate Lock End Time",value:"".concat(u," block height")})),o.a.createElement(E.a,{span:12},o.a.createElement(C.a,{title:"Sidechain Address",value:v})),o.a.createElement(E.a,{span:24},o.a.createElement(S.a,null,o.a.createElement(S.a.TabPane,{tab:"Sidechain",key:"sidechain"},o.a.createElement(G,{candidateId:n})),o.a.createElement(S.a.TabPane,{tab:"Slashes",key:"slashes"},o.a.createElement(F,{slashes:r})))))},this.contracts=t.drizzle.contracts,this.state={candidate:null,slashes:[],isDelegateModalVisible:!1,isWithdrawModalVisible:!1,isCommissionModalVisible:!1};var a=e.match.params.id;this.contracts.SGN.methods.sidechainAddrMap.cacheCall(a),this.contracts.DPoS.events.Slash({fromBlock:0,filter:{validator:a}},(e,t)=>{e||this.setState({slashes:[...this.state.slashes,t.returnValues]})})}static getDerivedStateFromProps(e){var t=e.match,a=e.DPoS,r=void 0===a?{}:a,n=t.params.id,o=c.a.values(r.getCandidateInfo),i=c.a.find(o,e=>e.args[0]===n),s=c.a.values(r.getDelegatorInfo).filter(e=>e.args[0]===n);return{candidate:i,candidateId:n,delegators:s}}render(){var e=this.state,t=e.candidate,a=e.candidateId,r=e.isDelegateModalVisible,n=e.isWithdrawModalVisible,i=e.isCommissionModalVisible;return t?o.a.createElement(k.a,{title:"Candidate",extra:this.renderAction()},this.renderCandidateDetail(),o.a.createElement(A,{candidateId:a,visible:r,onClose:this.toggleDelegateModal}),o.a.createElement(j,{candidate:t,visible:n,onClose:this.toggleWithdrawModal}),o.a.createElement(P,{candidate:t,visible:i,onClose:this.toggleCommissionModal})):o.a.createElement(w.a,null)}}J.contextTypes={drizzle:s.a.object};t.default=Object(d.drizzleConnect)(J,(function(e){var t=e.accounts,a=e.contracts,n=e.DPoS,o=e.SGN;return{accounts:t,DPoS:Object(r.a)(Object(r.a)({},n),a.DPoS),SGN:Object(r.a)(Object(r.a)({},o),a.SGN)}}))}}]);
//# sourceMappingURL=6.faa190ae.chunk.js.map