import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { normalizeText } from "src/shared/helpers/text.helpers";

export class SearchDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => normalizeText(value))
    search: string;
}