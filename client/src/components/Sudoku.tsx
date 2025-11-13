import { useKeyDownEvent, useKeyDownList } from '@solid-primitives/keyboard';
import { type Component, createEffect, createSignal } from 'solid-js';
import { updateCell } from '@/utils/sudoku';
import Grid from './Grid';

export type SudokuProps = {
	providedCells: number[];
};

const Sudoku: Component<SudokuProps> = (props) => {
	const [cells, setCells] = createSignal(props.providedCells);
	const [selectedCells, setSelectedCells] = createSignal<number[]>([]);

	const keys = useKeyDownList();
	const keyEvent = useKeyDownEvent();

	createEffect(() => {
		const e = keyEvent();

		if (e) {
			if (e.key === 'Escape') {
				setSelectedCells([]);
				return;
			}

			let number = parseInt(e.key, 10);

			if (e.key === 'Backspace') {
				number = 0;
			}

			if (!Number.isNaN(number)) {
				selectedCells().forEach((index) => {
					if (props.providedCells[index] === 0) {
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
			providedCells={props.providedCells}
			selectedCells={selectedCells()}
			onCellClicked={onCellClicked}
		/>
	);
};

export default Sudoku;
