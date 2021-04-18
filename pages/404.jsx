import Link from 'next/link'
import errorModule from '../styles/error.module.css'

export default function ErrorPage(){
    return(
    <div className={errorModule.error}>
        <h3>Кастомная 404 страница</h3>
        <Link href="/"><a>На главную</a></Link>
    </div>
    )
}