(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-666c1cd8"],{"0cd3":function(t,o,n){"use strict";n.r(o);var e=function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("div",{staticClass:"goods"},[n("div",{ref:"left",staticClass:"menu-wrapper"},[n("ul",{ref:"leftUL"},t._l(t.goods,(function(o,e){return n("li",{key:o.name,staticClass:"menu-item",class:{current:t.currentIndex===e},on:{click:function(o){return t.selectItem(e)}}},[n("span",{staticClass:"text bottom-border-1px"},[o.icon?n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:o.icon,expression:"good.icon"}],staticClass:"icon"}):t._e(),t._v(" "+t._s(o.name)+" ")])])})),0)]),n("div",{ref:"right",staticClass:"foods-wrapper"},[n("ul",{ref:"rightUL"},t._l(t.goods,(function(o){return n("li",{key:o.name,staticClass:"food-list-hook"},[n("h1",{staticClass:"title"},[t._v(t._s(o.name))]),n("ul",t._l(o.foods,(function(o){return n("li",{key:o.name,staticClass:"food-item bottom-border-1px",on:{click:function(n){return t.showFood(o)}}},[n("div",{staticClass:"icon"},[n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:o.icon,expression:"food.icon"}],attrs:{width:"57",height:"57"}})]),n("div",{staticClass:"content"},[n("h2",{staticClass:"name"},[t._v(t._s(o.name))]),n("p",{staticClass:"desc"},[t._v(t._s(o.description))]),n("div",{staticClass:"extra"},[n("span",{staticClass:"count"},[t._v("月售"+t._s(o.sellCount)+"份")]),n("span",[t._v("好评率"+t._s(o.rating)+"%")])]),n("div",{staticClass:"price"},[n("span",{staticClass:"now"},[t._v("￥"+t._s(o.price))]),o.oldPrice?n("span",{staticClass:"old"},[t._v("￥"+t._s(o.oldPrice))]):t._e()]),n("div",{staticClass:"cartcontrol-wrapper"},[n("CartControl",{attrs:{food:o}})],1)])])})),0)])})),0)]),n("ShopCart"),n("FoodImage",{ref:"foodImg",attrs:{food:t.food}})],1)},i=[],a=(n("c740"),n("4160"),n("159b"),n("5530"));function s(t,o){(null==o||o>t.length)&&(o=t.length);for(var n=0,e=new Array(o);n<o;n++)e[n]=t[n];return e}function r(t){if(Array.isArray(t))return s(t)}n("a4d3"),n("e01a"),n("d28b"),n("a630"),n("e260"),n("d3b7"),n("3ca3"),n("ddb0");function c(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}n("fb6a"),n("b0c0"),n("25f0");function l(t,o){if(t){if("string"===typeof t)return s(t,o);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(t,o):void 0}}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function d(t){return r(t)||c(t)||l(t)||u()}var f=n("2f62"),h=n("229e"),p=function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("div",[n("div",{staticClass:"shopcart"},[n("div",{staticClass:"content"},[n("div",{staticClass:"content-left",on:{click:function(o){return t.toggleShow()}}},[n("div",{staticClass:"logo-wrapper"},[n("div",{staticClass:"logo",class:{highlight:t.totalCount>0}},[n("i",{staticClass:"iconfont iconShoppingcartfinancebusiness ",class:{highlight:t.totalCount>0}})]),t.totalCount>0?n("div",{staticClass:"num"},[t._v(t._s(t.totalCount))]):t._e()]),n("div",{staticClass:"price",class:{highlight:t.totalCount>0}},[t._v(" ￥"+t._s(t.totalPrice)+" ")]),n("div",{staticClass:"desc"},[t._v("另需配送费￥"+t._s(t.info.deliveryPrice)+"元")])]),n("div",{staticClass:"content-right"},[n("div",{staticClass:"pay",class:t.payClass},[t._v(t._s(t.payText))])])]),n("transition",{attrs:{name:"move"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.listShow,expression:"listShow"}],staticClass:"shopcart-list"},[n("div",{staticClass:"list-header"},[n("h1",{staticClass:"title"},[t._v("购物车")]),n("span",{staticClass:"empty",on:{click:t.clear}},[t._v("清空")])]),n("div",{ref:"foods",staticClass:"list-content"},[n("ul",t._l(t.cartFoods,(function(o){return n("li",{key:o.name,staticClass:"food"},[n("span",{staticClass:"name"},[t._v(t._s(o.name))]),n("div",{staticClass:"price"},[n("span",[t._v("￥"+t._s(o.price))])]),n("div",{staticClass:"cartcontrol-wrapper"},[n("CartControl",{attrs:{food:o}})],1)])})),0)])])])],1),n("transition",{attrs:{name:"fade"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.listShow,expression:"listShow"}],staticClass:"list-mask",on:{click:function(o){t.isShow=!t.isShow}}})])],1)},v=[],g=n("ade3"),m=(n("e17f"),n("2241")),b={components:Object(g["a"])({},m["a"].name,m["a"]),props:{},data:function(){return{isShow:!1}},created:function(){},mounted:function(){},update:function(){},methods:{toggleShow:function(){this.totalCount>0&&(this.isShow=!this.isShow)},clear:function(){var t=this;m["a"].confirm({title:"提示",message:"确认清空购物车吗?"}).then((function(){t.$store.commit("clear_cart")}))}},computed:Object(a["a"])(Object(a["a"])(Object(a["a"])({},Object(f["c"])({cartFoods:function(t){return t.shop.cartFoods},info:function(t){return t.shop.info}})),Object(f["b"])(["totalCount","totalPrice"])),{},{payClass:function(){var t=this.totalPrice,o=this.info,n=o.minPrice;return n&&t?n>t?"no-enough":"enough":"no-enough"},payText:function(){var t=this.totalPrice,o=this.info,n=o.minPrice;return 0===t?n?"还差￥".concat(n,"元起送"):"还差￥20元起送":n>t?"还差￥".concat(n-t,"元起送"):"去结算"},listShow:function(){var t=this;return 0!==this.totalCount&&(this.$nextTick((function(){var o=t;t.isShow&&(t.scroll?t.scroll.refresh():o.scroll=new h["a"](t.$refs.foods,{click:!0}))})),this.isShow)}}),watch:{cartFoods:function(){0===this.cartFoods.length&&(this.isShow=!1)}}},C=b,y=(n("ac71"),n("2877")),w=Object(y["a"])(C,p,v,!1,null,"3844217c",null),S=w.exports,_=function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("transition",{attrs:{name:"fade"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticClass:"food"},[n("div",{staticClass:"food-content"},[t.isShow?n("div",{staticClass:"image-header"},[n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.food.image,expression:"food.image"}]}),n("p",{staticClass:"foodpanel-desc"},[t._v(t._s(t.food.info))]),n("div",{staticClass:"back",on:{click:t.toggleShow}},[n("i",{staticClass:"iconfont icon-arrow_left"})])]):t._e(),n("div",{staticClass:"content"},[n("h1",{staticClass:"title"},[t._v(t._s(t.food.name))]),n("div",{staticClass:"detail"},[n("span",{staticClass:"sell-count"},[t._v("月售"+t._s(t.food.sellCount)+"份")]),n("span",{staticClass:"rating"},[t._v("好评率"+t._s(t.food.rating)+"%")])]),n("div",{staticClass:"price"},[n("span",{staticClass:"now"},[t._v("￥"+t._s(t.food.price))]),t.food.oldPrice?n("span",{staticClass:"old"},[t._v("￥"+t._s(t.food.oldPrice))]):t._e()]),n("div",{staticClass:"cartcontrol-wrapper"},[n("CartControl",{attrs:{food:t.food}})],1)])]),n("div",{staticClass:"food-cover",on:{click:t.toggleShow}})])])},x=[],O={components:{},props:{food:Object},data:function(){return{isShow:!1}},created:function(){},mounted:function(){},update:function(){},methods:{toggleShow:function(){this.isShow=!this.isShow}},computed:{}},k=O,j=(n("744f"),Object(y["a"])(k,_,x,!1,null,"7f1f20a0",null)),B=j.exports,A={components:{ShopCart:S,FoodImage:B},props:{},data:function(){return{scrollY:0,tops:[],food:{}}},created:function(){},mounted:function(){var t=this;this.$store.dispatch("getGoods",(function(){t.$nextTick((function(){t._initScroll(),t._initTops()}))}))},update:function(){},methods:{_initTops:function(){var t=[],o=0;t.push(o);var n=d(this.$refs.rightUL.children);n.forEach((function(n,e){o+=n.clientHeight,t.push(o)})),this.tops=t},_initScroll:function(){var t=this;this.leftScroll=new h["a"](this.$refs.left,{click:!0}),this.rightScroll=new h["a"](this.$refs.right,{click:!0,probeType:1}),this.rightScroll.on("scroll",(function(o){o.x;var n=o.y;t.scrollY=Math.abs(n)})),this.rightScroll.on("scrollEnd",(function(o){o.x;var n=o.y;t.scrollY=Math.abs(n)}))},selectItem:function(t){var o=this.tops[t];this.scrollY=o,this.rightScroll.scrollTo(0,-o,500)},showFood:function(t){var o=this.$refs.foodImg;o.toggleShow(),this.food=t}},computed:Object(a["a"])(Object(a["a"])({},Object(f["c"])({goods:function(t){return t.shop.goods}})),{},{currentIndex:function(){var t=this.scrollY,o=this.tops,n=o.findIndex((function(n,e){return t>=n&&t<o[e+1]}));if(this.leftScroll){var e=this.$refs.leftUL.children[n];this.leftScroll.scrollToElement(e,200)}return n}}),watch:{goods:function(){console.log(123)}}},T=A,$=(n("d22b"),Object(y["a"])(T,e,i,!1,null,"44542c88",null));o["default"]=$.exports},2241:function(t,o,n){"use strict";var e,i=n("1988"),a=n("2b0e"),s=n("d282"),r=n("ea8e"),c=n("b1d2"),l=n("6605"),u=n("b650"),d=Object(s["a"])("dialog"),f=d[0],h=d[1],p=d[2],v=f({mixins:[Object(l["a"])()],props:{title:String,width:[Number,String],message:String,className:null,callback:Function,beforeClose:Function,messageAlign:String,cancelButtonText:String,cancelButtonColor:String,confirmButtonText:String,confirmButtonColor:String,showCancelButton:Boolean,transition:{type:String,default:"van-dialog-bounce"},showConfirmButton:{type:Boolean,default:!0},overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!1}},data:function(){return{loading:{confirm:!1,cancel:!1}}},methods:{onClickOverlay:function(){this.handleAction("overlay")},handleAction:function(t){var o=this;this.$emit(t),this.value&&(this.beforeClose?(this.loading[t]=!0,this.beforeClose(t,(function(n){!1!==n&&o.loading[t]&&o.onClose(t),o.loading.confirm=!1,o.loading.cancel=!1}))):this.onClose(t))},onClose:function(t){this.close(),this.callback&&this.callback(t)},onOpened:function(){this.$emit("opened")},onClosed:function(){this.$emit("closed")}},render:function(){var t,o,n=this,e=arguments[0];if(this.shouldRender){var i=this.message,a=this.messageAlign,s=this.slots(),l=this.slots("title")||this.title,d=l&&e("div",{class:h("header",{isolated:!i&&!s})},[l]),f=(s||i)&&e("div",{class:h("content")},[s||e("div",{domProps:{innerHTML:i},class:h("message",(t={"has-title":l},t[a]=a,t))})]),v=this.showCancelButton&&this.showConfirmButton,g=e("div",{class:[c["e"],h("footer",{buttons:v})]},[this.showCancelButton&&e(u["a"],{attrs:{size:"large",loading:this.loading.cancel,text:this.cancelButtonText||p("cancel")},class:h("cancel"),style:{color:this.cancelButtonColor},on:{click:function(){n.handleAction("cancel")}}}),this.showConfirmButton&&e(u["a"],{attrs:{size:"large",loading:this.loading.confirm,text:this.confirmButtonText||p("confirm")},class:[h("confirm"),(o={},o[c["c"]]=v,o)],style:{color:this.confirmButtonColor},on:{click:function(){n.handleAction("confirm")}}})]);return e("transition",{attrs:{name:this.transition},on:{afterEnter:this.onOpened,afterLeave:this.onClosed}},[e("div",{directives:[{name:"show",value:this.value}],attrs:{role:"dialog","aria-labelledby":this.title||i},class:[h(),this.className],style:{width:Object(r["a"])(this.width)}},[d,f,g])])}}}),g=n("a142");function m(t){return document.body.contains(t)}function b(){e&&e.$destroy(),e=new(a["a"].extend(v))({el:document.createElement("div"),propsData:{lazyRender:!1}}),e.$on("input",(function(t){e.value=t}))}function C(t){return g["d"]?Promise.resolve():new Promise((function(o,n){e&&m(e.$el)||b(),Object(i["a"])(e,C.currentOptions,t,{resolve:o,reject:n})}))}C.defaultOptions={value:!0,title:"",width:"",message:"",overlay:!0,className:"",lockScroll:!0,transition:"van-dialog-bounce",beforeClose:null,overlayClass:"",overlayStyle:null,messageAlign:"",getContainer:"body",cancelButtonText:"",cancelButtonColor:null,confirmButtonText:"",confirmButtonColor:null,showConfirmButton:!0,showCancelButton:!1,closeOnPopstate:!1,closeOnClickOverlay:!1,callback:function(t){e["confirm"===t?"resolve":"reject"](t)}},C.alert=C,C.confirm=function(t){return C(Object(i["a"])({showCancelButton:!0},t))},C.close=function(){e&&(e.value=!1)},C.setDefaultOptions=function(t){Object(i["a"])(C.currentOptions,t)},C.resetDefaultOptions=function(){C.currentOptions=Object(i["a"])({},C.defaultOptions)},C.resetDefaultOptions(),C.install=function(){a["a"].use(v)},C.Component=v,a["a"].prototype.$dialog=C;o["a"]=C},"25f0":function(t,o,n){"use strict";var e=n("6eeb"),i=n("825a"),a=n("d039"),s=n("ad6d"),r="toString",c=RegExp.prototype,l=c[r],u=a((function(){return"/a/b"!=l.call({source:"a",flags:"b"})})),d=l.name!=r;(u||d)&&e(RegExp.prototype,r,(function(){var t=i(this),o=String(t.source),n=t.flags,e=String(void 0===n&&t instanceof RegExp&&!("flags"in c)?s.call(t):n);return"/"+o+"/"+e}),{unsafe:!0})},"2fcb":function(t,o,n){},"455d":function(t,o,n){},"48f4":function(t,o,n){"use strict";function e(t,o){var n=o.to,e=o.url,i=o.replace;if(n&&t){var a=t[i?"replace":"push"](n);a&&a.catch&&a.catch((function(t){if(t&&"NavigationDuplicated"!==t.name)throw t}))}else e&&(i?location.replace(e):location.href=e)}function i(t){e(t.parent&&t.parent.$router,t.props)}n.d(o,"a",(function(){return i})),n.d(o,"b",(function(){return a}));var a={url:String,replace:Boolean,to:[String,Object]}},"4df4":function(t,o,n){"use strict";var e=n("0366"),i=n("7b0b"),a=n("9bdd"),s=n("e95a"),r=n("50c4"),c=n("8418"),l=n("35a1");t.exports=function(t){var o,n,u,d,f,h,p=i(t),v="function"==typeof this?this:Array,g=arguments.length,m=g>1?arguments[1]:void 0,b=void 0!==m,C=l(p),y=0;if(b&&(m=e(m,g>2?arguments[2]:void 0,2)),void 0==C||v==Array&&s(C))for(o=r(p.length),n=new v(o);o>y;y++)h=b?m(p[y],y):p[y],c(n,y,h);else for(d=C.call(p),f=d.next,n=new v;!(u=f.call(d)).done;y++)h=b?a(d,m,[u.value,y],!0):u.value,c(n,y,h);return n.length=y,n}},"543e":function(t,o,n){"use strict";var e=n("2638"),i=n.n(e),a=n("d282"),s=n("ea8e"),r=n("ba31"),c=Object(a["a"])("loading"),l=c[0],u=c[1];function d(t,o){if("spinner"===o.type){for(var n=[],e=0;e<12;e++)n.push(t("i"));return n}return t("svg",{class:u("circular"),attrs:{viewBox:"25 25 50 50"}},[t("circle",{attrs:{cx:"50",cy:"50",r:"20",fill:"none"}})])}function f(t,o,n){if(n.default){var e=o.textSize&&{fontSize:Object(s["a"])(o.textSize)};return t("span",{class:u("text"),style:e},[n.default()])}}function h(t,o,n,e){var a=o.color,c=o.size,l=o.type,h={color:a};if(c){var p=Object(s["a"])(c);h.width=p,h.height=p}return t("div",i()([{class:u([l,{vertical:o.vertical}])},Object(r["b"])(e,!0)]),[t("span",{class:u("spinner",l),style:h},[d(t,o)]),f(t,o,n)])}h.props={color:String,size:[Number,String],vertical:Boolean,textSize:[Number,String],type:{type:String,default:"circular"}},o["a"]=l(h)},"606f":function(t,o,n){},"744f":function(t,o,n){"use strict";var e=n("606f"),i=n.n(e);i.a},a630:function(t,o,n){var e=n("23e7"),i=n("4df4"),a=n("1c7e"),s=!a((function(t){Array.from(t)}));e({target:"Array",stat:!0,forced:s},{from:i})},ac71:function(t,o,n){"use strict";var e=n("c485"),i=n.n(e);i.a},b650:function(t,o,n){"use strict";var e=n("1988"),i=n("2638"),a=n.n(i),s=n("d282"),r=n("ba31"),c=n("b1d2"),l=n("48f4"),u=n("ad06"),d=n("543e"),f=Object(s["a"])("button"),h=f[0],p=f[1];function v(t,o,n,e){var i,s=o.tag,f=o.icon,h=o.type,v=o.color,g=o.plain,m=o.disabled,b=o.loading,C=o.hairline,y=o.loadingText,w={};function S(t){b||m||(Object(r["a"])(e,"click",t),Object(l["a"])(e))}function _(t){Object(r["a"])(e,"touchstart",t)}v&&(w.color=g?v:c["f"],g||(w.background=v),-1!==v.indexOf("gradient")?w.border=0:w.borderColor=v);var x=[p([h,o.size,{plain:g,disabled:m,hairline:C,block:o.block,round:o.round,square:o.square}]),(i={},i[c["d"]]=C,i)];function O(){var e,i=[];return b?i.push(t(d["a"],{class:p("loading"),attrs:{size:o.loadingSize,type:o.loadingType,color:"currentColor"}})):f&&i.push(t(u["a"],{attrs:{name:f},class:p("icon")})),e=b?y:n.default?n.default():o.text,e&&i.push(t("span",{class:p("text")},[e])),i}return t(s,a()([{style:w,class:x,attrs:{type:o.nativeType,disabled:m},on:{click:S,touchstart:_}},Object(r["b"])(e)]),[O()])}v.props=Object(e["a"])({},l["b"],{text:String,icon:String,color:String,block:Boolean,plain:Boolean,round:Boolean,square:Boolean,loading:Boolean,hairline:Boolean,disabled:Boolean,nativeType:String,loadingText:String,loadingType:String,tag:{type:String,default:"button"},type:{type:String,default:"default"},size:{type:String,default:"normal"},loadingSize:{type:String,default:"20px"}}),o["a"]=h(v)},bc1b:function(t,o,n){},c485:function(t,o,n){},c740:function(t,o,n){"use strict";var e=n("23e7"),i=n("b727").findIndex,a=n("44d2"),s=n("ae40"),r="findIndex",c=!0,l=s(r);r in[]&&Array(1)[r]((function(){c=!1})),e({target:"Array",proto:!0,forced:c||!l},{findIndex:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),a(r)},d22b:function(t,o,n){"use strict";var e=n("455d"),i=n.n(e);i.a},e17f:function(t,o,n){"use strict";n("68ef"),n("a71a"),n("9d70"),n("3743"),n("4d75"),n("e3b3"),n("bc1b"),n("2fcb")},e3b3:function(t,o,n){},fb6a:function(t,o,n){"use strict";var e=n("23e7"),i=n("861d"),a=n("e8b5"),s=n("23cb"),r=n("50c4"),c=n("fc6a"),l=n("8418"),u=n("b622"),d=n("1dde"),f=n("ae40"),h=d("slice"),p=f("slice",{ACCESSORS:!0,0:0,1:2}),v=u("species"),g=[].slice,m=Math.max;e({target:"Array",proto:!0,forced:!h||!p},{slice:function(t,o){var n,e,u,d=c(this),f=r(d.length),h=s(t,f),p=s(void 0===o?f:o,f);if(a(d)&&(n=d.constructor,"function"!=typeof n||n!==Array&&!a(n.prototype)?i(n)&&(n=n[v],null===n&&(n=void 0)):n=void 0,n===Array||void 0===n))return g.call(d,h,p);for(e=new(void 0===n?Array:n)(m(p-h,0)),u=0;h<p;h++,u++)h in d&&l(e,u,d[h]);return e.length=u,e}})}}]);
//# sourceMappingURL=chunk-666c1cd8.f9a63e53.js.map