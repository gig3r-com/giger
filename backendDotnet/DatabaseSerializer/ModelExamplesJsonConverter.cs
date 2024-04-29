using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using System.Reflection;

namespace DatabaseSerializer
{
    public class ModelExamplesJsonConverter : JsonConverter
    {
        private readonly Type[] _types;

        public ModelExamplesJsonConverter(params Type[] types)
        {
            _types = types;
        }

        public override void WriteJson(JsonWriter writer, object? value, JsonSerializer serializer)
        {
            var o = JObject.FromObject(value, JsonSerializer.CreateDefault(new JsonSerializerSettings { ContractResolver = new IdContractResolver() , Converters = { new StringEnumConverter() } }));
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

        private class IdContractResolver : DefaultContractResolver
        {
            public new static readonly IdContractResolver Instance = new IdContractResolver();

            protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
            {
                JsonProperty property = base.CreateProperty(member, memberSerialization);
                if (property.PropertyName == "Id")
                {
                    property.PropertyName = "_id";
                }

                return property;
            }
        }
    }
}
