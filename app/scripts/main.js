// Detects mousewheel up and down
// On load we need to set values to display diferent sections
var fixedPoint = 0; // Set top value
var fixedHeight = window.innerHeight; // Save window height;
$(window).bind('mousewheel DOMMouseScroll', function(e){

    var wheelCheckDelta = e.originalEvent.wheelDeltaY; //Returns a double representing the vertical scroll amount.
    var wheelCheckDetail = e.originalEvent.detail;
    var currentDiv = $('.section.active');

    if (wheelCheckDelta > 0 || wheelCheckDetail < 0) { // If user scrolls up

        var nextElement = currentDiv.prev();
        if (nextElement.length !== 0) {
            // Remove active class from current section div to hide content
            currentDiv.removeClass('active');
            // Add class active to the div class section prev to display content
            nextElement.addClass('active');
        }
    }
    else { // If user scrolls down
        if (wheelCheckDelta < -2) {

            var nextElement = currentDiv.next()
            // Check if current div is the last one, in that case do nothing
            if (nextElement.length !== 0) {
                // Remove active class from current section div to hide content
                currentDiv.removeClass('active');
                // Add class active to the div class section after to display content
                nextElement.addClass('active');
            }
        }
    }

});
