import { useEffect, useState } from 'react';

type single_dot_type = {
  staticValues?: string[];
  callback?: (returnValue:string) => void;
};

export default function SingleDot(props: single_dot_type) {
  const { callback, staticValues } = props;
  const [active, setActive] = useState<number>(0);
  const defaultBkg = {
    fill: '#2b2a33',
    stroke: '#838390',
  };
  useEffect(() => {
    callback && callback(current);
  }, [active]);

  const colors = ['#ff0303', '#8400ff', '#00fff6', '#0028ff', '#00ff28'];

  colors.unshift(defaultBkg['fill']);

  const current = colors[active];

  if (staticValues) {
    console.log({ staticValues });
    return (
      <div>
        {staticValues.map((item, i) => {
          return (
            <svg key={item + i} height="30" width="30" className="inline-block">
              <circle fill={item} cx="15" cy="15" r="10" stroke={item} stroke-width="3" />
              <circle
                fill={item}
                cx="15"
                cy="15"
                r="8"
                stroke="#ffffff"
                stroke-width="2"
              />
            </svg>
          );
        })}
      </div>
    );
  }

  return (
    <svg
      height="30"
      width="30"
      className="inline-block"
      onClick={() => setActive((num) => (num + 1) % colors.length)}
    >
      {active && (
        <circle cx="15" cy="15" r="10" stroke={current} stroke-width="3" fill={current} />
      )}
      <circle
        fill={current}
        cx="15"
        cy="15"
        r={active ? '8' : '10'}
        stroke={active ? '#ffffff' : '#838390'}
        stroke-width={active ? '2' : '3'}
      />
    </svg>
  );
}
