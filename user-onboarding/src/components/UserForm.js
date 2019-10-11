import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from 'yup';
import axios from 'axios';

function UserForm(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (props.status) {
      setUsers([...users, props.status])
    }
  }, [props.status]);

  return (
    <div className="user-form">
        <Form>
          <Field type="text" name="name" placeholder="  Name" />
          {props.touched.name && props.errors.name && (
            <p className="error">{props.errors.name}</p>
          )}
          <Field type="email" name="email" placeholder="  Email Address" />
          {props.touched.email && props.errors.email && (
            <p className="error">{props.errors.email}</p>
          )}
          <Field type="password" name="password" placeholder="  Password" />
          {props.touched.password && props.errors.password && (
            <p className="error">{props.errors.password}</p>
          )}
          <label className="checkbox-container">
            <Field 
              type="checkbox"
              name="tos"
              checked={props.values.tos}
              />
              {props.touched.tos && props.errors.tos && 
                (<p className="error">{props.errors.tos}</p>)}
              Accept Terms of Service
          </label>
          <button type="submit">Submit</button>
        </Form>
      </div>   
  )
};

const myMapPropsToValues = props => {
  console.log("myMapPropsToValues", props)
  const returnObj = {
    name: props.name || "",
    email: props.email || "",
    password: props.password || "",
    tos: props.tos || false
  };
  return returnObj;
};

const myHandleSubmit = (values, { setStatus }) => {
  console.log("submit pressed!")
  axios
    .post("https://reqres.in/api/users", values)
    .then(response => {
      console.log(response);
      setStatus(response.data)
    })
    .catch(error => console.log(error));
};

const yupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least two characters long")
    .required('Please include your name'),
  email: Yup.string()
    .min(6, 'Email address must be at least 6 characters')
    .email('Email address is not valid')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, "Password is too long")
    .required('Password is required'),
  tos: Yup.bool()
  .oneOf([true], 'You must agree to the Terms of Service')
  .required('You must agree to the Terms of Service')  
})

const formikObj = {
  mapPropsToValues: myMapPropsToValues,
  handleSubmit: myHandleSubmit,
  validationSchema: yupSchema
}

const EnhancedFormHOC = withFormik(formikObj);

const EnhancedUserForm = EnhancedFormHOC(UserForm);

export default EnhancedUserForm;