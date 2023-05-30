import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { Button } from '@mui/material';
import { useAuth } from '@/hooks/auth';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Home() {
  const { user } = useAuth({ middleware: 'guest' })

  return (
    <Layout>
    <div className={styles.container}>
      <Head>
        <title>Discover Latest Articles</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Discover Latest Articles

        </h1>

        <p className={styles.description}>
        The Heroic Hub of Knowledge and Inspiration!
        </p>

        {user ? (
          <Link href="/dashboard" passHref>
            <Button
              variant="contained"
            >
            Continue as  { user.name }
            </Button>
          </Link>
        ) : (
          <Link href="/auth" passHref>
            <Button

              variant="contained"
            >
              Login
            </Button>
          </Link>
        )}

      </main>

      <footer>
        News App Footer
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
    </Layout>
  )
}