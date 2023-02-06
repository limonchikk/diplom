export enum PreferredDirectionOfStudy {
  Technical = 'technical',
  Medical = 'medical',
}

export enum ApplicantSex {
  Male = 'male',
  Female = 'female',
}

export enum ApplicantDocumentType {
  PassportOriginal = 'passport_original',
  RussianPassport = 'russian_passport',
  EducationDocumentOriginal = 'education_document_original',
  RussianEducationDocument = 'russian_education_document',
}

export type ApplicantDocuments = {
  folderName: string
  files: {
    buffer: Buffer
    name: string
    originalName: string
    fieldName: string
  }[]
}
