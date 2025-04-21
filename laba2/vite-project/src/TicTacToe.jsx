import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Grid, 
  Paper, 
  Typography,
  AppBar,
  Toolbar,
  List,
  ListItem
} from '@mui/material';
import { Close, RadioButtonUnchecked } from '@mui/icons-material';

function Square({ value, onSquareClick, isWinning }) {
  return (
    <Button 
      variant="outlined" 
      onClick={onSquareClick}
      sx={{ 
        width: 80, 
        height: 80, 
        minWidth: 0,
        minHeight: 0,
        p: 0,
        color: value === 'X' ? 'error.main' : 'success.main',
        border: '2px solid',
        borderColor: 'primary.main',
        backgroundColor: isWinning ? 'rgba(25, 118, 210, 0.1)' : 'inherit',
        '&:hover': {
          backgroundColor: 'action.hover'
        },
        borderRadius: 0,
        '&:nth-of-type(1)': {
          borderLeft: 'none',
          borderTop: 'none'
        },
        '&:nth-of-type(2)': {
          borderTop: 'none'
        },
        '&:nth-of-type(3)': {
          borderRight: 'none',
          borderTop: 'none'
        },
        '&:nth-of-type(4)': {
          borderLeft: 'none'
        },
        '&:nth-of-type(6)': {
          borderRight: 'none'
        },
        '&:nth-of-type(7)': {
          borderLeft: 'none',
          borderBottom: 'none'
        },
        '&:nth-of-type(8)': {
          borderBottom: 'none'
        },
        '&:nth-of-type(9)': {
          borderRight: 'none',
          borderBottom: 'none'
        }
      }}
    >
      {value === 'X' ? <Close fontSize="large" /> : value === 'O' ? <RadioButtonUnchecked fontSize="large" /> : null}
    </Button>
  );
}

function Board({ xIsNext, squares, onPlay, winningSquares }) {
  function handleClick(i) {
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const { winner, line } = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Победитель: ${winner}`;
  } else if (squares.every(Boolean)) {
    status = 'Ничья!';
  } else {
    status = `Следующий ход: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>{status}</Typography>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 80px)',
        gridTemplateRows: 'repeat(3, 80px)',
        border: '2px solid',
        borderColor: 'primary.main',
        borderRadius: 0
      }}>
        {squares.map((square, i) => (
          <Square 
            key={i}
            value={square} 
            onSquareClick={() => handleClick(i)}
            isWinning={line && line.includes(i)}
          />
        ))}
      </Box>
    </Box>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Перейти к ходу #${move}`;
    } else {
      description = 'Начать заново';
    }
    return (
      <ListItem key={move} sx={{ p: 0 }}>
        <Button 
          variant="text" 
          onClick={() => jumpTo(move)}
          sx={{ 
            textAlign: 'left',
            justifyContent: 'flex-start',
            color: move === currentMove ? 'primary.main' : 'text.primary',
            fontWeight: move === currentMove ? 'bold' : 'normal'
          }}
        >
          {description}
        </Button>
      </ListItem>
    );
  });

  const { winner } = calculateWinner(currentSquares);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Крестики-нолики
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Board 
                xIsNext={xIsNext} 
                squares={currentSquares} 
                onPlay={handlePlay} 
                winningSquares={calculateWinner(currentSquares).line}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                История ходов {winner && '(Игра завершена)'}
              </Typography>
              <List dense sx={{ maxHeight: 300, overflow: 'auto' }}>
                {moves}
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  
  return { winner: null, line: null };
}