function init() {
    // Constants
    let moveSpeed=13;
    let beerSpeed=2;

    //Resources
    let heroImg=document.getElementById('theHero');
    let beerImg=document.getElementById('theBeer');
    let endImg=document.getElementById('theEnd');
    let ctx=document.getElementById('canvas').getContext('2d');
    ctx.font='24px arial';
    let hero={x:400,y:500};
    let beer={x:0,y:0};
    let dirY=true;
    let score=-1;
    let lives=3;
    let running=true;
    window.addEventListener('keydown',kebdHandler);
    
    function kebdHandler(event) {
        switch(event.code){
            case "ArrowLeft":
                heroImg=document.getElementById('theHeroLeft');
                hero.x-=moveSpeed;
                break;
            case "ArrowRight":
                heroImg=document.getElementById('theHero');
                hero.x+=moveSpeed;
                break;
            case "ArrowUp":
                hero.y-=moveSpeed;
                break;
            case "ArrowDown":
                hero.y+=moveSpeed;
                break;
        }
       // update();
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
        ctx.clearRect(0,0,800,600);
        ctx.drawImage(beerImg,beer.x,beer.y,80,80);
        ctx.drawImage(heroImg,hero.x,hero.y,100,100);

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