import type { NextPage } from 'next'
import { useEffect, useState, ReactElement } from 'react';

const Login: NextPage = () => {
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ isForbidden, setIsForbidden ] = useState<boolean>(true);
  const [ instruments, setInstruments ] = useState<any[]>([]);

  useEffect((): void => {
    fetch('http://api.not-paid-test-task.prism.md/instruments', {
      mode: 'cors',
      credentials: 'include',
    })
      .then((response: Response) => {
        if (response.status === 200) {
          setIsForbidden(false);
          return response.json();
        }
      })
      .then(setInstruments)
      .catch((error): void => console.warn(error));
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Symbol</th>
          <th scope="col">Name</th>
          <th scope="col">Price $</th>
        </tr>
      </thead>
      <tbody>
        { instruments.map((instrument: any): ReactElement => (
          <tr key={instrument.id}>
            <th scope="row"><a href={`/instruments/${instrument.instrument_symbol}`}>{instrument.id}</a></th>
            <td>{instrument.instrument_symbol}</td>
            <td>{instrument.instrument_name}</td>
            <td>{instrument.usd_price}</td>
          </tr>
        )) }
      </tbody>
    </table>
  )
}

export default Login
