/*
 * Create a list that holds all of your cards
 */

 //The Start  button
 const reset = document.querySelector(".end-button");
 const play = document.querySelector(".start-button");
 play.addEventListener("click",function(){
   //creating the array and the interactions
   let array = document.querySelectorAll(".deck .card");
   array = Array.from(array)
   array= shuffle(array);
   console.log(array);
   const talk = document.querySelector("h1");
   const rightImg = document.querySelector(".img-right");
   const leftImg = document.querySelector(".img-left");
   const btn = document.querySelector("button");

   let wrong = 0;
   let num = 0 ;
   let set = 0 ;
   btn.style.display="none";
   reset.style.display="block";




   // change pic and the msg on starting the game and remove the button
   rightImg.setAttribute("src","img/ingame.png");
   leftImg.setAttribute("src","img/ingamey.png");
   talk.textContent = "Thanks For Helping Us Finding Our Friends <3";

   //change the orders of the cards so it shuffles then show them and hide them to start the game!!!

   array.forEach(function(add){
     set++
     add.style.order=set;
     add.classList.add("open","show");
   });
   setTimeout(function wait(){
     array.forEach(function(remove){
       remove.classList.remove("open","show");
     });
   },2000);
   setTimeout(function wait(){
     clicking(array,wrong,num);
   },2000);



 });

 //reset the game!
  reset.addEventListener("click",function(){
    location.reload();
  });



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//const arr = document.querySelectorAll(".deck .card");
//console.log("this is first" + arr);
//wow = shuffle(arr);
//console.log("this is sencond" + wow);

// The Clicking to play Function

 function clicking(array,wrong,num){

   //The Timer
   let hours = 0
   let min = 0
   let sec = 0

   const stop = setInterval(function(){ myTimer() }, 1000);

   function myTimer() {
    sec++
    if (sec > 60 ){
      sec = 0
      min++
      if ( min > 60){
        min = 0
        hours++
      }
    }
    let t = hours + ":" + min + ":" + sec
    document.getElementById("demo").innerHTML = t;
    }
    function myStopFunction() {
        clearInterval(stop);
    }

   //Calling the Variables

  const check = [];
  const right = [];
  const talk = document.querySelector("h1");
  const rightImg = document.querySelector(".img-right");
  const leftImg = document.querySelector(".img-left");
  const winImg = document.querySelector(".img-win");
  const stars = document.querySelectorAll(".stars li");
  const moves = document.querySelector(".moves");
  const move = document.querySelector(".move");
  const care = document.querySelector(".care");




  array.forEach(function(item){
    // adding Event Listener to Each Element in the Array
    item.addEventListener("click",function(){
      if(!check.includes(item) && !right.includes(item)){
        num++
        if (num == 1){
          move.textContent = num + " Move"
        }
        else{
          move.textContent = num + " Moves"
        }

      }
      //Number Of Moves


      // check if this item is not in the check array
      if (!check.includes(item) && !right.includes(item)){
        // adding the Element to the check array with open and show classes
        check.push(item);
        item.classList.add("open","show");
      }
      // check if check array has 2 elements
      if (check.length == 2){
        //check if thoes 2 items are not in the right array
        if (!right.includes(check[0]) || right.includes(check[1]) ){
          // check if thoes 2 elemets are equal then add them with class match
          if(check[0].innerHTML === check[1].innerHTML){

            right.push(check[0],check[1]);
            right.forEach(function(rightitem){
              rightitem.classList.add("match");
            });
            // removing them from the check array and remove the classes
            check.forEach(function(wrongitem){
              wrongitem.classList.remove("open","show");
            });
            check.splice(0,2);
            // On Winning The Game!!!!
            if(right.length == 16){
              right.forEach(function(won){
                won.style.display="none";
              });
              rightImg.style.display="none";
              leftImg.style.display="none";
              winImg.style.display="flex";
              talk.textContent = "YAAAAAAAAY You Found Them!!!!";
               myStopFunction() ;

            }
          }
          else{
            // wait a little then remove thier class and from check array in case wrong
            setTimeout(function wait(){
              check.forEach(function(wrongitem){
                wrongitem.classList.remove("open","show");
              });
              check.splice(0,2);
            },500);

            //Changes On Making Mistakes!!
            wrong++;
            console.log(wrong);
            switch (wrong){

              case 2 :
              talk.textContent = "be Careful! If You Make Many Mistakes You will hurt Them!";
              stars[0].remove();
              moves.textContent = 2;
              rightImg.setAttribute("src","img/1star.png");
              leftImg.setAttribute("src","img/1stary.png");
              break;

              case 4 :
              talk.textContent = "You Are still Making Many Mistakes!";
              stars[1].remove();
              moves.textContent = 1;
              rightImg.setAttribute("src","img/2star.png");
              leftImg.setAttribute("src","img/2stary.png");
              care.textContent = "Star";
              break;

              case 6 :
              talk.textContent = "Nooooooooooooooooooooooo That is Too Much!";
              stars[2].remove();
              moves.textContent = 0;
              rightImg.setAttribute("src","img/3star.png");
              leftImg.setAttribute("src","img/3stary.png");
              care.textContent = "Stars";
              break;
            }

          }

        }

      }

    });

  });


 }



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
