using Giger.Models.Networks;
using System.Text.Json.Serialization;

namespace Giger.Models.User
{
    [JsonConverter(typeof(JsonStringEnumConverter<Factions>))]
    public enum Factions
    {
        Takayama,
        Lombard,
        Bordello,
        Gunners,
        Aesthetics,
        Contech,
    }
}
