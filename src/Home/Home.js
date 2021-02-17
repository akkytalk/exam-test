import React, { Fragment } from 'react'
import { Card, CardBody, CardHeader } from "reactstrap";
import './Home.css';

function Home() {
    return (
        <Fragment>
            <div className="main-field">
                <Card className="question-card" >
                    <CardHeader>
                        <strong>Instructions</strong>
                    </CardHeader>
                    <CardBody>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet suscipit erat, id auctor ipsum. Maecenas hendrerit sed odio a cursus. Aliquam elementum tempus sapien ut molestie. Nam non venenatis sapien. Sed vitae mattis ex, et pulvinar felis. Quisque vitae diam non felis facilisis iaculis aliquet quis nibh.
                    </CardBody>
                </Card>
            </div>

            <div className="main-field">
                <Card className="question-card" >
                    <CardHeader >
                       <span> Category | Sub Category</span>
                       <span className="float-right">Timer: 10s</span>
                    </CardHeader>
                    <CardBody>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet suscipit erat, id auctor ipsum. Maecenas hendrerit sed odio a cursus. Aliquam elementum tempus sapien ut molestie. Nam non venenatis sapien. Sed vitae mattis ex, et pulvinar felis. Quisque vitae diam non felis facilisis iaculis aliquet quis nibh.
                    </CardBody>
                </Card>
            </div>
        </Fragment>
    )
}

export default Home
