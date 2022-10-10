import React, { FC, useCallback, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import useDarkMode from '../../../hooks/useDarkMode';
import { useFormik } from 'formik';
import AuthContext from '../../../contexts/authContext';
import Spinner from '../../../components/bootstrap/Spinner';
import Checks from '../../../components/bootstrap/forms/Checks';
import Label from '../../../components/bootstrap/forms/Label';

interface ILoginHeaderProps {
	isNewUser?: boolean;
}
const LoginHeader: FC<ILoginHeaderProps> = ({ isNewUser }) => {
	if (isNewUser) {
		return (
			<>
				<div className='text-center h1 fw-bold mt-5'>Crear una cuenta,</div>
				<div className='text-center h4 text-muted mb-5'>¡Regístrese para empezar!</div>
			</>
		);
	}
	return (
		<>
			<div className='text-center h1 fw-bold mt-5'>Bienvenido,</div>
			<div className='text-center h4 text-muted mb-5'>Inicie sesión para continuar!</div>
		</>
	);
};

interface ILoginProps {
	isSignUp?: boolean;
}
const Login: FC<ILoginProps> = ({ isSignUp }) => {
	const { setUser } = useContext(AuthContext);

	const { darkModeStatus } = useDarkMode();

	const [errores, setErrores]: any = useState({})
	const [signInPassword, setSignInPassword] = useState<boolean>(false);
	const [singUpStatus, setSingUpStatus] = useState<boolean>(!!isSignUp);
	const [setDatesUser, setSetDatesUser]: any = useState({})
	const [erroresCreate, setErroresCreate]: any = useState({})
	const [checked, setChecked] = useState(false);
	const { errors, message } = errores ?? false
	const { email, password } = errors ?? false;

	const navigate = useNavigate();
	const handleOnClick = useCallback(() => navigate('/'), [navigate]);

	const handleInput = ({ target }: any) => {
		const { name, value } = target;
		setSetDatesUser({ ...setDatesUser, [name]: value });
	}

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			loginUsername: '',
			loginPassword: '',
		},
		validate: (values) => {
			const errores: { loginUsername?: string; loginPassword?: string } = {};

			if (!values.loginUsername) {
				errores.loginUsername = 'Required';
			}

			if (!values.loginPassword) {
				errores.loginPassword = 'Required';
			}

			return errores;
		},
		validateOnChange: false,
		onSubmit: (values) => {
			const Login = async () => {

				const body = {
					email: values.loginUsername,
					password: values.loginPassword
				}

				setIsLoading(true)
				await fetch("https://www.fashionft.gotopdev.com/api/v1/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json",
					},
					body: JSON.stringify(body),
				}).then(response => response.json()).then((data) => {
					setIsLoading(false)
					setErrores(data)
					if (setUser) {
						setUser(values.loginUsername);
						if (data.status === 'Success') {
							handleOnClick();
						}
					}
				})
			}
			Login();
		},
	});

	const createUser = async () => {
		setIsLoading(true)
		const body = {
			name: setDatesUser.name,
			email: setDatesUser.email,
			password: setDatesUser.password,
			password_confirmation: setDatesUser.password_confirmation,
			terms: checked
		}

		await fetch("https://www.fashionft.gotopdev.com/api/v1/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify(body),
		}).then(response => response.json())
			.then((data) => {
				setIsLoading(false)
				setErroresCreate(data)
				if (data.status === 'Success') {
					setSingUpStatus(!singUpStatus)
				}
				setTimeout(() => {
					setSetDatesUser({})
					setChecked(!checked)
				}, 1000);
			})
	}

	const [isLoading, setIsLoading] = useState<boolean>(false);

	return (
		<PageWrapper
			isProtected={false}
			title={singUpStatus ? 'Sign Up' : 'Login'}
			className={classNames({ 'bg-warning': !singUpStatus, 'bg-info': singUpStatus })}>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark' data-tour='login-page'>
							<CardBody>
								<div className='text-center my-5'>
									<Link
										to='/'
										className={classNames(
											'text-decoration-none  fw-bold display-2',
											{
												'text-dark': !darkModeStatus,
												'text-light': darkModeStatus,
											},
										)}>
									</Link>
								</div>
								<div
									className={classNames('rounded-3', {
										'bg-l10-dark': !darkModeStatus,
										'bg-dark': darkModeStatus,
									})}>
									<div className='row row-cols-2 g-3 pb-3 px-3 mt-0'>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={singUpStatus}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setSignInPassword(false);
													setSingUpStatus(!singUpStatus);
												}}>
												Iniciar sesión
											</Button>
										</div>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={!singUpStatus}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setSignInPassword(false);
													setSingUpStatus(!singUpStatus);
												}}>
												Crear cuenta
											</Button>
										</div>
									</div>
								</div>

								<LoginHeader isNewUser={singUpStatus} />
								{erroresCreate.status === 'Success' ?
									(
										<p style={{
											color: "#46bcaa",
											fontSize: "1rem",
										}}>
											Creacion de cuenta exitosa
										</p>
									) : false}
								<form className='row g-4'>
									{singUpStatus ? (
										<>
											<div className='col-12'>
												<FormGroup
													id='signup-email'
													isFloating
													label='Nombre y Apellido'>
													<Input onFocus={() => {
														setErroresCreate({});
													}} value={setDatesUser.name} type='email' name='name' autoComplete='name' onChange={handleInput} />
												</FormGroup>
												{erroresCreate?.errors?.name ?
													(
														<p style={{
															color: "#f35421",
															fontSize: "0.8rem",
															marginTop: "0.5rem"
														}}>
															{erroresCreate?.errors?.name}
														</p>
													) : false}
											</div>
											<div className='col-12'>
												<FormGroup
													id='signup-name'
													isFloating
													label='Email'>
													<Input onFocus={() => {
														setErroresCreate({});
													}} value={setDatesUser.email} autoComplete='given-name' name='email' onChange={handleInput} />
												</FormGroup>
												{erroresCreate?.errors?.email ?
													(
														<p style={{
															color: "#f35421",
															fontSize: "0.8rem",
															marginTop: "0.5rem"
														}}>
															{erroresCreate?.errors?.email}
														</p>
													) : false}
											</div>
											<div className='col-12'>
												<FormGroup
													id='signup-surname'
													isFloating
													label='Contraseña'>
													<Input onFocus={() => {
														setErroresCreate({});
													}} name="password" type='password' value={setDatesUser.password} autoComplete='family-name' onChange={handleInput} />
												</FormGroup>
												{erroresCreate?.errors?.password ?
													(
														<p style={{
															color: "#f35421",
															fontSize: "0.8rem",
															marginTop: "0.5rem"
														}}>
															{erroresCreate?.errors?.password}
														</p>
													) : false}
											</div>
											<div className='col-12'>
												<FormGroup
													id='signup-password'
													isFloating
													label='Confirmar contraseña'>
													<Input
														name="password_confirmation"
														type='password'
														value={setDatesUser.password_confirmation}
														autoComplete='password'
														onChange={handleInput}
														onFocus={() => {
															setErroresCreate({});
														}}
													/>
												</FormGroup>
												{erroresCreate?.errors?.password_confirmation ?
													(
														<p style={{
															color: "#f35421",
															fontSize: "0.8rem",
															marginTop: "0.5rem"
														}}>
															{erroresCreate?.errors?.password_confirmation}
														</p>
													) : false}
											</div>

											<FormGroup className='col-lg-12'>
												<Label>
													{erroresCreate?.errors?.terms ?
														(
															<p style={{
																color: "#f35421",
																fontSize: "0.8rem",
																marginTop: "0.5rem"
															}}>
																{erroresCreate?.errors?.terms}
															</p>
														) : false}
												</Label>
												<Checks
													type='checkbox'
													id='exampleLabelTwo'
													label='Acepto los términos y condiciones de servicio y política de privacidad'
													name="terms"
													onChange={() => { setChecked(!checked) }}
													checked={checked}
												/>
											</FormGroup>

											<div className='col-12'>
												<Button
													color='info'
													className='w-100 py-3'
													onClick={createUser}
												>
													{isLoading && (
														<Spinner isSmall inButton isGrow />
													)}
													Crear cuenta
												</Button>
											</div>
										</>
									) : (
										<>
											<div className='col-12'>
												<FormGroup
													id='loginUsername'
													isFloating
													label='Email o usuario'
													className={classNames({
														'd-none': signInPassword,
													})}>
													<Input
														autoComplete='username'
														value={formik.values.loginUsername}
														isTouched={formik.touched.loginUsername}
														invalidFeedback={
															formik.errors.loginUsername
														}
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														onFocus={() => {
															formik.setErrors({});
															setErrores({});
															setErroresCreate({})
														}}
													/>

												</FormGroup>
												{email ? <p style={{
													color: "#f35421",
													fontSize: "0.8rem",
													marginTop: "0.5rem"
												}}>{email}</p> : message === 'El email no existe' ? <p style={{
													color: "#f35421",
													fontSize: "0.8rem",
													marginTop: "0.5rem"
												}}>{message}</p> : false}

												<FormGroup
													id='loginPassword'
													isFloating
													className='mt-4'
													label='Contraseña'>
													<Input
														type='password'
														autoComplete='current-password'
														value={formik.values.loginPassword}
														isTouched={formik.touched.loginPassword}
														invalidFeedback={
															formik.errors.loginPassword
														}
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														onFocus={() => {
															formik.setErrors({});
															setErrores({});
															setErroresCreate({})
														}}
													/>
												</FormGroup>
												{password ?
													(<>
														<p style={{
															color: "#f35421",
															fontSize: "0.8rem",
															marginTop: "0.5rem"
														}}>{password}</p>
													</>
													) : false}
											</div>
											<div className='col-12'>
												<Button
													color='warning'
													className='w-100 py-3'
													isDisable={!formik.values.loginUsername}
													onClick={formik.handleSubmit}>
													{isLoading && (
														<Spinner isSmall inButton isGrow />
													)}
													Iniciar sesión
												</Button>

											</div>
										</>
									)}
								</form>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper >
	);
};
Login.propTypes = {
	isSignUp: PropTypes.bool,
};
Login.defaultProps = {
	isSignUp: false,
};

export default Login;
