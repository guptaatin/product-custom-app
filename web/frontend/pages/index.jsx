import {
  Card,
  Page,
  Layout,
  TextContainer,
  useIndexResourceState,
  IndexTable,
  Badge,
  Image,
  Stack,
  Link,
  Button,
  Heading,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

import { trophyImage } from "../assets";

import { ProductsCard } from "../components";
import { useAuthenticatedFetch } from "../hooks";
import { useState, useEffect } from "react";

export default function HomePage() {
  const fetch = useAuthenticatedFetch()
  const [products, setProducts] = useState([])
  useEffect(() => {
    const Utils = async () => {
      fetch("/api/utils")
        .then((res) => res.json())
        .then((data) => { });
    };
    Utils();
  }, []);
  const handleGetProducts = () => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((newData) => {
        setProducts(newData.data)
        console.log("gswsw-->", newData)
      });
  }

  const resourceName = {
    singular: 'product',
    plural: 'products',
  };

  const rowMarkup = products.map(
    (
      product,
      index,
    ) => (
      <IndexTable.Row
        id={product.id}
        key={product.id}
        position={index}
      >
        <IndexTable.Cell>{product.id}</IndexTable.Cell>
        <IndexTable.Cell>{product.title}</IndexTable.Cell>
        <IndexTable.Cell>{product.status}</IndexTable.Cell>
        <IndexTable.Cell><img src={product.image.src} /></IndexTable.Cell>
      </IndexTable.Row>
    ),
  );
  return (
    <Page narrowWidth>
      <TitleBar title="App name" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <Button onClick={handleGetProducts}>Import Products</Button>
          <p>Total Products: {products.length}</p>
          <IndexTable
            resourceName={resourceName}
            itemCount={products.length}
            selectable={false}
            headings={[
              { title: 'Id' },
              { title: 'Title' },
              { title: 'Status' },
              { title: 'Image' },
            ]}
          >
            {rowMarkup}
          </IndexTable>
          {/* <ProductsCard /> */}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
