(this["webpackJsonpsgn-explorer"]=this["webpackJsonpsgn-explorer"]||[]).push([[7],{1028:function(t,e,a){"use strict";a.d(e,"a",(function(){return n})),a.d(e,"b",(function(){return o})),a.d(e,"c",(function(){return r})),a.d(e,"d",(function(){return s}));var n=["Unbonded","Bonded","Unbonding"],o=["ProposalDeposit","GovernVoteTimeout","SlashTimeout","MinValidatorNum","MaxValidatorNum","MinStakeInPool","AdvanceNoticePeriod"],r={Voting:"1",Closed:"2"},s={Yes:1,No:2,Abstain:3}},1132:function(t,e,a){"use strict";a.r(e);var n=a(34),o=a(0),r=a.n(o),s=a(1),i=a.n(s),d=a(53),c=a.n(d),l=a(96),u=a(1026),p=a(54),m=a(1128),S=a(139),f=a.n(S),b=a(1028),h=a(294),x=a(222),g=[{title:"Address",dataIndex:"address",width:450,sorter:(t,e)=>t.address-e.address},{title:"Status",dataIndex:"status",width:150,filters:c.a.map(b.a,(t,e)=>({text:t,value:e.toString()})),filterMultiple:!1,onFilter:(t,e)=>e.status===t,sorter:(t,e)=>t.status-e.status,render:t=>b.a[t]},{title:"Staking Pool",dataIndex:"stakingPool",defaultSortOrder:"descend",sorter:(t,e)=>f.a.utils.toBN(t.stakingPool).cmp(f.a.utils.toBN(e.stakingPool)),render:t=>Object(h.a)(t)},{title:"Min Self Stake",dataIndex:"minSelfStake",sorter:(t,e)=>f.a.utils.toBN(t.minSelfStake).cmp(f.a.utils.toBN(e.minSelfStake)),render:t=>Object(h.a)(t)},{title:"Commission",dataIndex:"commissionRate",width:140,sorter:(t,e)=>t.commissionRate-e.commissionRate,render:t=>"".concat(t/x.a," %")}];class k extends r.a.Component{constructor(...t){super(...t),this.onRow=t=>{var e=this.props.dispatch;return{onClick:()=>{e(p.routerRedux.push({pathname:"/candidate/".concat(t.address)}))}}}}render(){var t=this.props.candidates.map(t=>Object(n.a)(Object(n.a)({},t.value),{},{address:t.args[0]}));return r.a.createElement(m.a,{dataSource:t,columns:g,pagination:!1,onRow:this.onRow})}}var v=Object(l.drizzleConnect)(k,(function(t){return{}}));class P extends r.a.Component{render(){var t=this.props.DPoS;return r.a.createElement(u.a,{title:"Validators"},r.a.createElement(v,{candidates:c.a.values(t.getCandidateInfo)}))}}P.contextTypes={drizzle:i.a.object};e.default=Object(l.drizzleConnect)(P,(function(t){var e=t.contracts,a=t.DPoS;return{DPoS:Object(n.a)(Object(n.a)({},a),e.DPoS)}}))}}]);
//# sourceMappingURL=7.d1a225ec.chunk.js.map