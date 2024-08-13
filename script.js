let moveCount = 0;
const moveCountDisplay = document.getElementById('move-count');
const pieces = document.querySelectorAll('.piece');
const dropzones = document.querySelectorAll('.dropzone');
const restartButton = document.getElementById('restart-button');

// Function to shuffle pieces
function shufflePieces() {
  const shuffledPieces = Array.from(pieces).sort(() => Math.random() - 0.5);
  const piecesContainer = document.getElementById('pieces');
  piecesContainer.innerHTML = '';
  shuffledPieces.forEach(piece => piecesContainer.appendChild(piece));
}

// Reset the game
function resetGame() {
  moveCount = 0;
  moveCountDisplay.textContent = moveCount;
  pieces.forEach(piece => piece.classList.remove('dropped'));
  dropzones.forEach(zone => zone.innerHTML = '');
  shufflePieces();
}

// Drag and drop functionality
pieces.forEach(piece => {
  piece.addEventListener('dragstart', function (e) {
    e.dataTransfer.setData('text/plain', e.target.getAttribute('data-piece'));
  });
});

dropzones.forEach(zone => {
  zone.addEventListener('dragover', function (e) {
    e.preventDefault();
  });

  zone.addEventListener('drop', function (e) {
    e.preventDefault();
    const pieceId = e.dataTransfer.getData('text/plain');
    const pieceElement = document.querySelector(`.piece[data-piece="${pieceId}"]`);
    
    if (this.getAttribute('data-piece') === pieceId && !this.hasChildNodes()) {
      this.appendChild(pieceElement);
      moveCount++;
      moveCountDisplay.textContent = moveCount;
      pieceElement.classList.add('dropped');
    }
  });
});

// Restart button click event
restartButton.addEventListener('click', resetGame);

// Initialize the game
shufflePieces();
