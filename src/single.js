import { GiphyFetch } from "@giphy/js-fetch-api";
import { Gif } from '@giphy/react-components'
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAsync } from "react-async-hook";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Table from 'react-bootstrap/Table';


const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

function GifDemo() {

  const { id } = useParams();
  const [gif, setGif] = useState(null);

  useAsync(async () => {
    const { data } = await giphyFetch.gif( id, { type: 'video' } );
    setGif(data);
    console.log(data);
    console.log(id);
  }, []);

  return gif &&
    <Container className="justify-content-center mb-3">
      <Row>
        <Col>
          <Gif gif={ gif } width={ 480 } />
        </Col>
        <Col>

        {gif.title ?
        <h5 className="mb-3"><a target="blank" href={gif.url}><strong>{gif.title}</strong></a></h5>
        : null}

        {gif.user ?
          <div className="mb-3">
            <a target="blank" href={gif.user.profile_url}>
              <Image width={40} src={gif.user.avatar_url} roundedCircle className="me-1" />
              <strong>{gif.user.display_name}</strong>
            </a>
          </div>
        : null}

        <Table striped bordered size="sm">
        <tbody>
          <tr><td>Width</td><td>{gif.images.original.width}</td></tr>
          <tr><td>Height</td><td>{gif.images.original.height}</td></tr>
          <tr><td>Frames</td><td>{gif.images.original.frames}</td></tr>
          <tr><td>MP4</td><td><a target="blank" href={gif.images.original_mp4.mp4}>Link</a></td></tr>
        </tbody>
        </Table>

        </Col>
      </Row>
    </Container>;
}


function SingleGif() {

  const { id } = useParams();
  return (
      <GifDemo id={id} />
  );

}

export default SingleGif;
