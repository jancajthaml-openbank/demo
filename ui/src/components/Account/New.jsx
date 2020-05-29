import React from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { useTenant } from 'containers/Tenant'


const New = (props) => {
  const tenant = useTenant()

  function handleSubmit(values, actions) {
    /*
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
    */
  }

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
      validateOnMount
      onSubmit={handleSubmit}
    >
      {({
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
          <label htmlFor="currency">Currency</label>
          <Field
            autoComplete="off"
            name="currency"
            type="text"
            value={values.currency}
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
