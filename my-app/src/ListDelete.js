import { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Axios from "axios";
import TodoList from './TodoList.js'

const ListDelete = ({ getDelete, index }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {

    getDelete(show);

  }, [show]);

  useEffect(() => {



  }, [index]);


  const deleteList = () => {

    //let deleteId =  JSON.stringify(index.index) ;
    //deleteId = deleteId.replace(/\"/gi, "");

    Axios.post("http://localhost:3001/delete", {
      id: index,
    })
      .then((res) => {

        handleClose();

      })
      .catch((e) => {
        console.error(e);
      });

  }





  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>TO DO LIST 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>TO DO LIST를 삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" onClick={deleteList}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  )
}

export default ListDelete