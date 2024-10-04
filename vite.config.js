import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// inspect 插件
import Inspect from 'vite-plugin-inspect'

//element plus 自动导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig((command, mode) => {
   return {
    plugins: [
      Inspect(),
      vue(),
      //element plus 自动导入
      AutoImport({
        imports:["vue","vue-router","pinia"],
        resolvers: [ElementPlusResolver()],
      }),
      // element plus 自动注册组件
      Components({
        resolvers: [ElementPlusResolver({importStyle:'sass'})],//这里要配置成 sass 才行
      }),
    ],
    //配置 src 替代符号
    resolve: {
      alias:{
        '@':path.resolve(__dirname,'src')
      }
    },
    base:'/WanJia-Lanrtern/',
    css: {
      preprocessorOptions: {
        scss: {
          // 自动导入定制化样式文件进行样式覆盖 1. scss 文件路径 2. 样式覆盖
          additionalData: 
          `@use "@/styles/element/index.scss" as *;  
            @use "@/styles/var.scss" as *;       
          `,
        }
      }
    }
  }
})