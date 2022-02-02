import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Product } from 'src/products/entities/product.entity';
import ProductSearchBody from './interfaces/product-search-body';
import ProductSearchResult from './interfaces/product-search-response.interface';

@Injectable()
export default class ProductSearchService {
  index = 'products';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexProduct(product: Product) {
    return this.elasticsearchService.index<
      ProductSearchResult,
      ProductSearchBody
    >({
      index: this.index,
      body: {
        id: product.id,
        description: product.description,
        barcode: product.barcode,
      },
    });
  }

  async search(text: string) {
    const { body } =
      await this.elasticsearchService.search<ProductSearchResult>({
        index: this.index,
        body: {
          query: {
            bool: {
              should: {
                multi_match: {
                  query: text,
                  fields: ['description', 'barcode'],
                },
              },
            },
          },
          sort: {
            id: {
              order: 'asc',
            },
          },
        },
      });

    const hits = body.hits.hits;
    const results = hits.map((item) => item._source);
    return results;
  }

  async remove(productId: number) {
    this.elasticsearchService.deleteByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id: productId,
          },
        },
      },
    });
  }

  async update(post: Product) {
    const newBody: ProductSearchBody = {
      id: post.id,
      description: post.description,
      barcode: post.barcode,
    };

    const script = Object.entries(newBody).reduce((result, [key, value]) => {
      return `${result} ctx._source.${key}='${value}';`;
    }, '');

    return this.elasticsearchService.updateByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id: post.id,
          },
        },
        script: {
          inline: script,
        },
      },
    });
  }
}
