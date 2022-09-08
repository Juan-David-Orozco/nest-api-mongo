import { Controller, Get, Post, Put, Delete, Res, Req, Body, HttpStatus, Param, NotFoundException, Query } from '@nestjs/common';
import { CreateProductDTO } from "./dto/product.dto";
import { ProductService } from './product.service'

@Controller('product')
export class ProductController {

  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  async createProduct(@Res() res, @Req() req, @Body() createProductDTO: CreateProductDTO) {
    const newProduct = await this.productService.createProduct(createProductDTO)
    return res.status(HttpStatus.OK).json({
      message: "Product Successfully Created",
      product: newProduct
    })
  }

  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts()
    return res.status(HttpStatus.OK).json({
      message: "Products Returned",
      products
    })
  }

  @Get('/:productID')
  async getProduct(@Res() res, @Param('productID') productID) {
    const product = await this.productService.getProduct(productID)
    if (!product) throw new NotFoundException('Product Not Found')
    return res.status(HttpStatus.OK).json({
      message: "Product Returned",
      product
    })
  }

  @Delete('/delete')
  async deleteProduct(@Res() res, @Query('productID') productID) {
    const deletedProduct = await this.productService.deleteProduct(productID)
    if (!deletedProduct) throw new NotFoundException('Product does not exists')
    return res.status(HttpStatus.OK).json({
      message: "Product Deleted Successfully",
      deletedProduct
    })
  }

  @Put('/update')
  async updateProduct(@Res() res, @Query('productID') productID, @Body() createProductDTO: CreateProductDTO) {
    const updatedProduct = await this.productService.updateProduct(productID, createProductDTO)
    if (!updatedProduct) throw new NotFoundException('Product does not updated')
    return res.status(HttpStatus.OK).json({
      message: "Product Updated Successfully",
      updatedProduct
    })
  }
  
}
