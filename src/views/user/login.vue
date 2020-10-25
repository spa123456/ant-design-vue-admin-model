<template>
    <div>
        登录
        <a-button @click="()=>$router.push('register')">到注册去</a-button>
        <a-button @click="()=>$router.push('/')">登录成功</a-button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    }
}
</script>