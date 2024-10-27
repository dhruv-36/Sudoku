var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
    fetch('https://cors-anywhere.herokuapp.com/https://sugoku.onrender.com/board?difficulty=easy')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            board = data.board;
            FillBoard(board);
        })
        .catch(error => console.error('Error:', error));
};

SolvePuzzle.onclick = () => {
	sudukoSolver(board, 0, 0, 9);
};

function isSafe(board, row, col, val, n) {
    // Check the row
    for (let i = 0; i < n; i++) {
        if (board[row][i] == val || board[i][col] == val) {
            return false;
        }
    }

    // Check the 3x3 sub-grid
    let rn = Math.sqrt(n);
    let si = row - (row % rn);
    let sj = col - (col % rn);
    for (let x = si; x < si + rn; x++) {
        for (let y = sj; y < sj + rn; y++) {
            if (board[x][y] == val) {
                return false;
            }
        }
    }

    return true;
}


function sudukoSolver(board, row, col, n) {
    // Base case: If we reach the end of the board
    if (row == n) {
        FillBoard(board);  // Fill the solved board into the UI
        return true;
    }

    // If we reach the end of the current row, move to the next row
    if (col == n) {
        return sudukoSolver(board, row + 1, 0, n);
    }

    // If the cell is already filled, move to the next cell in the row
    if (board[row][col] != 0) {
        return sudukoSolver(board, row, col + 1, n);
    }

    // Try filling the current cell with numbers 1-9
    for (let val = 1; val <= 9; val++) {
        if (isSafe(board, row, col, val, n)) {
            board[row][col] = val;  // Assign the value

            // Recursively try to solve for the next cell
            if (sudukoSolver(board, row, col + 1, n)) {
                return true;
            }

            // Backtrack if placing val does not lead to a solution
            board[row][col] = 0;
        }
    }

    // If no number is valid for this cell, return false to trigger backtracking
    return false;
}

  
  
  
