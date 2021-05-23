import { React } from 'react';
import { Button, Form } from 'react-bootstrap';

const addNewComponent = () => {
    console.log("Hola");
};
const FormPedido = () => {
    return (
        <>
            <Form>
                <Form.Group controlId="formBuscarPlatillo">
                    <Form.Control as="select">
                        <option>Seleccione un platillo</option>
                    </Form.Control>
                </Form.Group>
           </Form>
        </>
    );
};
export default FormPedido;