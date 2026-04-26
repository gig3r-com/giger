using Giger.Models.Hashes;
using Giger.Models.Users;
using Giger.Services;
using Microsoft.AspNetCore.Mvc;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public partial class UserController(UserService userService, LoginService loginService) 
        : AuthController(userService, loginService)
    {
        [HttpGet("all")]
        public async Task<List<string>> GetAllUserNames()
        {
            var allUsers = await _userService.GetAllPrivateUsersAsync();
            allUsers = FilterOutAllGodUsers(allUsers);
            return allUsers.Select(u => u.Handle).ToList();
        }

        //#region Simple User

        //[HttpGet("simple/all")]
        //public async Task<ActionResult<List<UserSimpleOld>>> GetAllSimpleUsers()
        //{
        //    if (!IsGodUser())
        //    {
        //        return Unauthorized();
        //    }
        //    var allUsers = await _userService.GetAllPrivateUsersAsync();
        //    allUsers = FilterOutAllGodUsers(allUsers);
        //    return allUsers.Select(u => new UserSimpleOld(u)).ToList();
        //}

        //[HttpGet("simple/byId")]
        //public async Task<ActionResult<UserSimpleOld>> GetSimpleById(string id)
        //{
        //    var user = await _userService.GetAsync(id);
        //    if (user is null)
        //    {
        //        return NotFound();
        //    }

        //    if (!IsAuthorized(user.Id))
        //    {
        //        return Unauthorized();
        //    }
            
        //    user = FilterOutGodUser(user);
        //    if (user is null)
        //    {
        //        return NoContent();
        //    }
        //    return new UserSimpleOld(user);
        //}

        //[HttpGet("simple/hashes/byId")]
        //public async Task<ActionResult<RecordsHashes>> GetHashesById(string id)
        //{
        //    var user = await _userService.GetAsync(id);
        //    if (user is null)
        //    {
        //        return NotFound();
        //    }

        //    if (!IsAuthorized(user.Id))
        //    {
        //        return Unauthorized();
        //    }

        //    user = FilterOutGodUser(user);
        //    if (user is null)
        //    {
        //        return NoContent();
        //    }
        //    return new RecordsHashes(user);
        //}

        //[HttpGet("simple/byUsername")]
        //public async Task<ActionResult<UserSimpleOld>> GetSimpleByUsername(string username)
        //{
        //    var user = await _userService.GetByUserNameAsync(username);
        //    if (user is null)
        //    {
        //        return NotFound();
        //    }

        //    if (!IsAuthorized(user.Id))
        //    {
        //        return Unauthorized();
        //    }

        //    user = FilterOutGodUser(user);
        //    return new UserSimpleOld(user);
        //}

        //[HttpGet("simple/hashes/byUsername")]
        //public async Task<ActionResult<RecordsHashes>> GetHashesByUsername(string username)
        //{
        //    var user = await _userService.GetByUserNameAsync(username);
        //    if (user is null)
        //    {
        //        return NotFound();
        //    }

        //    if (!IsAuthorized(user.Id))
        //    {
        //        return Unauthorized();
        //    }

        //    user = FilterOutGodUser(user);
        //    return new RecordsHashes(user);
        //}

        //#endregion

        #region PrivateUser

        [HttpGet("private/all")]
        public async Task<List<User>> GetAllPrivateUsers()
        {
            var allUsers = await _userService.GetAllPrivateUsersAsync();
            return FilterOutAllGodUsers(allUsers);
        }

        [HttpGet("private/byId")]
        public async Task<ActionResult<User>> Get(string id)
        {
            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound();
            }

            if (!IsAuthorized(user.Id))
            {
                return Unauthorized();
            }
            user = FilterOutGodUser(user);
            if (user is null)
            {
                return NoContent();
            }
            //FilterObscurableData(user);
            return user;
        }

        [HttpGet("private/byUsername")]
        public async Task<ActionResult<User>> GetByUserName(string userName)
        {
            var user = await _userService.GetByUserNameAsync(userName);
            if (user is null)
            {
                return NotFound();
            }

            if (!IsAuthorized(user.Id))
            {
                return Unauthorized();
            }

            //FilterObscurableData(user);
            return FilterOutGodUser(user);
        }

        [HttpPost()]
        public async Task<IActionResult> Post(User newUser)
        {
            if (!IsGodUser())
            {
                Unauthorized();
            }

            await _userService.CreateAsync(newUser);
            return CreatedAtAction(nameof(Post), new { id = newUser.Id }, newUser);
        }

        [HttpPut()]
        public async Task<IActionResult> Update(User updatedUser)
        {
            if (!IsAuthorized(updatedUser.Id))
            {
                Unauthorized();
            }
            var user = await _userService.GetAsync(updatedUser.Id);
            if (user is null)
            {
                return BadRequest();
            }

            await _userService.UpsertAsync(updatedUser);
            return Ok();
        }

        [HttpDelete("byId")]
        public async Task<IActionResult> Delete(string id)
        {
            if (!IsGodUser())
            {
                Unauthorized();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NoContent();
            }

            await _userService.RemoveAsync(id);
            return Ok();
        }
        
        #endregion

        #region PublicUser
        [HttpGet("public/all")]
        public async Task<List<User>> GetAllPublicUsers() => await Task.Run(() => _userService.GetAllPrivateUsersAsync().Result.Cast<User>().ToList());

        [HttpGet("public/byId")]
        public async Task<ActionResult<User>> GetPublicById(string id)
        {
            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet("public/byUsername")]
        public async Task<ActionResult<User>> GetPublicByUsername(string username)
        {
            var user = await _userService.GetByUserNameAsync(username);
            if (user is null)
            {
                return NotFound();
            }

            return user;
        }
        #endregion

        //private void FilterObscurableData(User user)
        //{
        //    if (IsGodUser())
        //    {
        //        return;
        //    }

        //    FilterObscurableField(user.PrivateRecords);
        //    FilterObscurableField(user.MedicalEvents);
        //    FilterObscurableField(user.CriminalEvents);
        //    FilterObscurableField(user.Relations);
        //    FilterObscurableField(user.Goals);
        //}

        //private void FilterObscurableField(IEnumerable<ObscurableInfoOld> obscurableFields)
        //{
        //    foreach (var element in obscurableFields)
        //    {
        //        if (!element.IsRevealed)
        //        {
        //            element.Obscure();
        //        }
        //    }
        //}

        private List<User> FilterOutAllGodUsers(List<User> users)
        {
            if (IsGodUser())
            {
                return users;
            }    
            return users.Where(u => !u.Roles.Contains(Models.Users.User.ROLE_GOD)).ToList();
        }

        private User FilterOutGodUser(User user)
        {
            if (!user.Roles.Contains(Models.Users.User.ROLE_GOD))
            {
                return user;
            }
            if (IsGodUser())
            {
                return user;
            }
            return null;
        }
    }
}