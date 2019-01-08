

const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';


const imageMimeTypes = {
    "exr": "image/aces",
    "apng": "image/apng",
    "bmp": "image/bmp",
    "cgm": "image/cgm",
    "drle": "image/dicom-rle",
    "emf": "image/emf",
    "fits": "image/fits",
    "g3": "image/g3fax",
    "gif": "image/gif",
    "heic": "image/heic",
    "heics": "image/heic-sequence",
    "heif": "image/heif",
    "heifs": "image/heif-sequence",
    "ief": "image/ief",
    "jls": "image/jls",
    "jp2": "image/jp2",
    "jpg2": "image/jp2",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "jpe": "image/jpeg",
    "jpm": "image/jpm",
    "jpx": "image/jpx",
    "jpf": "image/jpx",
    "ktx": "image/ktx",
    "png": "image/png",
    "sgi": "image/sgi",
    "svg": "image/svg+xml",
    "svgz": "image/svg+xml",
    "t38": "image/t38",
    "tif": "image/tiff",
    "tiff": "image/tiff",
    "tfx": "image/tiff-fx",
    "webp": "image/webp",
    "wmf": "image/wmf"
}


export class Utils {


    public static getMimeType(path:string) {

        // get path extension
        var ext = path.slice((Math.max(0, path.lastIndexOf(".")) || Infinity) + 1).toLowerCase()
        
        // retunr MIME types if any;
        return imageMimeTypes[ext] || null;

    };

    /** Generate a version 4 compliant GUID */
    public static uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    encode(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                keyStr.charAt(enc1) +
                keyStr.charAt(enc2) +
                keyStr.charAt(enc3) +
                keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
    }

    decode(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
            return null;
        }
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        do {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";

        } while (i < input.length);

        return output;
    }

}

