# Bing Custom Visual Search Sample with React Native

Sample code to demonstrate usage of [Bing Custom Visual Search service](https://www.bing.com/partners/developers). This code contains the following features. 

- [x] Take a picture with the camera
- [x] Pick a picture in the camera roll
- [x] Crop a portion of the picture if several articles are on located on the same image
- [x] Preview Image (and manage rotation from Exif data)
- [x] Request Custom Visual Search API
- [x] Display results 

Prior to launch this code, you must create and train a instance of Bing Custom Visual Search and set appropriate credentials as explained below.

## Usage

TypeScript is required (tested with Version 2.9.2)

1. Launch a Phone Emulator
2. Install dependencies with **npm install** command line
3. Run the application (for instance **react-native run-android** if you targets Android device)

If you plan to debug or update the code, this solution has been developed with [Visual Studio Code](https://code.visualstudio.com/) and the following extensions enabled:

- [React Native Tools](https://marketplace.visualstudio.com/items?itemName=vsmobile.vscode-react-native)

TSlint and Prettier are used in addition for code formatting and readability

- [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Credentials

At root folder /, create a file named **azurekey.json**.   
This file should contains your Bing Custom Visual Search uri & credentials.

It looks like:
``` json
{
  "baseUrl" : "https://api.cognitive.microsoft.com/bing/customvisualsearch/v1/instances/",
  "instanceId": "aaaaaa-bbbb-cccc-dddd-a3ac0280b25a",
  "accessKey": "1234567890a564bcde12345f67g1h1i1j"
}

```