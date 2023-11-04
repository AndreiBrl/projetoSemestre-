using Microsoft.AspNetCore.Identity;

namespace ProjetoSemestreApi.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public AuthService(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task AddToRole(IdentityUser user, string role)
    {
        if (!await _roleManager.RoleExistsAsync(role))
            await _roleManager.CreateAsync(new IdentityRole(role));

        if (await _roleManager.RoleExistsAsync(role))
            await _userManager.AddToRoleAsync(user, role);
    }
}
