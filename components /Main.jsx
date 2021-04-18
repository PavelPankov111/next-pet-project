import Router from 'next/router'
import Head from 'next/head'

export function Main({ children, title }) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="keywords" content="next, nextjs, javascript, react" />
                <meta name="description" content="Pet-project with next.js" />
                <meta charSet="utf-8" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital@1&display=swap" rel="stylesheet" />
            </Head>
            <nav className="main-nav">
                <button onClick={() => Router.push('/')}>Главная</button>
                <button onClick={() => Router.push('/about')}>О пользователе</button>
                <button onClick={() => Router.push('/posts')}>Посты</button>
            </nav>
            <main className="main-page">
                {children}
            </main>
        </>
    )
}