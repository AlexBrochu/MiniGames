<template>
  <div class="memory-puzzle padding-20">
    <h1>Test your mnemonic skills</h1>
    <p>Try to find all the pairs of icons with de same color in the least possible shots by returning the squares.</p>

    <div id="puzzleContainer">
      <el-row v-for="y in maxY" :key="y" :gutter="10">
        <el-col v-for="x in maxX" :key="x" :xs="4" :sm="4" :md="4" :lg="4">
          <div class="box bg bg-light-blue">
            <i class="fa fa-thumbs-up" v-bind:id="(x - 1) + '' + (y - 1)"></i>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'memoryPuzzle',
  data () {
    return {
      icons: ['circle-o', 'square-o', 'arrow-right', 'heart-o', 'star-o', 'envelope-o', 'circle', 'square', 'arrow-left',
        'heart', 'star', 'envelope', 'dot-circle-o', 'plus-square-o', 'arrows-alt', 'heartbeat', 'star-half', 'envelope-open'],
      colors: ['#FF4949', '#13CE66', '#20A0FF', '#1F2D3D', 'darkviolet', '#F7BA2A'],
      pieces: [],
      maxX: 6,
      maxY: 6
    }
  },
  methods: {
    createPuzzle () {
      this.initializePieces()
      this.fillPieces()
    },
    initializePieces () {
      for (var i = 0; i < this.maxX; i++) {
        var array = []
        array[this.maxY - 1] = undefined
        this.pieces.push(array)
      }
    },
    fillPieces () {
      for (var i = 0; i < this.icons.length; i++) {
        var colorOfPair = i % this.colors.length
        var pair = 0

        while (pair < 2) {
          var x = Math.floor(Math.random() * this.maxX)
          var y = Math.floor(Math.random() * this.maxY)

          while (this.pieces[x][y] !== undefined) {
            x += 1

            if (x >= this.maxX) {
              x = 0
              y += 1

              if (y >= this.maxY) {
                y = 0
              }
            }
          }

          console.log(x, y, this.icons[i], this.colors[colorOfPair])

          var piece = { 'icon': this.icons[i], 'color': this.colors[colorOfPair] }
          this.pieces[x][y] = piece
          var icon = document.getElementById(x + '' + y)
          icon.setAttribute('class', 'fa fa-' + piece.icon)
          icon.setAttribute('style', 'color:' + piece.color)

          pair += 1
        }
      }
    }
  },
  mounted () {
    this.createPuzzle()
  }
}
</script>

<style scoped>
.fa {
  top:25%;
  left:30%;
}

.box {
  height:50px;
  margin-top:10px;
}
</style>
