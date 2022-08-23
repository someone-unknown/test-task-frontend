import React, { memo, FunctionComponent, ReactElement } from 'react';

export const Loader: FunctionComponent = memo((): ReactElement => (
  <div className="d-flex align-items-center justify-content-center vw-100 vh-100">
    <div className="progress w-75">
      <div className="progress-bar progress-bar-striped progress-bar-animated w-100" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} />
    </div>
  </div>
));

export default Loader;