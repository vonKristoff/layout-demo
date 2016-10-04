let bgs = document.querySelectorAll('section'),
    bgis = document.querySelectorAll('.background_image'),
    sticky = document.querySelector('#sticky'),
    imgs = document.querySelectorAll('.image'),
    hero = document.querySelector('.block--white'),
    p = []

function onScroll() {

    let pageTop = window.scrollY,
        pageBottom = pageTop + window.innerHeight

    bgs.forEach((el, i) => {
        // if(el.hasAttribute('data-src')) {
            
            let pos = el.getBoundingClientRect()                
            p[i].visible = (pos.top < pageBottom && pos.bottom > 0)

            if(p[i].visible) {

                let heightToScreenRatio = window.innerHeight / el.clientHeight,
                    relativeToTop = 1 - (pos.bottom / el.clientHeight),
                    px = relativeToTop * el.clientHeight,
                    pct = 100 * (px / window.innerHeight) / heightToScreenRatio

                // if(el.hasAttribute('data-offset')) pct -= el.getAttribute('data-offset')

                p[i].pct += (pct - p[i].pct) * .97 // 
                
                if(i == 0) {
                    let spesh = 1 - (pct / 50)
                    hero.style.opacity = `${spesh}`
                    let offset = (window.innerHeight/2) + (-spesh * .5) * window.innerHeight
                    hero.style.marginTop = offset + 'px'
                }

                // el.style.backgroundPosition = `50% ${-p[i].pct}%`
                // el.setAttribute("style", `transform: translate(0%, ${-p[i].pct}%);`)
            }
        // }
    })

}
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
function init() {
    bgs.forEach((el, i) => {
        p[i] = {
            pct: 0,
            visible: false
        }
        // pcts[i] = 0
        let src = el.getAttribute('data-src')        
        // if(src != null) el.style.backgroundImage = `url(${src})`
    })
    bgis.forEach((el, i) => {
        let src = el.getAttribute('data-src')        
        if(src != null) el.style.backgroundImage = `url(${src})`
    })
    imgs.forEach((el, i) => {
        let src = el.getAttribute('data-src')        
        if(src != null) el.style.backgroundImage = `url(${src})`
    })
    cycle()

    var boxes = []

    var num_w = 50,
        dim = window.innerWidth / num_w,
        num_y = Math.ceil(window.innerHeight / dim),
        total = num_w * num_y,
        row = -1, column = 0
    for(var i=0; i<total; i++) {
        if ((i % num_w) < 1) row ++;
        column = (i % num_w);
        var box = {
            x: (20) + column * dim,
            y: (20) + row * dim,
            r: 1
        }
        drawCircle(box)
    }
}
function drawCircle(c) {
  ctx.beginPath()
  ctx.fillStyle = '#fff'
  ctx.arc(c.x, c.y, c.r, 0,  Math.PI * 2)
  ctx.fill()
}
document.addEventListener('scroll', (e) => {
    if(window.scrollY > window.innerHeight) {
        sticky.classList.add('fix')
        if(window.scrollY > window.innerHeight + sticky.clientHeight) {
            sticky.classList.add('fit')
        }
    } else {
        sticky.classList.remove('fix')
        sticky.classList.remove('fit')
    }
})
function cycle() {
    onScroll()
    requestAnimationFrame(cycle)
}

init()