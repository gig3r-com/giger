namespace Giger.Models.User.Stats
{
    public struct CharStat
    {
        public CharStat(int i)
        {
            Stat = (short)i;
        }

        private const short MINVALUE = 0;
        private const short MAXVALUE = 4;

        private short _stat;
        public short Stat
        {
            get
            {
                return _stat;
            }

            set
            {
                if (value <= MINVALUE)
                {
                    _stat = MINVALUE;
                }
                if (value >= MAXVALUE)
                {
                    _stat = MAXVALUE;
                }
                else
                {
                    _stat = value;
                }
            }
        }

        public static implicit operator int(CharStat cl) => cl.Stat;
        public static implicit operator CharStat(int i) => new(i);
    }
}
