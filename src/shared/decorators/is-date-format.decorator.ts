import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

// Extender dayjs con el plugin de formato personalizado
dayjs.extend(customParseFormat);

export function IsDateFormat(
  format: string = 'DD/MM/YYYY',
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isDateFormat',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [format],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!value) {
            // Si el valor es null, undefined o vacío, y el campo es opcional, se permite
            return true;
          }

          if (typeof value !== 'string') {
            return false;
          }

          const dateFormat = args.constraints[0] || format;
          const parsedDate = dayjs(value, dateFormat, true); // strict mode

          return parsedDate.isValid();
        },
        defaultMessage(args: ValidationArguments) {
          const dateFormat = args.constraints[0] || format;
          return `${args.property} must be a valid date in format ${dateFormat}`;
        },
      },
    });
  };
}
