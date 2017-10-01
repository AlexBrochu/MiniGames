<template>
  <div class="simon padding-20">
    <h1>Let's play Simon !</h1>
    <p class="description">When you are ready, the game will first show you a pattern of colors by lighting the buttons up. Then, at your turn, you will have to repeat the pattern. If you're wrong, you will start over. Good luck !</p>

    <el-button type="primary" v-if="!isStarted" @click="startGame">Start</el-button>

    <div v-if="isStarted">
      <p class="legend">{{ simonsTurn }}</p>
      <el-row :gutter="20">
        <el-col :span="12"><div class="box bg bg-yellow"></div></el-col>
        <el-col :span="12"><div class="box bg bg-blue"></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12"><div class="box bg bg-red"></div></el-col>
        <el-col :span="12"><div class="box bg bg-green"></div></el-col>
      </el-row>
    </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'simon',

  data () {
    return {
      simonsTurn: "Simon's turn. Look carefully!",
      yourTurn: "It's your turn, repeat the pattern :)",
      isStarted: false
    }
  },

  methods: {
    startGame () {
      this.isStarted = true
    }
  }
}
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .box {
    height:300px;
  }

  .legend {
    text-align: center;
    padding: 20px 0px;
  }
</style>
