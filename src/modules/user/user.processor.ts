import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'

@Processor('test')
export class TestProcessor {
  constructor() {}

  @Process('one')
  test(job: Job) {
    console.log(job)
  }
}
