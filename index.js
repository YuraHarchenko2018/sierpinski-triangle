class Fractal {
    
    triangle = [
        [
            2000, 0
        ],
        [
            0, 2000
        ],
        [
            4000, 2000
        ]
    ]
    
    hexagon = [
        [
            2000, 0
        ],
        [
            1000, 500
        ],
        [
            3000, 500
        ],
        [
            1000, 1500
        ],
        [
            3000, 1500
        ],
        [
            2000, 2000
        ],
    ]

    custom = [

    ]

    constructor() {
        this.canvas = document.querySelector('#ctx')
        this.ctx = this.canvas.getContext('2d')
        this.progress = document.querySelector('.progress');
        
        this.set_default()
    }

    set_default() {
        this.ctx.strokeStyle = 'red'
        this.ctx.fillStyle = 'black'
        this.ctx.lineWidth = 2
        this.steps = 1000000
        this.dotSize = 1

        this.dotsArray = this.custom
    }

    init() {
        this.start_btn = document.querySelector("#startBtn")
        this.clear_btn = document.querySelector("#clearBtn")
        this.screen_shot_btn = document.querySelector("#screenShotBtn")
        this.color_input = document.querySelector("#colorInput")
        this.dots_сouner = document.querySelector("#dotsCouner")
        this.dots_size = document.querySelector("#dotsSize")
        this.toggle = document.querySelector("#toggle")

        
        this.controlPanel = document.querySelector(".control")
        this.bodyElement = document.querySelector("body")
        
        this.handleStartBtn()
        this.handleClearBtn()
        this.handleDotsCounter()
        this.handleDotsSize()
        this.handleCanvasClick()
        this.handleScreenShotBtn()
        this.handleColorInput()
        this.handleThemeToggleInput()
    }
    
    handleStartBtn() {
        this.start_btn.addEventListener('click', ()=> {
            // вынести в отдельную функцию
            this.progress.style.width = "0%"

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.dotsArray = this.custom
            setTimeout(() => this.render(), 300)
        }, false)
    }
    
    handleScreenShotBtn() {
        this.screen_shot_btn.addEventListener('click', ()=> {
            this.canvas.toBlob(function (blob) {
                const clipboardItemInput = new ClipboardItem({ "image/png": blob });
                navigator.clipboard.write([clipboardItemInput]);
            }, 'image/png');
        }, false)
    }
    
    handleClearBtn() {
        this.clear_btn.addEventListener('click', ()=> {
            // вынести в отдельную функцию
            this.progress.style.width = "0%"

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.custom = []
            console.dir(this.custom)
        }, false)
    }

    handleCanvasClick() {
        this.canvas.addEventListener('click', (e) => {
            let x = Math.round(e.offsetX * 3.47)
            let y = Math.round(e.offsetY * 3.46)
            this.ctx.fillRect(x, y, 15, 15)
            this.custom.push([ x, y ])
        }, false)
    }

    handleDotsCounter() {
        this.dots_сouner.addEventListener('click', ()=> {
            this.dots_сouner.value = this.steps
        }, false)

        this.dots_сouner.addEventListener('input', ()=> {
            this.steps = this.dots_сouner.value
        }, false)
    }

    handleDotsSize() {
        this.dots_size.addEventListener('click', ()=> {
            this.dots_size.value = this.dotSize
        }, false)

        this.dots_size.addEventListener('input', ()=> {
            this.dotSize = this.dots_size.value
        }, false)
    }

    handleColorInput() {
        this.color_input.addEventListener('input', ()=> {
            this.ctx.fillStyle = this.color_input.value
        }, false)
    }

    handleThemeToggleInput() {
        let mainColor = "#ffffff"
        let borderColor = "#000000"

        this.toggle.addEventListener('input', (e)=> {

            if (e.target.value == 'day') {
                e.target.value = 'night'
                mainColor = "#000000"
                borderColor = "#ffffff"
                
            } else {
                e.target.value = 'day'
                mainColor = "#ffffff"
                borderColor = "#000000"
            }

            this.start_btn.style.background = borderColor
            this.clear_btn.style.background = borderColor
            this.screen_shot_btn.style.background = borderColor

            this.start_btn.style.color = mainColor
            this.clear_btn.style.color = mainColor
            this.screen_shot_btn.style.color = mainColor

            this.controlPanel.style.borderColor = borderColor
            this.bodyElement.style.background = mainColor
            
            this.canvas.style.background = mainColor
            this.canvas.style.borderColor = borderColor

            let fillColor = (this.color_input.value == '#000000' || this.color_input.value == '#ffffff') ? borderColor : this.color_input.value
            this.ctx.fillStyle = fillColor
            this.color_input.value = fillColor
        }, false)
    }

    render() {
        // if (this.custom.length < 3) {
        //     alert('Больше 2-х точек!')
        //     // need add clear code !!!
        //     return;
        // }

        // draw the outlines of our figure
        for (let i = 0; i < this.dotsArray.length; i++) {
            this.ctx.fillRect(this.dotsArray[i][0], this.dotsArray[i][1], this.dotSize, this.dotSize)
        }

        let firstDot = [960, 0]
        let prevIndex = 0
        let alreadyStep = 0

        let chunkAmount = 1000
        for (let j = 0; j < chunkAmount; j++) {
            setTimeout(() => {
            
                for (let i = 0; i < this.steps / chunkAmount; i++) {
                    alreadyStep++
                    
                    this.progress.style.width = `${Math.floor((alreadyStep * 100) / this.steps)}%`
    
                    let secondIndex = getRandomInt(0, this.dotsArray.length - 1)
                    let secondDot   = this.dotsArray[secondIndex]
        
                    let newDotXcoordinate = (firstDot[0] + secondDot[0]) / 2
                    let newDotYcoordinate = (firstDot[1] + secondDot[1]) / 2
        
                    this.ctx.fillRect(newDotXcoordinate, newDotYcoordinate, this.dotSize, this.dotSize)
                    
                    firstDot = [newDotXcoordinate, newDotYcoordinate]
                    prevIndex = secondIndex
        
                }
            }, 1)
        }

    }

}

const Fractal_ex = new Fractal()
      Fractal_ex.init()
    //   Fractal_ex.render()


function getRandomInt(min, max, except = null) {
    min = Math.ceil(min)
    max = Math.floor(max)

    let number = Math.floor(Math.random() * ((max + 1) - min) + min)

    if (except != null && number == except) {
        number = getRandomInt(min, max, except)
    }

    return number
}