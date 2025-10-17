import { ErrorMessage, Field, Form, Formik } from 'formik';
import { registerValidationSchema } from '../../formik/ValidationSchema';
import { type registerInitialValues } from '../../formik/initialValues';
import CustomButton from '../../component/iu/CustomButton/CustomButton';
import './signUpStyles.css';
import { LoaderCircle } from 'lucide-react';
import { useAuthStore } from '../../store/GymUserStore';
import { useNavigate } from 'react-router';
import { createUser } from '../../api/authService';

const initialValues: registerInitialValues = {
  username: '',
  email: '',
  password: '',
};

const RegisterForm = () => {
  const { login, setLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (values: registerInitialValues, { setSubmitting, setErrors }: { setSubmitting: (isSubmitting: boolean) => void; setErrors: (errors: object) => void; }) => {
    try {
      setLoading(true);
      const userData = await createUser(values);
      login(userData);
      navigate('/');
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'message' in error) {
        // Ejemplo: si el usuario ya existe (código 409)
        setErrors({ email: 'Este email ya está en uso.' });
      } else {
        alert(
          'Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo.',
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
      validationSchema={registerValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="form">
          <div className="formGroup">
            <label htmlFor="name-register">Nombre</label>
            <Field
              id="name-register"
              type="text"
              name="username"
              placeholder="Tu nombre"
              required
            />
            <ErrorMessage name="username" component="div" className="error" />
          </div>
          <div className="formGroup">
            <label htmlFor="email-register">Email</label>
            <Field
              id="email-register"
              name="email"
              type="email"
              placeholder="nombre@ejemplo.com"
              required
            />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="formGroup">
            <label htmlFor="password-register">Contraseña</label>
            <Field
              id="password-register"
              name="password"
              type="password"
              required
            />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <CustomButton type="submit" disabled={isSubmitting} size="mediun">
            {isSubmitting && <LoaderCircle className="loadingIcon" />}
            Crear Cuenta
          </CustomButton>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
