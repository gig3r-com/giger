using Newtonsoft.Json;
using System.Reflection;

namespace DatabaseSerializer
{
    internal class Program
    {
        static string[] _nonDbClasses = [ "UserSimple", "RecordHashes" ];

        static void Main(string[] args)
        {
            string nspace = "Giger.Models";
            var assembly = Assembly.LoadFrom(Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), "Giger.dll"));
            var modelTypes = from t in assembly.GetTypes()
                             where t.IsClass && !t.IsAbstract && t.Namespace != null && t.Namespace.Contains(nspace) && !_nonDbClasses.Contains(t.Name)
                             where !t.Name.Contains("UpdateHashes")
                             select t;
            var modelTypesArray = modelTypes.ToArray();

            var outputDirModelTypes = Path.Combine(Assembly.GetExecutingAssembly().Location, "..", "..", "..", "ModelsTypes");
            SaveModels(outputDirModelTypes, modelTypesArray, assembly, new ModelTypesJsonConverter(modelTypesArray));

            nspace = "Giger.SerializededModels";
            assembly = Assembly.GetExecutingAssembly();
            modelTypes = from t in assembly.GetTypes()
                             where t.IsClass && !t.IsAbstract && t.Namespace != null && t.Namespace.Contains(nspace) && !_nonDbClasses.Contains(t.Name)
                             select t;
            modelTypesArray = modelTypes.ToArray();
            var outputDirModels = Path.Combine(Path.GetDirectoryName(outputDirModelTypes), "ModelsExample");
            SaveModels(outputDirModels, modelTypesArray, assembly, new ModelExamplesJsonConverter(modelTypesArray), postProcess: true);

            Console.WriteLine("Models saved successfully.");
            Console.WriteLine($"They can be found in {Path.GetFullPath(Path.GetDirectoryName(outputDirModelTypes))}.");
            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
        }


        private static void SaveModels(string path, Type[] modelTypes, Assembly assembly, JsonConverter customConverter, bool postProcess = false)
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

                    if (postProcess)
                    {
                        jsonString = jsonString.Substring(jsonString.IndexOf("Table") + 8);
                        jsonString = jsonString.Substring(0, jsonString.LastIndexOf(']') + 1);
                    }
                    File.WriteAllText($"{path}/{t.Name}.json", jsonString);
                }
            });
        }
    }
}
