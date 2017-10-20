<template>
  <div class="memory-puzzle padding-20">
    <h1>Test your mnemonic skills</h1>
    <p>Try to find all the pairs of icons with de same color in the least possible shots by returning the gray tiles. Each time you return two tiles, your number of tries increase.
      If the two tiles doesn't display the same image, they will turn again. You win when all tiles are turned!</p>

    <p class="legend">Number of tries: {{ numberOfTries }}</p>
    <div id="puzzleContainer">
      <el-row v-for="y in maxY" :key="y" :gutter="10">
        <el-col v-for="x in maxX" :key="x" :xs="8" :sm="4" :md="4" :lg="4">
          <div :class="[numberOfTurnedTiles < 2 ? 'cursor' : '']" class="box">
            <div class="flipper" @click.stop.prevent="flipTile">
              <div class="front bg bg-light-gray"></div>
              <div class="back bg bg-light-gray"><i class="fa fa-thumbs-up" :id="(x - 1) + ' ' + (y - 1)"></i></div>
            </div>
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
      maxY: 6,
      numberOfTries: 0,
      totalNumberOfTurnedTiles: 0,
      numberOfTurnedTiles: 0,
      tilesFound: []
    }
  },
  methods: {
    flipTile (event) {
      var flipperElement = null
      var iconElement = null

      if (event.target.className.includes('back') || event.target.className.includes('front')) {
        flipperElement = event.target.parentNode
        iconElement = flipperElement.childNodes[2].childNodes[0]
      } else {
        flipperElement = event.target.parentNode.parentNode
        iconElement = event.target
      }

      var arrayId = iconElement.getAttribute('id').split(' ')

      if (!this.pieces[arrayId[0]][arrayId[1]].found) {
        if (this.numberOfTurnedTiles < 2) {
          this.numberOfTurnedTiles++

          flipperElement.setAttribute('style', 'transform: rotateY(180deg)')

          this.tilesFound.push({
            x: arrayId[0],
            y: arrayId[1],
            icon: this.pieces[arrayId[0]][arrayId[1]].icon
          })

          if (this.numberOfTurnedTiles === 2) {
            this.numberOfTries++

            console.log(this.tilesFound[0].icon, this.tilesFound[1].icon)

            if (this.tilesFound[0].icon === this.tilesFound[1].icon) {
              this.setTilesDiscovered()
            } else {
              setTimeout(this.flipTilesBack, 2000)
            }
          }
        }
      }
    },
    flipTilesBack () {
      for (var i = 0; i < this.tilesFound.length; i++) {
        var iconElement = document.getElementById(this.tilesFound[i].x + ' ' + this.tilesFound[i].y)
        var flipperElement = iconElement.parentNode.parentNode
        flipperElement.setAttribute('style', 'transform: rotateY(0deg)')
      }

      this.resetTurn()
    },
    setTilesDiscovered () {
      for (var i = 0; i < this.tilesFound.length; i++) {
        var iconElement = document.getElementById(this.tilesFound[i].x + ' ' + this.tilesFound[i].y)
        // remove gray background
        var backElement = iconElement.parentNode
        backElement.className = 'back'
        // remove cursor pointer
        var boxElement = backElement.parentNode.parentNode
        boxElement.className = boxElement.className + ' found'
        boxElement.setAttribute('disabled', 'true')

        this.pieces[this.tilesFound[i].x][this.tilesFound[i].y].found = true
      }

      this.totalNumberOfTurnedTiles += 2
      this.resetTurn()
    },
    resetTurn () {
      this.numberOfTurnedTiles = 0
      this.tilesFound = []
    },
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
            x++

            if (x >= this.maxX) {
              x = 0
              y++

              if (y >= this.maxY) {
                y = 0
              }
            }
          }

          console.log(x, y, this.icons[i])

          var piece = { 'icon': this.icons[i], 'color': this.colors[colorOfPair] }
          this.pieces[x][y] = piece
          var icon = document.getElementById(x + ' ' + y)
          icon.setAttribute('class', 'fa fa-' + piece.icon)
          icon.setAttribute('style', 'color:' + piece.color)

          pair++
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
.legend {
  margin-top:30px;
  font-style:italic;
}

.fa {
  top:35%;
}

.box {
  height:80px;
  margin-top:10px;
  perspective: 1000px;
}

.cursor {
  cursor:pointer;
}

.found {
  cursor:inherit;
}

.flipper, .back, .front {
  height:80px;
  width:100%;
}

/* flip speed goes here */
.flipper {
	transition: 0.6s;
	transform-style: preserve-3d;
	position: relative;
}

/* hide back of pane during swap */
.front, .back {
	backface-visibility: hidden;
	position: absolute;
	top: 0;
	left: 0;
}

/* front pane, placed above back */
.front {
	z-index: 2;
	/* for firefox 31 */
	transform: rotateY(0deg);
}

/* back, initially hidden pane */
.back {
	transform: rotateY(180deg);
    text-align:center;
}
</style>
