import React, { useEffect, useState } from 'react';

function ErrorModel({ errorMessage }) {
    const [style, setstyle] = useState({})

    useEffect(() => {
        setstyle({
            display: errorMessage !== null ? "block" : "none"
        })
    }, [errorMessage])

    const handleClose = () => {
        setstyle({
            display: "none"
        })
    }

    return (
        <div className="modal" style={style} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Error</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        {errorMessage}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ErrorModel