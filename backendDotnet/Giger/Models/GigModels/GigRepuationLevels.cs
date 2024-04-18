namespace Giger.Models.GigModels
{
    public struct GigRepuationLevels
    {
        public GigRepuationLevels(int i)
        {
            Level = (short)i;
        }

        private const short MINVALUE = 0;
        private const short MAXVALUE = 5;

        private short _level;
        public short Level
        {
            get
            {
                return _level;
            }

            set
            {
                if (value < MINVALUE)
                {
                    _level = MINVALUE;
                }
                if (value > MAXVALUE)
                {
                    _level = MAXVALUE;
                }
            }
        }

        public static implicit operator int(GigRepuationLevels cl) => cl.Level;
        public static implicit operator GigRepuationLevels(int i) => new(i);
    }
}
