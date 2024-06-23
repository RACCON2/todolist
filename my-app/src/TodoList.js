import { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import { BsFillPencilFill, BsX, BsXCircle } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import Form from 'react-bootstrap/Form';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import Axios from "axios";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import { TfiPlus } from "react-icons/tfi";



import ListDelete from './ListDelete.js'
import ListUpdate from './ListUpdate.js'
import ListInsert from './ListInsert.js';

import { Bs1SquareFill, Bs2SquareFill, Bs3SquareFill, BsPencilSquare } from "react-icons/bs";


const TodoList = () => {








  const renderTooltip = (props) => (

    <Tooltip id="button-tooltip" {...props}>
      {props}
    </Tooltip>
  );

  const [isChecked, setChecked] = useState(false);
  const [isDeleted, setDeleted] = useState(false);
  const [isUpdated, setUpdated] = useState(false);
  const [isInserted, setInserted] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");



  const [boardlist, setBoardlist] = useState({ boardList: [] });

  const [index, setIndex] = useState(null);


  const [updateIndex, setUpdateIndex] = useState(null);


  useEffect(() => {

  }, [boardlist]);

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    getList();

  }, [isUpdated, isInserted, isDeleted]);





  const handleToggleCheck = (event) => {
    setChecked(!isChecked);

    if (!event.target.checked) {
      document.getElementById("check_label" + event.currentTarget.id).style.textDecoration = 'none';

    } else {
      document.getElementById("check_label" + event.currentTarget.id).style.textDecoration = 'line-through';

    }
  };

  const getList = () => {
    Axios.get("http://localhost:3001/list", {})
      .then((res) => {
        const { data } = res;
        setBoardlist({
          // data를 boardList에 저장
          // 상태값이 바뀌면 리렌더링이 되면서 목록이 나타남
          boardList: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };


  const handleDelete = (event) => {
    setDeleted(!isDeleted)
    setIndex(event.currentTarget.id);
  }


  const handleUpdate = (event) => {

    setUpdated(!isUpdated)
    setUpdateIndex(event.currentTarget.id);
  }


  const handleInsert = (event) => {

    setInserted(!isInserted)

  }

  const getInsert = childData => {

    setInserted(childData);
  };


  const getDelete = childData => {

    setDeleted(childData);
  };


  const getUpdate = childData => {

    setUpdated(childData);
  };




  return (
    <div style={{ backgroundImage: "linear-gradient(to bottom, rgb(0 0 0 / 20%), rgb(0 0 0 / 22%)),url('contact-5235117_1280.jpg')", backgroundSize: "cover", padding: '10px' }}>
      <Form>
        <InputGroup style={{ width: "40%", margin: 'auto', marginTop: '70px', height: '50px' }} className="mb-3">
          <Form.Control
            required
            placeholder="추가할 TO DO LIST 내용을 적으세요"
            aria-label="TO DO LIST TITLE"
            aria-describedby="basic-addon2"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <Button variant="outline-secondary" id="button-addon2" onClick={handleInsert}>
            <TfiPlus />
          </Button>
        </InputGroup>



        <div style={{ backgroundColor: "#fff9e7", width: "42%", margin: 'auto', padding: '10px', marginTop: '50px' }}>


          {
            boardlist.boardList?.map((article) =>


              ['checkbox'].map((type) => (
                <div key={type} className="mb-3" style={{
                  boxShadow: 'rgb(25 27 27) 0px 0px 2px', boxSizing: '10px 10px', borderRadius: '10px 10px 10px 10px', border: '2px solid rgb(158, 158, 158)', padding: '10px 10px',
                }}>
                  <h6>
                    <Badge bg="secondary">  {article.dday < 0 ? "D" + article.dday : "D-" + article.dday}</Badge>
                  </h6>
                  <Form.Check type={type} id={article.id}>

                    <Form.Check.Input onClick={handleToggleCheck} type={type} isValid />
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip(article.content)}
                    >
                      <Form.Check.Label id={"check_label" + article.id} style={{ color: '#495057' }}>
                        <div style={{ display: 'ruby', whiteSpace: 'pre-wrap', margin: '10%' }}>


                          [{article.category}] {article.title}



                        </div>

                      </Form.Check.Label>
                    </OverlayTrigger>
                    <div style={{ float: 'right' }}>
                      <Button style={{ all: 'unset' }} id={article.id} onClick={handleUpdate}><BsPencilSquare size='20' color='black' /></Button >{' '}
                      <Button style={{ all: 'unset' }} id={article.id} onClick={handleDelete}><MdDelete size='20' color='black' /></Button>{' '}

                    </div>





                  </Form.Check>


                </div>
              )))}
        </div>
        {isDeleted ? (

          <ListDelete index={index} getDelete={getDelete} />

        ) : null}

        {isInserted ? (

          <ListInsert searchTerm={searchTerm} getInsert={getInsert} />

        ) : null}



        {isUpdated ? (

          <ListUpdate updateIndex={updateIndex} getUpdate={getUpdate} />

        ) : null}

      </Form>
    </div>
  )

}
export default TodoList