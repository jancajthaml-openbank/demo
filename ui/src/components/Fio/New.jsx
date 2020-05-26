import React from 'react'
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import gql from 'graphql-tag';
import { GET_FIO_TOKENS } from '../../resolvers';


export const CREATE_TOKEN = gql`
  mutation createFioToken($tenant: String!, $value: String!) {
    createFioToken(tenant: $tenant, value: $value) @client
  }
`;


const New = (props) => {
  const [mutate, { loading, error }] = useMutation(CREATE_TOKEN);

  const handleSubmit = (values, actions) => {
    actions.resetForm()
    mutate({
      variables: {
        tenant: props.tenant,
        value: values.value,
      },
      refetchQueries: [
        {
          query: GET_FIO_TOKENS,
          variables: { tenant: props.tenant },
        },
      ]
    })
  }

  return (
    <Formik
      initialValues={{
        value: '',
      }}
      validationSchema={Yup.object().shape({
        value: Yup.string().required('Value is required!'),
      })}
      onSubmit={handleSubmit}
      validateOnMount
    >
      {({
        values,
        errors,
        isValid,
        touched,
        isSubmitting,
        handleSubmit,
      }) => (
        <Form>
          <label htmlFor="value">Token</label>
          <Field
            autoComplete="off"
            name="value"
            type="value"
            value={values.value}
          />
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            Create
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default New
