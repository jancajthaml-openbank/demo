import React from 'react'
import { useMutation } from '@apollo/react-hooks';
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import gql from 'graphql-tag';
import { GET_TOKENS } from './queries'
import { CREATE_TOKEN } from './mutations'
import { useTenant } from 'containers/Tenant'


const New = () => {
  const { tenant } = useTenant()
  const [mutate, { loading, error }] = useMutation(CREATE_TOKEN);

  const handleSubmit = (values, actions) => {
    actions.resetForm()
    mutate({
      variables: {
        tenant: tenant,
        value: values.value,
      },
      refetchQueries: [
        {
          query: GET_TOKENS,
          variables: { tenant: tenant },
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
