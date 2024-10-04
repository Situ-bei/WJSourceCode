import { createRouter,createWebHistory,createWebHashHistory } from "vue-router";



const routes = [
  {
    path: '/',
    name: 'layout',
    
    component: () => import('@/pages/layout/index.vue'),
    children:[
      {
        path: '/',
        name: 'home',
        meta: {
          name: '首页'
        },
        component: () => import('@/pages/layout/home/index.vue')
      },
      {
        path: 'category/:id',
        name: 'category',
        meta: {
          name: '分类'
        },
        component: () => import('@/pages/layout/category/index.vue')
      },
      {
        path: 'category/sub/:id',
        name: 'subcategory',
        meta: {
          name: '分类:id'
        },
        component: () => import('@/pages/layout/subcategory/index.vue')
      },
      {
        path: 'detail/:id',
        name: 'detail',
        component: () => import('@/pages/layout/detail/index.vue'),
        props: true
      },
      {
        path: 'payment',
        name: 'payment',
        meta: {
          name: '支付'
        },
        component: () => import('@/pages/layout/payment/index.vue'),
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue'),
  }
]

//#region
// const pageJS = import.meta.glob('@/pages/**/*.js',{
//   eager: true,
// 	import: 'default'
// })

// console.log('pageJS',pageJS);

// const pageV = import.meta.glob('@/pages/**/*.vue')
// console.log('pageV',pageV);


// const initObj = (path, meta) => {
//   const pathJSPath = path
//   path = path.replace('/src/pages', '').replace('/page.js', '')
//   console.log('path', path);
//   if (/^\/layout$/.test(path)) {
//     // path.split('/layout')
//     // console.log('/layout/**/**', path);
    
//   }
//   console.log('/layout/**/**', path);

//   const name = path.split('/').filter(Boolean).join('-') || '/'
//   const comPath = pathJSPath.replace('page.js', 'index.vue')
//   // console.log('comPath', comPath);
  
//   const value = {
//       path,
//       name,
//       component: pageV[comPath],
//       meta
//   }
//   console.log(pageV[comPath],'pageV[comPath]');
  
//   if(meta.isChild) {
//     value.children = []
//   }
//   return value
// }


// // 创建map对象
// const sortPages = new Map()
// // 根据index排序
// const sortKey = Object.keys(pageJS).sort((a, b) => pageJS[a].index - pageJS[b].index)
// console.log('sortKey之前', sortKey);

// // 添加到map
// sortKey.forEach(key => {
// 	sortPages.set(key, pageJS[key])	
// })
// console.log('sortPages之后', sortPages);


// const routes = []
// for(let [path, meta] of sortPages.entries()) {
//   console.log(meta);
  
// 	  // 第一层路由直接添加
// 	  if(meta.index == 0) {
// 	    routes.push(initObj(path,meta))
//       // console.log('==0',routes);
      
// 	  }
// 	  // 第二层路由先获取上级节点
// 	  if(meta.index == 1) {
// 	    const parentIndex = routes.findIndex(item => meta.parent == item.path)
//       // console.log('parentIndex +  routes + meta', parentIndex,routes,meta);
      
// 	    if(parentIndex != -1) {
// 	      routes[parentIndex].children.push(initObj(path,meta))
// 	    }
// 	  }
// 	  // 根据meta.parent获取父节点信息，重复第二层的操作
// 	  if(meta.index == 2) {
// 	    const page = pageJS[`/src/pages${meta.parent}/page.js`]
//       console.log('page', meta.parent)
      
// 	    const oneParentIndex = routes.findIndex(item => item.path == page.parent)
// 	    const twoParentIndex = routes[oneParentIndex].children.findIndex(item => item.path == meta.parent)
//       console.log('twoParentIndex', twoParentIndex,oneParentIndex);
      
// 	    if(twoParentIndex != -1) {
// 	      routes[oneParentIndex].children[twoParentIndex].children.push(initObj(path,meta))
//         console.log('routes[oneParentIndex]',routes[oneParentIndex].children[0].children);
        
// 	    }
// 	  }
// }
// console.log('routes', routes);
//#endregion


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:routes,
/**
 * 定义滚动行为
 * 
 * 此方法用于在页面跳转时指定滚动的位置
 * 通过返回一个对象，可以控制页面在路由跳转后的滚动位置
 * 
 * @returns {Object} 返回一个包含滚动位置的对象
 */
  scrollBehavior(){
    return{
      top:0
    }
  }
})
// 路由导航守卫
// router.beforeEach((to, from)=>{
//   const token= localStorage.getItem('WJtoken')
//   if (!token && to.path !== '/login') {
//       console.log('本地无token');
//       return '/login'
//   }else if (token && to.path === '/login') {
//       return '/'
//   }
// })
// 路由导航后
// router.afterEach((to, from)=> {
//   if(!to.meta.name || to.meta.name == ''){
//       document.title = '万家灯火'
//         console.log(from , '+++');
      
//   }else{
//       document.title = to.meta.name
//       console.log(to);
      
//   }
// })




export default router