 function getRandomNumber(min, max) {
    return Math.floor( Math.random() * (max - min) + min);
}





function hasClass(element, class_name) {
    return (' ' + element.className + ' ').indexOf(' ' + class_name+ ' ') > -1;
}

function removeClass(element,remove_class) {

  var re = new RegExp(remove_class,"g");
  element.className = element.className.replace(re, "");

}

function addClass(element,add_class) {

  classes = element.className.split(" ");
  if (classes.indexOf(add_class) == -1) {
    element.className += " " + add_class;
  }

}



function addRemoveClass(element,add_class,remove_class) {
 classes = element.className.split(" ");
  if (classes.indexOf(add_class) == -1) {
    element.className += " " + add_class;
  }

  var re = new RegExp(remove_class,"g");
  element.className = element.className.replace(re, "");
 

}


function toggleClass(element,toggle_class) { 

if (element.classList) {
  element.classList.toggle(toggle_class);
} else {
  // For IE9
  var classes = element.className.split(" ");
  var i = classes.indexOf(toggle_class);

  if (i >= 0)
    classes.splice(i, 1);
  else
    classes.push(toggle_class);
    element.className = classes.join(" ");
}

}





var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("fear-bar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}











