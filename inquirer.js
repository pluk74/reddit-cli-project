var redditFunctions = require("./reddit")
var request = require('request');
const imageToAscii = require("image-to-ascii");
var wrap = require('word-wrap');
var inquirer = require('inquirer');
//var arrOfSubreddits = [];
//main()

function main() {

    inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: 'What do you want to do?',
        choices: mainMenuOptions()
    }).then(function(choice) {
        switch (choice.menu) {
            case "HOMEPAGE":

                redditFunctions.getHomepage(printSelectableListOfPosts);
                break;
            case "SUBREDDIT":
                //console.log(choice.menu);
                subredditMenu();
                break;
            case "SUBREDDITS":
                redditFunctions.getSubreddits(function(obj) {
                    obj.data.children.forEach(function(element) {
                        console.log(element.data.display_name);
                    });
                    main();
                });
                break;
            case "EXIT":
                return;
        }
    });
}


function mainMenuOptions() {
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
    return mainMenuChoices;
}



function printSelectableListOfPosts(obj) {

    var arr = [];
    obj.data.children.forEach(function(element, i) {
            var listPosts = {

                name: element.data.title + " | " + element.data.url + " | " + element.data.author + " | ",
                value: i
            };
            arr.push(listPosts);
            arr.push(new inquirer.Separator());
        }

    );

    inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: 'Choose a post',
        choices: arr
    }).then(function(choicePost) {
        console.log("\33c");

        redditFunctions.dispImage(obj, choicePost, function(image) {
            console.log(image);
            redditFunctions.dispPostDetails(obj, choicePost);
            main();
        });


    });

}


function subredditMenu() {

    redditFunctions.getSubreddits(function(res) {
        inquirer.prompt({
            type: 'list',
            name: 'menu',
            message: "Choose a subreddit",
            choices: redditFunctions.subredditMenuChoices(res)
        }).then(function(choiceSub) {
            console.log(choiceSub.menu);
            if (choiceSub.menu !== "MAIN") {
              redditFunctions.getSubreddit(choiceSub.menu, printSelectableListOfPosts);
            }

            main();
        });
    });
}


redditFunctions.getComments("AskReddit","4g07id",function(result) {
    //console.log(result);
    //var arr = [];
    result[1].data.children.forEach(function(element) {
        console.log(element.data.body);
        console.log(isEmpty(element.data.replies));
         if(isEmpty(element.data.replies)) {
            console.log("yes, there are replices");
         }
         else {
            console.log("no, there are no replies");
             
         }
    });
});

function createCommentThreads (obj) {
    
}

//function to check if there are replies in a comment thread
function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return false;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return true;
    if (obj.length === 0)  return false;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return true;
    }

    return false;
}