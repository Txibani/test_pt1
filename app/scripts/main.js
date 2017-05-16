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

var boxContent = document.getElementsByClassName('hover-content');
var closeBtn = document.getElementsByClassName('close-btn');

for (var i = 0; i < boxContent.length ; i++) {
    boxContent[i].addEventListener('mouseenter',expandBox);
}

closeBtn[0].addEventListener('click', closeBox);

function expandBox() {
    var currentContent = this.nextElementSibling;
    var current = this.parentNode.parentNode;
    var parentCurrent = current.parentNode;
    var node = parentCurrent.childNodes;
    var currentChild = current.childNodes;

    for (var j = 0; j < currentChild.length ; j++) {
        if (currentChild[j].nodeType === 1) {
            currentChild = currentChild[j];
        }
    }

    for (var k = 0; k < node.length ; k++) {
        if (node[k].nodeType === 1) {
            if (current !== node[k]) {
                TweenMax.to(node[k], 0.3, {
                    delay: 0.2,
                    width: '0',
                    opacity: 0,
                    onComplete: function() {
                        TweenMax.to(current, 0.4, {
                            delay: 0.2,
                            className: '+=fullWidth',
                            onComplete:function() {
                                TweenMax.to(current, 0.2, {
                                    delay: 0.1,
                                    className: '+=fullHeight',
                                    onComplete: function() {
                                        TweenMax.to(currentChild, 0.2, {
                                            delay: 0.2,
                                            className: '+=hideShadow',
                                            onComplete: function() {
                                                TweenMax.to(boxContent, 0.2, {
                                                    autoAlpha: 0,
                                                    display:'hidden',
                                                    onComplete: function() {
                                                        TweenMax.to(parentCurrent, 0.2, {
                                                            delay: 0.2,
                                                            className: '+=totalHeight',
                                                            onComplete: function() {
                                                                TweenMax.to(currentContent, 0.2, {
                                                                    autoAlpha: 1,
                                                                    display: 'block',
                                                                    onComplete: function() {
                                                                        TweenMax.to(closeBtn, 0.2, {
                                                                            delay: 0.2,
                                                                            width: '50px',
                                                                            right: '0',
                                                                            opacity: 1,
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

    // Find openened element
    // Remove content
    // Remove extra classes from kids

    var openenedParentElement = document.getElementsByClassName('totalHeight'),
    openenedChildElementHeight = document.getElementsByClassName('fullHeight'),
    openenedChildElementWidth = document.getElementsByClassName('fullWidth'),
    openedGrandChild = openenedChildElementHeight[0].childNodes;
    var openedGrandGrandChild;

    for (var i = 0; i < openedGrandChild.length ; i++) {
        if (openedGrandChild[i].nodeType === 1 ) {
            openedGrandGrandChild = openedGrandChild[i];
        }
    }

    var hoverContent = document.querySelector('.hover-content'),
        overlayContent = openedGrandGrandChild.querySelector('.overlay-content');

        console.log(hoverContent);


    TweenMax.to(overlayContent, 0.2, {
        autoAlpha: 0,
        display: 'none',
        onComplete: function() {
            TweenMax.to(closeBtn, 0.2, {
                delay: 0.4,
                right: '0',
                opacity: 0,
                width: '0',
                onComplete: function() {
                    TweenMax.to(openenedParentElement[0], 0.2, {
                        delay: 0.2,
                        onComplete: function() {
                            openenedParentElement[0].classList.remove('totalHeight');
                            openenedChildElementHeight[0].classList.remove('fullHeight');
                            openenedChildElementWidth[0].classList.remove('fullWidth');
                            var boxShadow = document.getElementsByClassName('box-content');
                            console.log(boxShadow);

                            for (var k = 0; k < boxShadow.length ; k++) {
                                boxShadow[k].classList.remove('hideShadow');
                            }
                            var displayBoxes = document.getElementsByClassName('box');
                            for (var j = 0; j < displayBoxes.length ; j++) {
                                displayBoxes[j].style.opacity = 1;
                                displayBoxes[j].style.width = '100%';
                            }

                            TweenMax.to(hoverContent, 0.2, {
                                delay: 0.2,
                                autoAlpha: 1,
                                display:'block',
                            })
                        }
                    })
                }
            })
        }
    })
}

// Skills show
// Display from bottom with a height of 5vh the box
// Find child span
// Display it

var skillSelected = document.getElementsByClassName('skill-selected');
var skillList = [];
var skillBox = document.getElementById('skill-box');
var closeSkills = document.getElementById('close-slide');

for (var i = 0; i < skillSelected.length ; i++) {
    skillSelected[i].addEventListener('click', showSkills);
}

closeSkills.addEventListener('click', hideSkills);

function showSkills(e) {
    var skillShow = e.target.querySelector('span').innerHTML;
    TweenMax.to(skillBox, 0.2, {
        delay: 0.3,
        height: '35vh',
        onComplete: function(e) {
            TweenMax.to(closeSkills, 0.2, {
                delay: 0.2,
                width: '30px',
                right: '5px',
                opacity: 1,
                onComplete: function() {
                    skillBox.querySelector('p').innerHTML = skillShow;
                }
            })
        }
    })
}
function hideSkills() {
    TweenMax.to(closeSkills, 0.2, {
        delay: 0.2,
        width: '0',
        right: '0',
        opacity: 0,
        onComplete: function() {
            skillBox.querySelector('p').innerHTML = '';
            TweenMax.to(skillBox, 0.2, {
                delay: 0.3,
                height: '0',
            })
        }
    })
}
