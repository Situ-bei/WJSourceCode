<template>

    <div class="goods-image">
        <!-- 左侧大图-->
        <div class="middle" ref="target"  >
            <img 
                :src="imageList[activeImgIndex]" 
                alt="商品详图" 
            />
            <!-- 蒙层小滑块 -->
            <div 
                class="layer" 
                :style="{ left: `${left}px`, top: `${top}px` }" 
                v-show="!isOutside"
            />
        </div>
        <!-- 小图列表 -->
        <ul class="small">
            <li 
                v-for="(img, i) in imageList" 
                :key="i" 
                @mouseenter="handleImageChange(i)"
                :class="{ active:i === activeImgIndex }"
                >
                <img v-useLazyImg="img" alt="商品详图" />
            </li>
        </ul>
        <!-- 放大镜大图 -->
        <div class="large" :style="[
            {
                backgroundImage: `url(${imageList[activeImgIndex]})`,
                backgroundPosition: `${positionX}px ${positionY}px`
                
            },
        ]" v-show="!isOutside">
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue"; 
import { useMouseInElement } from '@vueuse/core' // 鼠标位置
const {imageList} = defineProps({ // 接收父组件传参
    imageList:{
        type: Array,
        required: true,
        default:()=> [ ]
    }
})
console.log(imageList.data,'imageLists');

const activeImgIndex = ref(0) // 默认显示第一张图片

const handleImageChange = (i)=>{ // 切换图片
    //console.log(i);
    activeImgIndex.value = i
}
const target = ref(null)
const { elementX, elementY, isOutside } = useMouseInElement(target)
const left = ref(0)
const top = ref(0)
const positionX = ref(0)
const positionY = ref(0)


watch([elementX, elementY,isOutside],()=>{
    // console.log(elementX.value, elementY.value,isOutside);
    if (isOutside.value) return // 鼠标移出
    
    // 有效范围内控制滑块距离
    if (elementX.value >= 100 && elementX.value <= 300) { // 横向移动距离
        left.value = elementX.value - 100
    }
    
    if (elementY.value >= 100 && elementY.value <= 300) {  // 纵向移动距离
        top.value = elementY.value - 100
    }
    // 处理边界
    if (elementX.value >= 300){ 
        left.value = 200
    }else if (elementX.value <= 100){ 
        left.value = 0
    }
    
    if (elementY.value >= 300) { 
        top.value = 200
    }else if (elementY.value <= 100) { 
        top.value = 0
    }

    positionY.value = -top.value * 2
    positionX.value = -left.value * 2

    // console.log(positionX.value, positionY.value,elementX.value,elementY.value,'positionX.value ++ positionY.value');
    
})


</script>

<style lang="scss" scoped>
.goods-image {
    width: 480px;
    height: 400px;
    position: relative;
    display: flex;

    .middle {
        width: 400px;
        height: 400px;
        background: #f5f5f5;
        border-radius: 10px;
        img{
            border-radius: 10px;
        }
    }

    .large {
        position: absolute;
        top: 0;
        left: 500px;
        width: 400px;
        height: 400px;
        z-index: 500;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-repeat: no-repeat;
        // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
        background-size: 800px 800px;
        background-color: #f8f8f8;
        border-radius: 10px;
    }

    .layer {
        width: 200px;
        height: 200px;
        background: rgba(0, 0, 0, 0.1);
        // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
        left: 0;
        top: 0;
        position: absolute;
        border-radius: 10px;
    }

    .small {
        width: 80px;

        li {
            width: 68px;
            height: 68px;
            margin-left: 12px;
            margin-bottom: 15px;
            cursor: pointer;
            border-radius: 10px;
            img{
                border-radius: 10px;
            }
            &:hover,
            &.active {
                border: 3px solid $hoverColor;
            }
        }
    }
}
</style>