import * as React from 'react';
import Power from 'src/component/Power';
import './styles.scss';

export default ({ methods, isAuthenticated, logInstance, instance }: any) => (
  <div className="Authentication">
    <h2>{isAuthenticated ? 'Signed In' : 'Signed Out'}</h2>
    {Object.keys(methods).map((type) => (
      <button key={type} onClick={methods[type]}>
        {type}
      </button>
    ))}
    <button onClick={logInstance}>Instance</button>
    {isAuthenticated && <Power parent={instance} />}
  </div>
);
