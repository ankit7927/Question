import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function ErrorModel(props) {
    const loader = props.loader
    const [show, setShow] = useState(false);

    const handleClose = () => { setShow(false) }

    useEffect(()=>{
        setShow(true)
    }, [loader.success])

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>{loader.error}</Modal.Body>
        </Modal>
    );
}

export default ErrorModel