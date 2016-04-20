var request = require('request');

/*
This function should "return" the default homepage posts as an array of objects
*/
function getHomepage(callback) {
  // Load reddit.com/.json and call back with the array of posts
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
    callback(JSON.parse(result.body));
  });

}

// Export the API
module.exports = {
  // ...
  getHomepage: getHomepage,
  getSortedHomepage: getSortedHomepage,
  getSubreddit: getSubreddit,
  getSortedSubreddit: getSortedSubreddit,
  getSubreddits: getSubreddits

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

var inquirer = require('inquirer');

function main() {
  function mainMenu() {
    var menuChoices = [{
      name: 'Show homepage',
      value: 'HOMEPAGE'
    }, {
      name: 'Show subreddit',
      value: 'SUBREDDIT'
    }, {
      name: 'List subreddits',
      value: 'SUBREDDITS'
    }];
    return menuChoices
  }

  inquirer.prompt({
    type: 'list',
    name: 'menu',
    message: 'What do you want to do?',
    choices: mainMenu()
  }).then(function(choice) {
    switch (choice.menu) {
      case "HOMEPAGE":
        getHomepage(viewObject);
        main();
        //break;
      case "SUBREDDIT":
        // code block
        break;
      case "SUBREDDITS":
        getSubreddits(displaySubredditList);

      default:
        // default code block
    }
  })

// function callbackTester (callback) { 
//     callback(); 
// } 
}




main();

// function tryMe (param1, param2) { 
//     alert (param1 + " and " + param2); 
// } 
function displaySubredditList(obj) {
  //console.log(obj.data.children[1].data.display_name);
  //var arr = [];
  
  obj.data.children.forEach(function(element) {
  console.log(element.data.display_name);
});
}


function viewObject(obj) {
  
}


// function viewObject(obj) {
//   displayData(obj);
// }


// function displayData(value) {
//   console.log(require('util').inspect(value, {
//     depth: 20,
//     colors: true
//   }));
// }