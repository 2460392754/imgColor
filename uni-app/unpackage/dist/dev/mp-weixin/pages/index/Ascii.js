(global.webpackJsonp=global.webpackJsonp||[]).push([["pages/index/Ascii"],{48:
/*!****************************************************************!*\
  !*** E:/code/hBuilderX/imgColor/uni-app/pages/index/Ascii.vue ***!
  \****************************************************************/
/*! no static exports found */function(t,e,n){"use strict";n.r(e);var i=n(/*! ./Ascii.vue?vue&type=template&id=0506dc0f&scoped=true& */49),s=n(/*! ./Ascii.vue?vue&type=script&lang=js& */51);for(var a in s)"default"!==a&&function(t){n.d(e,t,function(){return s[t]})}(a);n(/*! ./Ascii.vue?vue&type=style&index=0&id=0506dc0f&scoped=true&lang=css& */53);var r=n(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */16),o=Object(r.default)(s.default,i.render,i.staticRenderFns,!1,null,"0506dc0f",null);o.options.__file="E:/code/hBuilderX/imgColor/uni-app/pages/index/Ascii.vue",e.default=o.exports},49:
/*!***********************************************************************************************************!*\
  !*** E:/code/hBuilderX/imgColor/uni-app/pages/index/Ascii.vue?vue&type=template&id=0506dc0f&scoped=true& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */function(t,e,n){"use strict";n.r(e);var i=n(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./Ascii.vue?vue&type=template&id=0506dc0f&scoped=true& */50);n.d(e,"render",function(){return i.render}),n.d(e,"staticRenderFns",function(){return i.staticRenderFns})},50:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!E:/code/hBuilderX/imgColor/uni-app/pages/index/Ascii.vue?vue&type=template&id=0506dc0f&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */function(t,e,n){"use strict";n.r(e),n.d(e,"render",function(){return i}),n.d(e,"staticRenderFns",function(){return s});var i=function(){var t=this.$createElement;this._self._c},s=[];i._withStripped=!0},51:
/*!*****************************************************************************************!*\
  !*** E:/code/hBuilderX/imgColor/uni-app/pages/index/Ascii.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";n.r(e);var i=n(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./Ascii.vue?vue&type=script&lang=js& */52),s=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e.default=s.a},52:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!E:/code/hBuilderX/imgColor/uni-app/pages/index/Ascii.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=r(n(/*! ./node_modules/@babel/runtime/regenerator */10)),s=r(n(/*! @/utils/uni/api.js */9)),a=(r(n(/*! @/utils/h5/api.js */31)),r(n(/*! @/js/computed.js */41)));function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e,n,i,s,a,r){try{var o=t[a](r),u=o.value}catch(t){return void n(t)}o.done?e(u):Promise.resolve(u).then(i,s)}function u(t){return function(){var e=this,n=arguments;return new Promise(function(i,s){var a=t.apply(e,n);function r(t){o(a,i,s,r,u,"next",t)}function u(t){o(a,i,s,r,u,"throw",t)}r(void 0)})}}var c={data:function(){return{isShow:!1,TabCur:0,modalName:null,steps:{num:0,list:[{name:"上传"},{name:"确认"},{name:"转换"},{name:"下载"}]},cav:{id:"cavImg",width:0,height:0},img:{before:{path:null,size:null,resolution:{width:null,height:null}},after:{path:null,size:null,scale:1,action:3,resolution:{width:null,height:null}}},select:[1,.9,.8,.7,.6,.5,.4,.3,.2,.1],action:[1,2,3,4,5,6]}},methods:{upload:function(t){var e=t.tempFiles[0],n=e.path,i=e.size;this.img.before.path=n,this.img.before.size=this._sizeFormat(i),this._stepsNext(),this._confirmPage()},_confirmPage:function(){var t=u(i.default.mark(function t(){var e,n,a;return i.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.default.media.img.getInfo(this.img.before.path);case 2:e=t.sent,n=e.width,a=e.height,this.cav.width=n,this.cav.height=a,this.img.before.resolution={width:n,height:a},this.img.after.resolution.width=15*n,this.img.after.resolution.height=15*a;case 10:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),confirmScaleChange:function(t){this.img.after.scale=t,this.img.after.resolution.width=this.cav.width*t*15,this.img.after.resolution.height=this.cav.height*t*15},confirmActionChange:function(t){this.img.after.action=t},confirmCancel:function(){this._stepsReset()},confirmOk:function(){this._transformPage(),this._stepsNext()},_transformPage:function(){var t=u(i.default.mark(function t(){var e,n,r,o,u,c,f;return i.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.isShow=!0,e={cavId:this.cav.id,path:this.img.before.path,cavHtmlTempId:"cavHtml",scale:this.img.after.scale,action:this.img.after.action-1},t.next=4,a.default.ascii(e);case 4:return n=t.sent,r=n.path,o=n.size,n.width,n.height,t.next=11,s.default.file.save(r);case 11:c=t.sent,f=c.savedFilePath,u=f,this.img.after.path=u,this.img.after.size=this._sizeFormat(o),this.isShow=!1;case 17:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),transformCancel:function(){this._stepsReset()},transformOk:function(){this._stepsNext()},_downloadPage:function(){},downloadOk:function(){var t=u(i.default.mark(function t(){return i.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.default.media.img.save(this.img.after.path);case 2:console.log("is save success"),s.default.ui.showToast({title:"下载成功"});case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),downloadReset:function(){this._stepsReset()},_sizeFormat:function(t){var e=["B","KB","MB"];return t>=1e6?t=parseInt(t/1e6)+e[2]:t>=1e3?t=parseInt(t/1e3)+e[1]:t+=e[0],t},_stepsNext:function(){this.steps.num++},_stepsReset:function(){this.steps.num=0},clickHelp:function(){this.modalName="Modal"}},components:{BaseNav:function(){return n.e(/*! import() | components/base/BaseNav */"components/base/BaseNav").then(n.bind(null,/*! @/components/base/BaseNav.vue */65))},BaseUpload:function(){return n.e(/*! import() | components/base/BaseUpload */"components/base/BaseUpload").then(n.bind(null,/*! @/components/base/BaseUpload.vue */70))},BaseLoading:function(){return n.e(/*! import() | components/base/BaseLoading */"components/base/BaseLoading").then(n.bind(null,/*! @/components/base/BaseLoading.vue */77))},BaseModal:function(){return n.e(/*! import() | components/base/BaseModal */"components/base/BaseModal").then(n.bind(null,/*! @/components/base/BaseModal.vue */60))},BaseSteps:function(){return n.e(/*! import() | components/base/BaseSteps */"components/base/BaseSteps").then(n.bind(null,/*! @/components/base/BaseSteps.vue */82))},BaseSelect:function(){return n.e(/*! import() | components/base/BaseSelect */"components/base/BaseSelect").then(n.bind(null,/*! @/components/base/BaseSelect.vue */87))},BaseHelp:function(){return n.e(/*! import() | components/base/BaseHelp */"components/base/BaseHelp").then(n.bind(null,/*! @/components/base/BaseHelp.vue */94))},BaseTabs:function(){return n.e(/*! import() | components/base/BaseTabs */"components/base/BaseTabs").then(n.bind(null,/*! @/components/base/BaseTabs.vue */101))}}};e.default=c},53:
/*!*************************************************************************************************************************!*\
  !*** E:/code/hBuilderX/imgColor/uni-app/pages/index/Ascii.vue?vue&type=style&index=0&id=0506dc0f&scoped=true&lang=css& ***!
  \*************************************************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";n.r(e);var i=n(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./Ascii.vue?vue&type=style&index=0&id=0506dc0f&scoped=true&lang=css& */54),s=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e.default=s.a},54:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!E:/code/hBuilderX/imgColor/uni-app/pages/index/Ascii.vue?vue&type=style&index=0&id=0506dc0f&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,n){}},[[47,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/Ascii.js.map