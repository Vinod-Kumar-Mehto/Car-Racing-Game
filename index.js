const score = document.querySelector(".score span");
const popup = document.querySelector(".popup, popupp");
const gameArea = document.querySelector(".gamearea");
const crash = document.querySelector(".crash");
const run = document.querySelector(".run");
let car;
let roadLines
const area = gameArea.getBoundingClientRect();
let keys = {
    ArrowUp: false,
    ArrowLeft:false,
    ArrowDown:false,
    ArrowRight:false
};
  let player = {speed:5  };
player.score = 0;

   let interval;
function KeyDown(e){
    e.preventDefault()
        keys[e.key] = true;
}
function KeyUp(e){
    e.preventDefault()
    keys[e.key] = false;
}

function isCollide(car, enemy){
        const carRect = car.getBoundingClientRect();
        const enemyRect = enemy.getBoundingClientRect();
       

        return (!(carRect.top > enemyRect.bottom || carRect.bottom < enemyRect.top || carRect.left > enemyRect.right  || carRect.right < enemyRect.left))


}

function playing(){
        if(player.start){
            moveLine()
            moveEnemy(car)
            if(keys.ArrowUp && player.y > area.top + car.offsetHeight){player.y -= player.speed, run.currentTime = 0, run.play() }
            if(keys.ArrowDown && player.y < area.bottom - car.offsetHeight){player.y += player.speed, run.play()}
            if(keys.ArrowRight && player.x < (area.width - 65) ){player.x += player.speed, run.play() }
            if(keys.ArrowLeft && (player.x - player.speed) > 0){player.x -= player.speed, run.play() }
             car.style.left = `${player.x}` + "px";
             car.style.top = `${player.y}` + "px";
            window.requestAnimationFrame(playing)
            score.innerHTML =  player.score++;

        }
    
};
function moveLine(){
    let lines = gameArea.querySelectorAll(".lines");
            
            lines.forEach(function(current){
                if(current.y >= 600){current.y -= 700 }
              current.y += player.speed; 
              current.style.top = current.y +"px";

 })
};

function col(){
    return Math.floor((Math.random() * 216) + 1)

}
            function moveEnemy(car){
                let enemy = gameArea.querySelectorAll(".enemy");
                        
                         enemy.forEach(function(current){
                                if(isCollide(car, current)){
                                    window.cancelAnimationFrame(playing)
                                    player.start = false;
                                    run.pause()
                                    run.currentTime = 0;
                                    crash.currentTime = 0;
                                    crash.play()
                                    popup.classList.remove("hide")
                                    popup.innerHTML ="<p>Game over<br>Press here to start again<br>Arrow keys to move</p>";
                                    player.speed = 5;
                                    clearInterval(interval)
                                }
                            if(current.y >= 600){
                                current.y = -300
                                current.style.left = Math.floor(Math.random() * 450) + "px"
                                current.style.backgroundColor = `rgb(`+col()+`,`+col()+`,`+col()+`)`;
                                console.log(`rgb(`+col()+`,`+col()+`,`+col()+`)`);
                            }
                          current.y += player.speed; 
                          current.style.top = current.y +"px";       
                            
      })
};
function start(){
        player.start = true;
        this.classList.add("hide")
        player.score = 0;
        document.querySelectorAll(".lines, .car, .enemy").forEach(current => current.remove())
        window.requestAnimationFrame(playing)
        for(let i = 0; i < 5; i++ ){
            roadLine = document.createElement("div");
            roadLine.setAttribute("class", "lines")
            roadLine.y = (i*140)
            roadLine.style.top = roadLine.y +"px";
            gameArea.appendChild(roadLine);
        }
            
        car = document.createElement("div");
        car.setAttribute("class", "car")
        gameArea.appendChild(car)        
        player.x = car.offsetLeft;
        player.y = car.offsetTop;
           
    
        for(let i = 0; i < 3; i++ ){
            enemeyCar = document.createElement("div");
            enemeyCar.setAttribute("class", "enemy")
            enemeyCar.y = ((i+1) * 350) * -1;
            enemeyCar.style.top = enemeyCar.y +"px";
            enemeyCar.style.backgroundColor = `rgb(`+col()+`,`+col()+`,`+col()+`)`;
            enemeyCar.style.left = Math.floor(Math.random() * 400) + "px"
            gameArea.appendChild(enemeyCar);
        }
        interval= setInterval(function(){
            player.speed++
    
        },5000 )
        crash.pause()
}
document.addEventListener("keyup", KeyUp)
document.addEventListener("keydown", KeyDown)
popup.addEventListener("click", start)