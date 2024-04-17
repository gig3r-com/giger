using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Reflection;

namespace DatabaseSerializer
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string nspace = "Giger.SerializededModels";
            var assembly = Assembly.GetExecutingAssembly();
            var modelTypes = from t in assembly.GetTypes()
                             where t.IsClass && !t.IsAbstract && t.Namespace != null && t.Namespace.Contains(nspace)
                             select t;
            var modelTypesArray = modelTypes.ToArray();

            var outputDirModelTypes = Path.Combine(Assembly.GetExecutingAssembly().Location, "..", "..", "..", "ModelsTypes");
            SaveModels(outputDirModelTypes, modelTypesArray, assembly, new KeysJsonConverter(modelTypesArray));

            var outputDirModels = Path.Combine(Path.GetDirectoryName(outputDirModelTypes), "ModelsExample");
            SaveModels(outputDirModels, modelTypesArray, assembly, null);

            Console.WriteLine("Models saved successfully.");
            Console.WriteLine($"They can be found in {Path.GetFullPath(Path.GetDirectoryName(outputDirModelTypes))}.");
            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
        }


        private static void SaveModels(string path, Type[] modelTypes, Assembly assembly, JsonConverter customConverter)
        {
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            else
            {
                Directory.Delete(path, true);
                Directory.CreateDirectory(path);
            }

            modelTypes.ToList().ForEach(t =>
            {
                if (t.FullName != null)
                {
                    string jsonString;
                    if (customConverter != null)
                    {
                        jsonString = JsonConvert.SerializeObject(assembly.CreateInstance(t.FullName), Formatting.Indented, [customConverter]);
                    }
                    else
                    {
                        jsonString = JsonConvert.SerializeObject(assembly.CreateInstance(t.FullName), Formatting.Indented);
                    }
                    File.WriteAllText($"{path}/{t.Name}.json", jsonString);
                }
            });
        }
    }

    public class KeysJsonConverter : JsonConverter
    {
        private readonly Type[] _types;

        public KeysJsonConverter(params Type[] types)
        {
            _types = types;
        }

        public override void WriteJson(JsonWriter writer, object? value, JsonSerializer serializer)
        {
            JTokenWriter jtokenWriter = new JTokenWriter();
            jtokenWriter.WriteStartObject();

            foreach (var prop in value.GetType().GetProperties())
            {
                jtokenWriter.WritePropertyName(prop.Name);

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

            //jtokenWriter.WriteWhitespace(Environment.NewLine);
            //JToken t = JToken.FromObject(value);


            JObject o = jtokenWriter.Token as JObject;
            if (o != null)
            {
                o.WriteTo(writer);
                //t.WriteTo(writer);
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
