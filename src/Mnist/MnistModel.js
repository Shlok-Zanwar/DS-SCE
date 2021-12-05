import axios from 'axios';
import React from 'react'
import CanvasDraw from 'react-canvas-draw';
import {post} from 'axios'


export default function MnistModel() {
    const [model, setModel] = React.useState(null);
    const canvasRef = React.useRef(null);
    const [loading, setLoading] = React.useState(true);
    const [prediction, setPrediction] = React.useState("Ill try my best to predict it correctly ... :)");

    function dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);
    
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    
        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
    
        //Old Code
        //write the ArrayBuffer to a blob, and you're done
        //var bb = new BlobBuilder();
        //bb.append(ab);
        //return bb.getBlob(mimeString);
    
        //New Code
        return new Blob([ab], {type: mimeString});
    }

    const handlePredict = async () => {
        setPrediction("loading...");
        // const image = canvasRef.current.getSaveData();
        const dataUrl = canvasRef.current.canvasContainer.children[1].toDataURL();

        var blob = dataURItoBlob(dataUrl);

        const formData = new FormData();
        formData.append('file', blob)
        setLoading(true);
        if(formData){
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            setLoading(true);
            await post("/models/mnist", formData, config)
                .then(res => {
                    setPrediction(res.data.prediction)
                })
                .catch(err => {
                    setPrediction("Error");
                })
        }
        setLoading(false);
        console.log(dataUrl);
    }
        

    return (
        <div className="main-blog-div">
            <div className="blog-title" style={{paddingTop: '0px'}} >
                Mnist Model
            </div>
            <div style={{display: 'inline-flex'}}>
                <button 
                    className="save-share-pastebin"
                    onClick={() => {canvasRef.current.clear(); setPrediction("Ill try my best to predict it correctly ... :)")}}
                >
                    Clear
                </button>
                <button
                    className="save-share-pastebin"
                    onClick={() => {canvasRef.current.undo(); setPrediction("Ill try my best to predict it correctly ... :)")}}
                >
                    Undo
                </button>

                <button 
                    className="save-share-pastebin"
                    onClick={() => handlePredict()}
                >
                    Predict
                </button>
            </div >
            <div className="blog-title" style={{fontSize: '25px', color: '#fff'}} >
            {/* <div style={{color: 'rgb(214, 99, 46)', margin: '20px', fontSize: '25px'}} > */}
                {prediction}
            </div>

            <div className="canvas-div">
                <CanvasDraw 
                backgroundColor='transparent'
                    ref={canvasRef}
                    brushRadius={3}
                    brushColor='#52BF23'
                    hideGrid={true}
                    canvasWidth={700}
                />
            </div>
        </div>
    )
}
