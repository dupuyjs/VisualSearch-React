import axios, { AxiosInstance } from 'axios';
import azurekey from '../../azurekey.json';

type options = { baseUrl: string; instanceId: string; accessKey: string };

export class VisualSearchRequest {
  uri: string;
  client: AxiosInstance;
  options: options;

  constructor(options: options = undefined) {
    this.options = options || azurekey;

    // default uri to custom visual search
    this.uri =
      'https://api.cognitive.microsoft.com/bing/customvisualsearch/v1/instances/' + this.options.instanceId;

    let baseHeaders = {
      Accept: 'application/json',
      'Ocp-Apim-Subscription-Key': this.options.accessKey,
    };

    // create axios client
    this.client = axios.create({
      baseURL: this.uri,
      withCredentials: false,
      headers: baseHeaders,
    });
  }

  /**
   * @param {string} imageUri image uri (can be http:// file:// apps://)
   * @param {string} imageName : imagename
   * @param {number} count : items count to retrieve from the api (default is 10)
   * @returns {Promise<Array<any> | {error: any} >} list of products
   */
  async postAsync(imageUri: string, imageName?: string, count: number = 10): Promise<any[]> {
    if (!imageUri) return null;

    // get image name if specified
    imageName = imageName ? imageName : imageUri.substring(imageUri.lastIndexOf('/') + 1);

    if (!imageName) return null;

    // get image Mime Type
    let mimeType = getMimeType(imageName);

    if (!mimeType) return null;

    // formData prepare the uri to the image for upload by xhr
    let imageFormData = {
      uri: imageUri,
      type: mimeType,
      name: imageName,
    };

    let body = new FormDataJson();
    body.append('image', imageFormData);

    // check if we need more or less than 10 items
    if (count !== 10) {
      let itemCount = {
        value: {
          // Careful, the "C"ount in Pascal casing is important here (issue in cvs server sdk)
          Count: count,
        },
        type: 'application/json',
      };
      body.append('requestInfo', itemCount);
    }

    try {
      let jsonDocument = await this.client.post('/queryImage', body);

      if (!jsonDocument || !jsonDocument.data || !jsonDocument.data.data) return null;

      let all = jsonDocument.data.data.map((d: { metadata?: string }) =>
        d.metadata ? JSON.parse(d.metadata) : undefined,
      );

      return all;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

/**
 * this FormDataJson class extends the existing
 * FormData object from React Native which is not able to handle multiple form-data items with a specified content-type
 */
class FormDataJson extends FormData {
  _parts: any;

  constructor() {
    super();
    this._parts = [];
  }

  append(key, value) {
    this._parts.push([key, value]);
  }

  getParts() {
    return this._parts.map(([name, value]) => {
      let contentDisposition = 'form-data; name="' + name + '"';
      let headers = { 'content-disposition': contentDisposition };
      if (typeof value === 'string') {
        let itemstring = { string: value, headers, fieldName: name };
        return itemstring;
      }

      // The body part is a "blob", which in React Native just means
      // an object with a `uri` attribute. Optionally, it can also
      // have a `name` and `type` attribute to specify filename and
      // content type (cf. web Blob interface.)
      if (typeof value.name === 'string') {
        headers['content-disposition'] += '; filename="' + value.name + '"';
      }
      if (typeof value.type === 'string') {
        headers['content-type'] = value.type;
      }

      // blob uri property is specified, so returns the item as is
      if (typeof value.uri === 'string') {
        let item = { ...value, headers, fieldName: name };
        return item;
      }

      // the value property is an object, so returns a string value
      if (typeof value.value === 'object') {
        let item2 = {
          string: JSON.stringify(value.value),
          headers,
          fieldName: name,
        };
        return item2;
      }
    });
  }
}

/**
 * @param {string}  path path uri, containing an extension. Example : http://contos.com/file/car.jpg
 * @returns {string | null} Mime type corresponding to the file in parameter. Example : "image/jpeg"
 */
const getMimeType = (path: string): string | null => {
  if (!path || path.length <= 0) return null;

  // get path extension
  let ext = path.slice((Math.max(0, path.lastIndexOf('.')) || Infinity) + 1).toLowerCase();

  // retunr MIME types if any;
  return imageMimeTypes[ext] || null;
};

const imageMimeTypes = {
  exr: 'image/aces',
  apng: 'image/apng',
  bmp: 'image/bmp',
  cgm: 'image/cgm',
  drle: 'image/dicom-rle',
  emf: 'image/emf',
  fits: 'image/fits',
  g3: 'image/g3fax',
  gif: 'image/gif',
  heic: 'image/heic',
  heics: 'image/heic-sequence',
  heif: 'image/heif',
  heifs: 'image/heif-sequence',
  ief: 'image/ief',
  jls: 'image/jls',
  jp2: 'image/jp2',
  jpg2: 'image/jp2',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  jpe: 'image/jpeg',
  jpm: 'image/jpm',
  jpx: 'image/jpx',
  jpf: 'image/jpx',
  ktx: 'image/ktx',
  png: 'image/png',
  sgi: 'image/sgi',
  svg: 'image/svg+xml',
  svgz: 'image/svg+xml',
  t38: 'image/t38',
  tif: 'image/tiff',
  tiff: 'image/tiff',
  tfx: 'image/tiff-fx',
  webp: 'image/webp',
  wmf: 'image/wmf',
};
