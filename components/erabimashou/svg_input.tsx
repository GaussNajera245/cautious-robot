import {  useState } from 'react';

import SingleDot from './single-dot';

type svg_input_type = {
  length: number;
  callback: (currentRow: string[]) => void;
};

export default function SVG_Input(props: svg_input_type) {
  const { length, callback } = props;
  const [row, setRow] = useState<string[]>([...Array(length)]);

  return (
    <div>
      {row.map((_, index) => (
        <SingleDot
          key={'arry' + index}
          callback={(value: string) => {
            const updateRow = [...row];
            updateRow[index] = value;
            setRow(updateRow);
          }}
        />
      ))}
      <button onClick={() => callback([...row])}>submit</button>
    </div>
  );
}