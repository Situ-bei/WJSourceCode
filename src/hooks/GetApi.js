import { onMounted, ref } from 'vue';
import * as allApi from '@/api/index'

console.log(allApi,'allApi');

export const useGetApi = (val,params) => {
    // console.log(val,'val')
    // console.log(allApi[val](),'allApi');
    
    const initData = ref()

    if(params){
        allApi[val](params).then(({result})=>{
            initData.value = result
            // console.log(result,'result');
        })
    }else{
        onMounted( async () => {
            await allApi[val](params).then(({result})=>{
              initData.value = result
          })
      })
    }

    return {
        initData
    }
}