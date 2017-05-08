// Detects mousewheel up and down
// On load we need to set values to display diferent sections
// var fixedPoint = 0; // Set top value
// var fixedHeight = window.innerHeight; // Save window height;
// $(window).bind('wheel DOMMouseScroll', function(e){
//
//     var wheelCheckDelta = e.originalEvent.wheelDeltaY; //Returns a double representing the vertical scroll amount.
//     var wheelCheckDetail = e.originalEvent.detail;
//     var currentDiv = $('.section.active');
//     console.log(wheelCheckDelta);

    // ++x (pre-increment) means "increment the variable; the value of the expression is the final value"
    // x++ (post-increment) means "remember the original value, then increment the variable; the value of the expression is the original value"

    //
    // var count = 10;
    // if (e.originalEvent.wheelDelta >= 120) {
    //     $('#oCounter').text(++count + '0%');
    //     console.log(count);
    // } else if (e.originalEvent.wheelDelta <= -120) {
    //     $('#oCounter').text(++count + '0%');
    //     console.log(count);
    // }
    // console.log(e.originalEvent.wheelDelta);

    // function Picture()
    // {
    //     if (event.wheelDelta >= 120)
    //         Resize(++count);
    //     else if (event.wheelDelta <= -120)
    //         Resize(--count);
    //     return false;
    // }
    // function Resize(c){
    //     oImage.style.zoom = c + '0%';
    // }

    // if (wheelCheckDelta > 0 || wheelCheckDetail < 0) { // If user scrolls up
    //
    //     var nextElement = currentDiv.prev();
    //     if (nextElement.length !== 0) {
    //         // Remove active class from current section div to hide content
    //         currentDiv.removeClass('active');
    //         // Add class active to the div class section prev to display content
    //         nextElement.addClass('active');
    //     }
    // }
    // else { // If user scrolls down
    //     if (wheelCheckDelta < -100) {
    //
    //         var nextElement = currentDiv.next()
    //         // Check if current div is the last one, in that case do nothing
    //         if (nextElement.length !== 0) {
    //             // Remove active class from current section div to hide content
    //             currentDiv.removeClass('active');
    //             // Add class active to the div class section after to display content
    //             nextElement.addClass('active');
    //         }
    //     }
    // }

// });

// GSAP

var box = document.querySelectorAll('.section'),
    indx = box.length-1,
    Anim ;

for(var i=box.length ; i--;){
	box[i].anim = TweenLite.to(box[i],0.7,{yPercent:-100,paused:true});
};

document.addEventListener("mousewheel",Go);
document.addEventListener("DOMMouseScroll",Go);
// 
// var D = document.createElement('div');
// Draggable.create(D,{
// 	trigger:".box",type:'y',minimumMovement:5,cursor:'n-resize',
// 	onDrag:function(){ var X=this.getDirection("start")=='up'?1:-1;  Go(X);}
// });

function Go(e){
	var SD=isNaN(e)?e.wheelDelta||-e.detail:e;
	if(SD>0 && indx>0 ){
		if(!Anim||!Anim.isActive()){Anim=box[indx].anim.play();  indx--;}
	}else if(SD<0 && indx<box.length-1){
		if(!Anim||!Anim.isActive()){indx++;  Anim=box[indx].anim.reverse();}
	};
	if(isNaN(e))e.preventDefault();
};
