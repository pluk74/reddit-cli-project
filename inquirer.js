var redditGets = require("./reddit")
var request = require('request');
const imageToAscii = require("image-to-ascii");
var wrap = require('word-wrap');
var inquirer = require('inquirer');

main()

function main() {

    inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: 'What do you want to do?',
        choices: mainMenu()
    }).then(function(choice) {
        switch (choice.menu) {
            case "HOMEPAGE":
                
                redditGets.getHomepage(postSelectableList);
                break;
            case "SUBREDDIT":
                console.log(choice.menu);
                break;
            case "SUBREDDITS":
                console.log(choice.menu);
                break;
            case "EXIT":
                return;
        }
    });
}



function mainMenu() {
    var mainMenuChoices = [{
            name: 'Show homepage',
            value: 'HOMEPAGE'
        }, {
            name: 'Show subreddit',
            value: 'SUBREDDIT'
        }, {
            name: 'List subreddits',
            value: 'SUBREDDITS'
        }, {
            name: 'EXIT',
            value: 'EXIT'
        }

    ];
    return mainMenuChoices
}


function postSelectableList(obj) {

  
  var arr = [];
  obj.data.children.forEach(function(element, i) {
      var listPosts = {

        name: element.data.title + " | " + element.data.url + " | " + element.data.author + " | ",
        value: i
      }
      arr.push(listPosts);
      arr.push(new inquirer.Separator());
    }

  );
    console.log(arr);
  inquirer.prompt({
    type: 'list',
    name: 'menu',
    message: 'Choose a post',
    choices: arr
  }).then(function(choicePost) {
      console.log(choicePost);
      console.log("\33c");
      dispImage(obj,choicePost);

  }); 
  
}



function dispImage (obj,choicePost) {
  console.log("function dispImage");
// if (obj.data.children[choicePost.menu].data.thumbnail) //{
      imageToAscii(obj.data.children[choicePost.menu].data.thumbnail, {
        colored: true,
        bg : true,
        fg : true,
        size: {
          height: 30,
          width: 30
        }
      }, (err, converted) => {
        console.log(err || converted);
      });
      
    // console.log(obj.data.children[choicePost.menu].data.subreddit,obj.data.children[choicePost.menu].data.id);
      
  // }
}