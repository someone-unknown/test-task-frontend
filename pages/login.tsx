import type { NextPage } from 'next'
import { useCallback, useState, FormEvent, FormEventHandler } from 'react';

const Login: NextPage = () => {
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');

  const onEmailChange: FormEventHandler<HTMLInputElement> = useCallback((event: FormEvent<HTMLInputElement>): void => {
    event.preventDefault();
    console.log(event.currentTarget.value);
    setEmail(event.currentTarget.value);
  }, []);

  const onPasswordChange: FormEventHandler<HTMLInputElement> = useCallback((event: FormEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setPassword(event.currentTarget.value);
  }, []);

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback((event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setIsLoading(true);
    fetch('http://api.not-paid-test-task.prism.md/users/login', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response): void => {
        if (response.status === 200) {
          window.location.pathname = '/instruments';
        } else if (response.status === 403) {
          // Invalid credentials
          setIsLoading(false);
        } else {
          // Network or server error ...
          setIsLoading(false);
        }
      })
      .catch((error: Error): void => console.warn(error))
  }, [ email, password ]);

  return (
    <div className="d-flex justify-content-center align-items-center vw-100 vh-100">
      <form className="w-25" onSubmit={onSubmit}>
        <div className="form-outline mb-4">
          <input
            type="email"
            id="form2Example1"
            className="form-control"
            onInput={onEmailChange}
            value={email}
            disabled={isLoading}
          />
          <label className="form-label" htmlFor="form2Example1">Email address</label>
        </div>
        <div className="form-outline mb-4">
          <input
            type="password"
            id="form2Example2"
            className="form-control"
            onInput={onPasswordChange}
            value={password}
            disabled={isLoading}
          />
          <label className="form-label" htmlFor="form2Example2">Password</label>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4" disabled={isLoading}>Sign in</button>

        <div className="text-center">
          <p>Not a member? <a href="/register">Register</a></p>
        </div>
      </form>
    </div>
  )
}

export default Login
