import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from "formik";

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
          <Field type="text" name="name" placeholder="Name" />
          {props.touched.name && props.errors.name && (
            <p className="error">{props.errors.name}</p>
          )}
          <Field type="email" name="email" placeholder="Email Address" />
          {props.touched.email && props.errors.email && (
            <p className="error">{props.errors.email}</p>
          )}
          <Field type="password" name="password" placeholder="Password" />
          {props.touched.password && props.errors.password && (
            <p className="error">{props.errors.password}</p>
          )}
          <label className="checkbox-container">
            <Field 
              type="checkbox"
              name="TOS"
              checked={props.values.TOS}
              />
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
  };
  return returnObj;
};


const formikObj = {
  mapPropsToValues: myMapPropsToValues 
}

const EnhancedFormHOC = withFormik(formikObj);

const EnhancedUserForm = EnhancedFormHOC(UserForm);

export default EnhancedUserForm;