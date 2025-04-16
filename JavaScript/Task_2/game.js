const gameBoard = document.getElementById('game-board');
        const winMessage = document.getElementById('win-message');
        let cards = [];
        let flippedCards = [];
        let matchedPairs = 0;
        const totalPairs = 8;

        // Creating the card data (A-H, each twice)
        const cardLetters = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];

        // Shuffle array function
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        // Initializing the game
        function createBoard() {
            // Shuffle cards
            const shuffledLetters = shuffle([...cardLetters]);
            
            // Creating the card elements
            shuffledLetters.forEach((letter, index) => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.dataset.letter = letter;
                card.dataset.id = index;

                const cardInner = document.createElement('div');
                cardInner.classList.add('card-inner');

                const cardFront = document.createElement('div');
                cardFront.classList.add('card-front');
                cardFront.textContent = '?';

                const cardBack = document.createElement('div');
                cardBack.classList.add('card-back');
                cardBack.textContent = letter;

                cardInner.appendChild(cardFront);
                cardInner.appendChild(cardBack);
                card.appendChild(cardInner);
                gameBoard.appendChild(card);

                card.addEventListener('click', () => flipCard(card));
                cards.push(card);
            });
        }

        // Fliping the card logic
        function flipCard(card) {
            // Prevent flipping if:
            // - Card is already flipped
            // - Card is matched
            // - Two cards are already flipped
            if (flippedCards.length >= 2 || card.classList.contains('flipped') || card.classList.contains('matched')) {
                return;
            }

            card.classList.add('flipped');
            flippedCards.push(card);

            // Check for match when two cards are flipped
            if (flippedCards.length === 2) {
                checkMatch();
            }
        }

        // Checking if two flipped cards match
        function checkMatch() {
            const [card1, card2] = flippedCards;
            const letter1 = card1.dataset.letter;
            const letter2 = card2.dataset.letter;

            if (letter1 === letter2) {
                // Match found
                card1.classList.add('matched');
                card2.classList.add('matched');
                matchedPairs++;
                flippedCards = [];

                // Checking for a win
                if (matchedPairs === totalPairs) {
                    setTimeout(() => {
                        winMessage.style.display = 'block';
                    }, 500);
                }
            } else {
                // If No match, flip back card after 1 second
                gameBoard.style.pointerEvents = 'none'; // This disable the clicks
                setTimeout(() => {
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                    flippedCards = [];
                    gameBoard.style.pointerEvents = 'auto'; // This re-enable the clicks
                }, 1000);
            }
        }

        // Start the game
        createBoard();