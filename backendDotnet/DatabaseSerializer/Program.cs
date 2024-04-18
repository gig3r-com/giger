using Newtonsoft.Json;
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
            SaveModels(outputDirModelTypes, modelTypesArray, assembly, new ModelTypesJsonConverter(modelTypesArray));

            var outputDirModels = Path.Combine(Path.GetDirectoryName(outputDirModelTypes), "ModelsExample");
            SaveModels(outputDirModels, modelTypesArray, assembly, new ModelExamplesJsonConverter(modelTypesArray));

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
}
