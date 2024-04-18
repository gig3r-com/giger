﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Giger.Models.Networks
{
    public class Subnetwork
    {
        [BsonId]
        [BsonElement("_id")]
        public required string Id { get; set; }

        public required string Name { get; set; }

        public required string NetworkId { get; set; }

        public required string[] Users { get; set; } = [];

        [BsonRepresentation(BsonType.String)]
        public Firewall? Firewall { get; set; }
        
        [BsonRepresentation(BsonType.String)]
        public OperatingSystem? OperatingSystem { get; set; }

        [BsonRepresentation(BsonType.String)]
        public Ice[] Ice { get; set; } = [];

        public string[] PastHacks { get; set; } = [];
    }

    [JsonConverter(typeof(JsonStringEnumConverter<Firewall>))]
    public enum Firewall
    {
        EncryptGuard,
        FirewallX,
        VirtualVault
    }

    [JsonConverter(typeof(JsonStringEnumConverter<OperatingSystem>))]
    public enum OperatingSystem
    {
        ForceField,
        EvilTwin,
        JoanOfArc
    }

    [JsonConverter(typeof(JsonStringEnumConverter<Ice>))]
    public enum Ice
    {
        ToBeProvided
    }
}
