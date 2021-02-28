import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Button } from "reactstrap";

import "./Question.scss";

export default function Question(props) {
  const [value, setValue] = React.useState();
  const [counter, setCounter] = React.useState(0);

  var result = new Array();

  // React.useEffect(() => {
  //   const timer =
  //     counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  //   console.log(timer);
  //   if (counter == 0) {
  //     nextPage();
  //   }
  // }, [counter]);

  const nextPage = () => {
    answer();
    props.nextPage();
    setCounter(10);
    setValue();
  };

  const answer = () => {
    console.log(value);
    var obj = {};
    obj[props.question.id] = value;
    result.push(obj);

    console.log(result);
  };

  const submitAnswer = (data) => {
    result[props.question.id] = value;
    props.setFieldValue("result", result);
    setValue();
    props.nextPage();
  };
  return (
    <Card className="question">
      <CardHeader>
        <strong style={{ textTransform: "capitalize" }}>
          {props.question?.major_category?.name}
        </strong>
        <p className="pull-right text-red">{counter}</p>
      </CardHeader>
      <CardHeader
        style={{
          display: "flex",

          fontSize: "12px",
        }}
      >
        {/* <h6>Instructions:</h6> */}
        <span className="ml-4">{props.question?.instructions}</span>
      </CardHeader>
      <CardBody>
        Question
        <div className="mb-2">
          <h6>{props.question?.question_text} ?</h6>

          {props.option?.data?.map((opt, ind) => {
            if (props.question?.id == opt.question_id)
              return (
                <div key={ind}>
                  <input
                    type="radio"
                    className="mr-2"
                    key={opt.question_id}
                    name="total_points"
                    onChange={() => setValue(opt.id)}
                    value={opt.id && opt.points}
                  />
                  {opt.option_text}
                </div>
              );
          })}
        </div>
      </CardBody>
      <CardFooter>
        {props.page === props.questionLength - 1 ? (
          <Button
            // disabled={timer >= 9000 ? true : false}
            block
            className="btn-success text-white mt-2 question-card ml-auto mr-auto"
            id="myButtonId"
            // type="submit"
          >
            Submit
          </Button>
        ) : (
          <Button
            block
            className="btn-warning text-white mt-2 question-card ml-auto mr-auto"
            onClick={nextPage}
            id="myButtonId"
          >
            Next
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
