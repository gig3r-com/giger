using Giger.Models.Users;
using Giger.Services;
using Microsoft.AspNetCore.Mvc;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public partial class UserController(UserService userService, LoginService loginService, 
        RecordsService recordService, ConversationService conversationService, AccountService accountService, PlotsService plotsService) 
        : AuthController(userService, loginService)
    {
        [HttpGet("usernames")]
        public async Task<List<string>> GetAllUserNames()
        {
            var allUsers = await _userService.GetAllPrivateUsersAsync();
            allUsers = FilterOutAllGodUsers(allUsers);
            return allUsers.Where(u => u.Active).Select(u => u.Handle).ToList();
        }

        #region PrivateUser

        //[HttpGet("full/all")]
        //public async Task<List<User>> GetAllPrivateUsers()
        //{
        //    if (!IsGodUser())
        //    {
        //        Unauthorized();
        //    }
        //    var allUsers = await _userService.GetAllPrivateUsersAsync();
        //    return FilterOutAllGodUsers(allUsers);
        //}

        [HttpGet("full/byId")]
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
            await FillUserProperties(user);
            return user;
        }

        [HttpGet("full/byUsername")]
        public async Task<ActionResult<User>> GetByUserNameFull(string userName)
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
            user = FilterOutGodUser(user);
            await FillUserProperties(user);

            return user;
        }

        private async Task FillUserProperties(User user)
        {
            var records = await recordService.GetAllForUserAsync(user.Handle);
            user.HardRecords = records.Where(r => r.Type == RecordType.Types.HARDRECORD.ToString()).ToArray();
            user.OffGameRecords = records.Where(r => r.Type == RecordType.Types.OFFGAMERECORD.ToString()).ToArray();
            user.MindRecords = records.Where(r => r.Type == RecordType.Types.MINDRECORD.ToString()).ToArray();

            var conversations = conversationService.GetAllWithParticipantAsync(user.Handle).Result;
            user.Conversations = conversations.ToArray();

            var accounts = await accountService.GetByOwnerAsync(user.Handle);
            user.Accounts = accounts.ToArray();

            var plots = await plotsService.GetAllForUserAsync(user.Handle);
            user.Plots = plots.ToArray();
        }

        [HttpGet("flat/byUsername")]
        public async Task<ActionResult<User>> GetByUserNameFlat(string userName)
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