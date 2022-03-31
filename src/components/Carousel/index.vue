<template>
    <!-- 轮播图 -->
    <div class="floorBanner">
        <div class="swiper-container" ref="floor1Swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
                    <img :src="carousel.imgUrl" />
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>

            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper';
export default {
    name: "Carousel",
    props: ['list'],
    watch: {
        list: {
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    var mySwiper = new Swiper(this.$refs.floor1Swiper, {
                        loop: true, // 循环模式选项
                        autoplay: true,//自动切换
                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true
                        },
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    })
                })
            }
        }
    },
}
</script>