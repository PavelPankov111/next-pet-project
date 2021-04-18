import { Main } from '../../components /Main'
import Link from 'next/link'
import React from 'react'
import cardModule from '../../styles/card.module.css'
import { useState, useEffect } from 'react'

export default function Posts({ cards: serverResponse }) {
    const [cards, setCards] = useState(serverResponse)

    useEffect(() => {
        async function loadCards() {
            const request = await fetch(`http://localhost:4200/posts/`)
            const data = await request.json()

            setCards(data)
        }

        if (!serverResponse) loadCards()
    }, [])

    if (!cards) {
        return (
            <Main title="Posts">
                <h3 className={cardModule.cards__title}>Посты</h3>
                <h2>Loading...</h2>
            </Main>
        )
    }

    return (
        <Main title="Posts">
            <h3 className={cardModule.cards__title}>Посты</h3>
            <ul className={cardModule.cards}>
                {cards.map(post => {
                    return (
                        <li className={cardModule.newsCard} key={post.id}>
                            <Link href={'/posts/' + post.id}>
                                <a className={cardModule.newsCard__link}>
                                    <div className={cardModule.newsCard__image}>
                                        <img className={cardModule.newsCard__img} src={post.image} alt="фотография не загрузилась :(" />
                                    </div>
                                    <div className={cardModule.newsCard__content}>
                                        <h2 className={cardModule.newsCard__content_title}>{post.title}</h2>
                                        <p className={cardModule.newsCard__content_description}>{post.text}</p>
                                    </div>
                                </a>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </Main>
    )
}

Posts.getInitialProps = async ({ req }) => {
    if (!req) return { cards: null }
    const request = await fetch('http://localhost:4200/posts')
    const cards = await request.json()

    return {
        cards
    }
}