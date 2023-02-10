export class CreateApplicationResponseDto {
  created: boolean

  constructor(props: CreateApplicationResponseDto) {
    this.created = props.created
  }
}