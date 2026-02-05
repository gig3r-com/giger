namespace Giger
{
    public static class DebugLogger
    {
        private static bool? _isEnabled;
        
        public static bool IsEnabled
        {
            get
            {
                if (_isEnabled == null)
                {
                    var envVar = Environment.GetEnvironmentVariable("GIGER_DEBUG_LOGGING");
                    _isEnabled = envVar?.ToLower() == "true" || envVar == "1";
                }
                return _isEnabled.Value;
            }
        }
        
        public static void Log(string message)
        {
            if (IsEnabled)
            {
                Console.WriteLine($"[DEBUG] {message}");
            }
        }
    }
}
