# PSA CAN Bridge setup page

### What is it ?
This is the source code of the web page running in my [PSA CAN protocol bridge][psacanbridge]. It is used to configure the hardware easily from your web browser.

It is written using Preact and TypeScript.

### Installation

If you just want to use the converter, you don't need to worry about this repository as the output of this is included there. You need this if you want to add a new configurable element, or you found a bug, and want to fix it.

### Building the project

In order to build this you need npm. You need to install the required packages with **restore_packages.bat**. You can run it locally by running **start.devserver.bat** and you can build it with **build.prod.bat**. The build output is **WWWData.h** which needs to be copied to the **PSACanBridge\src\Helpers** folder in the other project.

[psacanbridge]: https://github.com/morcibacsi/PSACANBridge