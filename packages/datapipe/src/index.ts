import { doSomeStuff } from 'module-a';

interface DataObject {
  urls: string[];
  images: string[];
}
class DuplicateUrlError extends Error {
  constructor(message = '') {
    super(message);
    this.name = 'DuplicateUrl';
  }
}

export class DataPipe {

  readData = (event: object): Promise<DataObject> => {
    console.log('readData start');
    const data: DataObject = {
      urls: ['http://example.com', 'http://example.com'],
      images: ['http://example.com'],
    };
    return new Promise(resolve => setTimeout(resolve, 1000, data));
  };

  checkUrl = (url: string): Promise<string> => {
    console.log('checkUrl start');
    return new Promise(resolve => setTimeout(resolve, 750, ''));
  };

  fetchUrl = (url: string): Promise<string> => {
    console.log('fetchkUrl start');
    return new Promise(resolve => setTimeout(resolve, 1100, ''));
  };

  extractText = (url: string): Promise<string> => {
    console.log('extractText start');
    return new Promise(resolve => setTimeout(resolve, 800, ''));
  };

  indexText = (text: string): Promise<string> => {
    console.log('indexText start');
    return new Promise(resolve => setTimeout(resolve, 1500, ''));
  };

  saveText = (text: string): Promise<string> => {
    console.log('saveText start');
    return new Promise(resolve => setTimeout(resolve, 100, ''));
  };
  checkImage = (image: string): Promise<string> => {
    console.log('checkImage start');
    return new Promise(resolve => setTimeout(resolve, 200, ''));
  };
  resizeImage = (image: string): Promise<string> => {
    console.log('resizeImage start');
    return new Promise(resolve => setTimeout(resolve, 300, ''));
  };
  saveImage = (image: string): Promise<string> => {
    console.log('saveImage start');
    return new Promise(resolve => setTimeout(resolve, 500, ''));
  };
  throwsError = (text: string): Promise<string> => {
    console.log('throwsError start');
    return new Promise((resolve, reject) => {
      reject('foo');
    });
  };
  parallel = async (text: string, funcs: Array<Promise<string>>) => {
    await Promise.all(funcs);
    return text;
  };

  pipeline = async (event: object) => {
    const data = await this.readData(event);
    await Promise.all([
      ...data.urls.map(url =>
        this.checkUrl(url)
          .then(this.fetchUrl)
          .then(this.extractText)
          .then(text =>
            this.parallel(text, [this.saveText(text), this.indexText(text), this.throwsError(text)])
          )
          .catch(err => {
            if (!(err instanceof DuplicateUrlError)) {
              throw err;
            }
          })
      ),
      ...data.images.map(url =>
        this.fetchUrl(url)
          .then(this.checkImage)
          .then(this.resizeImage)
          .then(this.saveImage)
      ),
    ]);
  };
}

// pipeline({}).catch(console.log);
