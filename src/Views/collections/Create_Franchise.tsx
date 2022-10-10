import React, { useState } from 'react';
import { useFormik } from 'formik';
import moment, { Moment } from 'moment';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import { demoPages } from '../../menu';
import SubHeader, {
  SubHeaderLeft,
  SubHeaderRight,
  SubheaderSeparator,
} from '../../layout/SubHeader/SubHeader';
import Page from '../../layout/Page/Page';
import showNotification from '../../components/extras/showNotification';
import Icon from '../../components/icon/Icon';
import Card, {
  CardBody,
  CardHeader,
  CardLabel,
  CardTitle,
} from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import Dropdown, {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from '../../components/bootstrap/Dropdown';
import useDarkMode from '../../hooks/useDarkMode';
import Spinner from '../../components/bootstrap/Spinner';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import Breadcrumb from '../../components/bootstrap/Breadcrumb';
import Avatar from '../../components/Avatar';
import USERS from '../../common/data/userDummyData';

const Create_Franchise = () => {
  const { themeStatus } = useDarkMode();

  const [imageSelect, setImageSelect]: any = useState(false)
  const [lastSave, setLastSave] = useState<Moment | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSave = () => {
    setIsLoading(false);
    showNotification(
      <span className='d-flex align-items-center'>
        <Icon icon='Info' size='lg' className='me-1' />
        <span>Franquicia creada con exito</span>
      </span>,
      "The user's account details have been successfully updated.",
    );
  };

  const upImage = ({ target }: any) => {
    const files = target.files[0]
    setImageSelect(URL.createObjectURL(files))
  }

  const removeImage = ({ target }: any) => {
    setImageSelect()
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      user: '',
      nif: '',
      website: '',
      location: '',
    },
    onSubmit: () => {
      setIsLoading(true);
      setTimeout(handleSave, 1000);
    },
  });

  return (
    <PageWrapper title={demoPages.editPages.subMenu.editModern.text}>
      <SubHeader>
        <SubHeaderLeft>
          <Breadcrumb
            list={[
              { title: 'Users', to: '/' },
              { title: 'Edit User', to: '/' },
            ]}
          />
          <SubheaderSeparator />
        </SubHeaderLeft>
        <SubHeaderRight>
          <Button
            icon={isLoading ? undefined : 'Save'}
            isLight
            color={'success'}
            isDisable={isLoading}
            onClick={formik.handleSubmit}>
            {isLoading && <Spinner isSmall inButton />}
            {isLoading
              ? (lastSave && 'Saving') || 'Registrando'
              : (lastSave && 'Registrado') || 'Registrar'}
          </Button>
        </SubHeaderRight>
      </SubHeader>
      <Page>
        <div className='row h-100 align-content-start'>
          <div className='col-md-12'>
            <Card>
              <CardBody>
                <div className='col-12'>
                  <div className='row g-4 align-items-center'>
                    <div className='col-lg-auto'>
                      {imageSelect ?
                        <Avatar
                          src={imageSelect}
                          rounded={3} /> :
                        <Avatar
                          src={USERS.JOHN.src}
                          rounded={3} />}
                    </div>
                    <div className='col-lg'>
                      <div className='row g-4'>
                        <div className='col-auto'>
                          <Input onChange={upImage} type='file' autoComplete='photo' />
                        </div>
                        <div className='col-auto'>
                          <Button color='dark' isLight icon='Delete' onClick={removeImage}>
                            Eliminar Logo
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <CardLabel icon='Person' iconColor='success'>
                  <CardTitle>Registra una franquicia</CardTitle>
                </CardLabel>
              </CardHeader>

              <CardBody>
                {/* Formulario */}
                <div className='row g-4'>
                  <div className='col-md-6'>
                    <FormGroup id='name' label='Nombre de la empresa' isFloating>
                      <Input
                        placeholder='Nombre de la empresa'
                        autoComplete='additional-name'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        isValid={formik.isValid}
                        isTouched={formik.touched.name}
                        invalidFeedback={formik.errors.name}
                      />
                    </FormGroup>
                  </div>

                  <div className='col-md-6'>
                    <FormGroup id='user' label='Nombre de usuario' isFloating>
                      <Input
                        placeholder='Nombre de usuario'
                        autoComplete='family-name'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.user}
                        isValid={formik.isValid}
                        isTouched={formik.touched.user}
                        invalidFeedback={formik.errors.user}
                      />
                    </FormGroup>
                  </div>

                  <div className='col-12'>
                    <FormGroup
                      id='nif'
                      label='NIF/DNI'
                      isFloating>
                      <Input
                        placeholder='NIF/DNI'
                        autoComplete='username'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nif}
                        isValid={formik.isValid}
                        isTouched={formik.touched.nif}
                        invalidFeedback={formik.errors.nif}
                      />
                    </FormGroup>
                  </div>

                  <div className='col-md-6'>
                    <FormGroup id='website' label='Website' isFloating>
                      <Input
                        placeholder='Website'
                        autoComplete='additional-name'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.website}
                        isValid={formik.isValid}
                        isTouched={formik.touched.website}
                        invalidFeedback={formik.errors.website}
                      />
                    </FormGroup>
                  </div>

                  <div className='col-md-6'>
                    <FormGroup id='location' label='Ubicacion' isFloating>
                      <Input
                        placeholder='Ubicacion'
                        autoComplete='additional-name'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.location}
                        isValid={formik.isValid}
                        isTouched={formik.touched.location}
                        invalidFeedback={formik.errors.location}
                      />
                    </FormGroup>
                  </div>
                </div>
                {/* Formulario */}
              </CardBody>
            </Card>
          </div>
        </div>

        <div className='row'>
          <div className='col-12'>
            <Card>
              <CardBody>
                <div className='row align-items-center'>
                  <div className='col-auto'>
                    <div className='row g-1'>
                      <div className='col-auto'>
                        <Button
                          className='me-3'
                          icon={isLoading ? undefined : 'Save'}
                          isLight
                          color={lastSave ? 'info' : 'success'}
                          isDisable={isLoading}
                          onClick={
                            formik.handleSubmit}>
                          {isLoading && <Spinner isSmall inButton />}
                          {isLoading
                            ? (lastSave && 'Saving') || 'Registrando'
                            : (lastSave && 'Registrado') || 'Registrar'}
                        </Button>

                      </div>
                      <div className='col-auto'>
                        <Dropdown direction='up'>
                          <DropdownToggle hasIcon={false}>
                            <Button
                              color={themeStatus}
                              icon='MoreVert'
                            />
                          </DropdownToggle>
                          <DropdownMenu isAlignmentEnd>
                            <DropdownItem>
                              <Button
                                className='me-3'
                                icon='Save'
                                isLight
                                isDisable={isLoading}
                                onClick={formik.resetForm}>
                                Reset
                              </Button>
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </Page>
    </PageWrapper>
  );
};

export default Create_Franchise;
