import { useIntersectionObserver } from '@vueuse/core'


//图片懒加载
export const useLazyImg ={
    install(app){
        // 懒加载指令逻辑
        app.directive('useLazyImg', {
            mounted (el, binding) {
            // el: 指令绑定的那个元素 img
            // binding: binding.value  指令等于号后面绑定的表达式的值  图片url
            // console.log(el, binding.value,'el + binding.value')
            const { stop } = useIntersectionObserver(
                el,
                ([{ isIntersecting }]) => {
                // console.log(isIntersecting,'isIntersecting')
                if (isIntersecting) {
                    // 进入视口区域
                    el.src = binding.value
                    stop()
                }
                },
            )
            }
        })
    }
}