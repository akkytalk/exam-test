import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router";
import { Card, CardBody, CardFooter, CardHeader, Form, Button } from "reactstrap";
import { removeLogin } from "../reduxStore/actions/LoginCreators";
import { withRouter } from "react-router-dom";

import "./Home.css";
import axios from "axios";
import { baseUrl } from "../shared/baseUrl";
import { Formik } from "formik";
import Question from "./Form/Question";



function Home(props) {
  const accessToken = `${props.login?.login?.data?.token}`;

  const authAxios = axios.create({
    baseURL: baseUrl,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const [redirect, setRedirect] = useState(false);
  const [question, setQuestion] = useState([]);
  const [option, setOption] = useState([]);
  const [Category, setCategory] = useState([]);

  const [categoryPage, setCategoryPage] = useState([]);
  const [questionPage, setQuestionPage] = useState([]);
  const [index, setIndex] = useState(1);

  const [page, setPage] = useState(0)

  useEffect(() => {
    authAxios
      .get("/questions")
      .then((res) => {
        console.log("questions response data", res.data);
        setQuestion(res.data);
        // setPage(res.data);

      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    authAxios
      .get("/options")
      .then((res) => {
        console.log("options response data", res.data);
        setOption(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("question", question);
  console.log("cetorgy", Category);
  console.log("options", option);
  // const current = Category?.data;
  // console.log("current", current);


  // console.log("categorty page", page?.data?.length);


  // console.log("usertoken", props.login?.login?.data?.token);

  async function handleLogout() {

    await props.removeLogin();

    setRedirect(true);
  }

  const [viewCount, setViewCount] = useState(1);
  const [viewCount2, setViewCount2] = useState(1);

  const handleViewMore = () => {
    setViewCount(viewCount + 1);

  };

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={'/login'} />;
    }
  };

  console.log(page);

  let initialValues;

  if (question?.data?.length !== 0) {
    initialValues = {
      form1: ''
    }
  }

  const currentYear = new Date().getFullYear();
  if (props.login?.login.length === 0) {
    return <Redirect to={'/login'} />;
  }
  else if (!props.login?.login.access_token) {
    return (
      <Fragment>
        {renderRedirect()}
        <div className="main-field">
          <Card className="question-card">
            <CardHeader>
              <strong>Instructions</strong>
              <Button className="float-right btn-danger" onClick={() => handleLogout()}>Logout</Button>
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

        <Formik initialValues={{ initialValues }}
          render={formProps => {
            return (
              <Form>
                {
                  question.length !== 0 ?
                    <>
                      <Question question={question?.data[page]} option={option} />
                      {
                        page === question?.data.length - 1 ?
                          (<Button block className="float-right btn-success text-white mt-5">
                            Submit
                          </Button>)
                          :
                          (<Button block className="float-right btn-warning text-white mt-5" onClick={() => setPage(page + 1)}>
                            Next
                          </Button>)
                      }
                    </>
                    : null
                }


              </Form>
            )
          }}
        />

        {/* {viewCount < Category?.data?.length && (
        <button
          className="projects-view-button"
          variant="contained"
          color="primary"
          onClick={handleViewMore}
        >
          next
        </button>
      )} */}

        {/* <div className="main-field">
        <Card className="question-card">
          <CardHeader>
            <span> Category | Sub Category</span>
            <span className="float-right">Timer: 10s</span>
          </CardHeader>
          <CardBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            sit amet suscipit erat, id auctor ipsum. Maecenas hendrerit sed odio
            a cursus. Aliquam elementum tempus sapien ut molestie. Nam non
            venenatis sapien. Sed vitae mattis ex, et pulvinar felis. Quisque
            vitae diam non felis facilisis iaculis aliquet quis nibh.
          </CardBody>
        </Card>
      </div> */}

      </Fragment>
    );

  } else {
    return <div>hello</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeLogin: () => {
    dispatch(removeLogin());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
