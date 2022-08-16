import { useCallback, useState } from 'react';
import Head from 'next/head';
import axios, { AxiosError } from 'axios';
import Router from 'next/router';

interface AppError {
  response: {
    data: {
      message: string;
    };
  };
}

export default function Subscriptions() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = useCallback(async () => {
    setLoading(true);

    try {
      await axios.post('/api/add-subscriber', { email });

      Router.push(
        { pathname: '/success', query: { email: email } },
        '/success'
      );
    } catch (error) {
      setError('Houve um erro, tente novamente.');
      setLoading(false);
      console.log(`!!! ${(error as AppError).response.data.message}`);
    }
  }, [email]);

  if (loading) return <h1>Cadastrando...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <>
      <Head>
        <title>Inscrições</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="#" />
      </Head>

      <main>
        <h1>Cadastre seu e-mail em nossa newsletter:</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button>Finalizar</button>
        </form>
      </main>
    </>
  );
}