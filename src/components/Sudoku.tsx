import { createEffect, createSignal, type Component } from 'solid-js';
import Grid from './Grid';
import { emptyGrid, parseSudokuString, updateCell } from '@/utils/sudoku';
import { useKeyDownEvent, useKeyDownList } from '@solid-primitives/keyboard';

const Sudoku: Component = () => {
  const providedCells =
    parseSudokuString(
      '98.......7....65...5..7.96...4.8..3......78...7.3....9....5...6...6.938...2..3.7.',
    ) ?? emptyGrid();

  const [cells, setCells] = createSignal(providedCells);
  const [selectedCells, setSelectedCells] = createSignal<number[]>([]);

  const keys = useKeyDownList();
  const keyEvent = useKeyDownEvent();

  createEffect(() => {
    const e = keyEvent();

    if (e) {
      if (e.key == 'Escape') {
        setSelectedCells([]);
        return;
      }

      let number = parseInt(e.key);

      if (e.key == 'Backspace') {
        number = 0;
      }

      if (!isNaN(number)) {
        selectedCells().forEach((index) => {
          if (providedCells[index] === 0) {
            setCells((cells) => updateCell(cells, index, number));
          }
        });
      }
    }
  });

  const onCellClicked = (index: number) => {
    if (keys().includes('CONTROL')) {
      setSelectedCells((prev) =>
        prev.includes(index)
          ? prev.filter((x) => x !== index)
          : [...prev, index],
      );
    } else {
      setSelectedCells((prev) =>
        prev.length === 1 && prev[0] === index ? [] : [index],
      );
    }
  };

  return (
    <Grid
      cells={cells()}
      providedCells={providedCells}
      selectedCells={selectedCells()}
      onCellClicked={onCellClicked}
    />
  );
};

export default Sudoku;
