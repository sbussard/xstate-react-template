import * as React from 'react';
import './styles.scss';

export default ({ methods, isOn, parent }: any) => (
  <div className="Authentication">
    <h2>{isOn ? 'On' : 'Off'}</h2>
    {Object.keys(methods).map((type) => (
      <button key={type} onClick={methods[type]}>
        {type}
      </button>
    ))}
    Parent methods:
    <br />
    {Object.keys(parent.methods).map((type) => (
      <button key={type} onClick={parent.methods[type]}>
        {type}
      </button>
    ))}
  </div>
);
