import{H as t}from"./carousel.ee4f6fbe.js";import{r as e}from"./Carousel.vue_vue_type_style_index_0_lang.bfa6f2ab.js";import{p as o}from"./carousel.thumbs.7951146f.js";import{_ as c,f as r,o as a,c as n,r as l}from"./framework.25701c6b.js";const f={props:{carouselOptions:Object,carouselClass:String},setup(){return{fcInstance:r(null)}},mounted(){const s=new t(this.$refs.carousel,{Autoplay:!1,Thumbs:!1,...this.carouselOptions||{}},{Autoplay:e,Thumbs:o});this.fcInstance=s,this.carouselClass&&this.$refs.carousel.classList.add(this.carouselClass)},unmounted(){this.fcInstance&&(this.fcInstance.destroy(),this.fcInstance=null)}},u={class:"f-carousel",ref:"carousel"};function i(s,p,m,h,d,_){return a(),n("div",u,[l(s.$slots,"default")],512)}const y=c(f,[["render",i]]);export{y as C};