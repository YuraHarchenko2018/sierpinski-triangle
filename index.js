class Fractal {

    constructor() {
        this.canvas = document.querySelector('#ctx')
        // this.Drange = document.querySelector('#set_degr')
        this.ctx = this.canvas.getContext('2d')
        this.progress = document.querySelector('.progress');
        
        this.set_default()
        // this.handleRange()
    }

    set_default() {
        this.ctx.strokeStyle = 'red'
        this.ctx.fillStyle = 'black'
        this.ctx.lineWidth = 2
        this.steps = 400000
        this.dotSize = 1

        this.dotsArray = [
            [
                600, 100
            ],
            [
                200, 600
            ],
            [
                1000, 600
            ],
        ]
    }

    handleRange() {
        this.Drange.addEventListener('mousemove', (e)=>{
            if(e.which == 1) {
                this.rangeFunc(Number(e.target.value))
            }
        }, false)

        this.Drange.addEventListener('change', (e)=>{
                this.rangeFunc(Number(e.target.value))
        }, false)
    }

    rangeFunc(value) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        let degrees_monitor = document.querySelector('.degrees_monitor')
            degrees_monitor.textContent = value

        this.degrBase = value
        this.degr = value

        this.set_default()
        this.makeTree()
    }

    render() {
        // draw the outlines of our figure
        for (let i = 0; i < this.dotsArray.length; i++) {
            this.ctx.fillRect(this.dotsArray[i][0], this.dotsArray[i][1], this.dotSize, this.dotSize)
        }

        let firstDot = [0,0]
        let prevIndex = 0
        let alreadyStep = 0

        // let interaval = setInterval(() => {
            for (let i = 0; i < this.steps; i++) {
                alreadyStep++
                
                this.progress.style.width = `${Math.floor((alreadyStep * 100) / this.steps)}%`
               
                // this.ctx.fillStyle = '#' + getRandomInt(100000, 999999)
    
                let secondIndex = getRandomInt(0, this.dotsArray.length - 1)
                let secondDot   = this.dotsArray[secondIndex]
    
                let newDotXcoordinate = (firstDot[0] + secondDot[0]) / 2
                let newDotYcoordinate = (firstDot[1] + secondDot[1]) / 2
    
                this.ctx.fillRect(newDotXcoordinate, newDotYcoordinate, this.dotSize, this.dotSize)
                
                firstDot = [newDotXcoordinate, newDotYcoordinate]
                prevIndex = secondIndex
    
            }
        //     if(alreadyStep > this.steps) {
        //         clearInterval(interaval)
        //     }
        // }, 1);

    }

}

const Fractal_ex = new Fractal()
      Fractal_ex.render()


function getRandomInt(min, max, except = null) {
    min = Math.ceil(min)
    max = Math.floor(max)

    let number = Math.floor(Math.random() * ((max + 1) - min) + min)

    if (except != null && number == except) {
        number = getRandomInt(min, max, except)
    }

    return number
}