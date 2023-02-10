export enum PreferredDirectionOfStudy {
  Technical = 'technical',
  Medical = 'medical',
}

export enum ApplicantSex {
  Male = 'male',
  Female = 'female',
}

export enum ApplicantDocumentType {
  passportOriginal = 'passport_original',
  russianPassport = 'russian_passport',
  educationDocumentOriginal = 'education_document_original',
  russianEducationDocument = 'russian_education_document',
}

export type ApplicationDocument = {
  buffer: Buffer
  name: string
  originalName: string
  fieldName: string
}
