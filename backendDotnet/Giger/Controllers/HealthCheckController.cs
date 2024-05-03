using Microsoft.AspNetCore.Mvc;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthCheckController : Controller
    {
        [HttpGet]
        public string Get()
        {
            return "I'm alive";
        }
    }
}
