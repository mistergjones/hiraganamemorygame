document.addEventListener("DOMContentLoaded", () => {
    // establish all the cards we want to show
    const cardArray = [
        {
            name: "a",
            img: "images/a.png",
        },

        {
            name: "a",
            img: "images/a.png",
        },

        {
            name: "ka",
            img: "images/ka.png",
        },

        {
            name: "ka",
            img: "images/ka.png",
        },
        {
            name: "ki",
            img: "images/ki.png",
        },

        {
            name: "ki",
            img: "images/ki.png",
        },

        {
            name: "na",
            img: "images/na.png",
        },

        {
            name: "na",
            img: "images/na.png",
        },

        {
            name: "sa",
            img: "images/sa.png",
        },
        {
            name: "sa",
            img: "images/sa.png",
        },
        {
            name: "se",
            img: "images/se.png",
        },
        {
            name: "se",
            img: "images/se.png",
        },
        {
            name: "shi",
            img: "images/shi.png",
        },
        {
            name: "shi",
            img: "images/shi.png",
        },
        {
            name: "so",
            img: "images/so.png",
        },
        {
            name: "so",
            img: "images/so.png",
        },
        {
            name: "to",
            img: "images/to.png",
        },
        {
            name: "to",
            img: "images/to.png",
        },
        {
            name: "ko",
            img: "images/ko.png",
        },
        {
            name: "ko",
            img: "images/ko.png",
        },
        // {
        //     name: "australia",
        //     img: "images/australia.png",
        // },
        // {
        //     name: "australia",
        //     img: "images/australia.png",
        // },
    ];

    // randomise the card array
    cardArray.sort(() => 0.5 - Math.random());

    // selct and assign the .grid element ready for use
    const grid = document.querySelector(".grid");
    // select and assign the result id for the score. Set to zero straight away
    const resultDisplay = document.querySelector("#result");
    const japaneseDisplay = document.querySelector("#japaneseResult");
    const japaneseMessage = document.querySelector("#japaneseMessage");
    resultDisplay.textContent = "0";

    //select and assign the game reset button
    const gameReset = (document.querySelector("button").onclick = function (
        event
    ) {
        location.reload();
    });

    // select and assign the element to show the user in game messages
    let gameMessage = document.querySelector("#gameMessage");

    // establish an array for cards chosen
    let cardsChosen = [];
    var cardsChosenId = [];
    var cardsWon = [];

    //create the board
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            // create an instace of an eleemt for the specified tag
            var card = document.createElement("img");
            // set the card attribute "src" to the string
            card.setAttribute("src", "./images/japan.png");
            //set the card's attribute 'data-id' to the incremented number (0-11)
            card.setAttribute("data-id", i);
            // add an event listener so when we click on a card, it triggers flipcard
            card.addEventListener("click", flipcard);
            // now add the cards to 'grid' section in the html so it will draw them on the screen
            grid.appendChild(card);
        }
    }

    //flip card
    function flipcard() {
        var cardId = this.getAttribute("data-id");
        // push the card chosen into the array. Store its name
        cardsChosen.push(cardArray[cardId].name);
        // push the id into the array also
        cardsChosenId.push(cardId);

        // now add an image to that card that was flipped
        this.setAttribute("src", cardArray[cardId].img);

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 300);
        }
        // make the game message blank again
        gameMessage.textContent = "";
        japaneseMessage.textContent = "";
    }

    // check for matches
    function checkForMatch() {
        // pick up all the images
        var cards = document.querySelectorAll("img");

        // give me the acutal number of the card chosen for each card. i.e. 3, 9...14,17
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        // if both the same number, user has cliced twice on same card.
        if (optionOneId == optionTwoId) {
            cards[optionOneId].setAttribute("src", "images/japan.png");
            cards[optionTwoId].setAttribute("src", "images/japan.png");
            gameMessage.textContent =
                "You have clicked the same image! Please try again";
            // update japanese message to state same image
            japaneseMessage.innerHTML =
                "&#12362;&#12394;&#12376; &#12364;   &#12382;&#12358;. &#12463;&#12522;&#12483;&#12463;&#12375;&#12390;&#12367;&#12384;&#12373; &#12356;";
        }

        // if the name of the first card is the same as the secone card...we have a match, assign both images the blank image.
        else if (cardsChosen[0] === cardsChosen[1]) {
            gameMessage.textContent = "We have a match";
            cards[optionOneId].setAttribute("src", "./images/blank.png");
            cards[optionTwoId].setAttribute("src", "./images/blank.png");
            // remove the event click listener so they cannot click on element that have been won
            // cards[optionOneId].removeEventListener("click", flipCard);
            // cards[optionTwoId].removeEventListener("click", flipCard);
            // store the two matched cards in an array
            cardsWon.push(cardsChosen);
        } else {
            // ELSE THERE IS NO MATCH
            // flip the cards back over
            cards[optionOneId].setAttribute("src", "./images/japan.png");
            cards[optionTwoId].setAttribute("src", "./images/japan.png");
            gameMessage.textContent = "No match. Please try again";
            japaneseMessage.textContent =
                "歯が立たない。もう一度クリックしてください";
        }
        // clear the arrays
        cardsChosen = [];
        cardsChosenId = [];

        // update score each time a match. i.e. 1 point
        // english
        resultDisplay.textContent = cardsWon.length;
        // japanese results
        switch (cardsWon.length) {
            case 1:
                japaneseDisplay.innerHTML = "&#x4e00";

                break;
            case 2:
                japaneseDisplay.innerHTML = "&#x4e8c";
                break;
            case 3:
                japaneseDisplay.innerHTML = "&#x4e09";
                break;
            case 4:
                japaneseDisplay.innerHTML = "&#x56db";
                break;
            case 5:
                japaneseDisplay.innerHTML = "&#x4e94";
                break;
            case 6:
                japaneseDisplay.innerHTML = "&#x516d";
                break;
            case 7:
                japaneseDisplay.innerHTML = "&#x4e03";
                break;
            case 8:
                japaneseDisplay.innerHTML = "&#x516b";
                break;
            case 9:
                japaneseDisplay.innerHTML = "&#x4e5d";
                break;
            case 10:
                japaneseDisplay.innerHTML = "&#x5341";
                break;
        }

        // now check to see if we have found all matches
        if (cardsWon.length === cardArray.length / 2) {
            gameMessage.textContent = "Congratulations. You found them all";
            // update japanese message to congratulations
            japaneseMessage.innerHTML =
                "&#12362;&#12417;&#12391;&#12392;&#12358;";
        }
    }

    createBoard();
});
