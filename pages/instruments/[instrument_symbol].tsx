import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { Error } from '../../components/Error';
import { Forbidden } from '../../components/Forbidden';
import { Loader } from '../../components/Loader';

const InstrumentsSymbol: NextPage = () => {
  const { query: { instrument_symbol } } = useRouter();
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ isForbidden, setIsForbidden ] = useState<boolean>(false);
  const [ isError, setIsError ] = useState<boolean>(false);
  const [ instrument, setInstrument ] = useState<any>(null);

  useEffect((): void => {
    fetch(`http://api.test-task.prism.md/instruments/${instrument_symbol}`, {
      mode: 'cors',
      credentials: 'include',
    })
      .then((response: Response) => {
        if (response.status === 200) {
          setIsForbidden(false);
          response.json().then(setInstrument);
        } else if (response.status === 403) {
          setIsForbidden(true);
        } else {
          setIsError(true);
        }
      })
      .catch((): void => setIsError(true))
      .finally((): void => setIsLoading(false));
  }, [instrument_symbol]);

  if (isLoading) {
    return <Loader />;
  }

  if (isForbidden) {
    return <Forbidden />;
  }

  if (isError) {
    return <Error />;
  }

  return instrument && (
    <ul className="list-group">
      <li className="list-group-item">ID: {instrument.id}</li>
      <li className="list-group-item">Symbol: {instrument.instrument_symbol}</li>
      <li className="list-group-item">Name: {instrument.instrument_name}</li>
      <li className="list-group-item">Price: {instrument.usd_price}$</li>
      <li className="list-group-item"><Link href="/instruments"><div className="btn btn-primary">Back</div></Link></li>
    </ul>
  )
}

export default InstrumentsSymbol;
