import { Loader, LoadingManager } from 'three';

export class FileLoader extends Loader {

	constructor( manager?: LoadingManager );

	mimeType: undefined | MimeType;
	responseType: undefined |string;

	load(
		url: string,
		onLoad?: ( response: string | ArrayBuffer ) => void,
		onProgress?: ( request: ProgressEvent ) => void,
		onError?: ( event: ErrorEvent ) => void
	): any;
	setMimeType( mimeType: MimeType ): FileLoader;
	setResponseType( responseType: string ): FileLoader;

}