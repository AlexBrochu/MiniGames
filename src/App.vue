<template>
  <div id="app">
    <header class="padding-20 bg bg-blue">
      Mini Games!
    </header>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="8" :lg="8">
        <el-menu :router="true" :mode="windowWidth > 990 ? 'vertical' : 'horizontal'">
          <el-menu-item index="/">
            <i class="fa fa-home"></i>
            <template slot="title">Home</template>
          </el-menu-item>
          <el-menu-item index="simon">
            <i class="el-icon-menu"></i>
            <template slot="title">Simon</template>
          </el-menu-item>
          <el-menu-item index="memory-puzzle">
            <i class="fa fa-clone" aria-hidden="true"></i>
            <template slot="title">Memory Puzzle</template>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="16">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      windowWidth: window.innerWidth
    }
  },
  methods: {
    handleWindowResize (event) {
      this.windowWidth = event.currentTarget.innerWidth
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleWindowResize)
  },
  mounted () {
    window.addEventListener('resize', this.handleWindowResize)
  }
}
</script>

<style>
* {
  padding:0px;
  margin:0px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-family: roboto, sans-serif;
}

header {
  font-size: 30px;
  font-weight: bold;
  font-family: 'Kelly Slab', cursive;
}

.padding-20 {
  padding:20px;
}

.bg {
  color:#FFF;
}

.bg-blue {
  background-color:#20A0FF;
}

.bg-light-gray {
  background-color:#E5E9F2;
}

.bg-red {
  background-color:#FF4949;
}

.bg-yellow {
  background-color:#F7BA2A;
}

.bg-green {
  background-color:#13CE66;
}

.fa {
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 20px;
  top: -2px;
  position: relative;
}

.el-icon-menu {
  position: relative;
  top: -1px;
}

.description {
  padding:20px 0px;
  font-size:18px;
}

.el-message__group p {
  font-size:18px;
}
</style>
