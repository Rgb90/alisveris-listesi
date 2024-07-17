import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import styled from 'styled-components';
import { nanoid } from "nanoid";
import Table from 'react-bootstrap/Table';
import IconButton from './IconButton';

const shops = [
  { id: 1, name: 'Teknosa' },
  { id: 2, name: 'Civil' },
  { id: 3, name: 'File' },
  { id: 4, name: 'Tarım Kredi Koop.' },
  { id: 5, name: 'BIM' }
];

const categories = [
  { id: 1, name: 'Oyuncak' },
  { id: 2, name: 'Şarküteri' },
  { id: 3, name: 'Teknoloji' },
  { id: 4, name: 'Fırın' },
  { id: 5, name: 'Bakliyat' },
  { id: 6, name: 'Süt Ürünleri' }
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 12px;
  padding: 24px;
`;

export function ShoppingList() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [selectedShop, setSelectedShop] = useState(shops[0].id);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

  const handleAddProduct = () => {
    const product = {
      id: nanoid(),
      name: productName,
      shop: parseInt(selectedShop),
      category: parseInt(selectedCategory)
    };
    setProducts([...products, product]);
    setProductName(""); // Add this line to clear the input field after adding a product
  };

  return (
    <>
      <h2>Ürün Ekle</h2>
      <p>Ürünlerinizi ekle butonuna basarak sıralayabilir, aldıklarınızın üzerine basarak üstünü çizebilirsiniz.</p>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Wrapper>
          <Form.Control
            aria-label='Small'
            aria-describedby='inputGroup-sizing-sm'
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
          />
          <Form.Select
            style={{ width: "25%" }}
            aria-label="Default select example"
            value={selectedShop}
            onChange={(e) => setSelectedShop(parseInt(e.target.value))}>
            <option>Market seçiniz</option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.name}
              </option>
            ))}
          </Form.Select>

          <Form.Select
            style={{ width: "25%" }}
            aria-label="Default select example"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(parseInt(e.target.value))}>
            <option>Kategori seçiniz</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>

          <Button
            type="button"
            onClick={handleAddProduct}
            variant='success'
            style={{ width: "25%" }}>
            Ekle
          </Button>
        </Wrapper>
      </Form>

      <div className='px-4'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Ürün İsmi</th>
              <th>Ürün Dükkanı</th>
              <th>Ürün Kategori</th>
              <th>Ürün Sil</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                style={{
                  textDecoration: product.isBought ? "line-through" : "unset",
                }}
                onClick={() => {
                  let copyProducts = [...products];
                  copyProducts = copyProducts.map((copyProduct) => {
                    if (copyProduct.id === product.id) {
                      copyProduct.isBought =
                        copyProduct.isBought === true ? false : true;
                    }
                    return copyProduct;
                  });
                  if (
                    copyProducts.every((product) => product.isBought === true)
                  ) {
                    alert("Alışveriş tamamlandı");
                  }
                  setProducts(copyProducts);
                }}
                key={product.id}>
                <td>{product.name}</td>
                <td>{shops.find((shop) => shop.id === product.shop)?.name}</td>
                <td>{categories.find((category) => category.id === product.category)?.name}</td>
                <td
                  onClick={(e) => {
                    e.stopPropagation();
                    const filteredProducts = products.filter(
                      (currentProduct) => currentProduct.id !== product.id
                    );
                    setProducts(filteredProducts);
                  }}
                  className='text-center'>
                  <IconButton />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
