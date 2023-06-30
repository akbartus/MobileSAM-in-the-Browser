# MobileSAM-in-the-Browser
<img src="img/screenshot.gif" title="Video screen capture" alt="Video screen capture" height="400">

### **Description / Rationale**
This is an example implementation of <a href="https://github.com/ChaoningZhang/MobileSAM">MobileSAM</a> in the browser, enabled thanks to ONNX runtime web. 

### **Tech Stack**
The project was made possible thanks to <a href="https://github.com/facebookresearch/segment-anything">SAM</a>, <a href="https://github.com/ChaoningZhang/MobileSAM">MobileSAM</a> and <a href="https://github.com/vietanhdev/samexporter">SAMExporter</a> repositories. In particular, SAM's original model was used in coversion to ONNX and creating a decoder. MobileSAM's original file was used in converting to ONNX and creating encoder. SAMExporter was used in doing conversions to ONNX. 
        
### **Demo**
See demo of the component here: [Demo](https://lenticular-image.glitch.me/)
