<template>
  <div class="simon padding-20">
    <h1>Let's play Simon !</h1>
    <p class="description">When you are ready, the game will first show you a pattern of colors by lighting the buttons up. Then, at your turn, you will have to repeat the pattern. If you're wrong, you will start over. Good luck !</p>

    <el-button type="primary" v-show="!isStarted" @click="startGame">Start</el-button>

    <div v-show="isStarted">
      <p class="legend" v-if="!yourTurn">Simon's turn. Look carefully!</p>
      <p class="legend" v-if="yourTurn">It's your turn, repeat the pattern :)</p>
      <el-row :gutter="20">
        <el-col :span="12"><div :ref="YELLOW" class="box bg bg-yellow"></div></el-col>
        <el-col :span="12"><div :ref="BLUE" class="box bg bg-blue"></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12"><div :ref="RED" class="box bg bg-red"></div></el-col>
        <el-col :span="12"><div :ref="GREEN" class="box bg bg-green"></div></el-col>
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
      isStarted: false,
      yourTurn: false,
      YELLOW: 1,
      BLUE: 2,
      RED: 3,
      GREEN: 4,
      listOfColors: [],
      numberOfStartingColors: 4
    }
  },

  methods: {
    startGame () {
      this.isStarted = true
      this.addNewColor(this.numberOfStartingColors)
    },

    showNewColor (numberOfColors) {
      var newColor = this.getRandomColor()
      this.listOfColors.push(newColor)
      this.changeOpacity(newColor, 0.3, numberOfColors)
    },

    changeOpacity (color, newOpacity, numberOfColors) {
      this.$refs[color].style.opacity = newOpacity

      if (newOpacity !== 1) {
        setTimeout(this.changeOpacity.bind(null, color, 1, numberOfColors), 800)
      } else {
        console.log(newOpacity, numberOfColors)
        this.addNewColor(numberOfColors)
      }
    },

    getRandomColor () {
      return Math.floor((Math.random() * 4) + 1)
    },

    addNewColor (numberOfColors) {
      if (numberOfColors > 0) {
        setTimeout(this.showNewColor.bind(null, numberOfColors - 1), 2000)
      } else {
        this.yourTurn = true
      }
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
    transition: opacity 0.8s;
  }

  .legend {
    text-align: center;
    padding: 20px 0px;
  }
</style>
