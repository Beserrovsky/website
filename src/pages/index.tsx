import { NextPage } from "next"
import Head from 'next/head'
import styles from '@/styles/Home.module.css'

interface Props {
  twitterData: [
    {
      id: string,
      name: string,
      username: string
    }
  ],
  twitterError: string
}

const Home: NextPage<Props> = (props) => {

  const { twitterData, twitterError } = props

  return (
    <>
      <Head>
        <title>Felipe Beserra</title>
        <meta name="description" content="Beserrovsky's Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>
          {twitterData == undefined && twitterError}
          {twitterData != undefined && twitterData[0].name}
        </h1>
      </main>
    </>
  );
};

export async function getServerSideProps() {

  const TOKEN = process.env.TWITTER_BEARER_TOKEN
  if (!TOKEN) {console.error("ADD TWITTER_BEARER_TOKEN TO .env.local")}

  const res = await fetch(
    "https://api.twitter.com/2/users/by?usernames=beserrovsky", 
    { headers: {Authorization: `Bearer ${TOKEN}`} }
  )

  if (res.ok) {
    const twitterData = await res.json()

    return {
        props: {
          twitterData,
        }
    }
  }

  return {
    props: { 
      twitterData: undefined, 
      twitterError: `${res.status}: ${res.statusText}`
    }
  }
}

export default Home
