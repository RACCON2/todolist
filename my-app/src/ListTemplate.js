import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Bs1SquareFill, Bs2SquareFill, Bs3SquareFill } from "react-icons/bs";



const ListTemplate = ({ children }) => {

    return (
        <div >



            <div>{children}</div>

        </div>
    )
}

export default ListTemplate