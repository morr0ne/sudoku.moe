import { createMemo, Index, type Component } from 'solid-js';

export interface GridProps {
  cells: number[];
  providedCells: number[];
  selectedCells: number[];
  onCellClicked: (index: number) => void;
}

const Grid: Component<GridProps> = (props) => {
  const rows = createMemo(() =>
    Array.from({ length: 9 }, (_, i) => props.cells.slice(i * 9, i * 9 + 9)),
  );

  const isCellProvided = (index: number) => props.providedCells[index] !== 0;
  const isCellSelected = (index: number) => props.selectedCells.includes(index);

  return (
    <table class="border-collapse border-4 border-black text-6xl">
      <tbody>
        <Index each={rows()}>
          {(row, rowIndex) => (
            <tr>
              <Index each={row()}>
                {(cell, colIndex) => {
                  const cellIndex = rowIndex * 9 + colIndex;

                  return (
                    <td
                      classList={{
                        'text-center border size-20 hover:cursor-pointer': true,
                        'border-b-4': (rowIndex + 1) % 3 === 0,
                        'border-r-4': (colIndex + 1) % 3 === 0,
                        'bg-gray-300': isCellProvided(cellIndex),
                        'outline outline-5 outline-blue-400 -outline-offset-5':
                          isCellSelected(cellIndex),
                      }}
                      onClick={() => props.onCellClicked(cellIndex)}
                    >
                      {cell() === 0 ? '' : cell()}
                    </td>
                  );
                }}
              </Index>
            </tr>
          )}
        </Index>
      </tbody>
    </table>
  );
};

export default Grid;
