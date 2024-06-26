﻿using Giger.Models.EventModels;
using Giger.Models.User.Records;
using Giger.Models.User.Stats;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.User
{
    public class UserPrivate : UserPublic
    {
        public required CyberwareLevel CyberwareLevel { get; set; }

        [BsonRepresentation(BsonType.String)]
        public required UserTypes TypeActual { get; set; }

        public string? FactionRankActual { get; set; }
        
        public string[] Assets { get; set; } = []; //TODO: DELETE?

        public required SkillStat HackingSkills { get; set; }

        public required CharStat ConfrontationistVsAgreeable { get; set; }

        public required CharStat CowardVsBrave { get; set; }

        public required CharStat TalkativeVsSilent { get; set; }

        public required CharStat ThinkerVsDoer { get; set; }

        public required SkillStat CombatSkill { get; set; }

        public string? VibeFunction { get; set; }

        public string? VibeOpinions { get; set; }

        [BsonRepresentation(BsonType.String)]
        public required VibeEngagement VibeEngagement { get; set; }

        public string[] FavoriteUserIds { get; set; } = [];

        [BsonRepresentation(BsonType.String)]
        public required Factions Faction { get; set; }

        [BsonRepresentation(BsonType.Int32)]
        public int InsuredAmount { get; set; }

        public Dictionary<string, decimal> GigReputation { get; set; } = [];

        public string NetworkAdminName { get; set; }

        // things below are obscured
        public virtual Relation[] Relations { get; set; } = [];

        public virtual Goal[] Goals { get; set; } = [];

        public virtual Meta[] Meta { get; set; } = [];

        public virtual PrivateRecord[] PrivateRecords { get; set; } = [];

        public virtual CriminalEvent[] CriminalEvents { get; set; } = [];

        public virtual MedicalEvent[] MedicalEvents { get; set; } = [];

        // hacker only
        public string[] Exploits { get; set; } = [];

        [BsonRepresentation(BsonType.String)]
        public required MindHacks MindHack { get; set; }

        public string[] MindHackEnabledFor { get; set; } = []; 

        public string? HackerName { get; set; }
    }
}