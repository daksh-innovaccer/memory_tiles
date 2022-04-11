import './SingleCard.css'

const SingleCard = (props) => {

    const clickHandler = () => {
        if (!props.disabled) {
            props.choiceHandle(props.card)
        }

    }

    return (
        <div className='card'>
            <div className={props.flipped ? "flipped" : ""}>
                <img className='front' src={props.card.src} alt='front' />
                <img className='back' src="/images/download.png" onClick={clickHandler} alt='back' />
            </div>
        </div>
    )
}

export default SingleCard