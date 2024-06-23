import { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import { createRoot } from 'react-dom/client'
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { TfiPlus } from "react-icons/tfi";
import Modal from 'react-bootstrap/Modal';
import CustomCalendar from './CustomCalendar.js';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Axios from "axios";

import TodoList from './TodoList.js'




const ListUpdate = ({ getUpdate, updateIndex }) => {


  const [show, setShow] = useState(true);


  const [startDate, setStartDate] = useState("");
  const [lastday, setlastDay] = useState("");



  const [validated, setValidated] = useState(false);
  const [checked, setValichked] = useState(false);

  const [test, setTest] = useState(false);




  useEffect(() => {


    selectList();

  }, [startDate, updateIndex]);

  useEffect(() => {

    getUpdate(show);

  }, [show]);


  const selectList = () => {

    //let selectId =  JSON.stringify(updateIndex.updateIndex) ;
    //selectId = selectId.replace(/\"/gi, "");

    Axios.post("http://localhost:3001/oneselect", {
      id: updateIndex,
    })
      .then((res) => {
        setInputs({
          ...inputs,
          "title": res.data[0].title,
          "content": res.data[0].content,
          "category": res.data[0].category
        });

        let num;
        if (res.data[0].category === "긴급") {
          num = 1;
        } else if (res.data[0].category === "중요") {
          num = 2;
        } else {
          num = 3;
        }
        document.getElementById("inline-radio-" + num).checked = true;

        setStartDate(res.data[0].lastday)

        setTest(res.data[0].lastday)
        //새로고침
        //createRoot(document.getElementById('boardList_form')).render(<TodoList />)
        // handleClose();

      })
      .catch((e) => {
        console.error(e);
      });

  }









  const [inputs, setInputs] = useState({
    title: '', 	//사용할 문자열들을 저장하는 객체 형태로 관리!
    content: '',
    category: '',
  });

  //그리고 나중에 쓰기 편하게 비구조화 할당!
  const { title, content, category } = inputs;


  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    setInputs('')
  };

  const handleSubmit = (event) => {

    event.preventDefault();
    /* event.preventDefault();
     event.stopPropagation();
     setValidated(true);
     */
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

  };

  const getData = childData => {

    setStartDate(test);
    setlastDay(childData);

  };




  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });

  };



  const handleCheck = (event) => {

    setValidated(true);

    //let selectId =  JSON.stringify(updateIndex.updateIndex) ;
    //selectId = selectId.replace(/\"/gi, "");

    if (title === '') {
      alert("내용을 입력하세요")
    } else if (content === '') {
      alert("메모를 입력하세요")
    } else if (category === '') {
      alert("중요도를 선택하세요")
    } else if (startDate === '날짜') {
      alert("일자를 입력하세요")
    } else {
      Axios.post("http://localhost:3001/update", {
        title: title,
        content: content,
        category: category,
        lastday: lastday,
        id: updateIndex,
      })
        .then((res) => {

          handleClose();

        })
        .catch((e) => {
          console.error(e);
        });
    }

  }
  return (

    <div>
      <Modal show={show} onHide={handleClose} backdrop="static"
        keyboard={false}>

        <Modal.Header closeButton>
          <Modal.Title>TO DO LIST 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>TO DO LIST를 수정하기 위한 정보를 입력해주세요!
          <div style={{ margin: '30px 10px' }}>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                일자
              </Form.Label>

              <Col sm="10">
                <CustomCalendar getData={getData} startDate={startDate} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">

              <Form.Label column sm="2">
                내용
              </Form.Label>
              <Col sm="10">
                <Form.Control style={{ width: "40%" }}
                  required
                  name="title"
                  placeholder="할일"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={handleChange}
                  value={title}
                  isInvalid={!title}
                  isValid={title}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">

              <Form.Label column sm="2">
                메모
              </Form.Label>
              <Col sm="10">
                <Form.Control style={{ width: "40%" }}
                  required
                  name="content"
                  placeholder="discript"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={handleChange}
                  value={content}
                  isInvalid={!content}
                  isValid={content}
                />

              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">

              <Form.Label column sm="2">
                중요도
              </Form.Label>
              <Col sm="10">

                {['radio'].map((type) => (
                  <div key={`inline-${type}`} className="mb-3" style={{ width: '60%', margin: '7px 10px' }}>
                    <Form.Check required
                      name="category"
                      inline
                      label="긴급"
                      type={type}
                      id={`inline-${type}-1`}
                      onChange={handleChange}
                      value="긴급"
                      isInvalid={!category}
                      isValid={category}
                    />
                    <Form.Check
                      inline
                      label="중요"
                      name="category"
                      type={type}
                      id={`inline-${type}-2`}
                      onChange={handleChange}
                      value="중요"
                      isInvalid={!category}
                      isValid={category}
                    />
                    <Form.Check
                      name="category"
                      inline
                      label="보통"
                      type={type}
                      id={`inline-${type}-3`}
                      onChange={handleChange}
                      value="보통"
                      isInvalid={!category}
                      isValid={category}
                    />
                  </div>
                ))}
              </Col>
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button onClick={handleCheck}>
            변경
          </Button>
        </Modal.Footer>

      </Modal>

    </div>
  )
}

export default ListUpdate