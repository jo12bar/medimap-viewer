require('./index.css');

class FooPrinter {
  print() {
    console.log('foo');
  }
}

const logger = new FooPrinter();
logger.print();
