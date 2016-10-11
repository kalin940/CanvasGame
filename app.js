function init() {
    // Constants
    let moveSpeed=13;
    let beerSpeed=2;

    //Resources
    let heroImg=document.getElementById('theHero');
    let beerImg=document.getElementById('theBeer');
    let endImg=document.getElementById('theEnd');
    let backgroundImg = document.getElementById('background');
    let ctx=document.getElementById('canvas').getContext('2d');
    ctx.fillStyle = "white";
    ctx.font='24px arial white';
    let hero={x:400,y:500};
    let beer={x:0,y:0};
    let dirY=true;
    let score=-1;
    let lives=3;
    let running=true;
    let jumping=false;
    let jumpHeight=50;
    window.addEventListener('keydown',kebdHandler);
    
    function kebdHandler(event) {
        switch(event.code){
            case "ArrowLeft":
                if(hero.x>0){
                    heroImg=document.getElementById('theHeroLeft');
                    hero.x-=moveSpeed;
                }
                break;
            case "ArrowRight":
                if(hero.x<690) {
                    heroImg = document.getElementById('theHero');
                    hero.x += moveSpeed;
                }
                break;
            case "ArrowUp":
                    jump();
                break;
            case "ArrowDown":
                jump();
                break;
        }
       // update();
    }

    function jump() {
        if (!jumping) {
            jumping = true;
            setTimeout(land, 400);
        }
    }
    function land() {
        jumping = false;
    }

    function  update() {
        moveBeer();
        let X=(hero.x+50)-(beer.x+40);
        let Y=(hero.y+50)-(beer.y+40);

        let distance=Math.sqrt(X*X + Y*Y);
        if(distance<97){
            reset();
        }
    }
    function reset() {
        beer.x=Math.round(Math.random()*720);
        beer.y=0;
        score++;
        if(score%5==0){
            beerSpeed++;
        }
    }
    function draw() {
        let y=hero.y;
        ctx.clearRect(0,0,800,600);
        if(jumping){
            y-=jumpHeight;
            ctx.drawImage(heroImg,hero.x,y,100,100);
        }else{
            ctx.drawImage(heroImg,hero.x,hero.y,100,100);
        }
        ctx.drawImage(backgroundImg,0,0,800,600);
        ctx.drawImage(beerImg,beer.x,beer.y,80,80);


        ctx.fillText(`Beers:${score}`,10,30);
        ctx.fillText(`Lives:${lives}`,10,50);
    }
    function main() {
        update();
        draw();
        if(running){
            requestAnimationFrame(main);
        }else{
            endGame();
        }
        
    }
    function moveBeer() {
        if(dirY){
            beer.y+=beerSpeed;
            if(beer.y<=740){
                dirY=true;
            }
            else{
                dirY=false;
            }
        }
        else{
            lives--;
            if(lives>0){
                dirY=true;
                score--;
                reset();
            }
            else{
                running=false;
            }
        }
    }
    function endGame() {
        ctx.clearRect(0,0,800,600);
        ctx.drawImage(endImg,0,0,800,600);
        ctx.fillText(`Beers:${score}`,10,30);
        cancelAnimationFrame(main);
        this.window.addEventListener('keydown',restart);
        function restart(event) {
            if(event.code=='Enter'){
                init();
            }
        }
    }
    reset();
    main();
}


init();
main();

/*function main(){

    update();
    render();
    requestAnimationFrame(main)
}
function  update() {

}
function render() {

}
requestAnimationFrame(main); */