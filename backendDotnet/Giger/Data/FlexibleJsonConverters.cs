using System.Text.Json;
using System.Text.Json.Serialization;

namespace Giger.Data
{
    /// <summary>
    /// Converts various representations of boolean values in JSON to proper bool type.
    /// Handles: "true"/"false", "True"/"False", 1/0, true/false, and empty strings (as false)
    /// </summary>
    public class FlexibleBooleanConverter : JsonConverter<bool>
    {
        public override bool Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            switch (reader.TokenType)
            {
                case JsonTokenType.True:
                    return true;
                case JsonTokenType.False:
                    return false;
                case JsonTokenType.String:
                    var stringValue = reader.GetString()?.Trim().ToLower();
                    if (string.IsNullOrEmpty(stringValue))
                        return false;
                    if (stringValue == "true" || stringValue == "1")
                        return true;
                    if (stringValue == "false" || stringValue == "0")
                        return false;
                    return false; // Default to false for unparseable strings
                case JsonTokenType.Number:
                    return reader.GetInt32() != 0;
                default:
                    return false;
            }
        }

        public override void Write(Utf8JsonWriter writer, bool value, JsonSerializerOptions options)
        {
            writer.WriteBooleanValue(value);
        }
    }

    /// <summary>
    /// Converts string or null to string, providing empty string as default
    /// </summary>
    public class FlexibleStringConverter : JsonConverter<string>
    {
        public override string Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType == JsonTokenType.Null)
                return string.Empty;
            
            if (reader.TokenType == JsonTokenType.String)
                return reader.GetString() ?? string.Empty;
            
            // Handle numbers, booleans, etc by converting to string
            return reader.GetString() ?? string.Empty;
        }

        public override void Write(Utf8JsonWriter writer, string value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value);
        }
    }

    /// <summary>
    /// Converts arrays that might contain objects to string arrays
    /// </summary>
    public class FlexibleStringArrayConverter : JsonConverter<string[]>
    {
        public override string[]? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType == JsonTokenType.Null)
                return Array.Empty<string>();

            if (reader.TokenType != JsonTokenType.StartArray)
                return Array.Empty<string>();

            var list = new List<string>();
            while (reader.Read())
            {
                if (reader.TokenType == JsonTokenType.EndArray)
                    break;

                if (reader.TokenType == JsonTokenType.String)
                {
                    var value = reader.GetString();
                    if (!string.IsNullOrEmpty(value))
                        list.Add(value);
                }
                else if (reader.TokenType == JsonTokenType.StartObject)
                {
                    // Skip the entire object
                    var depth = 1;
                    while (depth > 0 && reader.Read())
                    {
                        if (reader.TokenType == JsonTokenType.StartObject)
                            depth++;
                        else if (reader.TokenType == JsonTokenType.EndObject)
                            depth--;
                    }
                }
            }

            return list.ToArray();
        }

        public override void Write(Utf8JsonWriter writer, string[] value, JsonSerializerOptions options)
        {
            writer.WriteStartArray();
            foreach (var item in value)
            {
                writer.WriteStringValue(item);
            }
            writer.WriteEndArray();
        }
    }

    // Converter for List<string> (similar to array but returns List)
    public class FlexibleStringListConverter : JsonConverter<List<string>>
    {
        public override List<string> Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType != JsonTokenType.StartArray)
                return new List<string>();

            var list = new List<string>();
            while (reader.Read())
            {
                if (reader.TokenType == JsonTokenType.EndArray)
                    break;

                if (reader.TokenType == JsonTokenType.String)
                {
                    var value = reader.GetString();
                    if (!string.IsNullOrEmpty(value))
                        list.Add(value);
                }
                else if (reader.TokenType == JsonTokenType.StartObject)
                {
                    // Skip the entire object
                    var depth = 1;
                    while (depth > 0 && reader.Read())
                    {
                        if (reader.TokenType == JsonTokenType.StartObject)
                            depth++;
                        else if (reader.TokenType == JsonTokenType.EndObject)
                            depth--;
                    }
                }
            }

            return list;
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
