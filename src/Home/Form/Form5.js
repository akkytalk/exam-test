import { Button } from 'reactstrap';
import React, { Fragment } from 'react'
import { Card, CardBody, CardHeader, Form } from "reactstrap";
import { Link } from 'react-router-dom';


function Form5() {
    return (
        <Fragment>
        <div className="main-field">
        <Card className="question-card">
          <CardHeader>
            <strong>Instructions</strong>
          </CardHeader>
          <CardBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            sit amet suscipit erat, id auctor ipsum. Maecenas hendrerit sed odio
            a cursus. Aliquam elementum tempus sapien ut molestie. Nam non
            venenatis sapien. Sed vitae mattis ex, et pulvinar felis. Quisque
            vitae diam non felis facilisis iaculis aliquet quis nibh.
          </CardBody>
        </Card>
      </div>

      <div className="main-field">
        <Card className="question-card">
          <CardHeader>
            <strong>English</strong>
          </CardHeader>
          <CardBody>
            What is your gender5?
            <div className="d-flex flex-column">
        <span><input type="radio" value="Male" name="gender" /> Male</span>
        <span><input type="radio" value="Male" name="gender" /> Female</span>
        <span><input type="radio" value="Male" name="gender" /> other</span>
        
      </div>
     
          </CardBody>
          <Link to="/">
      <Button className="btn-success w-25 center" type="button">Submit</Button>
      </Link>
        </Card>
      </div>
      </Fragment>
    )
}

export default Form5
