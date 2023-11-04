using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using ProjetoSemestreApi.models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ProjetoSemestreApi.Services;

public class TokenService : ITokenService
{
    private readonly UserManager<IdentityUser> _userManager;

    public TokenService(UserManager<IdentityUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<string>  GetToken(string key, UserModel usuario)
    {

        var userIdentity = new IdentityUser
        {
            Id = usuario.Id,
            UserName = usuario.Nome,
            Email = usuario.Email
        };

        var userRoles = await _userManager.GetRolesAsync(userIdentity);

        var claims = new[]
        {
        new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
        new Claim(ClaimTypes.Name, usuario.Nome),
        new Claim(ClaimTypes.Email, usuario.Email ?? null!),
        new("roles", string.Join(';', userRoles))
        };

        var credentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)), SecurityAlgorithms.HmacSha256);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Expires = DateTime.UtcNow.AddMinutes(5),
            Subject = new ClaimsIdentity(claims),
            SigningCredentials = credentials
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

 
}


