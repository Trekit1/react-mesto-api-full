import { useHistory } from "react-router-dom";

function ErrorNotFound() {
    const history = useHistory();
    return(
        <section className='error'>
            <h1 className='error__code'>404</h1>
            <p className='error__message'>Страница не найдена</p>
            <p className='error__button' onClick={() => history.goBack()}>Назад</p>
        </section>
    )
}

export default ErrorNotFound