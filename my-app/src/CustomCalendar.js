import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import moment, { now } from "moment";
import './calendar.css';
import { BsCaretDown, BsCaretDownFill } from "react-icons/bs";


const CalendarContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  width: 200px;
  height: 48px;
  border: 0.8px solid var(--festie-gray-600, #949494);
  border-radius: 10px;
  padding: 0px 12px;
  color: var(--festie-gray-800, #3a3a3a);
  font-family: SUIT Variable;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  text-align: start;
  appearance: none;
  background-color: white;
  background-repeat: no-repeat; 
  background-position: right 12px center;
  background-size: 12px;
`;

const CalendarWrapper = styled.button`
  z-index: 11;
  position: absolute;
  top: 100%;
  left: 0;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const CustomCalendar = ({ getData, startDate, onChange, value }) => {

  const [nowDate, setNowDate] = useState(startDate);
  const [isOpen, setIsOpen] = useState(false);



  useEffect(() => {

    getData(nowDate);

  }, [getData, nowDate]);




  useEffect(() => {

    handleDateChange(startDate)


  }, [startDate]);





  const handleToggleCalendar = (event) => {
    event.preventDefault();
    if (nowDate === "날짜") {
      event.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(246, 204, 208, 1) 0px 0px 0px 5px';

    } else {
      event.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(197, 225, 212, 1) 0px 0px 0px 5px';

    }

    setIsOpen(!isOpen);
  };

  const handleBlurCalendar = (event) => {
    event.preventDefault();
    event.currentTarget.style.boxShadow = '';
  };





  const handleDateChange = (selectedDate) => {
    // onChange(selectedDate);
    setIsOpen(false);
    setNowDate(moment(selectedDate).format("YYYY-MM-DD"));
  };

  return (


    <CalendarContainer>
      <DropdownButton type="button" onClick={handleToggleCalendar} onBlur={handleBlurCalendar} style={{ borderColor: nowDate === "날짜" ? 'red' : 'green', width: '40%', height: '40px' }}
      >{nowDate}
        {isOpen === false ?
          <BsCaretDown style={{ float: 'right', verticalAlign: 'middle' }} />
          :
          <BsCaretDownFill style={{ float: 'right', verticalAlign: 'middle' }} />
        }
      </DropdownButton>
      <CalendarWrapper isOpen={isOpen}>
        <Calendar type="button" id="calendar_btn" onChange={(date) => handleDateChange(date)} value={value}></Calendar>
      </CalendarWrapper>
    </CalendarContainer>
  );
};

export default CustomCalendar;