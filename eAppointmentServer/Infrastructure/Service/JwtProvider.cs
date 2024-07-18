using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using eAppointmentServer.Application.Services;
using eAppointmentServer.Domain.Entities;
using Microsoft.IdentityModel.Tokens;

namespace eAppointmentServer.Infrastructure.Service
{
    internal sealed class JwtProvider : IJwtProvider
    {
        public string CreateToken(AppUser user)
        {
            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.FullName),
                new Claim(ClaimTypes.Email, user.Email ?? string.Empty),
                new Claim("Username", user.UserName ?? string.Empty),
            };

            DateTime expires = DateTime.Now.AddDays(1);

            SymmetricSecurityKey securityKey =
                new(Encoding.UTF8.GetBytes(string.Join("-", Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid())));

            SigningCredentials signingCredentials = new(securityKey, SecurityAlgorithms.HmacSha512);

            JwtSecurityToken securityToken = new(
                issuer: "Serkan Öztürk",
                audience: "eAppointment",
                claims: claims,
                notBefore: DateTime.Now,
                expires: expires,
                signingCredentials: signingCredentials);

            JwtSecurityTokenHandler handler = new();

            string token = handler.WriteToken(securityToken);
            return token;
        }
    }
}
