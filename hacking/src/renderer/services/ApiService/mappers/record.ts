export default function mapRecordToApi(data, userId: string) {
  return {
    id: new Date().valueOf().toString(),
    userId: userId,
    title: data.name,
    description: data.description,
    recordType: 'Relation',
    revealCode: "",
    revealPriority: true,
    isRevealed: 0
  }
}
