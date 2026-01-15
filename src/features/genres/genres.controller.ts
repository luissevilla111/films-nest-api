import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { MongoIdPipe } from 'src/shared/pipes/mongo-id.pipe';

@ApiTags('Genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo género' })
  @ApiBody({ type: CreateGenreDto })
  @ApiCreatedResponse({
    description: 'Género creado exitosamente',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        name: 'Acción',
        __v: 0,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Error de validación o género ya existe',
    schema: {
      example: {
        statusCode: 400,
        message: 'Genre already exists',
        error: 'Bad Request',
      },
    },
  })
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los géneros' })
  @ApiResponse({
    status: 200,
    description: 'Lista de géneros obtenida exitosamente',
    schema: {
      example: [
        {
          _id: '507f1f77bcf86cd799439011',
          name: 'Acción',
        },
        {
          _id: '507f1f77bcf86cd799439012',
          name: 'Comedia',
        },
      ],
    },
  })
  findAll() {
    return this.genresService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un género por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de MongoDB del género',
    example: '507f1f77bcf86cd799439011',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Género encontrado',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        name: 'Acción',
        __v: 0,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID inválido',
    schema: {
      example: {
        statusCode: 400,
        message: 'Invalid MongoDB ObjectId format: invalid-id',
        error: 'Bad Request',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Género no encontrado',
    schema: {
      example: {
        statusCode: 404,
        message: 'Genre not found',
        error: 'Not Found',
      },
    },
  })
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.genresService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un género' })
  @ApiParam({
    name: 'id',
    description: 'ID de MongoDB del género',
    example: '507f1f77bcf86cd799439011',
    type: String,
  })
  @ApiBody({ type: UpdateGenreDto })
  @ApiResponse({
    status: 200,
    description: 'Género actualizado exitosamente',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        name: 'Aventura',
        __v: 0,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID inválido, datos vacíos o error de validación',
    schema: {
      example: {
        statusCode: 400,
        message: 'No data to update',
        error: 'Bad Request',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Género no encontrado',
    schema: {
      example: {
        statusCode: 404,
        message: 'Genre not found',
        error: 'Not Found',
      },
    },
  })
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() updateGenreDto: UpdateGenreDto,
  ) {
    return this.genresService.update(id, updateGenreDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un género' })
  @ApiParam({
    name: 'id',
    description: 'ID de MongoDB del género',
    example: '507f1f77bcf86cd799439011',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Género eliminado exitosamente',
    schema: {
      example: {
        message: 'Genre deleted successfully',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID inválido',
    schema: {
      example: {
        statusCode: 400,
        message: 'Invalid MongoDB ObjectId format: invalid-id',
        error: 'Bad Request',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Género no encontrado',
    schema: {
      example: {
        statusCode: 404,
        message: 'Genre not found',
        error: 'Not Found',
      },
    },
  })
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.genresService.remove(id);
  }
}
