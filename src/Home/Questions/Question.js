import React from "react";
import Timer from "react-compound-timer/build";
import { Card, CardHeader, CardBody } from "reactstrap";
import $ from "jquery";

import "./Question.scss";

export default function Question(props) {
  // setInterval(function () {
  //   $("#resetbutton").click();
  // }, 10000);

  return (
    <Card className="question">
      <CardHeader>
        <strong style={{ textTransform: "capitalize" }}>
          {props.question?.category?.name}
        </strong>
        <p className="float-right" style={{ color: "#f00" }}>
          {props.timer} Seconds
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
      <CardBody>
        Question
        <div className="mb-2">
          {props.question?.category?.id === props.question?.category_id ? (
            <h6>{props.question?.question_text} ?</h6>
          ) : null}

          {props.option?.data?.map((opt, ind) => {
            if (props.question?.id == opt.question_id)
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
  );
}