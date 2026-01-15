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
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { MongoIdPipe } from 'src/shared/pipes/mongo-id.pipe';

@ApiTags('People')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva persona' })
  @ApiBody({ type: CreatePersonDto })
  @ApiCreatedResponse({
    description: 'Persona creada exitosamente',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        name: 'John Doe',
        __v: 0,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Error de validación o persona ya existe',
    schema: {
      example: {
        statusCode: 400,
        message: 'Person already exists',
        error: 'Bad Request',
      },
    },
  })
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.peopleService.create(createPersonDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las personas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de personas obtenida exitosamente',
    schema: {
      example: [
        {
          _id: '507f1f77bcf86cd799439011',
          name: 'John Doe',
        },
        {
          _id: '507f1f77bcf86cd799439012',
          name: 'Jane Smith',
        },
      ],
    },
  })
  findAll() {
    return this.peopleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una persona por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de MongoDB de la persona',
    example: '507f1f77bcf86cd799439011',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Persona encontrada',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        name: 'John Doe',
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
    description: 'Persona no encontrada',
    schema: {
      example: {
        statusCode: 404,
        message: 'Person not found',
        error: 'Not Found',
      },
    },
  })
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.peopleService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una persona' })
  @ApiParam({
    name: 'id',
    description: 'ID de MongoDB de la persona',
    example: '507f1f77bcf86cd799439011',
    type: String,
  })
  @ApiBody({ type: UpdatePersonDto })
  @ApiResponse({
    status: 200,
    description: 'Persona actualizada exitosamente',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        name: 'John Updated',
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
    description: 'Persona no encontrada',
    schema: {
      example: {
        statusCode: 404,
        message: 'Person not found',
        error: 'Not Found',
      },
    },
  })
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    return this.peopleService.update(id, updatePersonDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una persona' })
  @ApiParam({
    name: 'id',
    description: 'ID de MongoDB de la persona',
    example: '507f1f77bcf86cd799439011',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Persona eliminada exitosamente',
    schema: {
      example: {
        message: 'Person deleted successfully',
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
    description: 'Persona no encontrada',
    schema: {
      example: {
        statusCode: 404,
        message: 'Person not found',
        error: 'Not Found',
      },
    },
  })
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.peopleService.remove(id);
  }
}
