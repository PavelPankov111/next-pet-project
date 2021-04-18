import '../styles/main.css'
import NextNprogress from 'nextjs-progressbar';

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <NextNprogress
                color="#29D"
                startPosition={0.3}
                stopDelayMs={200}
                height="3"
            />
        </>
    )
}