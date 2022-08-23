import type { NextPage } from 'next';
import Link from 'next/link'
import { useEffect, useState, ReactElement } from 'react';

import { Error } from '../components/Error';
import { Forbidden } from '../components/Forbidden';
import { Loader } from '../components/Loader';

const Login: NextPage = () => {
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ isForbidden, setIsForbidden ] = useState<boolean>(false);
  const [ isError, setIsError ] = useState<boolean>(false);
  const [ instruments, setInstruments ] = useState<any[]>([]);

  useEffect((): void => {
    fetch('http://api.test-task.prism.md/instruments', {
      mode: 'cors',
      credentials: 'include',
    })
      .then((response: Response) => {
        if (response.status === 200) {
          setIsForbidden(false);
          response.json().then(setInstruments);
        } else if (response.status === 403) {
          setIsForbidden(true);
        } else {
          setIsError(true);
        }
      })
      .catch((): void => setIsError(true))
      .finally((): void => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isForbidden) {
    return <Forbidden />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <ul className="list-group">
      { instruments.map((instrument: any): ReactElement => (
        <li
          key={instrument.id}
          className="list-group-item"
        >
          <Link href={`/instruments/${instrument.instrument_symbol}`}>
            {instrument.instrument_name}
          </Link>
        </li>
      )) }
    </ul>
  )
}

export default Login;