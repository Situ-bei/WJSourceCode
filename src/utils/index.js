import axios from "axios";
import router from "../router";
import { useLoginInfoStore } from '@/stores'
const instance = axios.create({
  baseURL: "https://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const loginInfoStore = useLoginInfoStore();

    const token = loginInfoStore.loginInfo.token
    console.log(token,'请求拦截器token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // if (response.status == 200) {
    //   ElMessage.success(response.data.msg)
    // }
    // console.log(response,'response响应拦截器');
    return response.data;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log(error,'error响应拦截器')
    ElMessage({
      message: error.response.data.message || error,
      type: 'error',
      grouping:true,
      repeatNum: 1
    })
    if (error.response.data.code == 10019) {
      const loginInfoStore = useLoginInfoStore();
      loginInfoStore.loginInfo = {}
      router.push('/login')
    } 

    return Promise.reject(error);
  }
);


export default instance;