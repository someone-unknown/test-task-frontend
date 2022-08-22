import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const InstrumentsSymbol: NextPage = () => {
  const { query: { instrument_symbol } } = useRouter();
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ isForbidden, setIsForbidden ] = useState<boolean>(true);
  const [ instrument, setInstrument ] = useState<any>(null);

  useEffect((): void => {
    fetch(`http://api.not-paid-test-task.prism.md/instruments/${instrument_symbol}`, {
      mode: 'cors',
      credentials: 'include',
    })
      .then((response: Response) => {
        if (response.status === 200) {
          setIsForbidden(false);
          return response.json();
        }
      })
      .then(setInstrument)
      .catch((error): void => console.warn(error));
  }, []);

  return (
    <div>
      { JSON.stringify(instrument) }
    </div>
  )
}

export default InstrumentsSymbol
