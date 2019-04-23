(global.webpackJsonp=global.webpackJsonp||[]).push([["components/base/BaseTabbar"],{55:
/*!*************************************************************************!*\
  !*** E:/code/hBuilderX/imgColor/uni-app/components/base/BaseTabbar.vue ***!
  \*************************************************************************/
/*! no static exports found */function(t,e,r){"use strict";r.r(e);var n=r(/*! ./BaseTabbar.vue?vue&type=template&id=23d25004& */56),a=r(/*! ./BaseTabbar.vue?vue&type=script&lang=js& */58);for(var u in a)"default"!==u&&function(t){r.d(e,t,function(){return a[t]})}(u);var i=r(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */16),c=Object(i.default)(a.default,n.render,n.staticRenderFns,!1,null,null,null);c.options.__file="E:/code/hBuilderX/imgColor/uni-app/components/base/BaseTabbar.vue",e.default=c.exports},56:
/*!********************************************************************************************************!*\
  !*** E:/code/hBuilderX/imgColor/uni-app/components/base/BaseTabbar.vue?vue&type=template&id=23d25004& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */function(t,e,r){"use strict";r.r(e);var n=r(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./BaseTabbar.vue?vue&type=template&id=23d25004& */57);r.d(e,"render",function(){return n.render}),r.d(e,"staticRenderFns",function(){return n.staticRenderFns})},57:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!E:/code/hBuilderX/imgColor/uni-app/components/base/BaseTabbar.vue?vue&type=template&id=23d25004& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */function(t,e,r){"use strict";r.r(e),r.d(e,"render",function(){return n}),r.d(e,"staticRenderFns",function(){return a});var n=function(){var t=this.$createElement,e=(this._self._c,this.imgSrc("index")),r=this.imgSrc("about");this.$mp.data=Object.assign({},{$root:{m0:e,m1:r}})},a=[];n._withStripped=!0},58:
/*!**************************************************************************************************!*\
  !*** E:/code/hBuilderX/imgColor/uni-app/components/base/BaseTabbar.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/*! no static exports found */function(t,e,r){"use strict";r.r(e);var n=r(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./BaseTabbar.vue?vue&type=script&lang=js& */59),a=r.n(n);for(var u in n)"default"!==u&&function(t){r.d(e,t,function(){return n[t]})}(u);e.default=a.a},59:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!E:/code/hBuilderX/imgColor/uni-app/components/base/BaseTabbar.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n,a=(n=r(/*! ../../utils/uni/api.js */9))&&n.__esModule?n:{default:n};var u={props:{PageCur:{type:String,default:"index"}},computed:{imgSrc:function(){var t=this;return function(e){var r=t.PageCur;return"/static/tabbar/".concat(e+(r==e?"_cur":""),".png")}}},methods:{redirect:function(t){var e=t.currentTarget.dataset.cur;a.default.route.redirectTo("/pages/".concat(e,"/Index"))}}};e.default=u}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/base/BaseTabbar.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/base/BaseTabbar-create-component',
    {
        'components/base/BaseTabbar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(55))
        })
    },
    [['components/base/BaseTabbar-create-component']]
]);                
