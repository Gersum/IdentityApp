using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Api.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;

        public RoleController(RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
        }


        [HttpPost("create")]
        public async Task<IActionResult> CreateRole([FromBody] RoleModel roleModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var newRole = new IdentityRole(roleModel.Name);
            var result = await _roleManager.CreateAsync(newRole);

            if (result.Succeeded)
                return Ok("Role created successfully");
            else
                return BadRequest(result.Errors);

        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateRole([FromBody] RoleModel roleModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingRole = await _roleManager.FindByNameAsync(roleModel.Name);
            if (existingRole == null)
                return NotFound("Role not found");

            existingRole.Name = roleModel.NewName; // Assuming you have a property for the new role name
            var result = await _roleManager.UpdateAsync(existingRole);

            if (result.Succeeded)
                return Ok("Role updated successfully");
            else
                return BadRequest(result.Errors);
        }

        [HttpDelete("delete/{roleName}")]
        public async Task<IActionResult> DeleteRole(string roleName)
        {
            var existingRole = await _roleManager.FindByNameAsync(roleName);
            if (existingRole == null)
                return NotFound("Role not found");

            var result = await _roleManager.DeleteAsync(existingRole);

            if (result.Succeeded)
                return Ok("Role deleted successfully");
            else
                return BadRequest(result.Errors);
        }






    }

    public class RoleDto
    {


        public string Name { get; set; }

    }
    public class RoleModel
    {


        public string Name { get; set; }
        public string NewName { get; set; } // For updating role name
    }
}