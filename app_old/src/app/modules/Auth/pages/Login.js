import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import * as auth from '../_redux/authRedux'
import { login } from '../_redux/authCrud'
import { MetronicSplashScreenContext } from '../../../../_metronic/layout/_core/MetronicSplashScreen'
/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
  email: '',
  password: ''
}

function Login (props) {
  const setVisible = useContext(MetronicSplashScreenContext)
  const { intl } = props
  const [loading, setLoading] = useState(false)
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD'
        })
      ),
    password: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD'
        })
      )
  })

  useEffect(() => {
    setVisible(false)
    // eslint-disable-next-line
  }, [])

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return 'is-invalid'
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return 'is-valid'
    }

    return ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      login(values.email, values.password)
        .then((response) => {
          setLoading(false)
          props.login(response.data.accessToken)
        })
        .catch((error) => {
          console.log(error)
          setLoading(false)
          setSubmitting(false)
          if (error.response.data.type === 'user') {
            setStatus(
              intl.formatMessage({
                id: 'AUTH.VALIDATION.INVALID_USER'
              })
            )
          }
          if (error.response.data.type === 'password') {
            setStatus(
              intl.formatMessage({
                id: 'AUTH.VALIDATION.INVALID_PASSWORD'
              })
            )
          }
        })
    }
  })

  return (
    <div className='login-form login-signin' id='kt_login_signin_form'>
      {/* begin::Head */}
      <div className='text-center mb-10 mb-lg-20'>
        <h3 className='font-size-h1'>
          <FormattedMessage id='AUTH.LOGIN.TITLE' />
        </h3>
        <p className='text-muted font-weight-bold'>
          Ingrese su usuario/correo y contraseña
        </p>
      </div>
      {/* end::Head */}

      {/* begin::Form */}
      <form
        onSubmit={formik.handleSubmit}
        className='form fv-plugins-bootstrap fv-plugins-framework'
      >
        {formik.status && (
          <div className='mb-10 alert alert-custom alert-light-danger alert-dismissible'>
            <div className='alert-text font-weight-bold'>{formik.status}</div>
          </div>
        )}
        <div className='form-group fv-plugins-icon-container'>
          <input
            placeholder='Correo o usuario'
            type='text'
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              'email'
            )}`}
            name='email'
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email
            ? (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.email}</div>
              </div>)
            : null}
        </div>
        <div className='form-group fv-plugins-icon-container'>
          <input
            placeholder='Contraseña'
            type='password'
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              'password'
            )}`}
            name='password'
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password
            ? (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.password}</div>
              </div>)
            : null}
        </div>
        <div className='form-group d-flex flex-wrap justify-content-between align-items-center'>
          <Link
            to='/auth/forgot-password'
            className='text-dark-50 text-hover-primary my-3 mr-2'
            id='kt_login_forgot'
          >
            <FormattedMessage id='AUTH.GENERAL.FORGOT_BUTTON' />
          </Link>
          <button
            id='kt_login_signin_submit'
            type='submit'
            disabled={formik.isSubmitting}
            className='btn btn-primary font-weight-bold px-9 py-4 my-3'
          >
            <span>Ingrear</span>
            {loading && <span className='ml-3 spinner spinner-white' />}
          </button>
        </div>
      </form>
      {/* end::Form */}
    </div>
  )
}

export default injectIntl(connect(null, auth.actions)(Login))
