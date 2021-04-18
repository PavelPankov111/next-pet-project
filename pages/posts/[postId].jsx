import { Main } from '../../components /Main'
import cardModule from '../../styles/card.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
export default function PostId({ post: serverPost }) {
    const [post, setPost] = useState(serverPost)
    const router = useRouter()

    useEffect(() => {
        async function loadCards() {
            const request = await fetch(`http://localhost:4200/posts/${router.query.postId}`)
            const data = await request.json()

            setPost(data)
        }

        if (!serverPost) loadCards()
    }, [])

    if (!post) {
        return (
            <Main title="Пост">
                <h2>Loading...</h2>
            </Main>
        )

    }

    return (
        <Main title="Пост">
            <div className={cardModule.newsCard}>
                <Link href='/'>
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
            </div>
        </Main>
    )
}

PostId.getInitialProps = async function ({ query, req }) {
    if(!req) return { post: null }
    const request = await fetch(`http://localhost:4200/posts/${query.postId}`)
    const post = await request.json()

    return {
        post
    }
}
