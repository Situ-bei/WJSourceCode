<template>
  <div class="goods-sku">
    <dl v-for="item in data.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img 
            :class="{ selected: val.selected, disabled: val.disabled }" @click="handleChangeSelected(item, val)"
            v-if="val.picture" 
            :src="val.picture" 
          />
          <span 
            :class="{ selected: val.selected, disabled: val.disabled }" @click="handleChangeSelected(item, val)" 
            v-else
            >
            {{val.name}}
          </span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script setup>
import { watchEffect,toRefs, onMounted, nextTick } from 'vue';
import getPowerSet from './power-set'
const spliter = '★'
let pathMap = {}
const {data} = defineProps({
  data:{
    type: [Object,Array],
    required: true,
    default: () => []
  }
})

console.log(data,'详情组件给SKU组件传的数据');


onMounted(async ()=>{
  try {
    pathMap = getPathMap(data.skus)
    disabledChange(data.specs, pathMap)
  } catch (error) {
    console.error('Error in onMounted:', error)
  }
  
})
//1369155859933827074
// console.log(pathMap,'pathMap');


const handleChangeSelected = (item,val)=>{  // 点击规格属性
  if (val.disabled) return  // 禁用状态  
  if (val.selected) {  // 取消选中
    val.selected = false
    emit('getSukID',{})
  }else{
    item.values.forEach(v => {
      v.selected = false
    })
    val.selected = true
    
  }
  // console.log(item,val,'item,val');
  //更新一下pathMap 的数据
  pathMap = getPathMap(data.skus)
  // 更新选中状态
  if (pathMap.lenght !== 0) {
    upSelectedState(data.specs,pathMap)  
    console.log(pathMap,'pathMap');
    }else return
    const selecterItem = getSelectedArr(data.specs)  // 获取选中数组
    console.log(selecterItem,'选中的项目');
    if (!selecterItem.includes(undefined)) {
      const selecterItemJson =  selecterItem.join('-') // 将选中数组转换为字符串
      // console.log(selecterItemJson,'选中的项目的序列化');
      const skuId = pathMap[selecterItemJson]  // 根据选中数组得到skuId
      // console.log(skuId,'根据选中数组得到skuId');
      const skuObj = data.skus.find( v => v.id == skuId )
      emit('getSukID',skuObj)
      
    }

    
}

const emit = defineEmits(['getSukID'])

//生成Key-Map
const getPathMap = (skus) => {
  const pathMap = [] // 创建一个空对象用于存储路径映射
  const EffectiveInventoryArray = skus?.filter(sku => sku.inventory > 0)
  // console.log(EffectiveInventoryArray,'EffectiveInventoryArray');
  EffectiveInventoryArray?.forEach(sku => {
    // 得到规格数组
    const EffectiveSpecificationArray = sku.specs.map(val => val.valueName)
    // console.log(EffectiveSpecificationArray,'EffectiveInventoryArray');
    // 得到规格数组的子集
    const SpecificationSubsetArray = getPowerSet(EffectiveSpecificationArray)
    // console.log(SpecificationSubsetArray,'EffectiveInventoryArray');
    // 遍历得到路径字典对象
    SpecificationSubsetArray.forEach(arr => {
      const key = arr.join('-') // 将数组转换为字符串作为键
      // console.log('key = ',key);
      if (pathMap[key]) {
        pathMap[key].push(sku.id)// 如果键已存在，则将商品ID添加到对应的数组中
        // console.log(pathMap);
      }else{
        pathMap[key] = [sku.id]//如果键不存在，则创建一个新的数组并添加商品ID
        // console.log('pathMap[key] = ',pathMap[key]);
      }
    })
  })
  // console.log(pathMap,'pathMap');
  return pathMap
}

//判断库存 设置可否选中
const disabledChange = (specs,pathMap)=>{
   specs?.forEach(item => {
    item.values.forEach(val => {
      val.disabled = !pathMap[val.name]
    })
  })
}

//获取选中项规格组合
const getSelectedArr = (specs) => {
  const arr = []
  specs.forEach(item => {
    //找到 有selected属性的项目
    const selectedItem = item.values.find(val => val.selected)
    arr.push(selectedItem?selectedItem.name : undefined )
    
  })
  console.log(arr,'arr');
  
  return arr
}
//更新按钮的禁用状态
const upSelectedState = (specs,pathMap)=>{
  
  specs.forEach((item,index)=>{
    const slectedArr = getSelectedArr(specs)
    
    //  console.log(item,index);
    item.values.forEach(val => {
      slectedArr[index] = val.name
      const key = slectedArr.filter(value => value).join('-')
      console.log(key,'这是选中数组改造的key');
      
      // val.disabled = !pathMap[key]
      // console.log(pathMap[key],'pathMap[key]');
      // 判断是否禁用
      val.disabled = !pathMap[key]
    })
    
     
  })
  

}


// export default {
//   name: 'Sku',
//   props: {
//     // specs:所有的规格信息  skus:所有的sku组合
//     data: {
//       type: Object,
//       default: () => ({ specs: [], skus: [] })
//     }
//   },
//   emits: ['change'],
//   setup (props, { emit }) {
//     let pathMap = {}
//     watchEffect(() => {
//       // 得到所有字典集合
//       pathMap = getPathMap(props.goods.skus)
//       // 组件初始化的时候更新禁用状态
//       initDisabledStatus(props.goods.specs, pathMap)
//     })

//     const clickSpecs = (item, val) => {
//       if (val.disabled) return false
//       // 选中与取消选中逻辑
//       if (val.selected) {
//         val.selected = false
//       } else {
//         item.values.forEach(bv => { bv.selected = false })
//         val.selected = true
//       }
//       // 点击之后再次更新选中状态
//       updateDisabledStatus(props.goods.specs, pathMap)
//       // 把选择的sku信息传出去给父组件
//       // 触发change事件将sku数据传递出去
//       const selectedArr = getSelectedArr(props.goods.specs).filter(value => value)
//       // 如果选中得规格数量和传入得规格总数相等则传出完整信息(都选择了)
//       // 否则传出空对象
//       if (selectedArr.length === props.goods.specs.length) {
//         // 从路径字典中得到skuId
//         const skuId = pathMap[selectedArr.join(spliter)][0]
//         const sku = props.goods.skus.find(sku => sku.id === skuId)
//         // 传递数据给父组件
//         emit('change', {
//           skuId: sku.id,
//           price: sku.price,
//           oldPrice: sku.oldPrice,
//           inventory: sku.inventory,
//           specsText: sku.specs.reduce((p, n) => `${p} ${n.name}：${n.valueName}`, '').trim()
//         })
//       } else {
//         emit('change', {})
//       }
//     }
//     return { clickSpecs }
//   }
// }
</script>

<style scoped lang="scss">
@mixin sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 10px;
  
  &.selected {
    border-color: $hoverColor;
    background-color: $hoverColor_selected;

  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      >img {
        width: 50px;
        height: 50px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }

      >span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }
    }
  }
}
</style>