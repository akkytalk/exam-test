// import React, { Fragment, useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { Redirect } from "react-router";
// import { Card, CardBody, CardHeader, CardFooter, Form, Button } from "reactstrap";
// import { removeLogin } from "../reduxStore/actions/LoginCreators";
// import { withRouter } from "react-router-dom";
// import $ from "jquery";


// import "./Home.css";
// import axios from "axios";
// import { baseUrl } from "../shared/baseUrl";
// import { Formik } from "formik";
// import Question from "./Questions/Question";


// function Home(props) {
//   const accessToken = `${props.login?.login?.data?.token}`;

//   const authAxios = axios.create({
//     baseURL: baseUrl,
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });

//   const [redirect, setRedirect] = useState(false);
//   const [question, setQuestion] = useState([]);
//   const [option, setOption] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [user, setUser] = useState([]);

//   const [page, setPage] = useState(0);

//   useEffect(() => {
//     authAxios
//       .get("/questions")
//       .then((res) => {
//         console.log("questions response data", res.data);
//         setQuestion(res.data);
//         // setPage(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   useEffect(() => {
//     authAxios
//       .get("/options")
//       .then((res) => {
//         console.log("options response data", res.data);
//         setOption(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   useEffect(() => {
//     authAxios
//       .get("/categories")
//       .then((res) => {
//         console.log("categories response data", res.data);
//         setCategory(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   useEffect(() => {
//     authAxios
//       .get(`/users/${1}`)
//       .then((res) => {
//         console.log("categories response data", res.data);
//         setUser(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   useEffect(() => {
//     setTimeout(() => {
//       setPage(page + 1);
//     }, 10000);
//   }, [page]);

//   // const [timer, setTimer] = useState(10);

//   const startTestHandle = () => {
//     // if (timer !== -1) {
//     //   setTimeout(() => {
//     //     setTimer((timer) => timer - 1);
//     //   }, 1000);
//     // }
//   }

//   const stopTestHandle = () => {
//     // if (timer !== -1) {
//     //   setTimeout(() => {
//     //     setTimer((timer) => timer - 1);
//     //   }, 1000);
//     // }
//   }
//   // useEffect(() => {
//   //   if (timer !== -1) {
//   //     setTimeout(() => {
//   //       setTimer((timer) => timer - 1);
//   //     }, 1000);
//   //   }
//   // }, [timer]);

//   // useEffect(() => {
//   //   if (timer === -1) {
//   //     setTimer(10);
//   //   }
//   // }, [timer]);

//   // console.log("timer", timer);

//   // useEffect(() => {
//   //   setInterval(function () {
//   //     setTimer((timer) => timer - 1);

//   //   }, 1000);
//   // }, [timer])
//   // setInterval(function () {
//   //   $("#myButtonId").click();
//   // }, 10000);

//   console.log("question", question);
//   console.log("cetorgy", category);
//   console.log("options", option);
//   console.log("user", user?.data?.id);

//   // console.log("categorty page", page?.data?.length);

//   // console.log("usertoken", props.login?.login?.data?.token);

//   async function handleLogout() {
//     await props.removeLogin();

//     setRedirect(true);
//   }

//   const renderRedirect = () => {
//     if (redirect) {
//       return <Redirect to={"/login"} />;
//     }
//   };

//   const nextPage = () => {
//     setPage(page + 1);
//     // setTimer(10);
//   };

//   console.log(page);

//   let initialValues;

//   if (question?.data?.length !== 0) {

//     initialValues = {
//       user_id: user?.data?.id,
//       total_points: ""
//     };
//   }
//   console.log("initialValues", initialValues);


//   async function sumbitHandle(e) {
//     e.preventDefault();
//     setPage(page + 1);
//     authAxios
//       .post("/results", initialValues)
//       .then((res) => {
//         console.log("intial value is submited to results");

//       })
//       .catch((err) => console.log(err));
//   }



//   if (props.login?.login.length === 0) {
//     return <Redirect to={"/login"} />;
//   } else if (!props.login?.login.access_token) {
//     return (
//       <Fragment>
//         {renderRedirect()}
//         <div className="main-field">
//           <Card className="question-card mt-2">
//             <CardHeader>
//               <strong>Instructions</strong>
//               <Button
//                 className="float-right btn-danger"
//                 onClick={() => handleLogout()}
//               >
//                 Logout
//               </Button>
//             </CardHeader>
//             <CardBody>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
//               sit amet suscipit erat, id auctor ipsum. Maecenas hendrerit sed
//               odio a cursus.
//             </CardBody>
//             <CardFooter>
//               <Button
//                 className="float-left btn-success"
//                 onClick={startTestHandle}
//               >
//                 Start Test
//               </Button><Button
//                 className="float-right btn-danger"
//                 onClick={stopTestHandle}
//               >
//                 Stop Test
//               </Button>
//             </CardFooter>
//           </Card>
//         </div>

//         <Formik
//           initialValues={{ initialValues }}
//           onSubmit={sumbitHandle}
//           render={(formProps) => {
//             return (
//               <Form>
//                 {question.length !== 0 ? (
//                   <>
//                     <Question
//                       question={question?.data[page]}
//                       option={option}
//                       category={category}
//                     // timer={timer}

//                     />
//                     {page === question?.data.length - 1 ? (
//                       <Button
//                         block
//                         className="btn-success text-white mt-2 question-card ml-auto mr-auto"
//                         id="myButtonId"
//                       // type="submit"
//                       >
//                         Submit
//                       </Button>
//                     ) : (
//                         <Button
//                           block
//                           className="btn-warning text-white mt-2 question-card ml-auto mr-auto"
//                           onClick={nextPage}
//                           id="myButtonId"
//                           onClick={sumbitHandle}
//                         >
//                           Next
//                         </Button>
//                       )}
//                   </>
//                 ) : null}
//               </Form>
//             );
//           }}
//         />
//       </Fragment>
//     );
//   } else {
//     return <div>hello</div>;
//   }
// }
// const mapStateToProps = (state) => {
//   return {
//     login: state.login,
//   };
// };

// const mapDispatchToProps = (dispatch) => ({
//   removeLogin: () => {
//     dispatch(removeLogin());
//   },
// });

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
