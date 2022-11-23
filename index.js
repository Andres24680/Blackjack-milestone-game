
// "you" gives acces to the score, the box will be for card img and box size 
let blackjackGame = {
    you :
    {
        "scoreSpan" : "#your-blackjack-results",
        "div" : "#your-box",
        "boxSize" : ".flex-blackjack-row-2 div",
        "score" : 0
    },


//same as above for dealer 
 dealer:
 {
    "scoreSpan" : "#dealer-blackjack-results" ,
    "div" : "#dealer-box" ,
    "boxSize" :  ".flex-blackjack-row-2 div", 
    "score" : 0
 },

 //creating a array for the cards 
  'cards': ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "J", "Q", "A"], 

  //creating the value corisponding to the value for cards
  //Ace has a value of 11 or 1
  cardsMap : {"2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9, "10":10, "K":10, "J":10, "Q":10, "A":[1,11]}, 

  wins: 0,
  losses: 0,
  draws: 0,
  //checks if user pressed stand 
  isStand: false,
  //test for when dealer passes cards
  isTurnsOver : false,
  //prevents to press deal when Dealer is playing 
  pressOnce: false
};

//creating variable to access info above 
const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

//sound variables 
const hitSound = new Audio("sounds/swish.m4a");
const winSound = new Audio("sounds/cash.mp3");
const loseSound = new Audio("sounds/aww.mp3");

//recommended to add a window width to help screen adjust w3s
let windowWidth = window.screen.width;
let windowHeight = window.screen.height;
let winner;

//adding event listiner for HIT function 
document.querySelector("#blackjack-hit-button").addEventListener("click", blackjackHit);

//creating a function for blackjack hit
function blackjackHit(){
    //going to check if user hits stand by using a if else statments
    if(blackjackGame['isStand'] === false)
}