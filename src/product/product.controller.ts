import { Controller, Get, Post, Put, Delete, Res, Req, Body, HttpStatus } from '@nestjs/common';
import { CreateProductDTO } from "./dto/product.dto";

@Controller('product')
export class ProductController {

  @Post('/create')
  createProduct(@Res() res, @Req() req, @Body() createProductDTO: CreateProductDTO) {
    //console.log(createProductDTO)
    
    return res.status(HttpStatus.OK).json({message: "received"})
  }



}
