import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom'; // For accessing passed state
import { fabric } from 'fabric'; // Correct import of fabric
import '../App.css';

const AddCaptionPage = () => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const location = useLocation(); // To get the image URL from navigation
  const { imageUrl } = location.state || {}; // Extract the image URL passed from SearchPage

  console.log('Received image URL:', imageUrl); // Debug log

  const convertImageToBase64 = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result); // Base64-encoded data URL
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  };
  
  useEffect(() => {
    if (canvasRef.current) {
      fabricCanvasRef.current = new fabric.Canvas(canvasRef.current);
  
      if (imageUrl) {
        console.log('Loading image on canvas:', imageUrl);
        
        // Convert the image to a base64 data URL
        convertImageToBase64(imageUrl, (dataUrl) => {
          fabric.util.loadImage(
            dataUrl,
            (img) => {
              const fabricImage = new fabric.Image(img);
              fabricImage.scaleToWidth(400); // Scale the image
              fabricCanvasRef.current.add(fabricImage); // Add the image to the canvas
              fabricCanvasRef.current.renderAll(); // Render the canvas
            },
            {
              crossOrigin: 'anonymous',
            }
          );
        });
      } else {
        console.error('Image URL not available');
      }
    }
  
    return () => {
      fabricCanvasRef.current?.dispose();
    };
  }, [imageUrl]);
  

  const addText = () => {
    const text = new fabric.Textbox('Your caption here', {
      left: 50,
      top: 50,
      fontSize: 20,
      fill: '#000', // Black text
    });
    fabricCanvasRef.current.add(text);
  };

  const addShape = (shapeType) => {
    let shape;
    switch (shapeType) {
      case 'circle':
        shape = new fabric.Circle({
          radius: 50,
          fill: 'red',
          left: 100,
          top: 100,
        });
        break;
      case 'rect':
        shape = new fabric.Rect({
          width: 100,
          height: 100,
          fill: 'blue',
          left: 150,
          top: 150,
        });
        break;
      default:
        return;
    }
    fabricCanvasRef.current.add(shape);
  };

  const downloadImage = () => {
    const dataURL = fabricCanvasRef.current.toDataURL({ format: 'png' });
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas_image.png';
    link.click();
  };

  return (
    <div className="canvas-container">
      {/* Canvas element where fabric.js operates */}
      <canvas ref={canvasRef} width={500} height={500}></canvas>

      {/* Controls to add elements and download canvas */}
      <div className="controls">
        <button onClick={addText}>Add Caption</button>
        <button onClick={() => addShape('circle')}>Add Circle</button>
        <button onClick={() => addShape('rect')}>Add Rectangle</button>
        <button onClick={downloadImage}>Download</button>
      </div>
    </div>
  );
};

export default AddCaptionPage;
