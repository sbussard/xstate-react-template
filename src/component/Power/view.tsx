import * as React from 'react';
import './styles.scss';

export default ({ methods, isOn, logInstance }: any) => (
  <div className="Authentication">
    <h2>{isOn ? 'On' : 'Off'}</h2>
    {Object.keys(methods).map((type) => (
      <button key={type} onClick={methods[type]}>
        {type}
      </button>
    ))}
    <button onClick={logInstance}>Instance</button>
  </div>
);
