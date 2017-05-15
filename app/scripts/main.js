// Scroll page

var box = document.querySelectorAll('.section'),
    indx = box.length-1,
    Anim ;

for(var i=box.length ; i--;){
	box[i].anim = TweenLite.to(box[i],0.7,{yPercent:-100,paused:true});
};

document.addEventListener("mousewheel",Go);
document.addEventListener("DOMMouseScroll",Go);

function Go(e){
	var SD=isNaN(e)?e.wheelDelta||-e.detail:e;
	if(SD>0 && indx>0 ){
		if(!Anim||!Anim.isActive()){Anim=box[indx].anim.play();  indx--;}
	}else if(SD<0 && indx<box.length-1){
		if(!Anim||!Anim.isActive()){indx++;  Anim=box[indx].anim.reverse();}
	};
	if(isNaN(e))e.preventDefault();
};

//Navigation bar animation

var nav = document.getElementById('nav');
var hamburger = document.getElementById('hamburger');
var navLeftText = document.getElementsByClassName('nav-left');
var navRightText = document.getElementsByClassName('nav-right');

nav.addEventListener('mouseenter', navShow);
nav.addEventListener('mouseleave', navHide);

function navShow(e) {
    TweenMax.to(nav, 0.2, {
        height: '120px',
        opacity: 1,
        onComplete: function() {
            TweenMax.to(hamburger, 0.2, {
                delay: 0.2,
                width: '0',
                right: '0',
                opacity: 0,
                onComplete: function() {
                    TweenMax.to(nav, 0.2, {
                        delay: 0.2,
                        width: '100%',
                        height: '120px',
                        onComplete: function() {
                            TweenMax.to([navLeftText, navRightText], 0.2, {
                                delay: 0.4,
                                opacity: '1',
                            })
                        }
                    });
                }
            });
        }
    });
}

function navHide() {
    TweenMax.to([navLeftText, navRightText], 0.2, {
        delay: 0.4,
        opacity: '0',
        onComplete: function() {
            TweenMax.to(nav, 0.2, {
                delay: 0.2,
                width: '60px',
                onComplete: function() {
                    TweenMax.to(hamburger, 0.1, {
                        delay: 0.4,
                        right: '30px',
                        opacity: 1,
                        onComplete: function() {
                            TweenMax.to(nav, 0.2, {
                                delay: 0.2,
                                height: '60px',
                                width: '60px'
                            });
                        }
                    });
                }

            });
        }
    })
}

// Box content animation

var boxContent = document.getElementsByClassName('box-content');
var parentBox = document.getElementsByClassName('learned');
var countBox;

// console.log(boxContent);
// console.log(parentBox);

boxContent[0].addEventListener('mouseenter',expandBox);

function expandBox() {
    var current = this.parentNode;
    var parentCurrent = this.parentNode.parentNode;
    var node = parentCurrent.childNodes;
    var currentChild = current.childNodes;

    for (var i = 0; i < currentChild.length ; i++) {
        if (currentChild[i].nodeType === 1) {
            currentChild = currentChild[i];
        }
    }

    for (var i = 0; i < node.length ; i++) {
        if (node[i].nodeType === 1) {
            if (current !== node[i]) {
                TweenMax.to(node[i], 0.3, {
                    delay: 0.2,
                    width: '0',
                    opacity: 0,
                    onComplete: function() {
                        TweenMax.to(current, 0.4, {
                            delay: 0.2,
                            className: '+=fullWidth',
                            conComplete: function() {
                                TweenMax.to(current, 0.2, {
                                    delay: 0.2,
                                    className: '+=fullHeight',
                                    onComplete: function() {
                                        TweenMax.to(currentChild, 0.2, {
                                            delay: 0.2,
                                            className: '+=hideShadow',
                                            onComplete: function() {
                                                TweenMax.to(parentCurrent, 0.2, {
                                                    delay: 0.2,
                                                    className: '+=totalHeight',

                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        }
    }
}

function closeBox() {
    // Click close button
    // height back to normal
    // Width back to normal
    // Reapear the hiddens boxes
}
