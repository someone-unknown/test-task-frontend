import type { NextPage } from 'next'
import { useState, useEffect } from 'react';

const Home: NextPage = () => {
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(false);

  useEffect((): void => {
    fetch('http://api.test-task.prism.md/users/session-verify', {
      mode: 'cors',
      credentials: 'include',
    })
      .then((response: Response): void => {
        if (response.status === 204) {
          window.location.pathname = '/instruments';
        } else if (response.status === 403) {
          window.location.pathname = '/login';
        } else {

        }
      })
      .catch((error): void => console.warn(error));
  }, []);

  return null;
}

export default Home
