using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Giger.Models.EventModels
{
    public class MedicalEvent: Event
    {
        [BsonRepresentation(BsonType.String)]
        public MedicalEventType? Type { get; set; }
    }

    [JsonConverter(typeof(JsonStringEnumConverter<MedicalEventType>))]
    public enum MedicalEventType
    {
        CYBERWARE,
        MEDICAL_DRUG,
        MEDICAL_PROCEDURE,
        SYMPTOM
    }
}
