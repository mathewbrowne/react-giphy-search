import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResizeObserver from "react-resize-observer";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const gf = new GiphyFetch("Zonr7M7Yoat89XN3MFHkNo236rLd8fLt");

function MakeGrid() {

  const searchbox = useRef(null);

  const [width, setWidth] = useState(window.innerWidth);

  const [term, setTerm] = useState("");

  const handleSearch = e => {
    e.preventDefault();
    setTerm(searchbox.current.value);
    fetchGifs();
  }

  const fetchGifs = async (offset: number) =>
    gf.search(term, { offset, limit: 10 });

  const navigate = useNavigate();

  const noResultsMessage = <div className="no-results">Nothing found for {term}</div>;

  return (
    <Container>
      <Form onSubmit={handleSearch} className="d-flex mb-3 justify-content-center">
        <Form.Control
        type="search"
        ref={searchbox}
        id="searchbox"
        name="searchbox"
        className="me-2"
        aria-label="Search"
        />
        <Button variant="outline-danger" type="submit">Search</Button>
      </Form>

    {term && (
      <div className="Grid">
      <Grid
        onGifClick={(gif, e) => {
          console.log("gif", '/gif/'+gif.id);
          e.preventDefault();
          navigate('/gif/'+gif.id);
        }}
        width={width}
        columns={4}
        gutter={6}
        noResultsMessage={noResultsMessage}
        key={term}
        fetchGifs={fetchGifs}
      />
      <ResizeObserver
        onResize={({ width }) => {
          setWidth(width);
        }}
      />
      </div>
    )}
    </Container>
  );

}

export default MakeGrid;
