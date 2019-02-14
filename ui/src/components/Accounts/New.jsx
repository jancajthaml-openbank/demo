import React from 'react'

import PropTypes from 'prop-types'

import * as Yup from 'yup'

import { Formik, Form, Field, ErrorMessage } from 'formik'

class New extends React.Component {

  static propTypes = {
    tenant: PropTypes.string.isRequired,
    createAccount: PropTypes.func.isRequired,
    onNewAccount: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(values, actions) {
    const {
      tenant,
      createAccount,
      onNewAccount,
    } = this.props

    try {
      actions.setSubmitting(true)
      const { accountNumber } = await createAccount(
        tenant,
        values.accountNumber,
        values.currency,
        values.isBalanceCheck
      )
      if (onNewAccount) {
        onNewAccount(accountNumber)
      }
    } catch(err) {
      console.log('err')
    } finally {
      actions.setSubmitting(false)
      actions.resetForm()
    }
  }

  render() {

    return (
      <Formik
        initialValues={{
          accountNumber: '',
          currency: '',
          isBalanceCheck: true,
        }}
        validationSchema={Yup.object().shape({
          accountNumber: Yup.string()
            .required('Account Number is required!'),
          currency: Yup.string()
            .required('Currency is required!')
            .uppercase('Currency must be uppercase!')
            .length(3, 'Currency must be 3 characters!'),
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
            <label htmlFor="accountNumber">Account Number</label>
            <Field
              autoComplete="off"
              name="accountNumber"
              type="text"
              value={values.accountNumber}
            />
            <div>
              <ErrorMessage name="username" />
            </div>
            <label htmlFor="currency">Currency</label>
            <Field
              autoComplete="off"
              name="currency"
              type="text"
              value={values.currency}
            />
            <div>
              <ErrorMessage name="currency" />
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
