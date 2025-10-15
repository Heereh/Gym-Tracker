import { ErrorMessage, Field, Form, Formik } from 'formik';
import { loginValidationSchema } from '../../formik/ValidationSchema';
import { type initialValuesLogin } from '../../formik/initialValues';
import CustomButton from '../../component/iu/CustomButton/CustomButton';
import { LoaderCircle } from 'lucide-react';
import './signUpStyles.css';
import { useAuthStore } from '../../store/GymUserStore';
import { useNavigate } from 'react-router';
import { loginUser } from '../../api/authService';

const initialValues: initialValuesLogin = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const { login, setLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setLoading(true);
      const userData = await loginUser(values);
      login({ user: userData.user, token: userData.token });
      navigate('/');
    } catch (error) {
      if (error.response?.status === 401) {
        setErrors({ email: 'Credenciales incorrectas' });
      } else {
        alert(
          'Hubo un error al iniciar sesión. Por favor, inténtalo de nuevo.',
        );
      }
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="form">
          <div className="formGroup">
            <label htmlFor="email-login">Email</label>
            <Field
              id="email-login"
              name="email"
              type="email"
              placeholder="nombre@ejemplo.com"
              required
            />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="formGroup">
            <label htmlFor="password-login">Contraseña</label>
            <Field
              id="password-login"
              name="password"
              type="password"
              required
            />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <CustomButton type="submit" disabled={isSubmitting} size="mediun">
            {isSubmitting && <LoaderCircle className="loadingIcon" />}
            Iniciar Sesión
          </CustomButton>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
