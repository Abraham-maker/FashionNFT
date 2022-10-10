import React, { FC, useState } from 'react';
import Page from '../../layout/Page/Page';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import classNames from 'classnames';
import moment from 'moment';
import Card, { CardBody, CardHeader, CardTitle } from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import { priceFormat } from '../../helpers/helpers';
import data from '../../common/data/dummyEventsData';
import Avatar from '../../components/Avatar';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
import useSortableData from '../../hooks/useSortableData';
import useDarkMode from '../../hooks/useDarkMode';
import Modal, { ModalBody, ModalHeader } from '../../components/bootstrap/Modal';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';

interface ICommonUpcomingEventsProps {
  isFluid?: boolean;
}
const Collection: FC<ICommonUpcomingEventsProps> = ({ isFluid }) => {
  const { darkModeStatus } = useDarkMode();
  const { items } = useSortableData(data);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(PER_COUNT['5']);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <>

      <PageWrapper>
        <Page container='fluid'>
          <div className='row h-100'>
            <div className='col-12'>

              <div className='col-12 mb-4'>
                <FormGroup
                  id='signup-email'
                  isFloating
                  label='Tocar para buscar'>
                  <Input type='email' name='name' autoComplete='name' />
                </FormGroup>
              </div>

              <Card stretch={isFluid}>
                <CardHeader borderSize={1}>
                  <CardTitle>Colecciones:</CardTitle>
                  <Button isOutline={!darkModeStatus}
                    color='dark'
                    isLight={darkModeStatus}
                    className={classNames('text-nowrap', {
                      'border-light': !darkModeStatus,
                    })}>Agregar Coleccion</Button>
                </CardHeader>
                <CardBody className='table-responsive' isScrollable={isFluid}>
                  <table className='table table-modern'>
                    <thead style={{ textAlign: "center" }}>
                      <tr>
                        <th>Nombre</th>
                        <th>Temporada</th>
                        <th>Campa;a</th>
                        <th>Fecha Lanzamiento</th>
                        <th>Fabricacion</th>
                        <th>MarketPlace</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody style={{ textAlign: "center" }}>
                      {dataPagination(items, currentPage, perPage).map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div>
                              <div>{item.customer.name}</div>
                              <div className='small text-muted'>
                                {item.customer.email}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className='d-flex'>
                              <div className='flex-shrink-0'>
                                <Avatar
                                  src={item.assigned.src}
                                  srcSet={item.assigned.srcSet}
                                  color={item.assigned.color}
                                  size={36}
                                />
                              </div>
                              <div className='flex-grow-1 ms-3 d-flex align-items-center text-nowrap'>
                                {`${item.assigned.name} ${item.assigned.surname}`}
                              </div>
                            </div>
                          </td>
                          <td>{item.service.name}</td>
                          <td>
                            <div className='d-flex align-items-center'>
                              <span className='text-nowrap'>
                                {moment(`${item.date} ${item.time}`).format(
                                  'MMM Do YYYY, h:mm a',
                                )}
                              </span>
                            </div>
                          </td>
                          <td>{item.duration}</td>
                          <td>{item.payment && priceFormat(item.payment)}</td>
                          <td>
                            <Button
                              isOutline={!darkModeStatus}
                              color='dark'
                              isLight={darkModeStatus}
                              className={classNames('text-nowrap', {
                                'border-light': !darkModeStatus,
                              })}
                              icon='Visibility'
                              onClick={() => { setIsOpenModal(!isOpenModal) }}>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardBody>
                <PaginationButtons
                  data={items}
                  label='items'
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  perPage={perPage}
                  setPerPage={setPerPage}
                />
              </Card>
            </div>
          </div>
        </Page>
      </PageWrapper>

      <Modal size='xl' isScrollable isStaticBackdrop isCentered isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
        <ModalHeader setIsOpen={setIsOpenModal}>
          <CardTitle>Prendas:</CardTitle>
        </ModalHeader>
        <ModalBody>
          <table className='table table-modern'>
            <thead style={{ textAlign: "center" }}>
              <tr>
                <th>Coleccion</th>
                <th>SKU</th>
                <th>Rango Tallas</th>
                <th>Unidades</th>
                <th></th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {dataPagination(items, currentPage, perPage).map((item) => (
                <tr key={item.id}>
                  <td>{item.service.name}</td>
                  <td>{item.service.name}</td>
                  <td>{item.service.name}</td>
                  <td>{item.duration}</td>
                  <td>{item.payment && priceFormat(item.payment)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <PaginationButtons
            data={items}
            label='items'
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            perPage={perPage}
            setPerPage={setPerPage}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default Collection;
