import { IsNotEmpty, IsString, Length } from "class-validator";

export class TodoListDto {

    @Length(3, 100)
    @IsNotEmpty()
    readonly projectName: string
    
    @Length(0, 250)
    @IsString()
    readonly step1: string
    @Length(0, 250)
    @IsString()
    readonly step2: string
    @Length(0, 250)
    @IsString()
    readonly step3: string
    @Length(0, 250)
    @IsString()
    readonly step4: string
    @Length(0, 250)
    @IsString()
    readonly step5: string

    @Length(0, 250)
    @IsString()
    readonly todo1: string
    @Length(0, 250)
    @IsString()
    readonly todo2: string
    @Length(0, 250)
    @IsString()
    readonly todo3: string
    @Length(0, 250)
    @IsString()
    readonly todo4: string
    @Length(0, 250)
    @IsString()
    readonly todo5: string
    
    

}