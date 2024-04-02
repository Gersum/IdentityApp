using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManagerController : ControllerBase
    {
      
        [Authorize(Roles = "Manager")]
        [HttpGet("get-managers")]
        public IActionResult Managers()
        {
            return Ok(new JsonResult(new { message = "Only authorized users can view managers" }));
        }
    }
}
