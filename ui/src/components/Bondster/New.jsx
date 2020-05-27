import React from 'react'
import { useMutation } from '@apollo/react-hooks';
import { useTenant } from 'containers/Tenant'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import gql from 'graphql-tag';
import { GET_BONDSTER_TOKENS } from '../../resolvers';


export const CREATE_TOKEN = gql`
  mutation createBondsterToken($tenant: String!, $username: String!, $password: String!) {
    createBondsterToken(tenant: $tenant, username: $username, password: $password) @client
  }
`;


const New = () => {
  const tenant = useTenant()
  const [mutate, { loading, error }] = useMutation(CREATE_TOKEN);

  const handleSubmit = (values, actions) => {
    actions.resetForm()
    mutate({
      variables: {
        tenant: tenant,
        username: values.username,
        password: values.password,
      },
      refetchQueries: [
        {
          query: GET_BONDSTER_TOKENS,
          variables: { tenant: tenant },
        },
      ]
    })
  }

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string()
          .email('Invalid email address')
          .required('Username is required!'),
        password: Yup.string()
          .required('Password is required!'),
      })}
      onSubmit={handleSubmit}
      validateOnMount
    >
      {({
        values,
        errors,
        isValid,
        isSubmitting,
        handleSubmit,
      }) => (
        <Form>
          <label htmlFor="username">Username</label>
          <Field
            autoComplete="off"
            name="username"
            type="email"
            value={values.username}
          />
          <label htmlFor="password">Password</label>
          <Field
            autoComplete="off"
            name="password"
            type="password"
            value={values.password}
          />
          <button
            type="submit"
            disabled={loading || isSubmitting || !isValid}
          >
            Create
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default New
