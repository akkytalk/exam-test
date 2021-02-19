import React from 'react'
import { Card, CardHeader, CardBody } from "reactstrap";

export default function Question(props) {
    return (
        <Card>
            <CardHeader>
                <strong style={{ textTransform: 'capitalize' }}>{props.question.category.name}</strong>
                <p className="float-right" style={{ color: '#f00' }}>00:10</p>
            </CardHeader>
            <CardBody>
                Question
                <div className="mb-2">
                    <h6>{props.question.question_text} ?</h6>

                    {props.option?.data?.map((opt, ind) => {
                        if (props.question.id == opt.question_id)
                            return (
                                <div key={ind}>
                                    <input
                                        type="radio"
                                        className="mr-2"
                                        key={opt.question_id}
                                        name="option_text"
                                        value={opt.id}
                                    />
                                    {opt.option_text}
                                </div>
                            );
                    })}
                </div>
            </CardBody>
        </Card>
    )
}
