// import React, { Fragment, useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { Redirect, useHistory } from "react-router";
// import { Card, CardBody, CardHeader } from "reactstrap";
// import { removeLogin } from "../reduxStore/actions/LoginCreators";
// import { withRouter } from "react-router-dom";

// import "./Home.css";
// import axios from "axios";
// import { baseUrl } from "../shared/baseUrl";



// function Home(props) {
//   const accessToken = `${props.login?.login?.data?.token}`;

//   const authAxios = axios.create({
//     baseURL: baseUrl,
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });

//   const [redirect, setRedirect] = useState(false);
//   const [question, setQuestion] = useState([]);
//   const [option, setOption] = useState([]);
//   const [Category, setCategory] = useState([]);

//   useEffect(() => {
//     authAxios
//       .get("/questions")
//       .then((res) => {
//         console.log("questions response data", res.data);
//         setQuestion(res.data);
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

//   console.log("question", question);
//   console.log("cetorgy", Category);
//   console.log("options", option);
//   console.log("accessToken", props.login?.login?.data?.token);
//   // console.log("usertoken", props.login?.login?.data?.token);

//   async function handleLogout() {
//     // localStorage.removeItem("usertoken");
//     await props.removeLogin();

//     setRedirect(true);
//   }

//   const [viewCount, setViewCount] = useState(1);

//   const handleViewMore = () => {
//     setViewCount(viewCount + 1);
//   };

//  const renderRedirect = () => {
//     if (redirect) {
//       return <Redirect to={'/login'} />;
//     }
//   };

//   const currentYear = new Date().getFullYear();
//   if (props.login?.login.length === 0) {
//     return <Redirect to={'/login'} />;
//   } 
//   else if (!props.login?.login.access_token) {
//     return (
//     <Fragment>
//       {renderRedirect()}
//       <div className="main-field">
//         <Card className="question-card">
//           <CardHeader>
//             <strong>Instructions</strong>
//           </CardHeader>
//           <CardBody>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
//             sit amet suscipit erat, id auctor ipsum. Maecenas hendrerit sed odio
//             a cursus. Aliquam elementum tempus sapien ut molestie. Nam non
//             venenatis sapien. Sed vitae mattis ex, et pulvinar felis. Quisque
//             vitae diam non felis facilisis iaculis aliquet quis nibh.
//           </CardBody>
//         </Card>
//       </div>
//       {Category?.data?.slice(0, viewCount).map((Category, ind) => (
//         <div key={ind} className="main-field">
//           <Card key={ind} className="question-card">
//             <CardHeader>
//               <strong>{Category.name}</strong>
//             </CardHeader>
//             <CardBody key={ind}>
//               {question?.data?.slice(0, viewCount).map((question, ind) => {
//                 // console.log("category id", question.category_id);
//                 if (Category.id == question.category_id)
//                   return (
//                     <div className="mb-2">
//                       {" "}
//                       {question.question_text} ?
//                       {option?.data?.map((opt, ind) => {
//                         if (question.id == opt.question_id)
//                           return (
//                             <div>
//                               <input
//                                 type="radio"
//                                 className="mr-2"
//                                 key={opt.question_id}
//                                 name="option_text"
//                                 value={opt.id}
//                               />
//                               {opt.option_text}
//                             </div>
//                           );
//                       })}
//                     </div>
//                   );
//               })}
//             </CardBody>
//           </Card>
//         </div>
//       ))}

//       {viewCount < Category?.data?.length && (
//         <button
//           className="projects-view-button"
//           variant="contained"
//           color="primary"
//           onClick={handleViewMore}
//         >
//           VIEW MORE
//         </button>
//       )}

//       {/* <div className="main-field">
//         <Card className="question-card">
//           <CardHeader>
//             <span> Category | Sub Category</span>
//             <span className="float-right">Timer: 10s</span>
//           </CardHeader>
//           <CardBody>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
//             sit amet suscipit erat, id auctor ipsum. Maecenas hendrerit sed odio
//             a cursus. Aliquam elementum tempus sapien ut molestie. Nam non
//             venenatis sapien. Sed vitae mattis ex, et pulvinar felis. Quisque
//             vitae diam non felis facilisis iaculis aliquet quis nibh.
//           </CardBody>
//         </Card>
//       </div> */}
//       <button onClick={() => handleLogout()}> logout</button>
//     </Fragment>
//   );

// } else
// {
//   return <div>hello</div>;
// }
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
