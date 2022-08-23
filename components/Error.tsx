import React, { memo, FunctionComponent, ReactElement } from 'react';

export const Error: FunctionComponent = memo((): ReactElement => (
  <div className="d-flex align-items-center justify-content-center vw-100 vh-100">
    <h1>500 Internal server error</h1>
  </div>
));

export default Error;