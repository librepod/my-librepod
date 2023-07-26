import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Store } from './entities/store.entity';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { CreateEntityDto, DeleteEntityDto, UpdateEntityDto } from 'src/common/dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StoreDetailsDto } from './dto/store-details.dto';

@ApiTags('stores')
@Controller('stores')
export class StoresController {
  constructor(private storesService: StoresService) {}

  @Get()
  @ApiOperation({ summary: 'Get all stores' })
  @ApiOkResponse({ type: StoreDetailsDto, isArray: true })
  async getList(): Promise<StoreDetailsDto[]> {
    const stores = await this.storesService.find();
    return stores.map((store) => {
      return {
        id: store.id,
        name: store.name,
        specificationFilePath: store.specificationFilePath,
      };
    });
  }

  @Post()
  async create(@Body() createStoreDto: CreateStoreDto): Promise<CreateEntityDto> {
    const store = await this.storesService.create(createStoreDto);
    return {
      id: store.id,
      message: 'Store created successfully',
    };
  }

  @Put()
  async update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto): Promise<UpdateEntityDto> {
    await this.storesService.update(id, updateStoreDto);
    return {
      message: 'Store updated successfully',
    };
  }

  @Delete()
  async delete(@Param('id') id: string): Promise<DeleteEntityDto> {
    await this.storesService.delete(id);
    return {
      message: 'Store deleted successfully',
    };
  }
}
