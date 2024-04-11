export { imageDecode, imageEncode, tensorResizeBilinear, tensorHWCtoBCHW, imageBitmapToImageData, calculateProportionalSize, imageSourceToImageData, ImageSource, createCanvas };
import { NdArray } from 'ndarray';
import { imageDecode, imageEncode } from './codecs';
import { Config } from './schema';
type ImageSource = ImageData | ArrayBuffer | Uint8Array | Blob | URL | string | NdArray<Uint8Array>;
declare function imageBitmapToImageData(imageBitmap: ImageBitmap): ImageData;
declare function tensorResizeBilinear(imageTensor: NdArray<Uint8Array>, newWidth: number, newHeight: number): NdArray<Uint8Array>;
declare function tensorHWCtoBCHW(imageTensor: NdArray<Uint8Array>, mean?: number[], std?: number[]): NdArray<Float32Array>;
declare function calculateProportionalSize(originalWidth: number, originalHeight: number, maxWidth: number, maxHeight: number): [number, number];
declare function imageSourceToImageData(image: ImageSource, config: Config): Promise<NdArray<Uint8Array>>;
export declare function convertFloat32ToUint8(float32Array: NdArray<Float32Array>): NdArray<Uint8Array>;
declare function createCanvas(width: any, height: any): any;
//# sourceMappingURL=utils.d.ts.map