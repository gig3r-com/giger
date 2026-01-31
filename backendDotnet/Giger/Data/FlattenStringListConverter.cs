using System.Text.Json;
using System.Text.Json.Serialization;

namespace Giger.Data
{
    /// <summary>
    /// Converts JSON arrays that may be nested (string[][]) to flat List<string>
    /// Handles cases where Participants is [[string]] instead of [string]
    /// </summary>
    public class FlattenStringListConverter : JsonConverter<List<string>>
    {
        public override List<string> Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var result = new List<string>();
            
            if (reader.TokenType != JsonTokenType.StartArray)
            {
                throw new JsonException("Expected array");
            }
            
            while (reader.Read())
            {
                if (reader.TokenType == JsonTokenType.EndArray)
                {
                    return result;
                }
                
                if (reader.TokenType == JsonTokenType.String)
                {
                    result.Add(reader.GetString() ?? "");
                }
                else if (reader.TokenType == JsonTokenType.StartArray)
                {
                    // Nested array - flatten it
                    while (reader.Read())
                    {
                        if (reader.TokenType == JsonTokenType.EndArray)
                        {
                            break;
                        }
                        if (reader.TokenType == JsonTokenType.String)
                        {
                            result.Add(reader.GetString() ?? "");
                        }
                    }
                }
            }
            
            return result;
        }

        public override void Write(Utf8JsonWriter writer, List<string> value, JsonSerializerOptions options)
        {
            writer.WriteStartArray();
            foreach (var item in value)
            {
                writer.WriteStringValue(item);
            }
            writer.WriteEndArray();
        }
    }
}
