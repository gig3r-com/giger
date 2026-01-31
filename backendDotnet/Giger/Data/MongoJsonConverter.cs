using System.Text.Json;
using System.Text.Json.Nodes;

namespace Giger.Data
{
    public static class MongoJsonConverter
    {
        /// <summary>
        /// Converts MongoDB JSON (with _id) to PostgreSQL-compatible JSON (with Id)
        /// Recursively processes nested objects and arrays
        /// </summary>
        public static string ConvertMongoToPostgres(string mongoJson)
        {
            try
            {
                var jsonArray = JsonNode.Parse(mongoJson)?.AsArray();
                if (jsonArray == null) return "[]";

                foreach (var item in jsonArray)
                {
                    var obj = item?.AsObject();
                    if (obj == null) continue;

                    // Recursively convert _id to Id at all levels
                    ConvertObjectIds(obj);
                }

                return jsonArray.ToJsonString(new JsonSerializerOptions { WriteIndented = false });
            }
            catch (Exception)
            {
                return mongoJson; // Return original if conversion fails
            }
        }
        
        private static void ConvertObjectIds(JsonObject obj)
        {
            // Convert _id to Id at this level
            if (obj.ContainsKey("_id"))
            {
                var idValue = obj["_id"];
                obj.Remove("_id");
                obj["Id"] = idValue;
            }
            
            // Recursively process nested objects and arrays
            foreach (var kvp in obj.ToList())
            {
                if (kvp.Value is JsonObject nestedObj)
                {
                    ConvertObjectIds(nestedObj);
                }
                else if (kvp.Value is JsonArray nestedArr)
                {
                    foreach (var item in nestedArr)
                    {
                        if (item is JsonObject itemObj)
                        {
                            ConvertObjectIds(itemObj);
                        }
                    }
                }
            }
        }
    }
}
