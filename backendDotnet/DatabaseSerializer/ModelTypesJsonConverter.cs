using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DatabaseSerializer
{
    public class ModelTypesJsonConverter : JsonConverter
    {
        private readonly Type[] _types;

        public ModelTypesJsonConverter(params Type[] types)
        {
            _types = types;
        }

        public override void WriteJson(JsonWriter writer, object? value, JsonSerializer serializer)
        {
            JTokenWriter jtokenWriter = new JTokenWriter();
            jtokenWriter.WriteStartObject();

            foreach (var prop in value.GetType().GetProperties())
            {
                if (prop.Name == "Id")
                {
                    jtokenWriter.WritePropertyName("_id");
                }
                else
                {
                    jtokenWriter.WritePropertyName(prop.Name);
                }

                var propertyType = prop.PropertyType;
                var propertyTypeName = propertyType.FullName;
                if (propertyType.IsGenericType)
                {
                    propertyTypeName = propertyType.Name + $"[{string.Join<string>(',', propertyType.GenericTypeArguments.Select(a=> a.FullName))}]";
                }

                if (propertyType.IsArray)
                {
                    jtokenWriter.WriteValue($"{propertyTypeName}");
                }
                else
                {
                    jtokenWriter.WriteValue(propertyTypeName);
                }
            }

            jtokenWriter.WriteEndObject();

            JObject o = jtokenWriter.Token as JObject;
            if (o != null)
            {
                o.WriteTo(writer);
            }
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            throw new NotImplementedException("Unnecessary because CanRead is false. The type will skip the converter.");
        }

        public override bool CanRead
        {
            get { return false; }
        }

        public override bool CanConvert(Type objectType)
        {
            return _types.Any(t => t == objectType);
        }
    }
}
