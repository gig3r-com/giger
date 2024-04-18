using MongoDB.Bson;

namespace Giger.SerializededModels.Obscured
{
    public class ObscuredCodesMap : Models.Obscured.ObscuredCodesMap
    {
        public ObscuredCodesMap()
        {
            Id = ObjectId.GenerateNewId().ToString();
            ObscurableId = "661737df07174e02083a9ef5";
            ExpectedRevealCode = "q12we34r";
            IsUsed = false;
        }
    }
}