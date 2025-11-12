export function parseSudokuString(sudoku: string): number[] | null {
  const cells = sudoku
    .trim()
    .replaceAll('.', '0')
    .split('')
    .map((n) => parseInt(n));

  if (cells.length !== 81 || cells.some(isNaN)) {
    return null;
  }

  return cells;
}

export const emptyGrid = () => Array.from({ length: 81 }, () => 0);

export const updateCell = (
  cells: number[],
  index: number,
  number: number,
): number[] => [...cells.slice(0, index), number, ...cells.slice(index + 1)];
