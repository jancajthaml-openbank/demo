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
      onNewToken,
    } = this.props

    try {
      actions.setSubmitting(true)
      const value = await createToken(tenant, values.value)
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
          value: '',
        }}
        validationSchema={Yup.object().shape({
          value: Yup.string().required('Value is required!'),
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
            <label htmlFor="value">Token</label>
            <Field
              autoComplete="off"
              name="value"
              type="value"
              value={values.value}
            />
            <div>
              <ErrorMessage name="value" />
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
