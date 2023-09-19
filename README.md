# MobileSAM-in-the-Browser
<img src="img/screenshot.gif" title="Video screen capture" alt="Video screen capture" height="400">

### **Description / Rationale**
This is the example implementation of <a href="https://github.com/ChaoningZhang/MobileSAM">MobileSAM</a> in the browser. 

### **Notes**
* ONNX runtime web ver. 1.14.0 was used because it was the most compatible with MobileSAM. Unfortunately latest versions on ONNX runtime web did not show good results in segmentation tasks. 
* When converting SAM to encoder and decoder some options need to be played with in order to achieve the best results.
* The example uses converted MobileSAM encoder in onnx format. It can be downloaded from <a href="https://cdn.glitch.me/1bd71fd8-ee70-4d58-9594-6680f5fcdc3b/mobilesam.encoder.onnx?v=1688159510030">here</a>. There are also normal and quantized versions of the decoder, which can be found in "models" folder.

### **Tech Stack**
The project was made possible thanks to <a href="https://github.com/facebookresearch/segment-anything">SAM</a>, <a href="https://github.com/ChaoningZhang/MobileSAM">MobileSAM</a> and <a href="https://github.com/vietanhdev/samexporter">SAMExporter</a> repositories. In particular, SAM's original model was used in conversion to ONNX and creating a decoder. MobileSAM's original file was used in converting to ONNX and creating encoder. SAMExporter was used in doing conversions to ONNX.
        
### **Demo**
Demo: [Demo](https://mobilesam.glitch.me/)
