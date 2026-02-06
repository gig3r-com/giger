using System.Text.Json;
using System.Text.Json.Serialization;

namespace Giger.Converters
{
    /// <summary>
    /// JSON converter that converts null string values to empty strings when serializing.
    /// This allows the database to store NULLs while the API returns empty strings.
    /// </summary>
    public class NullToEmptyStringConverter : JsonConverter<string>
    {
        public override bool HandleNull => true;

        public override string Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            // When deserializing, allow null values
            if (reader.TokenType == JsonTokenType.Null)
            {
                return null;
            }
            return reader.GetString() ?? string.Empty;
        }

        public override void Write(Utf8JsonWriter writer, string value, JsonSerializerOptions options)
        {
            // When serializing, convert null to empty string
            writer.WriteStringValue(value ?? string.Empty);
        }
    }
}
