import * as React from 'react';

const Text = ({ idx, values, target, onChange, setTarget }) => (
  <input
    className="disabled:bg-gray-100"
    type="text"
    value={values[idx]}
    onChange={e => onChange(idx, e.target.value)}
    disabled={target === idx}
  />
);

const Check = ({ idx, values, target, onChange, setTarget }) => (
  <input
    className="mx-2"
    type="checkbox"
    checked={target === idx}
    onChange={e => setTarget(idx)}
  />
);

export function Ratio() {
  const [target, setTarget] = React.useState(3);
  const [values, setValues] = React.useState(['', '', '', '']);
  const onChange = React.useCallback((idx, value) => {
    const fValues = values.map((x, i) => i === idx ? parseFloat(value) : parseFloat(x));
    const newValues = [
      fValues[1] * fValues[2] / fValues[3],
      fValues[0] * fValues[3] / fValues[2],
      fValues[0] * fValues[3] / fValues[1],
      fValues[2] * fValues[1] / fValues[0],
    ];
    const targetValue = isNaN(newValues[target]) ? '' : newValues[target];
    setValues(values.map((x, i) => {
      if (i === idx) return value;
      if (target === i) return targetValue;
      return x;
    }));
  }, [values, target]);
  const props = { values, target, onChange, setTarget };
  return (
    <table className="mx-auto mt-4">
      <tr>
        <td>
          <Check idx={0} {...props} />
          <Text idx={0} {...props} />
        </td>
        <td></td>
        <td>
          <Text idx={1} {...props} />
          <Check idx={1} {...props} />
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <span>&times;</span>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>
          <Check idx={2} {...props} />
          <Text idx={2} {...props} />
        </td>
        <td></td>
        <td>
          <Text idx={3} {...props} />
          <Check idx={3} {...props} />
        </td>
      </tr>
    </table>
  );
}

export default Ratio;
