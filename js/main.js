const dimension = 1024;
let canvas = document.getElementById('canvas');
let image_embeddings;
let imageImageData

async function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    
    console.log('Clicked position:', x, y);
    document.getElementById("status").textContent = `Clicked on (${x}, ${y}). Downloading the decoder model if needed and generating mask...`;

    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = imageImageData.width;
    canvas.height = imageImageData.height;
    context.putImageData(imageImageData, 0, 0);
    context.fillStyle = 'green';
    context.fillRect(x, y, 10, 10);
    const pointCoords = new ort.Tensor(new Float32Array([x, y, 0, 0]), [1, 2, 2]);
    const pointLabels = new ort.Tensor(new Float32Array([0, -1]), [1, 2]);
    const maskInput = new ort.Tensor(new Float32Array(256 * 256), [1, 1, 256, 256]);
    const hasMask = new ort.Tensor(new Float32Array([0]), [1,]);
    const origianlImageSize = new ort.Tensor(new Float32Array([684, 1024]), [2,]);
    
    ort.env.wasm.numThreads = 1;
    const decodingSession = await ort.InferenceSession.create('models/mobilesam.decoder.quant.onnx');
    console.log("Decoder session", decodingSession);
    const decodingFeeds = {
        "image_embeddings": image_embeddings,
        "point_coords": pointCoords,
        "point_labels": pointLabels,
        "mask_input": maskInput,
        "has_mask_input": hasMask,
        "orig_im_size": origianlImageSize
    }

    start = Date.now();
    try {
        results = await decodingSession.run(decodingFeeds);
        console.log("Generated mask:", results);
        const mask = results.masks;
        const maskImageData = mask.toImageData();
        context.globalAlpha = 0.5;
        // convert image data to image bitmap
        let imageBitmap = await createImageBitmap(maskImageData);
        context.drawImage(imageBitmap, 0, 0);

    } catch (error) {
        console.log(`caught error: ${error}`)
    }
    end = Date.now();
    console.log(`generating masks took ${(end - start) / 1000} seconds`);
    document.getElementById("status").textContent = `Mask generated. Click on the image to generate new mask.`;
}

async function handleImage(img) {
    document.getElementById("status").textContent = `Uploaded image is ${img.width}x${img.height}px. Loading the encoder model (~28 MB).`;
    console.log(`Uploaded image of size ${img.width}x${img.height}`);
    const scaleX = dimension / img.width;
    const scaleY = dimension / img.height;

    ort.env.wasm.numThreads = 1;
    const resizedTensor = await ort.Tensor.fromImage(img, options = { resizedWidth: 1024, resizedHeight: 684 });
    const resizeImage = resizedTensor.toImageData();
    let imageDataTensor = await ort.Tensor.fromImage(resizeImage);
    imageImageData = imageDataTensor.toImageData();
    console.log("image data tensor:", imageDataTensor);

    canvas.width = imageImageData.width;
    canvas.height = imageImageData.height;
    let context = canvas.getContext('2d');
    context.putImageData(imageImageData, 0, 0);

    let tf_tensor = tf.tensor(imageDataTensor.data, imageDataTensor.dims);
    tf_tensor = tf_tensor.reshape([3, 684, 1024]);
    tf_tensor = tf_tensor.transpose([1, 2, 0]).mul(255);
    imageDataTensor = new ort.Tensor(tf_tensor.dataSync(), tf_tensor.shape);

    ort.env.wasm.numThreads = 1;
    const session = await ort.InferenceSession.create('models/mobilesam.encoder.onnx');
    console.log("Encoder Session", session);
    const feeds = { "input_image": imageDataTensor };
    let start = Date.now();
    let results;
    try {
        results = await session.run(feeds);
        console.log("Encoding result:", results);
        image_embeddings = results.image_embeddings;
    } catch (error) {
        console.log(`caught error: ${error}`)
        document.getElementById("status").textContent = `Error: ${error}`;
    }
    let end = Date.now();
    let time_taken = (end - start) / 1000;
    console.log(`Computing image embedding took ${time_taken} seconds`);
    document.getElementById("status").textContent = `Embedding generated in ${time_taken} seconds. Click on the image to generate a mask.`;

    canvas.addEventListener('click', handleClick);

}


function loadImage(fileReader) {
    let img = document.getElementById("original-image");
    img.onload = () => handleImage(img);
    img.src = fileReader.result;
}

// use an async context to call onnxruntime functions.
async function main() {
    let img = document.getElementById("original-image");
    document.getElementById("file-in").onchange = function (evt) {
        let target = evt.target || window.event.src, files = target.files;
        if (FileReader && files && files.length) {
            let fileReader = new FileReader();
            fileReader.onload = () => loadImage(fileReader);
            fileReader.readAsDataURL(files[0]);
        }
    };
}

main();