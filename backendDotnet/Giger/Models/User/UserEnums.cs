using System.Text.Json.Serialization;

namespace Giger.Models.User
{
    [JsonConverter(typeof(JsonStringEnumConverter<UserRoles>))]
    public enum UserRoles
    {
        INFLUENCER,
        ADMIN,
        GOD
    }

    [JsonConverter(typeof(JsonStringEnumConverter<UserTypes>))]
    public enum UserTypes
    {
        HUMAN,
        AI,
        ANDROID
    }

    [JsonConverter(typeof(JsonStringEnumConverter<Vibe>))]
    public enum Vibe
    {
        DIZORDERS,
        OVERSEERS,
        HEDONIZERS,
        DIGIEVO,
        SW4RM,
        NO_VIBE
    }

    [JsonConverter(typeof(JsonStringEnumConverter<VibeEngagement>))]
    public enum VibeEngagement
    {
        HYPED,
        DISINTERESTED,
        DOUBTING,
        INTERESTED,
        FANATIC
    }

    [JsonConverter(typeof(JsonStringEnumConverter<WealthLevels>))]
    public enum WealthLevels
    {
        BROKE,
        IMPOVERISHED,
        STRUGGLING,
        MODEST,
        STABLE,
        COMFORTABLE,
        AFFLUENT,
        ELITE
    }

    [JsonConverter(typeof(JsonStringEnumConverter<MindHacks>))]
    public enum MindHacks
    {
        Enabled,
        Disabled,
        Banned
    }
}