import ProductSearchBody from './product-search-body';

interface ProductSearchResult {
  hits: {
    total: {
      value: number;
    };
    hits: Array<{
      _source: ProductSearchBody;
    }>;
  };
}

export default ProductSearchResult;
