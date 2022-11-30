//making a key called YOU to reference the card shown, size and final score at each end 
let blackjackGame = {
    you: {
      scoreSpan: "#your-blackjack-result",
      div: "#your-box",
      boxSize: ".flex-blackjack-row-2 div",
      score: 0,
    },
  //adding same function for dealer
    dealer: {
      scoreSpan: "#dealer-blackjack-result",
      div: "#dealer-box",
      boxSize: ".flex-blackjack-row-2 div",
      score: 0,
    },
  
    //making a array with my card faces
    cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "J", "Q", "A"],
  
    //adding values to the cards
    //the ace card is a vlaue of 1 or 11 depending
    cardsMap: {
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      10: 10,
      K: 10,
      J: 10,
      Q: 10,
      A: [1, 11],
    },
  
    //using to tally the number of wins and losses and starting point
    //used as reference flags 
    wins: 0,
    losses: 0,
    draws: 0,
    isStand: false,
    isTurnsOver: false,
    pressOnce: false,
  };
  
  //create two const with the dealer and YOu variable to acces information 
  const YOU = blackjackGame["you"];
  const DEALER = blackjackGame["dealer"];
  
  //adding sound variables for win/loss 
  const hitSound = new Audio("sounds/swish.m4a");
  const winSound = new Audio("sounds/cash.mp3");
  const loseSound = new Audio("sounds/aww.mp3");
  
  //recommended to add a window width to help screen adjust w3s
  let windowWidth = window.screen.width;
  let windowHeight = window.screen.height;
  let winner;
  
  //Button Event Listeners for hit function 
  document
    .querySelector("#blackjack-hit-button")
    .addEventListener("click", blackjackHit);
  document
  //event listiner for thre stand function 
    .querySelector("#blackjack-stand-button")
    .addEventListener("click", blackjackStand);
  document
    .querySelector("#blackjack-deal-button")   //event listiner for the deal function 
    .addEventListener("click", blackjackDeal);
  document
    .querySelector("#blackjack-reset-button") //listiner for the restart game option 
    .addEventListener("click", blackjackRestart);
  
    //function for the hit peramiter
  function blackjackHit() {
    if (blackjackGame["isStand"] === false) {
      let card = randomCard(); //trigger function and store value 
      showCard(card, YOU);
      updateScore(card, YOU); //adding you parameters to update info on score and points 
      showScore(YOU); //passing back the score and bust function 
    }
  }
  
  //setting the function for random card and value using .floor and .random
  //used *13 to give back a vlaue between 1-11 
  function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame["cards"][randomIndex];
  }
  
  //adding function to add cards if score less then 21 
  //adding the load images factors for W+H and sources 
  function showCard(card, activePlayer) {
    if (activePlayer["score"] <= 21) {
      let cardImage = document.createElement("img");
      cardImage.src = `images/${card}.png`;
      cardImage.style = `width:${widthSize()}; height:${heightSize()};`;
      document.querySelector(activePlayer["div"]).appendChild(cardImage);
      hitSound.play(); //adding sound function to recall
    }
  }
  
  //from the interent the best working form for thr cards to load properly 
  function widthSize() {
    if (windowWidth > 1000) {
      let newWidthSize = window.screen.width * 0.1;
      return newWidthSize;
    } else {
      return window.screen.width * 0.18;
    }
  }
  
  function heightSize() {
    if (windowHeight > 700) {
      let newHeightSize = window.screen.height * 0.18;
      return newHeightSize;
    } else {
      return window.screen.height * 0.15;
    }
  }
  
  //defining the Ace card logic if it becomes eithewr a 1 or 11 
  //first two line define its a 1 if closer to 21
  function updateScore(card, activePlayer) {
    if (card === "A") {
      if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
        activePlayer["score"] += blackjackGame["cardsMap"][card][1];
      } else {
        activePlayer["score"] += blackjackGame["cardsMap"][card][0];
      }
    } else {
      activePlayer["score"] += blackjackGame["cardsMap"][card];
    }
  
    console.log(activePlayer["score"]);  //allows the score to be present in console 
  }
  
  function showScore(activePlayer) {
    //Bust logic if score is over 21
    //adding a color on screen if player bust 
    //.textContent adds text 
    if (activePlayer["score"] > 21) {
      document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";
      document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
    } else {
      document.querySelector(activePlayer["scoreSpan"]).textContent =
        activePlayer["score"];
        //add a else for player not busting 
    }
  }
  
  //function for stand button only if clicked 
  function blackjackStand() {
    if (blackjackGame.pressOnce === false) {
      blackjackGame["isStand"] = true; //adding isStand logit from earlier variable 

      //to simplify functions the dealer will produce the same amount of cards as user 
      //* come back to this later on to try and improve
      let yourImages = document
        .querySelector("#your-box")
        .querySelectorAll("img");

      //dealer hit functios peramiter 
      //collects how many user cards are used to match 
      for (let i = 0; i < yourImages.length; i++) {
        let card = randomCard();
        showCard(card, DEALER);  //pasing dealer parameters as the "active player"
        updateScore(card, DEALER);
        showScore(DEALER);
      }
     //tells pc turn is over upong 
      blackjackGame["isTurnsOver"] = true;
  
      computeWinner();
      showWinner(winner);
    }
  
    blackjackGame.pressOnce = true;
  }
  
  //checking if player score is equal to 21 
  //2nd lines will test if the user score is beating dealer score or if bust 
  function computeWinner() {
    if (YOU["score"] <= 21) {
      if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
        winner = YOU;
      } else if (YOU["score"] < DEALER["score"]) {
        winner = DEALER;
      } else if (YOU["score"] === DEALER["score"]) {
        winner = "Draw";
      }
      //else statments to check if player score is lower then dealer score 
      //also check sif both scores are a draw 
    } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
      winner = DEALER;
    } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
      winner = "None";
    }
  //if statmenst to see if both users bust and no one is winner 
    return winner;
  }
  
  function showWinner(winner) {
    let message, messageColor;
    //add statments if player is winner and give messages with you won or loss
    //remember to add in sounds as well to win or loss 
  
    if (winner === YOU) {
      message = "You Won";
      messageColor = "#00e676";
      document.querySelector("#wins").textContent = blackjackGame["wins"] += 1;
      winSound.play();
    } else if (winner === DEALER) {
      message = "You Lost";
      messageColor = "red";
      document.querySelector("#losses").textContent = blackjackGame[
        "losses"
      ] += 1;
      loseSound.play();
    } else if (winner === "Draw") {
      message = "You Drew";
      messageColor = "yellow";
      document.querySelector("#draws").textContent = blackjackGame["draws"] += 1;
      loseSound.play();
    } else if (winner === "None") {
      message = "You Both Busted!";
      messageColor = "orange";
      loseSound.play();
    }
  
    document.querySelector("#blackjack-result").textContent = message;
    document.querySelector("#blackjack-result").style.color = messageColor;
  }
  
  function blackjackDeal() {
    if (blackjackGame["isTurnsOver"] === true) {
      // Select all the images in both the user and dealer box
      let yourImages = document
        .querySelector("#your-box")
        .querySelectorAll("img");
      let dealerImages = document
        .querySelector("#dealer-box")
        .querySelectorAll("img");
  
      document.querySelector("#blackjack-result").style.color = "white";
  
      //Sets the user and dealers scors to zero
      YOU["score"] = DEALER["score"] = 0;
      document.querySelector("#your-blackjack-result").textContent = 0;
      document.querySelector("#dealer-blackjack-result").textContent = 0;
  
      //Reset color back to white
      document.querySelector("#your-blackjack-result").style.color = "white";
      document.querySelector("#dealer-blackjack-result").style.color = "white";
  
      //Reset to Let's Play
      document.querySelector("#blackjack-result").textContent = "Lets Play";
  
      //Removes the cards in the user's box
      for (let i = 0; i < yourImages.length; i++) {
        yourImages[i].remove();
        dealerImages[i].remove();
      }
  
      blackjackGame["isStand"] = false;
      blackjackGame.pressOnce = false;
      blackjackGame["isTurnsOver"] = false;
    }
  }
  
  function blackjackRestart() {
    blackjackDeal();
    document.querySelector("#wins").textContent = 0;
    document.querySelector("#losses").textContent = 0;
    document.querySelector("#draws").textContent = 0;
  
    blackjackGame.wins = 0;
    blackjackGame.losses = 0;
    blackjackGame.draws = 0;
  }
  