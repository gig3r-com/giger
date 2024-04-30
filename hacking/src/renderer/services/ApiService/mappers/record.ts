export default function mapRecordToApi(data, userId: string) {
  return {
    id: data.id,
    type: data.type,
    title: data.name,
    description: data.description,
    status: data.status,
    date: data.description,
    isRevealed: data.isRevealed || true,
  };
}
