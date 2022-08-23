import React, { memo, FunctionComponent, ReactElement } from 'react';

export const Forbidden: FunctionComponent = memo((): ReactElement => (
  <div className="d-flex align-items-center justify-content-center vw-100 vh-100">
    <h1>403 Forbidden</h1>
  </div>
));

export default Forbidden;