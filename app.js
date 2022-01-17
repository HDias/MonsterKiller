new Vue({
  el: '#app',
  data: {
    running: false,
    playerLife: 100,
    monsterLife: 100,
    logs: []
  },

  computed: {
    hasResult() {
      return this.playerLife == 0 || this.monsterLife == 0
    },

    playerWins() {
      return this.monsterLife == 0
    }
  },

  methods: {
    startGame() {
      this.running = true
      this.playerLife = 100
      this.monsterLife = 100
    },
    attack(especial) {
      this.hurt('playerLife', 7, 11, false)
      if (this.playerLife > 0) this.hurt('monsterLife', 5, 10, especial)
    },
    hurt(attr, min, max, especial, source, target, klass) {
      const plus = especial ? 5 : 0
      const hurt = this.getRandom(min + plus, max + plus)

      // If result is negative the result is equal 0
      this[attr] = Math.max(this[attr] - hurt, 0)

      this.registerLog(attr, hurt)
    },
    healAndHurt() {
      if(this.playerLife == 100) return
      this.heal(10, 15)
      this.hurt('playerLife', 7, 11, false)
    },
    heal(min, max) {
      const heal = this.getRandom(min, max)

      // If result is greater than 100 the result is equal 100
      this.playerLife = Math.min(this.playerLife + heal, 100)
    },
    getRandom(min, max) {
      const value = Math.random() * (max - min) + min

      return Math.round(value)
    },
    registerLog(attrSource, hurt) {
      let source  = 'Player'
      let target  = 'Monstro'
      let text    = ''
      let klass   = 'player'
      if (attrSource == 'monsterLife') {
        source  = 'Monstro'
        target  = 'Player'
        klass   = 'monster'
      }

      text = `${source} atingiu ${target} com ${hurt}`

      this.logs.unshift({ text, klass })
    }
  },

  watch: {
    hasResult(value) {
      if (value) this.running = false
    }
  }
})