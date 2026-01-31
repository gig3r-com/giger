using System.Text.Json;
using System.Text.Json.Serialization;

namespace Giger.Data
{
    /// <summary>
    /// Converts null boolean values to false (default)
    /// </summary>
    public class NullableBooleanConverter : JsonConverter<bool>
    {
        public override bool Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType == JsonTokenType.Null)
            {
                return false; // Default to false for null values
            }
            
            return reader.GetBoolean();
        }

        public override void Write(Utf8JsonWriter writer, bool value, JsonSerializerOptions options)
        {
            writer.WriteBooleanValue(value);
        }
    }
}
