import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { dismiss, Alerts } from '../../features/alerts';

const Alert = ({ item, onDismissAlert }) => {
  const { message, type } = item;
  return (
    <div className={classNames('rounded my-1 py-2 px-4 flex', {
      'bg-green-500': type === Alerts.SUCCESS,
      'bg-blue-500': type === Alerts.INFO,
      'bg-yellow-500': type === Alerts.WARNING,
      'bg-red-500': type === Alerts.ERROR,
    })}
    >
      <div className="flex-1 text-white">
        <span className="font-bold">{type}</span>
        {' '}
        {message}
      </div>
      <button type="button" className="cursor-pointer text-white bg-transparent opacity-50 hover:opacity-75" onClick={() => onDismissAlert(item)}>
        <span>&times;</span>
      </button>
    </div>
  );
};

const AlertList = () => {
  const items = useSelector(state => state.alerts);
  const dispatch = useDispatch();
  const onDismissAlert = (item) => dispatch(dismiss(item.id));
  return (
    <div className="flex flex-col flex-nowrap">
      {
        items.map((it) => (
          <Alert
            key={it.id}
            item={it}
            onDismissAlert={onDismissAlert}
          />
        ))
      }
    </div>
  );
}

export default AlertList;
