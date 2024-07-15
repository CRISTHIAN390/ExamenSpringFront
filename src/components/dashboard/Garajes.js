import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import { fetchGarajes, addGaraje, updateGaraje, deleteGaraje } from '../../services/garajesService';

const Garajes = () => {
  const [garajes, setGarajes] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentGaraje, setCurrentGaraje] = useState({ id: '', direccion: '', estado: '' });

  useEffect(() => {
    loadGarajes();
  }, []);

  const loadGarajes = async () => {
    try {
      const data = await fetchGarajes();
      setGarajes(data);
    } catch (error) {
      console.error('Error fetching garajes:', error);
    }
  };

  const toggleModal = () => setModal(!modal);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentGaraje({ ...currentGaraje, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'add') {
        await addGaraje(currentGaraje);
      } else if (modalType === 'edit') {
        await updateGaraje(currentGaraje.id, currentGaraje);
      }
      toggleModal();
      loadGarajes();
    } catch (error) {
      console.error('Error saving garaje:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGaraje(id);
      loadGarajes();
    } catch (error) {
      console.error('Error deleting garaje:', error);
    }
  };


  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h2" className="border-bottom p-3 mb-0">
            LISTA DE GARAJES
          </CardTitle>
          <CardBody>
            <Button className="btn" color="success" onClick={() => { setModalType('add'); setCurrentGaraje({ id: '', direccion: '', estado: '' }); toggleModal(); }}>
              Agregar
            </Button>
            <br /> <br />
            <Table bordered>
              <thead className="text-center">
                <tr>
                  <th>N°</th>
                  <th>Dirección</th>
                  <th>Estado</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {garajes.map(garaje => (
                  <tr key={garaje.id}>
                    <th scope="row">{garaje.id}</th>
                    <td>{garaje.direccion}</td>
                    <td>{garaje.estado ? 'Activo' : 'Inactivo'}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center">
                        <div className="button-group">
                          <Button className="btn" color="warning" onClick={() => { setModalType('edit'); setCurrentGaraje(garaje); toggleModal(); }}>
                            Editar
                          </Button>
                          <Button className="btn" color="danger" onClick={() => { setModalType('delete'); setCurrentGaraje(garaje); toggleModal(); }}>
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>

      {/* Modal para Agregar/Editar */}
      <Modal isOpen={modal && (modalType === 'add' || modalType === 'edit')} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{modalType === 'add' ? 'Agregar Garaje' : 'Editar Garaje'}</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="direccion">Dirección</Label>
              <Input type="text" name="direccion" id="direccion" value={currentGaraje.direccion} onChange={handleInputChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="estado">Estado</Label>
              <Input type="select" name="estado" id="estado" value={currentGaraje.estado} onChange={handleInputChange} required>
                <option value="">Seleccionar</option>
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </Input>
            </FormGroup>
            <ModalFooter>
              <Button color="primary" type="submit">Guardar</Button>{' '}
              <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>

      {/* Modal para Eliminar */}
      <Modal isOpen={modal && modalType === 'delete'} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Confirmación</ModalHeader>
        <ModalBody>
          ¿Estás seguro de que deseas eliminar el garaje con ID: {currentGaraje.direccion}?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => { handleDelete(currentGaraje.id); toggleModal(); }}>Eliminar</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </Row>
  );
};

export default Garajes;