# MobileSAM-in-the-Browser
<img src="img/screenshot.gif" title="Video screen capture" alt="Video screen capture" height="400">

### **Description / Rationale**
This is an example implementation of <a href="https://github.com/ChaoningZhang/MobileSAM">MobileSAM</a> in the browser. 

### **Notes**
* ONNX runtime web ver. 1.14.0 was used because it was the most compatible with MobileSAM. Unfortunately latest versions on ONNX runtime web did not show good results in segmentation tasks.
*  

### **Tech Stack**
The project was made possible thanks to <a href="https://github.com/facebookresearch/segment-anything">SAM</a>, <a href="https://github.com/ChaoningZhang/MobileSAM">MobileSAM</a> and <a href="https://github.com/vietanhdev/samexporter">SAMExporter</a> repositories. In particular, SAM's original model was used in coversion to ONNX and creating a decoder. MobileSAM's original file was used in converting to ONNX and creating encoder. SAMExporter was used in doing conversions to ONNX. Original code was adapted from Tarashish Mishra's <a href="https://github.com/sunu/SAM-in-Browser">SAM in Browser repository<a/>.
        
### **Demo**
See demo here: [Demo](https://mobilesam.glitch.me/)
