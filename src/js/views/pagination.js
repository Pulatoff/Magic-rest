import View from './View';
import icons from '../../img/icons.svg';
import { extend } from 'lodash-es';

class Pagination extends View {
  _parentElement = document.querySelector('.pagination');
  _generatorHtml(data) {
    const pageSum = data.results.length / data.resultsPerPage;
    console.log(pageSum);
  }
}

export default new Pagination();
