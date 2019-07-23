<template>
  <div class="hello">
    <h1>一些vue组件的demo</h1>
    <div class="line"></div>
    <h2>draggable</h2>
    <draggable class="draggable" v-model="myArray" group="people" @start="drag=true" @end="drag=false">
      <div class="draggable-img-box" v-for="(item, index) in myArray" :key="index">
        <img :src="item.src" />
        <span>{{item.cc}}</span>
        <a @click="deleteImage(index)"></a>
      </div>
    </draggable>
    <a @click="addImg">添加图片</a>

    <router-link :to="{ name: 'Three' }">泡泡</router-link>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'Draggable',
  data () {
    return {
      myArray: [{
        src: 'https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=45e16856990a304e4d22a6fae1c9a7c3/ac4bd11373f08202e2518d6d45fbfbedaa641ba4.jpg',
        cc: '123'
      },
      {
        src: 'https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=f09901779bcad1c8cfbbfa274f3f67c4/83025aafa40f4bfb3b3a8f0c0d4f78f0f63618fb.jpg',
        cc: '1232'
      }
      ]
    }
  },
  components: {
    draggable
  },
  methods: {
    deleteImage (index) {
      this.myArray.splice(index, 1)
    },
    addImg () {
      this.myArray.push('https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=a1b9de84b8fd5266b82b3a149b199799/b21c8701a18b87d6070d7970090828381f30fd16.jpg')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.line{
  position: relative;
  height: 1px;
  border-top: 1px solid #000;
  &::after{
    content: '华丽的分割线';
    display: block;
    position: absolute;
    background: #ffffff;
    width: 150px;
    text-align: center;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.draggable{
  display: flex;
  justify-content: center;
  &-img-box{
    margin-right: 30px;
    position: relative;
    img{
      width: 200px;
      height: 150px;
      object-fit: cover;
    }
    a{
      position: absolute;
      z-index: 11;
      right: -15px;
      top: -15px;
      width: 30px;
      height: 30px;
      color: #fff;
      border-radius: 50%;
      background: rgba(0,0,0,.5);
      display: flex;
      align-items: center;
      justify-content: center;
      &::after{
        content: '';
        display: block;
        width: 15px;
        height: 1px;
        border-top: 1px;
        border-radius: 1px;
        border-color: #fff;
        background-color: #fff;
        transform: rotate(45deg);
        position: absolute;
      }
      &::before{
        content: '';
        display: block;
        width: 15px;
        height: 1px;
        border-top: 1px;
        border-radius: 1px;
        border-color: #fff;
        background-color: #fff;
        transform: rotate(-45deg);
        position: absolute;
      }
    }
  }
}
</style>
