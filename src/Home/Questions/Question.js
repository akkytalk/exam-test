import React from "react";
//import Timer from "react-compound-timer/build";
import { Card, CardHeader, CardBody, CardFooter, Button } from "reactstrap";

import Moment from "react-moment";
import moment from "moment";
import Countdown from "react-countdown";

import "./Question.scss";

export default function Question(props) {
  // setInterval(function () {
  //   $("#resetbutton").click();
  // }, 10000);

  const [counter, setCounter] = React.useState(10);
  const [value, setValue] = React.useState();
  let result = {};

  React.useEffect(() => {
    const timer =
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter == 0) {
      props.nextPage();
    }
    return () => {
      if (counter == 0) {
        console.log(counter);
        setCounter(10);
      }
      clearInterval(timer);
    };
  }, [counter]);

  const start = moment().subtract(-10, "seconds");

  // const onComplete = () => {
  //   props.nextPage();
  //   Countdown.start();
  // };

  console.log(value);
  const submitAnswer = (data) => {
    result[props.question.id] = value;
    console.log(result);
    props.setFieldValue("result", result);
    setValue();
    props.nextPage();
  };
  console.log(result);
  console.log(props);
  return (
    <Card className="question">
      <CardHeader>
        <strong style={{ textTransform: "capitalize" }}>
          {props.question?.major_category?.name}
        </strong>
        <p className="float-right" style={{ color: "#f00" }}>
          {/* <Countdown date={Date.now() + 10000} onComplete={props.nextPage} /> */}
          {counter}
          {/* <Moment
            interval={1000}
            date={start}
            format="mm:ss"
            durationFromNow
          ></Moment> */}
          {/* {props.timer} Seconds */}
          {/* <Timer
            initialTime={10000}
            direction="backward"
            onReset={() => console.log("onReset hook")}
            checkpoints={[
              {
                time: 5000,
                callback: () => console.log("Checkpoint B"),
              },
              {
                time: 10000,
                callback: () => console.log("Checkpoint B"),
              },
            ]}
          >
            {({ start, resume, pause, stop, reset, timerState }) => (
              <React.Fragment>
                <div>
                  <Timer.Seconds /> seconds
                </div>
                <div>{timerState}</div>

                <div>
                  <button onClick={start}>Start</button>
                  <button onClick={pause}>Pause</button>
                  <button onClick={resume}>Resume</button>
                  <button onClick={stop}>Stop</button>
                  <button onClick={reset} id="resetbutton"></button>
                </div>
              </React.Fragment>
            )}
          </Timer> */}
        </p>
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
            onClick={submitAnswer}
            id="myButtonId"
          >
            Next
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
