import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import styled from 'styled-components';


const shops = [{
  id: 1,
  name: 'Tarım Kredi Koop.'
}, {
  id: 2,
  name: 'Teknosa'
}, {
  id: 3,
  name: 'BIM'
}, {
  id: 4,
  name: 'File'
}];

const categories = [{
  id: 1,
  name: 'Bakliyat'
}, {
  id: 2,
  name: 'Şarküteri'
}, {
  id: 3,
  name: 'Teknoloji'
}, {
  id: 4,
  name: 'Fırın'
}];

const Wrapper = styled.div`
display: flex;
flex-direction: row;
align-items: end;
gap: 12px;
padding: 24px;
`

export function ShoppingList() {
const [products, setProducts] = useState([]);

  return (
    <Form>
      <Wrapper>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Ürün adı giriniz</Form.Label>
          <Form.Control 
          type="text" />
        </Form.Group>

        <Form.Select 
        style={{ width: "25%" }}
        aria-label="Default select example">
          <option>Market seçiniz</option>
          {shops.map((shop) => (
            <option key={shops.id} value={shops.id}>
              {shop.name}
            </option>
          ))}
        </Form.Select>

        <Form.Select
        style={{ width: "25%" }}
        aria-label="Default select example">
          <option>Kategori seçiniz</option>
          {categories.map((category) => (
            <option key={categories.id} value={categories.id}>
              {category.name}
            </option>
          ))}
        </Form.Select>
        <Button variant='success'>Ekle</Button>
      </Wrapper>
    </Form>
  );
}; 