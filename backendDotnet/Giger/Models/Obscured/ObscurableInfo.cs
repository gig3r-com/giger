using Giger.Data;
using System.Text.Json.Serialization;

namespace Giger.Models.Obscured
{
    public abstract class ObscurableInfo
    {
        [JsonPropertyName("_id")]

        public string Id { get; set; } = string.Empty;

        [JsonConverter(typeof(FlexibleBooleanConverter))]
        public bool IsRevealed { get; set; } = true;

        protected const string REDACTED = "********REDACTED********";

        public virtual void Obscure() { } // nothing to obscure here

        public override int GetHashCode()
        {
            return Id.GetHashCode() * 19 + IsRevealed.GetHashCode() * 17;
        }
    }
}
