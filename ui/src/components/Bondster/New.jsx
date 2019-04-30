import React from 'react'

import PropTypes from 'prop-types'

import * as Yup from 'yup'

import { Formik, Form, Field, ErrorMessage } from 'formik'

class New extends React.Component {

  static propTypes = {
    tenant: PropTypes.string.isRequired,
    createToken: PropTypes.func.isRequired,
    onNewToken: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(values, actions) {
    const {
      tenant,
      createToken,
      onNewToken
    } = this.props

    try {
      actions.setSubmitting(true)
      const value = await createToken(tenant, values.username, values.password)
      if (onNewToken) {
        onNewToken(value)
      }
    } catch(err) {
      console.log('err', err)
    } finally {
      actions.setSubmitting(false)
      actions.resetForm()
    }
  }

  render() {

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
        onSubmit={this.handleSubmit}
        render={({
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
            <div>
              <ErrorMessage name="username" />
            </div>
            <label htmlFor="password">Password</label>
            <Field
              autoComplete="off"
              name="password"
              type="password"
              value={values.password}
            />
            <div>
              <ErrorMessage name="password" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              Create
            </button>
          </Form>
        )}
      />
    )
  }
}

export default New
