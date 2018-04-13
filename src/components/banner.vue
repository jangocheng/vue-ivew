<template>
  <swiper :options="swiperOption" ref="mySwiper" class="banner">
    <swiper-slide class="slide" v-for="(item,index) in data" :key="index">
      <div class="msg">
        <h4>
          <span>公共：原油下跌，请投资谨慎，2018-01-28</span>
        </h4>
      </div>
      <img :src="$api.url.baseURI+item.image_url" alt="">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>
<script>
export default {
  props:{
    data:{
      type:Array
    }
  },
  data() {
    return {
      swiperSlides: [],
      swiperOption: {
        notNextTick: true,
        autoplay: true,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          bulletClass: "my-bullet",
          bulletActiveClass: "my-bullet-active"
        }
      }
    };
  }
};
</script>
<style>
.my-bullet {
  width: 14px;
  height: 14px;
  display: inline-block;
  margin: 0 7px;
  cursor: pointer;
  background: url("../images/home/hollow.png") no-repeat;
}

.my-bullet-active {
  background: url("../images/home/solid.png") no-repeat;
}
</style>
