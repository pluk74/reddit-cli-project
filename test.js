var redditFunctions = require("./reddit")
var request = require('request');
const imageToAscii = require("image-to-ascii");
var wrap = require('word-wrap');
var inquirer = require('inquirer');



redditFunctions.getComments("AskReddit","4g07id",function(result) {
    //console.log(result);
    var arr = [];
    result[1].data.children.forEach(function(element) {
        console.log(element.data.body);
        console.log(isEmpty(element.data.replies));
        // if(isEmpty(element.replies)) {
        //     console.log("no, there are no replies");
        // }
        // else {
            
        //     console.log("yes, there are replices");
        // }
    });
})


function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}
// function isEmpty(obj) {
//     for(var prop in obj) {
//         if(obj.hasOwnProperty(prop))
//             return false;
//     }

//     return true && JSON.stringify(obj) === JSON.stringify({});
// }