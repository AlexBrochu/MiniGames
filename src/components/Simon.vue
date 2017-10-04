<template>
  <div class="simon padding-20">
    <h1>Let's play Simon !</h1>
    <p class="description">When you are ready, the game will first show you a pattern of colors by lighting the buttons up. Then, at your turn, you will have to repeat the pattern. If you're wrong, you will start over. Good luck !</p>

    <el-button type="primary" v-show="!isStarted" @click="startGame">Start</el-button>

    <div v-show="isStarted">
      <p class="legend" v-if="!isYourTurn">Simon's turn. Look carefully!</p>
      <p class="legend" v-if="isYourTurn">It's your turn, repeat the pattern :)</p>
      <el-row :gutter="20">
        <el-col :span="12"><div disable :ref="YELLOW" class="box bg bg-yellow" @click="guessColor(YELLOW)"></div></el-col>
        <el-col :span="12"><div disable :ref="BLUE" class="box bg bg-blue" @click="guessColor(BLUE)"></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12"><div :ref="RED" class="box bg bg-red" @click="guessColor(RED)"></div></el-col>
        <el-col :span="12"><div :ref="GREEN" class="box bg bg-green" @click="guessColor(GREEN)"></div></el-col>
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
      isYourTurn: false,
      YELLOW: 1,
      BLUE: 2,
      RED: 3,
      GREEN: 4,
      listOfColors: [],
      numberOfStartingColors: 4,
      numberOfGuesses: 0,
      transitionDuration: 1000
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
      this.changeOpacity(newColor, 0.3, this.addNewColor, numberOfColors)
    },

    changeOpacity (color, newOpacity, callback, numberOfColors) {
      this.$refs[color].style.opacity = newOpacity

      if (newOpacity !== 1) {
        setTimeout(this.changeOpacity.bind(null, color, 1, callback, numberOfColors), 800)
      } else {
        callback(numberOfColors)
      }
    },

    getRandomColor () {
      return Math.floor((Math.random() * 4) + 1)
    },

    addNewColor (numberOfColors) {
      if (numberOfColors > 0) {
        setTimeout(this.showNewColor.bind(null, numberOfColors - 1), this.transitionDuration)
      } else {
        this.changeToYourTurn()
      }
    },

    loopThroughColors (numberOfColors) {
      if (numberOfColors > 0) {
        var index = this.listOfColors.length - numberOfColors
        setTimeout(this.changeOpacity.bind(null, this.listOfColors[index], 0.5, this.loopThroughColors, numberOfColors - 1), this.transitionDuration)
      } else {
        this.addNewColor(1)
      }
    },

    changeToYourTurn () {
      this.numberOfGuesses = 0
      for (var key in this.$refs) {
        this.$refs[key].className = this.$refs[key].className + ' active'
      }
      this.isYourTurn = true
    },

    changeToSimonsTurn () {
      this.isYourTurn = false
      for (var key in this.$refs) {
        this.$refs[key].className = this.$refs[key].className.replace(' active', '')
      }
      this.loopThroughColors(this.listOfColors.length)
    },

    guessColor (colorGuessed) {
      if (this.isYourTurn) {
        if (this.listOfColors[this.numberOfGuesses] === colorGuessed) {
          this.numberOfGuesses += 1
        } else {
          this.gameOver()
        }

        if (this.numberOfGuesses >= this.listOfColors.length) {
          this.changeToSimonsTurn()
        }
      }
    },

    gameOver () {
      this.isYourTurn = false
      this.isStarted = false
      var level = this.listOfColors.length - this.numberOfStartingColors + 1
      console.log(level)
      this.$message.error({
        message: 'You lost! Your level was ' + level + '!',
        showClose: true
      })
      this.listOfColors = []
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
    cursor:pointer;
  }

  .active:active {
    background-color:#1F2D3D;
  }

  .legend {
    text-align: center;
    padding: 20px 0px;
  }
</style>
