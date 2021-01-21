export default function Modal (props) {
    return (
        <div style={{color: 'white'}} className="modal">
            <div className="modal__container">
                <div className="modal__container__header">
                    <h1>{props.headerText}</h1>
                </div>
                <div className="modal__container__body">
                    {props.modalBody}
                </div>
                <div className="modal__container__footer">
                    {props.confirmButton 
                        ? <button style={{marginRight: '15px'}} 
                            onClick={props.confirmButtonAction}>{props.confirmButtonText || 'Confirm'}</button>
                        : null
                    }
                    <button onClick={props.closeButtonAction}>{props.closeButtonText || 'Close'}</button>
                </div>
            </div>
        </div>
    )
}