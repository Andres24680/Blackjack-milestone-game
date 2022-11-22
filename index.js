
// "you" gives acces to the score, the box will be for card img and box size 
let blackjackGame = {
    'you' :
    {
        'scoreSpan' : '#your-blackjack-results',
        'div' : '#your-box',
        'boxSize' : '.flex-blackjack-row-2 div',
        'score' : 0
    },


//same as above for dealer 
 'dealer':
 {
    'scoreSpan' : '#dealer-blackjack-results' ,
    'div' : '#dealer-box' ,
    'boxSize' :  '.flex-blackjack-row-2 div', 
    'score' : 0
 },

 //creating a array for the cards 
  'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'], 

  //creating the value corisponding to the value for cards
  //Ace has a value of 11 or 1
  'cardsMap' : ['2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10':10, 'K':10, 'J': 10, 'Q': 10, 'A': [1,11]], 

}
