var request = require('request');
const imageToAscii = require("image-to-ascii");
var wrap = require('word-wrap');

/*
This function should "return" the default homepage posts as an array of objects
*/
function getHomepage(callback) {
  // Load reddit.com/.json and call back with the array of posts
  //console.log("getHomepage called");
  request("https://www.reddit.com/.json", function(err, result) {
    callback(JSON.parse(result.body));
  });
}

/*
This function should "return" the default homepage posts as an array of objects.
In contrast to the `getHomepage` function, this one accepts a `sortingMethod` parameter.
*/
function getSortedHomepage(sortingMethod, callback) {
  // Load reddit.com/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods

  request("https://www.reddit.com/" + sortingMethod + ".json", function(err, result) {
    callback(JSON.parse(result.body));
  });
}


/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
*/
function getSubreddit(subreddit, callback) {
  // Load reddit.com/r/{subreddit}.json and call back with the array of posts
  request("https://www.reddit.com/r/" + subreddit + ".json", function(err, result) {
    callback(JSON.parse(result.body));
  });
}

/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
In contrast to the `getSubreddit` function, this one accepts a `sortingMethod` parameter.
*/
function getSortedSubreddit(subreddit, sortingMethod, callback) {
  // Load reddit.com/r/{subreddit}/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods
  request("https://www.reddit.com/r/" + subreddit + "/" + sortingMethod + ".json", function(err, result) {
    callback(JSON.parse(result.body));
  });

}

/*
This function should "return" all the popular subreddits
*/
function getSubreddits(callback) {
  // Load reddit.com/subreddits.json and call back with an array of subreddits
  //https://www.reddit.com/subreddits.json
  request("https://www.reddit.com/subreddits.json", function(err, result) {
    //console.log(JSON.parse(result.body))
    callback(JSON.parse(result.body));
  });

}

function dispPostDetails(obj, choicePost) {
  var post = obj.data.children[choicePost.menu].data;
  console.log("Title: " + post.title);
  console.log("URL: " + post.url);
  console.log("Author: " + post.author);
  console.log("Subreddit: " + post.subreddit);
  console.log(post.selftext);
  getComments(post.subreddit, post.id, (function(result) {
    console.log(result);
  }))

}

function dispImage(obj, choicePost, callback) {
  //console.log("function dispImage");
  if (obj.data.children[choicePost.menu].data.thumbnail) {
    imageToAscii(obj.data.children[choicePost.menu].data.thumbnail, {
      pxwidth: 1,
      colored: true,
      bg: true,
      fg: true,
      size: {
        height: 30,
        width: 30
      }
    }, (err, converted) => {
      callback(err || converted);
    });

    // console.log(obj.data.children[choicePost.menu].data.subreddit,obj.data.children[choicePost.menu].data.id);

  }
}


function displaySubredditList(obj, callback) {
  //console.log(obj.data.children[1].data.display_name);
  //var arr = [];

  obj.data.children.forEach(function(element) {
    callback(element.data.display_name);
  });
}


function subredditMenuChoices(obj) {
  var arr = [];
  arr.push({
    name: "MAIN",
    value: "MAIN"
  });
  obj.data.children.forEach(function(element) {

    var listobj = {
      name: (element.data.display_name),
      value: (element.data.display_name)
    };
    arr.push(listobj);
    //arr.push(new inquirer.Separator());
  });

  return (arr);

}


function getComments(subreddit, id, callback) {

  var commentsURL = "https://www.reddit.com/r/" + subreddit + "/comments/" + id + ".json";

  request(commentsURL, function(err, result) {
    callback(JSON.parse(result.body));
  });
  
  //callback(commentsURL);
}

function displayComments (obj) {
  console.log(obj.data.children[1].data.children[0].data.kind);
}



// Export the API
module.exports = {
  // ...
  getHomepage: getHomepage,
  getSortedHomepage: getSortedHomepage,
  getSubreddit: getSubreddit,
  getSortedSubreddit: getSortedSubreddit,
  getSubreddits: getSubreddits,
  dispImage: dispImage,
  dispPostDetails: dispPostDetails,
  displaySubredditList: displaySubredditList,
  subredditMenuChoices: subredditMenuChoices,
  getComments: getComments
    //mainMenuOptions : mainMenuOptions

};


//testing functions:
/*
getSubreddits(function(obj){
    betterLog(obj);
});

function betterLog(value) {
  console.log(require('util').inspect(value, {depth: 20, colors: true}));
}

*/

// var inquirer = require('inquirer');

// function main() {


//   function mainMenu() {
//     var menuChoices = [{
//         name: 'Show homepage',
//         value: 'HOMEPAGE'
//       }, {
//         name: 'Show subreddit',
//         value: 'SUBREDDIT'
//       }, {
//         name: 'List subreddits',
//         value: 'SUBREDDITS'
//       }, {
//         name: 'EXIT',
//         value: 'EXIT'
//       }

//     ];
//     return menuChoices
//   }

//   inquirer.prompt({
//     type: 'list',
//     name: 'menu',
//     message: 'What do you want to do?',
//     choices: mainMenu()
//   }).then(function(choice) {
//     switch (choice.menu) {
//       case "HOMEPAGE":
//         getHomepage(function(result) {
//           //dispImage(result);
//           postList(result);
//           //main();
//           });
//         //main();
//         break;
//       case "SUBREDDIT":
//         getSubreddits(function(res) {
//           inquirer.prompt({
//             type: 'list',
//             name: 'menu',
//             message: "Choose a subreddit",
//             choices: subredditMenu(res)
//           }).then(function(choiceSub) {
//             //console.log(choice.menu);
//             if (choice.menu !== "MAIN") {
//               getSubreddit(choiceSub.menu, postList);
//             }

//             //main();
//           })
//         });

//         break;


//       case "SUBREDDITS":
//         getSubreddits(displaySubredditList);
//         main();
//       case "EXIT":
//         return;
//       default:
//         // default code block
//     }
//   })



//   function subredditMenu(obj) {
//     var arr = [];
//     arr.push({
//       name: "MAIN",
//       value: "MAIN"
//     });
//     obj.data.children.forEach(function(element) {

//       var listobj = {
//         name: (element.data.display_name),
//         value: (element.data.display_name)
//       };
//       arr.push(listobj);
//       //arr.push(new inquirer.Separator());
//     });

//     return (arr);

//   }

//   // function callbackTester (callback) { 
//   //     callback(); 
//   // } 
// }

// main();




// function displaySubredditList(obj) {
//   //console.log(obj.data.children[1].data.display_name);
//   //var arr = [];

//   obj.data.children.forEach(function(element) {
//     console.log(element.data.display_name);
//   });
// }

// function postList(obj) {


//   var arr = [];
//   obj.data.children.forEach(function(element, i) {
//       var listPosts = {

//         name: element.data.title + " | " + element.data.url + " | " + element.data.author + " | ",
//         value: i
//       }
//       arr.push(listPosts);
//       arr.push(new inquirer.Separator());
//     }

//   );

//   inquirer.prompt({
//     type: 'list',
//     name: 'menu',
//     message: 'Choose a post',
//     choices: arr
//   }).then(function(choicePost) {
//       dispImage(choicePost);
//       //dispDetails(choicePost);
//       //main();

//   }); 
//   //return arr;
// }



// function comments (subreddit, id) {

//   var commentsURL;
//   commentsURL = "https://www.reddit.com/r/"+subreddit+"/comments/"+id+".json";
//   return commentsURL;
// }

// function viewObject(obj) {


//   obj.data.children.forEach(function(element) {

//     console.log("Title: " + element.data.title);
//     console.log("URL: " + element.data.url)
//     console.log("Username: " + element.data.author);
//     console.log("subreddit: " + element.data.subreddit);

//   });
// }
// function dispDetails (choicePost) {

//   console.log("\33c");
//     //console.log("post choice: " + choice.menu);

//     console.log("Time!");
//     console.log(choicePost.data.children[choicePost.menu].data.title);
//     console.log("Title: " + choicePost.data.children[choicePost.menu].data.title);
//     console.log("URL: " + choicePost.data.children[choicePost.menu].data.url)
//     console.log("Username: " + choicePost.data.children[choicePost.menu].data.author);
//     console.log("subreddit: " + choicePost.data.children[choicePost.menu].data.subreddit);




// }

// function dispImage (choicePost) {
//   console.log("function dispImage");
// // if (choicePost.data.children[choicePost.menu].data.thumbnail) //{
//       imageToAscii(choicePost.data.children[choicePost.menu].data.thumbnail, {
//         colored: true,
//         bg : true,
//         fg : true,
//         size: {
//           height: 30,
//           width: 30
//         }
//       }, (err, converted) => {
//         console.log(err || converted);
//       });

//     // console.log(obj.data.children[choicePost.menu].data.subreddit,obj.data.children[choicePost.menu].data.id);

//   // }
// }
