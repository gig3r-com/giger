﻿namespace Giger.Models.GigModels
{
    public class Gig : GigBase
    {
        public GigStatus Status { get; set; }
        public string AuthorId { get; set; }
        public string TakenById {  get; set; }
    }
}