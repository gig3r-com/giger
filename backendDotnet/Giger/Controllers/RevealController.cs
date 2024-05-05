﻿using Giger.Models.Obscured;
using Giger.Models.User;
using Giger.Services;
using Microsoft.AspNetCore.Mvc;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RevealController(UserService userService, LoginService loginService, GigService gigService, ObscuredDataService obscuredDataService, ImplantsController implantsController)
        : AuthController(userService, loginService)
    {
        private readonly GigService _gigService = gigService;
        private readonly ObscuredDataService _obscuredDataService = obscuredDataService;

        private readonly ImplantsController _implantsController = implantsController;

        [HttpPatch("code")]
        public async Task<IActionResult> RevealData(string revealCode)
        {
            Request.Headers.TryGetValue("AuthToken", out var senderAuthToken);
            if (string.IsNullOrEmpty(senderAuthToken))
                return Unauthorized();

            var userName = _loginService.GetByAuthTokenAsync(senderAuthToken)?.Result?.Username;
            if (string.IsNullOrEmpty(userName))
                return Unauthorized();

            var obscuredData = await _obscuredDataService.GetByRevealCodeIdAsync(revealCode);
            if (obscuredData is null)
                return NotFound("Wrong code");

            if (obscuredData.IsUsed)
                return BadRequest("Code already used");

            var user = await _userService.GetByUserNameAsync(userName);
            if (user is null)
                return NotFound("User not found");

            var matchingObscurableData = GetObscurableInfoFromUserProfile(user, obscuredData.ObscurableId);
            if (matchingObscurableData is null)
            {
                matchingObscurableData = await GetObscurableInfoGigs(user.Id, obscuredData.ObscurableId);
            }

            if (matchingObscurableData is null)
            {
                return await _implantsController.Install(user.Id, revealCode);
            }

            var isCodeValid = obscuredData.ExpectedRevealCode == revealCode;
            if (isCodeValid)
            {
                if (matchingObscurableData is Models.GigModels.Gig gig)
                {
                    if (gig.TakenById == user.Id)
                        gig.IsRevealedByClient = true;
                    else if (gig.AuthorId == user.Id)
                        gig.IsRevealed = true;

                    await _gigService.UpdateAsync(gig);
                }
                else
                {
                    matchingObscurableData.IsRevealed = true;
                    await _userService.UpdateAsync(user);
                }
                obscuredData.IsUsed = true;
                await _obscuredDataService.UpdateAsync(obscuredData);
                return Ok();
            }
            return NotFound("Wrong code");
        }

        private async Task<ObscurableInfo?> GetObscurableInfoGigs(string userId, string obscurableId)
        {
            var gig = await _gigService.GetAsync(obscurableId);
            if (gig is null)
                return null;
            if (gig.TakenById != userId && gig.AuthorId != userId)
                return null;

            return gig;
        }

        private ObscurableInfo? GetObscurableInfoFromUserProfile(UserPrivate user, string obscurableId)
        {
            ObscurableInfo? returnData = CheckCollection(user.PrivateRecords)
                ?? CheckCollection(user.Goals)
                ?? CheckCollection(user.Meta)
                ?? CheckCollection(user.MedicalEvents)
                ?? CheckCollection(user.CriminalEvents)
                ?? CheckCollection(user.Relations);

            return returnData;

            ObscurableInfo? CheckCollection(ObscurableInfo[] records)
            {
                return records.FirstOrDefault(e => e.Id == obscurableId);
            }
        }
    }
}
